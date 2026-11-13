import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_GATEWAY_CONFIG,
  normalizeWhatsappNumber,
  sanitizeGatewayConfig,
  formatInquiryNotification,
  dispatchGatewayAlert,
  detectGatewayProviders
} from './requestGateway.ts';

test('normalizeWhatsappNumber handles Indian 10-digit and formatted numbers', () => {
  assert.equal(normalizeWhatsappNumber('9307373024'), '919307373024');
  assert.equal(normalizeWhatsappNumber('+91-9307373024'), '919307373024');
  assert.equal(normalizeWhatsappNumber(''), '919307373024');
});

test('sanitizeGatewayConfig falls back safely to defaults on invalid inputs', () => {
  const cfg = sanitizeGatewayConfig({ notifyEmail: 'bad-email', notifyWhatsapp: '1234567890' });
  assert.equal(cfg.notifyEmail, DEFAULT_GATEWAY_CONFIG.notifyEmail);
  assert.equal(cfg.notifyWhatsapp, '911234567890');
  assert.equal(cfg.emailEnabled, true);
  assert.equal(cfg.whatsappEnabled, true);
});

test('formatInquiryNotification generates email, WhatsApp relay URL, and Pune/Mumbai HQs', () => {
  const formatted = formatInquiryNotification(
    {
      id: 'inq-101',
      name: 'Rohan Sharma',
      email: 'rohan@example.com',
      phone: '+91-9820012345',
      practiceArea: 'Commercial Litigation',
      description: 'Urgent contract dispute notice.'
    },
    DEFAULT_GATEWAY_CONFIG
  );

  assert.equal(formatted.targetEmail, 'dp.lexglobaladvocacy@gmail.com');
  assert.equal(formatted.formattedWaDisplay, '+919307373024');
  assert.ok(formatted.whatsappRelayUrl.startsWith('https://wa.me/919307373024?text='));
  assert.ok(formatted.mailtoRelayUrl.startsWith('mailto:dp.lexglobaladvocacy%40gmail.com'));
  assert.ok(formatted.htmlBody.includes('Hingne Khurd, Sinhgad Road, Pune - 411051'));
  assert.ok(formatted.summaryText.includes('Rohan Sharma'));
});

test('dispatchGatewayAlert uses SMTP and WhatsApp Cloud API when configured', async () => {
  let smtpCalled = false;
  let waCalled = false;

  const mockFetch = (async (url: string) => {
    if (String(url).includes('graph.facebook.com')) {
      waCalled = true;
      return new Response(JSON.stringify({ messages: [{ id: 'wamid.123' }] }), { status: 200 });
    }
    return new Response('{}', { status: 404 });
  }) as unknown as typeof fetch;

  const report = await dispatchGatewayAlert(
    {
      id: 'inq-202',
      name: 'Priya Nair',
      email: 'priya@example.com',
      phone: '9876543210',
      practiceArea: 'Corporate & M&A',
      description: 'Need M&A due diligence advisory.'
    },
    DEFAULT_GATEWAY_CONFIG,
    {
      SMTP_USER: 'mailer@example.com',
      SMTP_PASS: 'app-pass',
      WHATSAPP_PHONE_NUMBER_ID: '123456',
      WHATSAPP_ACCESS_TOKEN: 'token'
    },
    {
      fetchImpl: mockFetch,
      sendSmtp: async () => {
        smtpCalled = true;
        return { messageId: 'smtp-msg-1' };
      }
    }
  );

  assert.equal(smtpCalled, true);
  assert.equal(waCalled, true);
  assert.equal(report.email.status, 'sent');
  assert.equal(report.email.provider, 'smtp');
  assert.equal(report.whatsapp.status, 'sent');
  assert.equal(report.whatsapp.provider, 'whatsapp_cloud');
});

test('detectGatewayProviders never leaks credentials and reflects boolean availability', () => {
  const status = detectGatewayProviders({
    SMTP_USER: 'a@b.com',
    SMTP_PASS: 'secret',
    CALLMEBOT_API_KEY: 'cb-key'
  });
  assert.equal(status.smtpConfigured, true);
  assert.equal(status.callmebotConfigured, true);
  assert.equal(status.whatsappCloudConfigured, false);
});
