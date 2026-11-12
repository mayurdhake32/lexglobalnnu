import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Star, BookOpen, Clock, Award, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewCourseId, setQuickViewCourseId, courses, enrollCourse, isEnrolled, navigateTo } = useApp();

  if (!quickViewCourseId) return null;

  const course = courses.find((c) => c.id === quickViewCourseId);
  if (!course) return null;

  const enrolled = isEnrolled(course.id);
  const totalLessons = course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  const handleEnroll = () => {
    enrollCourse(course.id);
    setQuickViewCourseId(null);
    navigateTo('learn');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={() => setQuickViewCourseId(null)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B08D57]/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden bg-[#0A1D37]">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-[#0A1D37]/40 to-transparent" />
          <button
            onClick={() => setQuickViewCourseId(null)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#B08D57] text-white mb-2">
              {course.category} • {course.level}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5E6A7A] pb-4 border-b border-[#0A1D37]/10">
            <div className="flex items-center gap-1 text-[#0A1D37] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#B08D57] text-[#B08D57]" />
              <span>{course.rating} ({course.students} learners)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{totalLessons} lessons & knowledge checks</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Accredited Certificate</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0A1D37] mb-2">
              Course Synopsis
            </h4>
            <p className="text-sm text-[#39465A] leading-relaxed">
              {course.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0A1D37] mb-2.5">
              Key Competencies Mastered
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#39465A]">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B08D57] flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Snapshot */}
          <div className="p-3.5 rounded-xl bg-white border border-[#0A1D37]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {course.instructorAvatar ? (
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full object-cover border border-[#B08D57]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0A1D37] text-white flex items-center justify-center font-serif font-bold">
                  {course.instructor[0]}
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-[#0A1D37]">{course.instructor}</div>
                <div className="text-[11px] text-[#5E6A7A]">{course.instructorTitle}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-serif text-lg font-bold text-[#0A1D37]">
                {course.price === 0 ? 'Free Open Access' : `₹${course.price.toLocaleString('en-IN')}`}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                navigateTo('course-detail', course.slug);
                setQuickViewCourseId(null);
              }}
              className="text-xs font-semibold text-[#0A1D37] hover:text-[#B08D57] flex items-center gap-1.5"
            >
              <span>View Full Syllabus & FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setQuickViewCourseId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5 flex-1 sm:flex-none"
              >
                Close
              </button>
              {enrolled ? (
                <button
                  onClick={() => {
                    setQuickViewCourseId(null);
                    navigateTo('learn');
                  }}
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647] flex-1 sm:flex-none"
                >
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-[#B08D57] text-white hover:bg-[#9A7A47] shadow-md flex-1 sm:flex-none"
                >
                  {course.price === 0 ? 'Enroll for Free' : `Enroll Now (₹${course.price})`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
