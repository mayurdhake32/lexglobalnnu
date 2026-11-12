import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, CheckCircle2, RotateCcw, Volume2, FileText, Download } from 'lucide-react';

export const LessonModal: React.FC = () => {
  const { lessonModalData, setLessonModalData, courses, enrollments, toggleLessonCompletion, showToast } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1.0x');

  if (!lessonModalData) return null;

  const course = courses.find((c) => c.id === lessonModalData.courseId);
  if (!course) return null;

  let currentLesson: any = null;
  let currentModuleTitle = '';

  for (const mod of course.curriculum) {
    const found = mod.lessons.find((l) => l.id === lessonModalData.lessonId);
    if (found) {
      currentLesson = found;
      currentModuleTitle = mod.title;
      break;
    }
  }

  if (!currentLesson) return null;

  const enrollment = enrollments[course.id];
  const isCompleted = enrollment?.completedLessons?.includes(currentLesson.id) || false;

  const handleToggleComplete = () => {
    toggleLessonCompletion(course.id, currentLesson.id);
    showToast(isCompleted ? 'Lesson marked uncompleted' : 'Lesson marked complete! LMS progress updated.', 'success');
  };

  const handleDownloadNotes = () => {
    const content = `LEX GLOBAL ADVOCACY ACADEMY\nCourse: ${course.title}\nModule: ${currentModuleTitle}\nLesson: ${currentLesson.title}\nInstructor: ${course.instructor}\n\nSUMMARY & STATUTORY CITATIONS:\n${currentLesson.contentSnippet || 'Standard lecture notes and procedural checklists.'}\n\n© Lex Global Advocacy. All Rights Reserved.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentLesson.id}-legal-brief.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded lesson lecture brief.', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={() => setLessonModalData(null)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#B08D57]/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#0A1D37]/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57]">
              {currentModuleTitle}
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#0A1D37]">
              {currentLesson.title}
            </h3>
          </div>
          <button
            onClick={() => setLessonModalData(null)}
            className="p-1.5 rounded-full hover:bg-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Simulation */}
        <div className="relative aspect-video bg-[#071528] flex flex-col justify-between p-4 text-white overflow-hidden group">
          {/* Background image preview */}
          <img
            src={course.image}
            alt="Lecture scene"
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />

          <div className="relative z-10 flex items-center justify-between text-xs text-white/80">
            <span className="bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
              Lex Global Academy High-Definition Lecture
            </span>
            <span className="bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
              Duration: {currentLesson.duration}
            </span>
          </div>

          {/* Center Play Button */}
          <div className="relative z-10 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#B08D57] hover:bg-[#D4B483] text-[#0A1D37] flex items-center justify-center shadow-xl transition-all hover:scale-110"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>
          </div>

          {/* Player Controls Bar */}
          <div className="relative z-10 bg-black/70 backdrop-blur-md p-2.5 rounded-xl flex items-center gap-3 text-xs">
            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#B08D57]">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
              <div className="w-1/3 h-full bg-[#B08D57] rounded-full" />
            </div>
            <span className="text-[11px] text-white/70">08:42 / {currentLesson.duration}</span>
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-white/70" />
              <button
                onClick={() => setSpeed(speed === '1.0x' ? '1.25x' : speed === '1.25x' ? '1.5x' : '1.0x')}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono"
              >
                {speed}
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Description & Resources */}
        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] mb-2">
              Legal Concept & Analytical Brief
            </h4>
            <p className="text-sm text-[#39465A] leading-relaxed bg-white p-4 rounded-xl border border-[#0A1D37]/10">
              {currentLesson.contentSnippet || 'In this lecture, counsel explores core jurisdictional principles, judicial set-aside standards under the New York Convention, and tactical drafting of dispute resolution clauses for transnational commercial counterparties.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0A1D37]/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#0A1D37]/5 text-[#B08D57]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0A1D37]">Accompanying Lecture Dossier</div>
                <div className="text-[11px] text-[#5E6A7A]">Sample pleadings, statutory footnotes & citations</div>
              </div>
            </div>
            <button
              onClick={handleDownloadNotes}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#0A1D37]/20 hover:border-[#B08D57] text-[#0A1D37] hover:text-[#B08D57] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Dossier</span>
            </button>
          </div>

          {/* Completion Toggle */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#5E6A7A]">
              Progress is automatically recorded to your verified LMS dashboard.
            </span>
            <button
              onClick={handleToggleComplete}
              className={`px-5 py-2 text-xs font-semibold rounded-full flex items-center gap-2 transition-all shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-[#B08D57] text-white hover:bg-[#9A7A47]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓ (Click to toggle)' : 'Mark Lesson as Completed'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
