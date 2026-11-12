import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, Printer, ShieldCheck, CheckCircle } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { certificateCourseId, setCertificateCourseId, courses, enrollments } = useApp();

  if (!certificateCourseId) return null;

  const course = courses.find((c) => c.id === certificateCourseId);
  if (!course) return null;

  const enrollment = enrollments[course.id];
  const certId = enrollment?.certificateId || 'LGA-CERT-' + Math.floor(100000 + Math.random() * 900000);
  const issuedDate = enrollment?.certificateIssuedAt
    ? new Date(enrollment.certificateIssuedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={() => setCertificateCourseId(null)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto shadow-2xl border border-[#B08D57]/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 bg-white border-b border-[#0A1D37]/10 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1D37]">
            <Award className="w-4 h-4 text-[#B08D57]" />
            <span>Official Academic Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0A1D37] text-white hover:bg-[#0F2647] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setCertificateCourseId(null)}
              className="p-1.5 rounded-full hover:bg-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-6 sm:p-10 bg-[#FCFAF5]">
          <div className="relative p-8 sm:p-12 rounded-xl bg-white border-8 border-double border-[#B08D57]/50 shadow-xl text-center space-y-6">
            {/* Top Seal / Crest */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#B08D57] bg-[#FCFAF5] flex flex-col items-center justify-center shadow-inner relative">
                <span className="font-serif text-[#0A1D37] text-xl font-bold tracking-tight">LGA</span>
                <span className="text-[8px] uppercase tracking-widest text-[#B08D57] font-semibold">VERITAS</span>
                <div className="absolute -inset-1 rounded-full border border-[#B08D57]/30 pointer-events-none" />
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#B08D57]">
                Lex Global Advocacy Academy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1 tracking-tight">
                Certificate of Completion
              </h2>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#5E6A7A]">
              This certifies that the enrolled legal professional has successfully completed all coursework, case dossiers, and examinations for
            </p>

            <div className="py-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37] border-b-2 border-[#B08D57]/40 pb-3 max-w-xl mx-auto">
                {course.title}
              </h3>
              <p className="text-xs text-[#5E6A7A] mt-2 italic font-serif">
                Instructed by {course.instructor} • {course.instructorTitle}
              </p>
            </div>

            {/* Signature & Verification Seal Row */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 items-end gap-6 text-xs text-[#5E6A7A] border-t border-[#0A1D37]/10">
              <div className="text-center sm:text-left">
                <div className="font-serif italic text-sm text-[#0A1D37] font-semibold border-b border-[#0A1D37]/30 pb-1 mb-1">
                  Dr. Amara Okonkwo
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#5E6A7A]">
                  Academic Dean & Arbitrator
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-[#B08D57] flex items-center justify-center bg-[#F7F3EB]/50 text-[#B08D57]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#B08D57] mt-1">
                  VERIFIED CREDENTIAL
                </span>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-serif text-xs text-[#0A1D37] font-semibold border-b border-[#0A1D37]/30 pb-1 mb-1">
                  {issuedDate}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#5E6A7A]">
                  Date of Conferral
                </div>
              </div>
            </div>

            {/* Verification Barcode / ID */}
            <div className="pt-2 text-[10px] font-mono text-[#5E6A7A]/70 flex items-center justify-between border-t border-[#0A1D37]/5">
              <span>Credential ID: {certId}</span>
              <span>lexglobaladvocacy.org/verify/{certId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
