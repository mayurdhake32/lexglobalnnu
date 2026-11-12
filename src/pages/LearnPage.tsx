import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  CheckCircle2,
  Play,
  FileText,
  Award,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const {
    courses,
    enrollments,
    navigateTo,
    toggleLessonCompletion,
    submitQuiz,
    setLessonModalData,
    setCertificateCourseId,
    issueCertificate
  } = useApp();

  const enrolledCourseIds = Object.keys(enrollments);
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  const [activeCourseId, setActiveCourseId] = useState<string>(
    enrolledCourses[0]?.id || ''
  );

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#B08D57]/15 text-[#B08D57] flex items-center justify-center mx-auto">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#0A1D37]">
          Your Learning Workspace is Empty
        </h2>
        <p className="text-sm text-[#5E6A7A] max-w-md mx-auto leading-relaxed">
          Enroll in one of our foundational open-access masterclasses or specialized executive courses to begin tracking your lessons and earning verifiable certificates.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('courses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A1D37] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F2647] shadow-lg transition-all"
          >
            <span>Explore Course Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#B08D57]" />
          </button>
        </div>
      </div>
    );
  }

  // Active course data
  const currentCourse = enrolledCourses.find((c) => c.id === activeCourseId) || enrolledCourses[0];
  const currentEnrollment = enrollments[currentCourse.id];
  const completedLessons = currentEnrollment?.completedLessons || [];
  const totalLessons = currentCourse.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = totalLessons === 0 ? 0 : Math.min(100, Math.round((completedLessons.length / totalLessons) * 100));
  const isAllLessonsDone = completedLessons.length >= totalLessons && totalLessons > 0;
  const isQuizPassed = currentEnrollment?.quizPassed || false;
  const isEligibleForCertificate = isAllLessonsDone && isQuizPassed;

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuizAnswer === null) return;
    const result = submitQuiz(currentCourse.id, selectedQuizAnswer);
    setQuizFeedback(result);
    if (result.isCorrect && isAllLessonsDone) {
      issueCertificate(currentCourse.id);
    }
  };

  const handleOpenCertificate = () => {
    if (!currentEnrollment?.certificateId) {
      issueCertificate(currentCourse.id);
    }
    setCertificateCourseId(currentCourse.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-[#0A1D37]/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Learning Management System</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1.5 tracking-tight">
            My Enrolled Executive Programmes
          </h1>
          <p className="text-xs sm:text-sm text-[#5E6A7A] mt-1">
            Complete all lessons and pass the final knowledge check to earn your accredited certificate.
          </p>
        </div>

        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5 transition-colors"
        >
          + Enroll in Additional Course
        </button>
      </div>

      {/* Main LMS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar: Course Switcher & Overall Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6A7A] block">
              Active Enrolments ({enrolledCourses.length})
            </span>
            <div className="space-y-2">
              {enrolledCourses.map((c) => {
                const cEnr = enrollments[c.id];
                const cDone = cEnr?.completedLessons?.length || 0;
                const cTotal = c.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
                const cPct = cTotal === 0 ? 0 : Math.round((cDone / cTotal) * 100);
                const isActive = c.id === currentCourse.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCourseId(c.id);
                      setSelectedQuizAnswer(null);
                      setQuizFeedback(null);
                    }}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-start gap-3 ${
                      isActive
                        ? 'border-[#B08D57] bg-[#FCFAF5] shadow-sm'
                        : 'border-[#0A1D37]/10 bg-white hover:border-[#0A1D37]/30'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#0A1D37] truncate">
                        {c.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-[#5E6A7A] mt-1">
                        <span>{cPct}% completed</span>
                        <span>{cDone}/{cTotal} lessons</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0A1D37]/10 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#B08D57] rounded-full"
                          style={{ width: `${cPct}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate Status Widget */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A1D37] to-[#0F2647] text-white shadow-xl space-y-4 border border-[#B08D57]/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4B483]">
              <Award className="w-4 h-4 text-[#B08D57]" />
              <span>Certificate Readiness</span>
            </div>

            <div className="space-y-2 text-xs text-[#F7F3EB]/80">
              <div className="flex items-center justify-between">
                <span>1. All Lessons Completed:</span>
                <span className={isAllLessonsDone ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                  {completedLessons.length}/{totalLessons} {isAllLessonsDone ? '✓' : ''}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>2. Final Knowledge Check:</span>
                <span className={isQuizPassed ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                  {isQuizPassed ? 'Passed ✓' : 'Pending'}
                </span>
              </div>
            </div>

            {isEligibleForCertificate ? (
              <div className="pt-2">
                <button
                  onClick={handleOpenCertificate}
                  className="w-full py-3 rounded-full bg-[#B08D57] hover:bg-[#D4B483] text-[#0A1D37] text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-[#F7F3EB]/60 italic leading-relaxed pt-1">
                Complete the remaining lessons below and score 100% on the Knowledge Check to unlock your verified credential.
              </p>
            )}
          </div>
        </div>

        {/* Main Content Area: Lessons & Interactive Quiz */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Course Card Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57]">
                {currentCourse.category} • {currentCourse.level}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#0A1D37] mt-0.5">
                {currentCourse.title}
              </h2>
              <p className="text-xs text-[#5E6A7A] mt-1">
                Instructor: {currentCourse.instructor} • {currentCourse.duration}
              </p>
            </div>
            <div className="text-right sm:flex-shrink-0">
              <span className="text-xs font-bold text-[#0A1D37] block">
                {progressPercent}% Complete
              </span>
              <span className="text-[11px] text-[#5E6A7A]">
                {completedLessons.length} of {totalLessons} completed
              </span>
            </div>
          </div>

          {/* Module & Lessons Checklist */}
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-xl text-[#0A1D37]">
              Interactive Syllabus & Lecture Vault
            </h3>

            <div className="space-y-4">
              {currentCourse.curriculum.map((mod, mIdx) => (
                <div key={mIdx} className="rounded-2xl bg-white border border-[#0A1D37]/10 p-5 shadow-sm space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#0A1D37] pb-2 border-b border-[#0A1D37]/5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B08D57]/15 text-[#B08D57] text-xs flex items-center justify-center">
                      {mIdx + 1}
                    </span>
                    <span>{mod.title}</span>
                  </h4>

                  <div className="space-y-2">
                    {mod.lessons.map((lesson) => {
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            isDone ? 'bg-[#FCFAF5] border-emerald-500/30' : 'bg-white border-[#0A1D37]/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleLessonCompletion(currentCourse.id, lesson.id)}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isDone
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-[#0A1D37]/30 hover:border-[#B08D57]'
                              }`}
                              title={isDone ? 'Mark incomplete' : 'Mark completed'}
                            >
                              {isDone && <Check className="w-3.5 h-3.5" />}
                            </button>

                            <div>
                              <div className={`text-xs font-semibold ${isDone ? 'text-[#0A1D37]/70 line-through' : 'text-[#0A1D37]'}`}>
                                {lesson.title}
                              </div>
                              <span className="text-[10px] text-[#5E6A7A]">
                                {lesson.duration} • {lesson.type.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setLessonModalData({ courseId: currentCourse.id, lessonId: lesson.id })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0A1D37]/5 hover:bg-[#0A1D37] text-[#0A1D37] hover:text-white transition-colors"
                          >
                            <Play className="w-3 h-3 text-[#B08D57]" />
                            <span>Launch</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Knowledge Check / Quiz */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57]">
                  Final Module Assessment
                </span>
                <h3 className="font-serif font-bold text-xl text-[#0A1D37] mt-0.5">
                  Knowledge Check & Examination
                </h3>
              </div>
              {isQuizPassed && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Passed</span>
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-[#0A1D37] pt-2">
              {currentCourse.quiz.question}
            </p>

            <form onSubmit={handleQuizSubmit} className="space-y-3">
              {currentCourse.quiz.options.map((option, oIdx) => (
                <label
                  key={oIdx}
                  className={`block p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedQuizAnswer === oIdx
                      ? 'border-[#B08D57] bg-[#B08D57]/10 text-[#0A1D37] font-semibold'
                      : 'border-[#0A1D37]/10 bg-white text-[#39465A] hover:bg-[#FCFAF5]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="quiz"
                      checked={selectedQuizAnswer === oIdx}
                      onChange={() => setSelectedQuizAnswer(oIdx)}
                      className="mt-0.5 text-[#B08D57] focus:ring-[#B08D57]"
                    />
                    <span className="leading-relaxed">{option}</span>
                  </div>
                </label>
              ))}

              {quizFeedback && (
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed flex items-start gap-2.5 ${
                    quizFeedback.isCorrect
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border border-rose-200 text-rose-900'
                  }`}
                >
                  {quizFeedback.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong>{quizFeedback.isCorrect ? 'Correct Answer!' : 'Incorrect Analysis.'}</strong>{' '}
                    {quizFeedback.explanation}
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-between">
                <span className="text-[11px] text-[#5E6A7A]">
                  Select the correct jurisprudential holding to validate competency.
                </span>
                <button
                  type="submit"
                  disabled={selectedQuizAnswer === null}
                  className="px-5 py-2.5 rounded-full bg-[#0A1D37] text-white text-xs font-semibold hover:bg-[#0F2647] disabled:opacity-50 shadow-md transition-all"
                >
                  Submit Answer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
