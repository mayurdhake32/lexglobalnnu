import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, PenSquare, Bookmark, Heart, Eye, ArrowRight, BookOpen, Clock, Tag, LayoutGrid, List, Sparkles, RotateCcw } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const {
    posts,
    activeRoute,
    navigateTo,
    setBlogEditorPost,
    toggleBookmark,
    isBookmarked,
    likePost
  } = useApp();

  // Filters
  const initialCategory = activeRoute.query?.category || '';
  const initialTag = activeRoute.query?.tag || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [readTimeFilter, setReadTimeFilter] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'likes'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categories list with counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.filter((p) => p.published).forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // All distinct tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.filter((p) => p.published).forEach((p) => {
      (p.tags || []).forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Filtered & sorted posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((p) => p.published)
      .filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q));

        const matchesCat = !selectedCategory || p.category === selectedCategory;
        const matchesTag = !selectedTag || (p.tags || []).includes(selectedTag);

        let matchesTime = true;
        if (readTimeFilter) {
          const num = parseInt(p.readTime) || 5;
          if (readTimeFilter === 'quick') matchesTime = num <= 6;
          else if (readTimeFilter === 'medium') matchesTime = num > 6 && num <= 9;
          else if (readTimeFilter === 'deep') matchesTime = num > 9;
        }

        return matchesSearch && matchesCat && matchesTag && matchesTime;
      })
      .sort((a, b) => {
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'likes') return b.likes - a.likes;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [posts, searchQuery, selectedCategory, selectedTag, readTimeFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setReadTimeFilter('');
    setSortBy('newest');
  };

  const hasActiveFilters = Boolean(searchQuery || selectedCategory || selectedTag || readTimeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#0A1D37]/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lex Global Legal Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D37] mt-2 tracking-tight">
            International Jurisprudence & Legal Guides
          </h1>
          <p className="text-sm sm:text-base text-[#39465A] mt-2 max-w-2xl leading-relaxed">
            Analytical commentaries, treaty implementation reports, and statutory checklists authored by practicing international advocates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBlogEditorPost('new')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1D37] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F2647] shadow-md transition-all hover:scale-105"
          >
            <PenSquare className="w-4 h-4 text-[#B08D57]" />
            <span>Write & Publish Article</span>
          </button>
        </div>
      </div>

      {/* Search & Control Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF5] border border-[#0A1D37]/10 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
          {/* Main Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#B08D57] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by legal issue, statute, author or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs sm:text-sm text-[#0A1D37] placeholder-[#5E6A7A] focus:outline-none focus:border-[#B08D57]"
            />
          </div>

          {/* Tag Selector */}
          <div className="lg:col-span-3">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
            >
              <option value="">All Subject Tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Read Time Filter */}
          <div className="lg:col-span-2">
            <select
              value={readTimeFilter}
              onChange={(e) => setReadTimeFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
            >
              <option value="">Any Length</option>
              <option value="quick">Under 6 mins</option>
              <option value="medium">6 to 9 mins</option>
              <option value="deep">10+ mins deep dive</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="lg:col-span-2 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
            >
              <option value="newest">Newest First</option>
              <option value="views">Most Read</option>
              <option value="likes">Most Appreciated</option>
            </select>

            {/* Layout switch */}
            <div className="hidden sm:flex items-center p-1 bg-white border border-[#0A1D37]/15 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-[#0A1D37] text-white' : 'text-[#5E6A7A]'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-[#0A1D37] text-white' : 'text-[#5E6A7A]'}`}
                title="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#0A1D37]/5 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !selectedCategory
                ? 'bg-[#0A1D37] text-white shadow-sm'
                : 'bg-white border border-[#0A1D37]/15 text-[#0A1D37]/80 hover:border-[#B08D57]'
            }`}
          >
            All Categories ({posts.filter((p) => p.published).length})
          </button>
          {Object.entries(categoriesWithCounts).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-[#B08D57] text-white shadow-sm'
                  : 'bg-white border border-[#0A1D37]/15 text-[#0A1D37]/80 hover:border-[#B08D57]'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-[#0A1D37]/5 text-[#5E6A7A]'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicators & Count */}
      <div className="flex items-center justify-between text-xs text-[#5E6A7A]">
        <div>
          Showing <strong className="text-[#0A1D37]">{filteredPosts.length}</strong> of{' '}
          {posts.filter((p) => p.published).length} published legal analyses
          {hasActiveFilters && ' (filtered)'}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[#B08D57] hover:underline font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Posts Section */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-[#0A1D37]/20 bg-white p-8">
          <BookOpen className="w-12 h-12 text-[#5E6A7A]/40 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#0A1D37]">No matching articles found</h3>
          <p className="text-xs text-[#5E6A7A] mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or clear active category filters.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setBlogEditorPost('new')}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-[#B08D57] text-white hover:bg-[#9A7A47]"
            >
              Draft an Article on this Topic
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A1D37]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCFAF5]/95 text-[#0A1D37] backdrop-blur-sm shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                      isBookmarked(post.id)
                        ? 'bg-[#B08D57] text-white'
                        : 'bg-white/80 text-[#0A1D37] hover:bg-white'
                    }`}
                    title={isBookmarked(post.id) ? 'Saved' : 'Save article'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#5E6A7A] mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B08D57]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => navigateTo('blog-detail', post.slug)}
                    className="font-serif font-bold text-lg text-[#0A1D37] hover:text-[#B08D57] cursor-pointer transition-colors leading-snug line-clamp-2"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#5E6A7A] line-clamp-3 mt-2 leading-relaxed">
                    {post.subtitle}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-[#F7F3EB] text-[#5E6A7A] hover:text-[#0A1D37] hover:bg-[#B08D57]/15 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-5 border-t border-[#0A1D37]/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-7 h-7 rounded-full object-cover border border-[#B08D57]"
                    />
                    <span className="text-xs font-semibold text-[#0A1D37] truncate max-w-[120px]">
                      {post.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1 text-xs text-[#5E6A7A] hover:text-rose-500 transition-colors"
                      title="Appreciate article"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => navigateTo('blog-detail', post.slug)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A1D37] hover:text-[#B08D57]"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 text-[#B08D57]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* List Layout */
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/50 shadow-sm flex flex-col sm:flex-row gap-5 items-start transition-all"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full sm:w-48 h-36 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#5E6A7A] mb-1">
                    <span className="text-[#B08D57] font-semibold uppercase tracking-wider text-[10px]">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3
                    onClick={() => navigateTo('blog-detail', post.slug)}
                    className="font-serif font-bold text-lg sm:text-xl text-[#0A1D37] hover:text-[#B08D57] cursor-pointer transition-colors leading-snug"
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E6A7A] line-clamp-2 mt-1.5 leading-relaxed">
                    {post.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#0A1D37]/5 flex items-center justify-between text-xs text-[#5E6A7A]">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className={`p-1.5 rounded-full ${isBookmarked(post.id) ? 'text-[#B08D57]' : 'text-[#5E6A7A]'}`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo('blog-detail', post.slug)}
                      className="font-semibold text-[#0A1D37] hover:text-[#B08D57] flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
