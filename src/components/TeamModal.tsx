import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Globe, Scale, BookOpen, GraduationCap, Mail, ArrowRight } from 'lucide-react';

export const TeamModal: React.FC = () => {
  const { teamModalId, setTeamModalId, team, courses, posts, navigateTo, setConsultationOpen } = useApp();

  if (!teamModalId) return null;

  const member = team.find((t) => t.id === teamModalId);
  if (!member) return null;

  const taughtCourses = courses.filter((c) => member.courses.includes(c.id));
  const authoredPosts = posts.filter((p) => p.author === member.name);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={() => setTeamModalId(null)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B08D57]/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#0A1D37]/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#B08D57] shadow-sm flex-shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B08D57]">
                {member.role}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1D37]">
                {member.name}
              </h3>
              <p className="text-xs text-[#5E6A7A] mt-0.5">
                {member.specialty} • {member.experience} in practice
              </p>
            </div>
          </div>
          <button
            onClick={() => setTeamModalId(null)}
            className="p-1.5 rounded-full hover:bg-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] mb-2">
              Practitioner Biography
            </h4>
            <p className="text-sm text-[#39465A] leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Bar Admissions & Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-[#0A1D37]/10">
            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#5E6A7A] flex items-center gap-1.5 mb-2">
                <Scale className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Bar & Court Admissions</span>
              </h5>
              <ul className="space-y-1 text-xs text-[#0A1D37]">
                {member.admissions.map((adm, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                    <span>{adm}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#5E6A7A] flex items-center gap-1.5 mb-2">
                <Globe className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Working Languages</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {member.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-full bg-[#F7F3EB] border border-[#0A1D37]/10 text-[#0A1D37] font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Taught */}
          {taughtCourses.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] flex items-center gap-1.5 mb-3">
                <GraduationCap className="w-4 h-4 text-[#B08D57]" />
                <span>Executive Courses Led by {member.name.split(' ')[0]}</span>
              </h4>
              <div className="space-y-2">
                {taughtCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setTeamModalId(null);
                      navigateTo('course-detail', c.slug);
                    }}
                    className="p-3 rounded-xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 cursor-pointer flex items-center justify-between gap-3 group transition-all"
                  >
                    <div>
                      <h5 className="font-serif font-bold text-sm text-[#0A1D37] group-hover:text-[#B08D57] transition-colors">
                        {c.title}
                      </h5>
                      <p className="text-xs text-[#5E6A7A]">{c.duration} • {c.level}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5E6A7A] group-hover:text-[#B08D57] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Authored Articles */}
          {authoredPosts.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] flex items-center gap-1.5 mb-3">
                <BookOpen className="w-4 h-4 text-[#B08D57]" />
                <span>Recent Legal Analysis & Commentary</span>
              </h4>
              <div className="space-y-2">
                {authoredPosts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setTeamModalId(null);
                      navigateTo('blog-detail', p.slug);
                    }}
                    className="p-3 rounded-xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 cursor-pointer flex items-center justify-between gap-3 group transition-all"
                  >
                    <div>
                      <h5 className="font-serif font-bold text-sm text-[#0A1D37] group-hover:text-[#B08D57] transition-colors">
                        {p.title}
                      </h5>
                      <p className="text-xs text-[#5E6A7A]">{p.date} • {p.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5E6A7A] group-hover:text-[#B08D57] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#0A1D37]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#5E6A7A]">
              Formal engagement subject to institutional conflict clearance.
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setTeamModalId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5 flex-1 sm:flex-none"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setTeamModalId(null);
                  setConsultationOpen(true);
                }}
                className="px-5 py-2 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647] flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
              >
                <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Instruct Counsel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
