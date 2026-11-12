import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  Lock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Users
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const {
    activeRoute,
    courses,
    posts,
    team,
    navigateTo,
    isEnrolled,
    enrollCourse,
    getProgress,
    setLessonModalData,
    setTeamModalId
  } = useApp();

  const slug = activeRoute.param;
  const course = courses.find((c) => c.slug === slug);

  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#0A1D37]">Course not found</h2>
        <button
          onClick={() => navigateTo('courses')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1D37] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Executive Catalog</span>
        </button>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const progress = getProgress(course.id);
  const totalLessons = course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  const instructorObj = team.find((t) => t.name === course.instructor);
  const relatedArticles = posts.filter(
    (p) => p.published && (p.relatedCourseId === course.id || p.category === course.category)
  ).slice(0, 3);

  const handleEnroll = () => {
    enrollCourse(course.id);
    navigateTo('learn');
  };

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? -1 : index);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#5E6A7A]">
        <button onClick={() => navigateTo('courses')} className="hover:text-[#0A1D37]">
          Executive Courses
        </button>
        <span>/</span>
        <span className="text-[#B08D57] font-semibold">{course.category}</span>
        <span>/</span>
        <span className="text-[#0A1D37] font-medium truncate max-w-xs">{course.title}</span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B08D57] text-white">
              {course.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A1D37] text-white">
              {course.level} Level
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D37] leading-[1.12] tracking-tight">
            {course.title}
          </h1>

          <p className="text-base sm:text-lg text-[#39465A] leading-relaxed">
            {course.longDescription}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#5E6A7A] pt-2">
            <div className="flex items-center gap-1.5 font-bold text-[#0A1D37]">
              <Star className="w-4 h-4 fill-[#B08D57] text-[#B08D57]" />
              <span>{course.rating}</span>
              <span className="font-normal text-[#5E6A7A]">({course.students} practitioners enrolled)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B08D57]" />
              <span>{course.duration}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#B08D57]" />
              <span>Verified Certificate</span>
            </div>
          </div>

          {/* Instructor pill */}
          <div className="pt-2 flex items-center gap-3">
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
              <div className="text-xs font-bold text-[#0A1D37]">
                Instructed by {course.instructor}
              </div>
              <div className="text-[11px] text-[#5E6A7A]">
                {course.instructorTitle}
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image in Hero */}
        <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[16/10] bg-[#0A1D37] shadow-xl border border-[#0A1D37]/10">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Grid: Details & Sticky Checkout Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Learning Outcomes & Syllabus */}
        <div className="lg:col-span-8 space-y-10">
          {/* Outcomes */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#0A1D37]">
              What You Will Master
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#39465A]">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#0A1D37]">
                  Curriculum & Module Breakdown
                </h3>
                <p className="text-xs text-[#5E6A7A] mt-0.5">
                  {course.curriculum.length} Modules • {totalLessons} Lessons • Interactive Knowledge Checks
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {course.curriculum.map((mod, mIdx) => {
                const isOpen = openModuleIndex === mIdx;
                return (
                  <div
                    key={mIdx}
                    className="rounded-xl border border-[#0A1D37]/10 bg-white overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleModule(mIdx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FCFAF5] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#B08D57]/15 text-[#B08D57] text-xs font-bold flex items-center justify-center">
                          {mIdx + 1}
                        </span>
                        <div>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#0A1D37]">
                            {mod.title}
                          </h4>
                          <span className="text-[11px] text-[#5E6A7A]">
                            {mod.lessons.length} lessons & lecture dossier
                          </span>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#B08D57]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#5E6A7A]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 divide-y divide-[#0A1D37]/5 bg-[#FCFAF5]/50">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="py-3 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              {lesson.type === 'video' ? (
                                <Play className="w-3.5 h-3.5 text-[#B08D57]" />
                              ) : (
                                <FileText className="w-3.5 h-3.5 text-[#B08D57]" />
                              )}
                              <span className="font-medium text-[#0A1D37]">
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <span className="text-[#5E6A7A] text-[11px]">{lesson.duration}</span>
                              {lesson.preview ? (
                                <button
                                  onClick={() => setLessonModalData({ courseId: course.id, lessonId: lesson.id })}
                                  className="px-2.5 py-1 rounded-full bg-[#B08D57]/15 hover:bg-[#B08D57] text-[#B08D57] hover:text-white font-semibold text-[10px] transition-colors"
                                >
                                  Free Preview
                                </button>
                              ) : enrolled ? (
                                <button
                                  onClick={() => setLessonModalData({ courseId: course.id, lessonId: lesson.id })}
                                  className="px-2.5 py-1 rounded-full bg-[#0A1D37] text-white font-semibold text-[10px]"
                                >
                                  Play
                                </button>
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-[#5E6A7A]/50" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Audience & Prerequisites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0A1D37]">
                Who Should Attend
              </h4>
              <p className="text-xs text-[#39465A] leading-relaxed">
                {course.audience}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0A1D37]">
                Prerequisites & Preparation
              </h4>
              <p className="text-xs text-[#39465A] leading-relaxed">
                {course.prerequisites}
              </p>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[#0A1D37] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#B08D57]" />
              <span>Course Questions & Accreditation FAQs</span>
            </h3>

            <div className="space-y-2.5">
              {course.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-xl border border-[#0A1D37]/10 bg-white overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      className="w-full px-5 py-3.5 flex items-center justify-between text-left font-serif font-semibold text-sm text-[#0A1D37] hover:text-[#B08D57] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#B08D57]" /> : <ChevronDown className="w-4 h-4 text-[#5E6A7A]" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-[#39465A] leading-relaxed border-t border-[#0A1D37]/5 pt-2">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Enrollment Box */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#B08D57]/40 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6A7A] block mb-1">
                Programme Tuition
              </span>
              <div className="font-serif text-3xl font-bold text-[#0A1D37]">
                {course.price === 0 ? 'Free Open Access' : `₹${course.price.toLocaleString('en-IN')}`}
              </div>
              <span className="text-xs text-[#5E6A7A] block mt-0.5">
                {course.price === 0 ? 'Pro-bono academic initiative' : 'Includes verifiable digital credentials'}
              </span>
            </div>

            {/* Progress if enrolled */}
            {enrolled && (
              <div className="p-3.5 rounded-xl bg-[#FCFAF5] border border-[#0A1D37]/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#0A1D37]">
                  <span>Enrolled Progress</span>
                  <span className="text-[#B08D57]">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0A1D37]/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B08D57] to-[#D4B483] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Main Action Button */}
            {enrolled ? (
              <button
                onClick={() => navigateTo('learn')}
                className="w-full py-3.5 rounded-full bg-[#0A1D37] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F2647] flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Continue Learning in LMS</span>
                <ArrowRight className="w-4 h-4 text-[#B08D57]" />
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full py-3.5 rounded-full bg-[#B08D57] hover:bg-[#9A7A47] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <span>{course.price === 0 ? 'Enroll Instantly for Free' : `Enroll Now (₹${course.price})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Feature Checklist */}
            <div className="space-y-2.5 text-xs text-[#39465A] pt-2 border-t border-[#0A1D37]/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                <span>{totalLessons} lessons with video & written briefs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                <span>Verifiable digital Certificate of Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                <span>Direct access to knowledge check & quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                <span>Lifetime curriculum updates & clause bank</span>
              </div>
            </div>
          </div>

          {/* Instructor Card */}
          {instructorObj && (
            <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57] block">
                Instructor Profile
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={instructorObj.image}
                  alt={instructorObj.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#B08D57]"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0A1D37]">
                    {instructorObj.name}
                  </h4>
                  <p className="text-[11px] text-[#5E6A7A]">{instructorObj.role}</p>
                </div>
              </div>
              <p className="text-xs text-[#5E6A7A] line-clamp-3 leading-relaxed">
                {instructorObj.bio}
              </p>
              <button
                onClick={() => setTeamModalId(instructorObj.id)}
                className="text-xs font-semibold text-[#B08D57] hover:underline"
              >
                View Complete Bar Credentials →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Linked Legal Commentary from Hub */}
      {relatedArticles.length > 0 && (
        <div className="pt-10 border-t border-[#0A1D37]/10 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              Preparatory Reading from Legal Hub
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0A1D37] mt-1">
              Articles & Guides Related to this Curriculum
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigateTo('blog-detail', art.slug)}
                className="p-4 rounded-xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm cursor-pointer group transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57]">
                  {art.category}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#0A1D37] group-hover:text-[#B08D57] transition-colors line-clamp-2 mt-1 leading-snug">
                  {art.title}
                </h4>
                <div className="text-[11px] text-[#5E6A7A] mt-2 flex items-center justify-between">
                  <span>{art.readTime}</span>
                  <span className="text-[#0A1D37] font-semibold flex items-center gap-1">
                    Read Guide →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
