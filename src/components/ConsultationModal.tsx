import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Scale, Shield, Send, CheckCircle2 } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { consultationOpen, setConsultationOpen, submitInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [practiceArea, setPracticeArea] = useState('International Commercial & Treaty Arbitration');
  const [jurisdiction, setJurisdiction] = useState('');
  const [urgency, setUrgency] = useState<'Routine' | 'Urgent' | 'Immediate'>('Routine');
  const [description, setDescription] = useState('');
  const [conflictCleared, setConflictCleared] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!consultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description || !conflictCleared) return;

    submitInquiry({
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim(),
      practiceArea,
      jurisdiction: jurisdiction.trim() || 'Multi-Jurisdictional',
      urgency,
      description: description.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setConsultationOpen(false);
      setName('');
      setEmail('');
      setOrganization('');
      setDescription('');
      setConflictCleared(false);
    }, 2400);
  };

  const practiceAreas = [
    'International Commercial & Treaty Arbitration',
    'Cross-Border Technology & Commercial Contracts',
    'Global Data Privacy, GDPR & AI Compliance',
    'Cross-Border E-Commerce & Consumer Redress',
    'International Real Property & Title Due Diligence',
    'Appellate Advocacy & Special Advisory'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={() => setConsultationOpen(false)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#B08D57]/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#0A1D37]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#B08D57]/15 text-[#B08D57]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0A1D37]">
                Instruct Counsel / Intake Inquiry
              </h3>
              <p className="text-xs text-[#5E6A7A]">
                Confidential institutional consultation with Lex Global Advocacy
              </p>
            </div>
          </div>
          <button
            onClick={() => setConsultationOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-3 bg-white">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#0A1D37]">Inquiry Lodged</h4>
            <p className="text-sm text-[#39465A] max-w-sm mx-auto">
              Your inquiry has been encrypted and submitted to our intake registrar. A conflicts check will be initiated promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900 leading-snug">
              <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Confidentiality Notice:</strong> Transmission of this form initiates a standard conflict-of-interest screening. Do not include unredacted trade secrets until formal retainer execution.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Full Name / Instructing Party *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Adv. Genevieve Laurent"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsel@chambers.org"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Organization / Entity
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g., Sovereign Fund / Enterprise"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Relevant Jurisdictions
                </label>
                <input
                  type="text"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  placeholder="e.g., England / Singapore / India"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Practice Area *
                </label>
                <select
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                >
                  {practiceAreas.map((pa) => (
                    <option key={pa} value={pa}>{pa}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                >
                  <option value="Routine">Routine (3-5 days)</option>
                  <option value="Urgent">Urgent (24-48 hrs)</option>
                  <option value="Immediate">Immediate Injunction</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                Synopsis of Matter or Advisory Request *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly state procedural posture, counterparty identity for conflict check, and core relief sought..."
                className="w-full p-3 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] leading-relaxed focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-[#39465A] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={conflictCleared}
                  onChange={(e) => setConflictCleared(e.target.checked)}
                  className="w-4 h-4 rounded text-[#B08D57] focus:ring-[#B08D57] border-[#0A1D37]/30 mt-0.5"
                />
                <span>
                  I confirm this inquiry is submitted on behalf of a legitimate party and agree to institutional conflicts clearance.
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-[#0A1D37]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConsultationOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647] shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Submit Confidential Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
