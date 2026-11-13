export interface GatewayConfig {
  notifyEmail: string;
  notifyWhatsapp: string;
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  formsubmitFallback: boolean;
}

export interface ClientRequestPayload {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  practiceArea?: string;
  jurisdiction?: string;
  urgency?: string;
  description?: string;
  message?: string;
  createdAt?: string;
}

export interface ChannelDispatchResult {
  status: 'sent' | 'queued_relay' | 'disabled' | 'failed';
  provider: string;
  detail: string;
}

export interface GatewayDispatchReport {
  inquiryId: string;
  dispatchedAt: string;
  emailTarget: string;
  whatsappTarget: string;
  email: ChannelDispatchResult;
  whatsapp: ChannelDispatchResult;
  whatsappRelayUrl: string;
  mailtoRelayUrl: string;
  summaryText: string;
}

export const DEFAULT_GATEWAY_CONFIG: GatewayConfig = {
  notifyEmail: 'dp.lexglobaladvocacy@gmail.com',
  notifyWhatsapp: '919307373024',
  emailEnabled: true,
  whatsappEnabled: true,
  formsubmitFallback: true
};

export function normalizeWhatsappNumber(raw: string | undefined, fallback = '919307373024'): string {
  const digits = String(raw || '').replace(/\D+/g, '');
  if (!digits) return fallback;
  if (digits.length === 10) return '91' + digits;
  return digits;
}

export function sanitizeGatewayConfig(input: Partial<GatewayConfig> | undefined, env: Record<string, string | undefined> = {}): GatewayConfig {
  const emailCandidate = typeof input?.notifyEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.notifyEmail.trim())
    ? input.notifyEmail.trim()
    : (env.NOTIFY_EMAIL && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.NOTIFY_EMAIL.trim())
      ? env.NOTIFY_EMAIL.trim()
      : DEFAULT_GATEWAY_CONFIG.notifyEmail);

  const waDigits = normalizeWhatsappNumber(input?.notifyWhatsapp || env.NOTIFY_WHATSAPP, DEFAULT_GATEWAY_CONFIG.notifyWhatsapp);

  return {
    notifyEmail: emailCandidate,
    notifyWhatsapp: waDigits,
    emailEnabled: input?.emailEnabled !== undefined ? Boolean(input.emailEnabled) : DEFAULT_GATEWAY_CONFIG.emailEnabled,
    whatsappEnabled: input?.whatsappEnabled !== undefined ? Boolean(input.whatsappEnabled) : DEFAULT_GATEWAY_CONFIG.whatsappEnabled,
    formsubmitFallback: input?.formsubmitFallback !== undefined ? Boolean(input.formsubmitFallback) : DEFAULT_GATEWAY_CONFIG.formsubmitFallback
  };
}

export function detectGatewayProviders(env: Record<string, string | undefined>) {
  const smtpUser = env.SMTP_USER || env.GMAIL_USER;
  const smtpPass = env.SMTP_PASS || env.GMAIL_APP_PASSWORD;
  return {
    smtpConfigured: Boolean(smtpUser && smtpPass),
    resendConfigured: Boolean(env.RESEND_API_KEY),
    formsubmitAvailable: true,
    whatsappCloudConfigured: Boolean(env.WHATSAPP_PHONE_NUMBER_ID && env.WHATSAPP_ACCESS_TOKEN),
    callmebotConfigured: Boolean(env.CALLMEBOT_API_KEY),
    twilioConfigured: Boolean(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_WHATSAPP_FROM),
    webhookConfigured: Boolean(env.GATEWAY_WEBHOOK_URL || env.EMAIL_WEBHOOK_URL || env.WHATSAPP_WEBHOOK_URL)
  };
}

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatInquiryNotification(
  inquiry: ClientRequestPayload,
  config: GatewayConfig
) {
  const targetEmail = config.notifyEmail || DEFAULT_GATEWAY_CONFIG.notifyEmail;
  const waDigits = normalizeWhatsappNumber(config.notifyWhatsapp);
  const formattedWaDisplay = '+' + waDigits;
  const desc = (inquiry.description || inquiry.message || '').trim();
  const submittedAt = inquiry.createdAt || new Date().toISOString();
  const subject = `[Lex Global Client Request] ${inquiry.practiceArea || 'General Counsel'} - ${inquiry.name} (${inquiry.id})`;

  const summaryText = [
    '*LEX GLOBAL ADVOCACY LLP — New Client Request*',
    `Ref ID: ${inquiry.id}`,
    `Client Name: ${inquiry.name}`,
    `Client Email: ${inquiry.email}`,
    `Client Mobile/WhatsApp: ${inquiry.phone || 'Not provided'}`,
    `Practice Area: ${inquiry.practiceArea || 'General Counsel & Advocacy'}`,
    `Organization: ${inquiry.organization || 'Individual Party'}`,
    `Urgency: ${inquiry.urgency || 'Routine'}`,
    `Submitted At: ${submittedAt}`,
    '',
    'Matter Synopsis:',
    desc
  ].join('\n');

  const htmlBody = `
    <div style="font-family:Georgia, serif; max-width:640px; margin:0 auto; border:1px solid #d6c5a3; border-radius:8px; overflow:hidden; background:#ffffff;">
      <div style="background:#0B1120; color:#F5C00C; padding:18px 24px;">
        <div style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#d4af37;">Automated Client Request Gateway</div>
        <h2 style="margin:6px 0 0; color:#ffffff; font-size:20px;">LEX GLOBAL ADVOCACY LLP</h2>
      </div>
      <div style="padding:20px 24px; font-family:Arial, sans-serif; color:#1e293b; font-size:14px; line-height:1.6;">
        <p style="margin-top:0;">A new privileged client request has been submitted on the portal.</p>
        <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold; width:170px;">Reference ID</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.id)}</td></tr>
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold;">Client Name</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.name)}</td></tr>
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold;">Client Email</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.email)}</td></tr>
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold;">Client Phone</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.phone || 'Not provided')}</td></tr>
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold;">Practice Area</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.practiceArea || 'General Counsel & Advocacy')}</td></tr>
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold;">Organization</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.organization || 'Individual Party')}</td></tr>
          <tr><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; font-weight:bold;">Urgency</td><td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${escapeHtml(inquiry.urgency || 'Routine')}</td></tr>
        </table>
        <div style="background:#FAF8F5; border-left:4px solid #C5A059; padding:12px 16px; border-radius:4px;">
          <strong style="display:block; margin-bottom:6px;">Confidential Matter Synopsis</strong>
          <div style="white-space:pre-wrap;">${escapeHtml(desc)}</div>
        </div>
        <p style="font-size:12px; color:#64748b; margin-top:16px; margin-bottom:0;">
          Mumbai HQ: 91 Springboard BKC 2, Kalina, Santacruz East, Mumbai - 400098 | Pune HQ: Flat no. 9 + 16, Damodar Prasad Apartment, B Wing, Hingne Khurd, Sinhgad Road, Pune - 411051
        </p>
      </div>
    </div>
  `;

  const whatsappRelayUrl = `https://wa.me/${waDigits}?text=${encodeURIComponent(summaryText)}`;
  const mailtoRelayUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText)}`;

  return {
    targetEmail,
    waDigits,
    formattedWaDisplay,
    subject,
    summaryText,
    htmlBody,
    whatsappRelayUrl,
    mailtoRelayUrl
  };
}

export interface GatewayDependencies {
  fetchImpl?: typeof fetch;
  sendSmtp?: (opts: { to: string; replyTo: string; subject: string; text: string; html: string }) => Promise<{ messageId?: string }>;
}

async function dispatchEmailChannel(
  inquiry: ClientRequestPayload,
  formatted: ReturnType<typeof formatInquiryNotification>,
  config: GatewayConfig,
  env: Record<string, string | undefined>,
  deps: GatewayDependencies
): Promise<ChannelDispatchResult> {
  if (!config.emailEnabled) {
    return { status: 'disabled', provider: 'none', detail: 'Email notifications disabled in gateway settings.' };
  }

  const fetchFn = deps.fetchImpl || globalThis.fetch;
  const smtpUser = env.SMTP_USER || env.GMAIL_USER;
  const smtpPass = env.SMTP_PASS || env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass && deps.sendSmtp) {
    try {
      const info = await deps.sendSmtp({
        to: formatted.targetEmail,
        replyTo: inquiry.email,
        subject: formatted.subject,
        text: formatted.summaryText,
        html: formatted.htmlBody
      });
      return {
        status: 'sent',
        provider: 'smtp',
        detail: `Delivered via SMTP (${info?.messageId || 'accepted'})`
      };
    } catch (err: any) {
      return {
        status: 'failed',
        provider: 'smtp',
        detail: `SMTP error: ${err?.message || 'Failed to send'}`
      };
    }
  }

  if (env.RESEND_API_KEY && fetchFn) {
    try {
      const res = await fetchFn('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL || 'Lex Global Intake <onboarding@resend.dev>',
          to: [formatted.targetEmail],
          reply_to: inquiry.email,
          subject: formatted.subject,
          text: formatted.summaryText,
          html: formatted.htmlBody
        }),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        const data: any = await res.json().catch(() => ({}));
        return { status: 'sent', provider: 'resend', detail: `Delivered via Resend (${data.id || 'ok'})` };
      }
      const errText = await res.text().catch(() => res.statusText);
      return { status: 'failed', provider: 'resend', detail: `Resend API ${res.status}: ${errText.slice(0, 120)}` };
    } catch (err: any) {
      return { status: 'failed', provider: 'resend', detail: `Resend timeout/error: ${err?.message || 'error'}` };
    }
  }

  const webhookUrl = env.EMAIL_WEBHOOK_URL || env.GATEWAY_WEBHOOK_URL;
  if (webhookUrl && fetchFn) {
    try {
      const res = await fetchFn(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'client_request',
          channel: 'email',
          targetEmail: formatted.targetEmail,
          subject: formatted.subject,
          summaryText: formatted.summaryText,
          inquiry
        }),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        return { status: 'sent', provider: 'webhook', detail: `Dispatched to configured email webhook (${res.status})` };
      }
      return { status: 'failed', provider: 'webhook', detail: `Webhook HTTP ${res.status}` };
    } catch (err: any) {
      return { status: 'failed', provider: 'webhook', detail: `Webhook error: ${err?.message || 'error'}` };
    }
  }

  if (config.formsubmitFallback && fetchFn) {
    try {
      const res = await fetchFn(`https://formsubmit.co/ajax/${encodeURIComponent(formatted.targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': env.PUBLIC_SITE_URL || 'https://www.lexglobalreview.org',
          'Referer': (env.PUBLIC_SITE_URL || 'https://www.lexglobalreview.org') + '/',
          'User-Agent': 'LexGlobalAdvocacyGateway/1.0'
        },
        body: JSON.stringify({
          _subject: formatted.subject,
          _replyto: inquiry.email,
          _template: 'table',
          Reference_ID: inquiry.id,
          Client_Name: inquiry.name,
          Client_Email: inquiry.email,
          Client_Phone: inquiry.phone || 'Not provided',
          Practice_Area: inquiry.practiceArea || 'General Counsel',
          Organization: inquiry.organization || 'Individual Party',
          Matter_Synopsis: inquiry.description || inquiry.message || ''
        }),
        signal: AbortSignal.timeout(5000)
      });
      const data: any = await res.json().catch(() => ({}));
      if (res.ok && (data.success === 'true' || data.success === true)) {
        return { status: 'sent', provider: 'formsubmit', detail: `Relayed to ${formatted.targetEmail} via FormSubmit` };
      }
      return {
        status: 'queued_relay',
        provider: 'formsubmit',
        detail: data?.message ? String(data.message).slice(0, 140) : `Relay standby (${res.status}); direct mailto relay prepared`
      };
    } catch {
      return {
        status: 'queued_relay',
        provider: 'relay',
        detail: 'Network relay standby; direct mailto dispatch link prepared'
      };
    }
  }

  return {
    status: 'queued_relay',
    provider: 'relay',
    detail: 'Configure SMTP/Resend env vars for background email delivery; direct mailto relay prepared'
  };
}

async function dispatchWhatsappChannel(
  inquiry: ClientRequestPayload,
  formatted: ReturnType<typeof formatInquiryNotification>,
  config: GatewayConfig,
  env: Record<string, string | undefined>,
  deps: GatewayDependencies
): Promise<ChannelDispatchResult> {
  if (!config.whatsappEnabled) {
    return { status: 'disabled', provider: 'none', detail: 'WhatsApp notifications disabled in gateway settings.' };
  }

  const fetchFn = deps.fetchImpl || globalThis.fetch;

  if (env.WHATSAPP_PHONE_NUMBER_ID && env.WHATSAPP_ACCESS_TOKEN && fetchFn) {
    try {
      const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(env.WHATSAPP_PHONE_NUMBER_ID)}/messages`;
      const res = await fetchFn(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formatted.waDigits,
          type: 'text',
          text: { preview_url: false, body: formatted.summaryText }
        }),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        return { status: 'sent', provider: 'whatsapp_cloud', detail: `Delivered via Meta WhatsApp Cloud API to +${formatted.waDigits}` };
      }
      const errText = await res.text().catch(() => res.statusText);
      return { status: 'failed', provider: 'whatsapp_cloud', detail: `WhatsApp Cloud ${res.status}: ${errText.slice(0, 120)}` };
    } catch (err: any) {
      return { status: 'failed', provider: 'whatsapp_cloud', detail: `WhatsApp Cloud error: ${err?.message || 'error'}` };
    }
  }

  if (env.CALLMEBOT_API_KEY && fetchFn) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent('+' + formatted.waDigits)}&text=${encodeURIComponent(formatted.summaryText)}&apikey=${encodeURIComponent(env.CALLMEBOT_API_KEY)}`;
      const res = await fetchFn(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        return { status: 'sent', provider: 'callmebot', detail: `Delivered to +${formatted.waDigits} via CallMeBot WhatsApp` };
      }
      return { status: 'failed', provider: 'callmebot', detail: `CallMeBot HTTP ${res.status}` };
    } catch (err: any) {
      return { status: 'failed', provider: 'callmebot', detail: `CallMeBot error: ${err?.message || 'error'}` };
    }
  }

  if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_WHATSAPP_FROM && fetchFn) {
    try {
      const auth = Buffer.from(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const params = new URLSearchParams({
        From: env.TWILIO_WHATSAPP_FROM.startsWith('whatsapp:') ? env.TWILIO_WHATSAPP_FROM : `whatsapp:${env.TWILIO_WHATSAPP_FROM}`,
        To: `whatsapp:+${formatted.waDigits}`,
        Body: formatted.summaryText
      });
      const res = await fetchFn(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(env.TWILIO_ACCOUNT_SID)}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString(),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        return { status: 'sent', provider: 'twilio_whatsapp', detail: `Delivered to +${formatted.waDigits} via Twilio WhatsApp` };
      }
      return { status: 'failed', provider: 'twilio_whatsapp', detail: `Twilio HTTP ${res.status}` };
    } catch (err: any) {
      return { status: 'failed', provider: 'twilio_whatsapp', detail: `Twilio error: ${err?.message || 'error'}` };
    }
  }

  const webhookUrl = env.WHATSAPP_WEBHOOK_URL || env.GATEWAY_WEBHOOK_URL;
  if (webhookUrl && fetchFn) {
    try {
      const res = await fetchFn(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'client_request',
          channel: 'whatsapp',
          targetWhatsapp: '+' + formatted.waDigits,
          message: formatted.summaryText,
          inquiry
        }),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        return { status: 'sent', provider: 'webhook', detail: `Dispatched to WhatsApp webhook (+${formatted.waDigits})` };
      }
      return { status: 'failed', provider: 'webhook', detail: `WhatsApp webhook HTTP ${res.status}` };
    } catch (err: any) {
      return { status: 'failed', provider: 'webhook', detail: `Webhook error: ${err?.message || 'error'}` };
    }
  }

  return {
    status: 'queued_relay',
    provider: 'whatsapp_relay',
    detail: `Direct WhatsApp relay link prepared for +${formatted.waDigits}`
  };
}

export async function dispatchGatewayAlert(
  inquiry: ClientRequestPayload,
  rawConfig: Partial<GatewayConfig> | undefined,
  env: Record<string, string | undefined> = {},
  deps: GatewayDependencies = {}
): Promise<GatewayDispatchReport> {
  const config = sanitizeGatewayConfig(rawConfig, env);
  const formatted = formatInquiryNotification(inquiry, config);

  const [emailRes, waRes] = await Promise.all([
    dispatchEmailChannel(inquiry, formatted, config, env, deps),
    dispatchWhatsappChannel(inquiry, formatted, config, env, deps)
  ]);

  return {
    inquiryId: inquiry.id,
    dispatchedAt: new Date().toISOString(),
    emailTarget: formatted.targetEmail,
    whatsappTarget: formatted.formattedWaDisplay,
    email: emailRes,
    whatsapp: waRes,
    whatsappRelayUrl: formatted.whatsappRelayUrl,
    mailtoRelayUrl: formatted.mailtoRelayUrl,
    summaryText: formatted.summaryText
  };
}
