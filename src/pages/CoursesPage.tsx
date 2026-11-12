import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, GraduationCap, Star, Clock, BookOpen, Award, ArrowRight, RotateCcw } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, activeRoute, navigateTo, setQuickViewCourseId, isEnrolled, enrollCourse } = useApp();

  const initialCategory = activeRoute.query?.category || '';
  const initialLevel = activeRoute.query?.level || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating' | 'priceLow'>('newest');

  const categories = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.category)));
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => c.published)
      .filter((c) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q);

        const matchesCat = !selectedCategory || c.category === selectedCategory;
        const matchesLevel = !selectedLevel || c.level === selectedLevel;
        const matchesPrice =
          selectedPrice === 'all' ||
          (selectedPrice === 'free' ? c.price === 0 : c.price > 0);

        return matchesSearch && matchesCat && matchesLevel && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.students - a.students;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceLow') return a.price - b.price;
        return 0;
      });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedPrice('all');
    setSortBy('newest');
  };

  const hasActiveFilters = Boolean(searchQuery || selectedCategory || selectedLevel || selectedPrice !== 'all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="pb-6 border-b border-[#0A1D37]/10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Executive Legal Academy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D37] mt-2 tracking-tight">
          Executive Masterclasses & Practical Curricula
        </h1>
        <p className="text-sm sm:text-base text-[#39465A] mt-2 max-w-2xl leading-relaxed">
          Study with international arbitrators and appellate practitioners. Every programme includes practical case dossiers, verifiable knowledge checks, and accredited certificates.
        </p>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF5] border border-[#0A1D37]/10 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#B08D57] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, syllabus or instructor..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs sm:text-sm text-[#0A1D37] placeholder-[#5E6A7A] focus:outline-none focus:border-[#B08D57]"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
            >
              <option value="">All Practice Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
            >
              <option value="all">Any Tuition</option>
              <option value="free">Free Open Access</option>
              <option value="paid">Executive Masterclass</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#5E6A7A]">
        <div>
          Showing <strong className="text-[#0A1D37]">{filteredCourses.length}</strong> of{' '}
          {courses.filter((c) => c.published).length} executive courses
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[#B08D57] hover:underline font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-[#0A1D37]/20 bg-white p-8">
          <GraduationCap className="w-12 h-12 text-[#5E6A7A]/40 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#0A1D37]">No courses found</h3>
          <p className="text-xs text-[#5E6A7A] mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-5 px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const enrolled = isEnrolled(c.id);
            return (
              <div
                key={c.id}
                className="rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A1D37]">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCFAF5]/95 text-[#0A1D37] backdrop-blur-sm shadow-sm">
                      {c.level}
                    </span>
                  </div>
                  <button
                    onClick={() => setQuickViewCourseId(c.id)}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 hover:bg-[#B08D57] text-white text-[11px] font-medium backdrop-blur-sm transition-colors"
                  >
                    Quick View
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#5E6A7A] mb-2">
                      <span className="text-[#B08D57] font-semibold uppercase tracking-wider">
                        {c.category}
                      </span>
                      <span>{c.duration}</span>
                    </div>

                    <h3
                      onClick={() => navigateTo('course-detail', c.slug)}
                      className="font-serif font-bold text-lg text-[#0A1D37] hover:text-[#B08D57] cursor-pointer transition-colors leading-snug line-clamp-2"
                    >
                      {c.title}
                    </h3>

                    <p className="text-xs text-[#5E6A7A] line-clamp-3 mt-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-[#0A1D37]/5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5E6A7A] truncate max-w-[160px]">{c.instructor}</span>
                      <div className="flex items-center gap-1 font-semibold text-[#0A1D37]">
                        <Star className="w-3.5 h-3.5 fill-[#B08D57] text-[#B08D57]" />
                        <span>{c.rating}</span>
                        <span className="text-[#5E6A7A] font-normal">({c.students})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif text-base font-bold text-[#0A1D37]">
                        {c.price === 0 ? 'Free Open Access' : `₹${c.price.toLocaleString('en-IN')}`}
                      </span>

                      <div className="flex items-center gap-2">
                        {enrolled ? (
                          <button
                            onClick={() => navigateTo('learn')}
                            className="px-3.5 py-1.5 rounded-full bg-[#0A1D37] text-white text-xs font-semibold hover:bg-[#0F2647]"
                          >
                            Resume
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              enrollCourse(c.id);
                              navigateTo('learn');
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#B08D57] text-white text-xs font-semibold hover:bg-[#9A7A47] shadow-sm"
                          >
                            {c.price === 0 ? 'Enroll Free' : 'Enroll Now'}
                          </button>
                        )}
                        <button
                          onClick={() => navigateTo('course-detail', c.slug)}
                          className="p-1.5 rounded-full border border-[#0A1D37]/15 hover:border-[#0A1D37] text-[#0A1D37]"
                          title="View Syllabus"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
