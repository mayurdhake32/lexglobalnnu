import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bookmark, PenSquare, Scale, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeRoute,
    navigateTo,
    bookmarks,
    enrollments,
    setCommandPaletteOpen,
    setBookmarksDrawerOpen,
    setBlogEditorPost,
    setConsultationOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const enrolledCount = Object.keys(enrollments).length;

  const navLinks = [
    { label: 'Home', path: 'home' as const },
    { label: 'Practice Areas', path: 'practice-areas' as const },
    { label: 'Courses', path: 'courses' as const },
    { label: 'Legal Hub', path: 'blogs' as const },
    { label: 'Team', path: 'team' as const },
    { label: 'My Learning', path: 'learn' as const, badge: enrolledCount > 0 ? enrolledCount : undefined },
    { label: 'Admin', path: 'admin' as const },
  ];

  const handleNavClick = (path: typeof navLinks[number]['path']) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EB]/90 backdrop-blur-md border-b border-[#0A1D37]/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-full border-2 border-[#B08D57] bg-[#FCFAF5] flex items-center justify-center font-serif text-[#0A1D37] text-lg font-bold tracking-tight shadow-sm transition-transform duration-300 group-hover:scale-105">
              LGA
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-[#0A1D37] leading-none tracking-tight">
                Lex Global Advocacy
              </span>
              <span className="block text-[10px] tracking-[0.24em] uppercase text-[#B08D57] font-semibold mt-1">
                International Counsel & Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive =
                activeRoute.path === link.path ||
                (link.path === 'courses' && activeRoute.path === 'course-detail') ||
                (link.path === 'blogs' && activeRoute.path === 'blog-detail');

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#B08D57] font-semibold'
                      : 'text-[#0A1D37]/80 hover:text-[#B08D57]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge !== undefined && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#B08D57] text-white font-bold leading-none">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#B08D57] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0A1D37]/15 bg-[#FCFAF5] text-xs font-medium text-[#5E6A7A] hover:text-[#0A1D37] hover:border-[#0A1D37]/35 transition-all"
              aria-label="Quick Search"
            >
              <Search className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#0A1D37]/10 rounded text-[#0A1D37]/70">
                ⌘K
              </kbd>
            </button>

            {/* Reading List Drawer Button */}
            <button
              onClick={() => setBookmarksDrawerOpen(true)}
              className="relative p-2 rounded-full text-[#0A1D37]/80 hover:text-[#B08D57] hover:bg-[#0A1D37]/5 transition-colors"
              title="Saved Articles"
              aria-label="View Saved Reading List"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B08D57] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Dynamic Blog Writer CTA */}
            <button
              onClick={() => setBlogEditorPost('new')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition-all shadow-sm"
              title="Create a new legal analysis or blog article"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Write Blog</span>
            </button>

            {/* Counsel Consultation */}
            <button
              onClick={() => setConsultationOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#0A1D37] text-[#F7F3EB] hover:bg-[#0F2647] hover:shadow-lg transition-all"
            >
              <Scale className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="hidden xs:inline">Consult</span> Counsel
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#0A1D37] hover:bg-[#0A1D37]/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFAF5] border-b border-[#0A1D37]/15 px-4 pt-3 pb-6 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-sm font-semibold ${
                  activeRoute.path === link.path
                    ? 'bg-[#B08D57]/15 text-[#0A1D37]'
                    : 'text-[#0A1D37]/80 hover:bg-[#0A1D37]/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#B08D57] text-white font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#0A1D37]/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCommandPaletteOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm rounded-lg border border-[#0A1D37]/20 text-[#0A1D37]"
            >
              <Search className="w-4 h-4 text-[#B08D57]" />
              <span>Search Directory & Blogs (⌘K)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBlogEditorPost('new');
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm rounded-lg border border-[#B08D57] text-[#B08D57] font-semibold"
            >
              <PenSquare className="w-4 h-4" />
              <span>Write & Publish New Article</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
