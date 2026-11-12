import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, BookOpen, GraduationCap, Users, FileText, ArrowRight, X, Scale } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    courses,
    posts,
    team,
    practiceAreas,
    navigateTo,
    setBlogEditorPost,
    setConsultationOpen
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingPosts = posts
    .filter((p) => p.published && (p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)))
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: `Article · ${p.category} · by ${p.author}`,
      icon: FileText,
      action: () => {
        navigateTo('blog-detail', p.slug);
        setCommandPaletteOpen(false);
      }
    }));

  const matchingCourses = courses
    .filter((c) => c.published && (c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)))
    .slice(0, 4)
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: `Course · ${c.category} · ${c.instructor}`,
      icon: GraduationCap,
      action: () => {
        navigateTo('course-detail', c.slug);
        setCommandPaletteOpen(false);
      }
    }));

  const matchingTeam = team
    .filter((t) => t.name.toLowerCase().includes(q) || t.specialty.toLowerCase().includes(q) || t.role.toLowerCase().includes(q))
    .slice(0, 3)
    .map((t) => ({
      id: t.id,
      title: t.name,
      subtitle: `Counsel · ${t.role} (${t.specialty})`,
      icon: Users,
      action: () => {
        navigateTo('team', t.id);
        setCommandPaletteOpen(false);
      }
    }));

  const matchingPracticeAreas = practiceAreas
    .filter((pa) => pa.title.toLowerCase().includes(q) || pa.shortDesc.toLowerCase().includes(q) || pa.relatedCategory.toLowerCase().includes(q))
    .slice(0, 3)
    .map((pa) => ({
      id: pa.id,
      title: pa.title,
      subtitle: `Practice Area · ${pa.relatedCategory} · Lead: ${pa.leadCounsel}`,
      icon: Scale,
      action: () => {
        navigateTo('practice-areas');
        setCommandPaletteOpen(false);
      }
    }));

  const systemActions = [
    {
      id: 'action-write',
      title: 'Write & Publish New Legal Article',
      subtitle: 'Open the Blog Editor to draft an analysis for the Legal Hub',
      icon: BookOpen,
      action: () => {
        setCommandPaletteOpen(false);
        setBlogEditorPost('new');
      }
    },
    {
      id: 'action-consult',
      title: 'Request Confidential Legal Consultation',
      subtitle: 'Submit an intake inquiry to the advocacy team',
      icon: ArrowRight,
      action: () => {
        setCommandPaletteOpen(false);
        setConsultationOpen(true);
      }
    }
  ].filter((a) => !q || a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q));

  const allItems = [...systemActions, ...matchingPracticeAreas, ...matchingPosts, ...matchingCourses, ...matchingTeam];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (allItems.length > 0 ? (prev + 1) % allItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (allItems.length > 0 ? (prev - 1 + allItems.length) % allItems.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-2xl border border-[#B08D57]/30 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#0A1D37]/10 bg-white">
          <Search className="w-5 h-5 text-[#B08D57]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search articles, legal guides, executive courses, counsel or actions..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#0A1D37] placeholder-[#5E6A7A] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#5E6A7A] hover:text-[#0A1D37]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#F7F3EB] border border-[#0A1D37]/15 rounded text-[#0A1D37]/70">
            ESC
          </kbd>
        </div>

        <div className="overflow-y-auto p-2 divide-y divide-[#0A1D37]/5">
          {allItems.length === 0 ? (
            <div className="py-12 text-center text-[#5E6A7A] text-sm">
              No results matching &ldquo;{query}&rdquo;. Try another topic like &ldquo;Arbitration&rdquo;, &ldquo;GDPR&rdquo;, or &ldquo;Contracts&rdquo;.
            </div>
          ) : (
            allItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#B08D57]/15 text-[#0A1D37]' : 'text-[#0A1D37]/80 hover:bg-[#0A1D37]/5'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#B08D57] text-white' : 'bg-[#0A1D37]/5 text-[#B08D57]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate text-[#0A1D37]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#5E6A7A] truncate">
                      {item.subtitle}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#B08D57] translate-x-0.5' : 'text-transparent'} transition-all`} />
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#F7F3EB] border-t border-[#0A1D37]/10 flex items-center justify-between text-[11px] text-[#5E6A7A]">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 bg-white border border-[#0A1D37]/10 rounded">↑↓</kbd> to navigate</span>
            <span><kbd className="px-1 bg-white border border-[#0A1D37]/10 rounded">↵</kbd> to select</span>
          </div>
          <span className="text-[#B08D57] font-medium">Lex Global Search</span>
        </div>
      </div>
    </div>
  );
};
