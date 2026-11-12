import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Star, BookOpen, GraduationCap, Scale, ShieldCheck, Check, Clock, Globe2, ChevronRight, PenSquare, Heart, Bookmark, FileCheck, Shield, Users, Building, PenTool, Gavel } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    courses,
    posts,
    team,
    practiceAreas,
    navigateTo,
    setQuickViewCourseId,
    setTeamModalId,
    setBlogEditorPost,
    setConsultationOpen,
    toggleBookmark,
    isBookmarked
  } = useApp();

  const publishedPosts = posts.filter((p) => p.published);
  const featuredPost = publishedPosts.find((p) => p.featured) || publishedPosts[0];
  const latestPosts = publishedPosts.slice(0, 3);
  const featuredCourses = courses.filter((c) => c.published).slice(0, 3);
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#B08D57]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-[#0A1D37]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1D37]/5 border border-[#B08D57]/40 text-[#B08D57] text-xs font-semibold uppercase tracking-[0.2em]">
                <Scale className="w-3.5 h-3.5" />
                <span>International Legal Excellence</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1D37] leading-[1.08] tracking-tight">
                Counsel without <em className="text-[#B08D57] font-normal italic">borders.</em><br />
                Knowledge without compromise.
              </h1>

              <p className="text-base sm:text-lg text-[#39465A] max-w-2xl leading-relaxed font-sans">
                A premier international legal institute and dynamic knowledge hub for practitioners, transnational enterprises, and scholars — grounded in procedural rigor, comparative jurisprudence, and ethical advocacy.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigateTo('courses')}
                  className="px-6 py-3.5 rounded-full bg-[#0A1D37] text-[#F7F3EB] text-sm font-semibold hover:bg-[#0F2647] shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 text-[#B08D57] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('blogs')}
                  className="px-6 py-3.5 rounded-full border border-[#0A1D37]/25 bg-white/70 text-[#0A1D37] text-sm font-semibold hover:border-[#0A1D37] hover:bg-white transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#B08D57]" />
                  <span>Visit Legal Hub</span>
                </button>

                <button
                  onClick={() => setBlogEditorPost('new')}
                  className="px-5 py-3 rounded-full border border-dashed border-[#B08D57] text-[#B08D57] text-xs font-semibold hover:bg-[#B08D57]/10 transition-all flex items-center gap-1.5"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Publish Analysis</span>
                </button>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#0A1D37]/10">
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                    {courses.length}
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-[#5E6A7A] mt-0.5">
                    Master programmes
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                    {totalStudents.toLocaleString()}+
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-[#5E6A7A] mt-0.5">
                    Global learners
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
                    {publishedPosts.length}
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-[#5E6A7A] mt-0.5">
                    Published guides
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#0A1D37]/10 bg-[#0A1D37] relative">
                  <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85"
                    alt="International law volumes and courthouse chambers"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4B483]">
                      Comparative Practice
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      New York Convention & Transnational Dispute Enforcement
                    </h3>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-5 -left-5 bg-[#FCFAF5] p-3.5 rounded-xl border border-[#B08D57]/40 shadow-xl max-w-[200px] hidden sm:block animate-pulse">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A1D37]">
                    <Globe2 className="w-4 h-4 text-[#B08D57]" />
                    <span>42 Jurisdictions</span>
                  </div>
                  <p className="text-[11px] text-[#5E6A7A] mt-1 leading-snug">
                    Cross-border treaties, SIAC, LCIA & ICC arbitral frameworks.
                  </p>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-5 -right-5 bg-[#FCFAF5] p-3.5 rounded-xl border border-[#B08D57]/40 shadow-xl max-w-[210px] hidden sm:block">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                  </div>
                  <div className="font-serif font-bold text-sm text-[#0A1D37] mt-1">
                    4.9 / 5 Rating
                  </div>
                  <p className="text-[11px] text-[#5E6A7A] leading-snug">
                    Evaluated by international litigators & general counsel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Practice Areas & Legal Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              <Gavel className="w-3.5 h-3.5" />
              <span>International Advisory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1.5">
              Core Practice Areas & Expertise.
            </h2>
            <p className="text-sm text-[#5E6A7A] mt-1 max-w-xl">
              Cross-border commercial advocacy, emergency tribunal relief, regulatory governance, and transactional due diligence across premier legal jurisdictions.
            </p>
          </div>
          <button
            onClick={() => navigateTo('practice-areas')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A1D37] hover:text-[#B08D57] transition-colors"
          >
            <span>Explore All 6 Practice Areas</span>
            <ChevronRight className="w-4 h-4 text-[#B08D57]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((pa) => {
            const getIconComponent = () => {
              switch (pa.iconName) {
                case 'Scale':
                  return <Scale className="w-5 h-5 text-[#B08D57]" />;
                case 'FileCheck':
                  return <FileCheck className="w-5 h-5 text-[#B08D57]" />;
                case 'Shield':
                  return <Shield className="w-5 h-5 text-[#B08D57]" />;
                case 'Users':
                  return <Users className="w-5 h-5 text-[#B08D57]" />;
                case 'Building':
                  return <Building className="w-5 h-5 text-[#B08D57]" />;
                case 'PenTool':
                  return <PenTool className="w-5 h-5 text-[#B08D57]" />;
                default:
                  return <Scale className="w-5 h-5 text-[#B08D57]" />;
              }
            };

            return (
              <div
                key={pa.id}
                className="bg-white rounded-2xl border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm p-6 flex flex-col justify-between group transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FCFAF5] border border-[#B08D57]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIconComponent()}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6A7A] bg-[#FCFAF5] px-2.5 py-0.5 rounded-full border border-[#0A1D37]/5">
                      {pa.relatedCategory}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigateTo('practice-areas')}
                    className="font-serif font-bold text-lg text-[#0A1D37] group-hover:text-[#B08D57] cursor-pointer transition-colors leading-snug"
                  >
                    {pa.title}
                  </h3>

                  <p className="text-xs text-[#5E6A7A] mt-2.5 line-clamp-3 leading-relaxed">
                    {pa.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#0A1D37]/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57] block mb-1">
                      Lead Counsel: {pa.leadCounsel}
                    </span>
                    <p className="text-[11px] text-[#39465A] line-clamp-1">
                      {pa.keyServices[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#0A1D37]/5 flex items-center justify-between">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="text-xs font-semibold text-[#0A1D37] hover:text-[#B08D57] flex items-center gap-1"
                  >
                    <span>Instruct</span>
                    <ArrowRight className="w-3 h-3 text-[#B08D57]" />
                  </button>

                  <button
                    onClick={() => navigateTo('practice-areas')}
                    className="text-[11px] text-[#5E6A7A] hover:text-[#0A1D37] font-medium"
                  >
                    View Frameworks →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Blog / Legal Hub Spotlight */}
      <section className="bg-[#FCFAF5] py-16 border-y border-[#0A1D37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>The Legal Hub</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1.5">
                Clear thinking on complex questions.
              </h2>
              <p className="text-sm text-[#5E6A7A] mt-1 max-w-xl">
                In-depth analytical briefs, statutory explanations, and practice notes authored by practicing international counsel.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBlogEditorPost('new')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition-all shadow-sm"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Write Article</span>
              </button>
              <button
                onClick={() => navigateTo('blogs')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A1D37] hover:text-[#B08D57] transition-colors"
              >
                <span>View All Articles</span>
                <ChevronRight className="w-4 h-4 text-[#B08D57]" />
              </button>
            </div>
          </div>

          {/* Featured Hero Article */}
          {featuredPost && (
            <div className="mb-12 rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 group transition-all">
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-[#0A1D37]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#B08D57] text-white shadow-md">
                    Featured Analysis • {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#5E6A7A]">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3
                    onClick={() => navigateTo('blog-detail', featuredPost.slug)}
                    className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37] hover:text-[#B08D57] cursor-pointer transition-colors leading-snug"
                  >
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm text-[#39465A] line-clamp-3 leading-relaxed">
                    {featuredPost.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#0A1D37]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.author}
                      className="w-9 h-9 rounded-full object-cover border border-[#B08D57]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0A1D37]">{featuredPost.author}</div>
                      <div className="text-[11px] text-[#5E6A7A]">{featuredPost.authorRole}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(featuredPost.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        isBookmarked(featuredPost.id)
                          ? 'border-[#B08D57] text-[#B08D57] bg-[#B08D57]/10'
                          : 'border-[#0A1D37]/15 text-[#5E6A7A] hover:text-[#0A1D37]'
                      }`}
                      title={isBookmarked(featuredPost.id) ? 'Saved' : 'Save article'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('blog-detail', featuredPost.slug)}
                      className="px-4 py-2 rounded-full bg-[#0A1D37] text-white text-xs font-semibold hover:bg-[#0F2647] flex items-center gap-1.5"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Latest Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm overflow-hidden flex flex-col group transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A1D37]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F3EB]/95 text-[#0A1D37] backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                      isBookmarked(post.id)
                        ? 'bg-[#B08D57] text-white'
                        : 'bg-white/80 text-[#0A1D37] hover:bg-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#5E6A7A] mb-1.5">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4
                      onClick={() => navigateTo('blog-detail', post.slug)}
                      className="font-serif font-bold text-base text-[#0A1D37] hover:text-[#B08D57] cursor-pointer transition-colors line-clamp-2 leading-snug"
                    >
                      {post.title}
                    </h4>
                    <p className="text-xs text-[#5E6A7A] line-clamp-2 mt-2 leading-relaxed">
                      {post.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#0A1D37]/5 flex items-center justify-between">
                    <span className="text-[11px] text-[#5E6A7A]">
                      {post.date}
                    </span>
                    <button
                      onClick={() => navigateTo('blog-detail', post.slug)}
                      className="text-xs font-semibold text-[#0A1D37] hover:text-[#B08D57] flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 text-[#B08D57]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Executive Legal Academy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1.5">
              Study with practicing authorities.
            </h2>
            <p className="text-sm text-[#5E6A7A] mt-1 max-w-xl">
              Structured practitioner masterclasses with verified syllabi, case studies, knowledge checks, and accredited certifications.
            </p>
          </div>
          <button
            onClick={() => navigateTo('courses')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A1D37] hover:text-[#B08D57] transition-colors"
          >
            <span>Explore All {courses.length} Courses</span>
            <ChevronRight className="w-4 h-4 text-[#B08D57]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm overflow-hidden flex flex-col group transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A1D37]">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F3EB]/95 text-[#0A1D37] backdrop-blur-sm">
                    {c.level}
                  </span>
                </div>
                <button
                  onClick={() => setQuickViewCourseId(c.id)}
                  className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 hover:bg-[#B08D57] text-white text-[11px] font-medium backdrop-blur-sm transition-colors"
                >
                  Quick View
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#5E6A7A] mb-1.5">
                    <span>{c.category}</span>
                    <span>{c.duration}</span>
                  </div>
                  <h4
                    onClick={() => navigateTo('course-detail', c.slug)}
                    className="font-serif font-bold text-base text-[#0A1D37] hover:text-[#B08D57] cursor-pointer transition-colors leading-snug"
                  >
                    {c.title}
                  </h4>
                  <p className="text-xs text-[#5E6A7A] line-clamp-2 mt-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#0A1D37]/5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5E6A7A]">{c.instructor}</span>
                    <div className="flex items-center gap-1 font-semibold text-[#0A1D37]">
                      <Star className="w-3 h-3 fill-[#B08D57] text-[#B08D57]" />
                      <span>{c.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-serif text-base font-bold text-[#0A1D37]">
                      {c.price === 0 ? 'Free Open Access' : `₹${c.price.toLocaleString('en-IN')}`}
                    </span>
                    <button
                      onClick={() => navigateTo('course-detail', c.slug)}
                      className="px-3 py-1.5 rounded-full border border-[#0A1D37]/20 hover:border-[#0A1D37] text-xs font-semibold text-[#0A1D37] hover:bg-[#0A1D37]/5 transition-colors"
                    >
                      View Syllabus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Legal Bench Section */}
      <section className="bg-[#0A1D37] text-[#F7F3EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4B483]">
                Our Legal Bench
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1.5">
                Counsel you can call on.
              </h2>
              <p className="text-sm text-[#F7F3EB]/70 mt-1 max-w-xl">
                Senior arbitrators, appellate counsel, and comparative regulatory advisors admitted across five continents.
              </p>
            </div>
            <button
              onClick={() => navigateTo('team')}
              className="px-5 py-2.5 rounded-full border border-[#D4B483]/40 text-[#D4B483] text-xs font-semibold hover:bg-[#D4B483] hover:text-[#0A1D37] transition-all"
            >
              Meet Full Bench ({team.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.slice(0, 3).map((t) => (
              <div
                key={t.id}
                onClick={() => setTeamModalId(t.id)}
                className="p-6 rounded-2xl bg-[#0F2647] border border-[#B08D57]/20 hover:border-[#B08D57] cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#B08D57]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-base text-white group-hover:text-[#D4B483] transition-colors">
                      {t.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#D4B483] uppercase tracking-wider block mt-0.5">
                      {t.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#F7F3EB]/70 line-clamp-3 leading-relaxed mb-4">
                  {t.bio}
                </p>

                <div className="pt-3 border-t border-[#F7F3EB]/10 flex items-center justify-between text-xs text-[#D4B483]">
                  <span>{t.experience} practice</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Credentials →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#FCFAF5] via-[#F7F3EB] to-white border border-[#B08D57]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              Advisory & Instruction
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
              Have a dispute or commercial agreement crossing international borders?
            </h3>
            <p className="text-sm text-[#39465A] leading-relaxed">
              Our partners accept instructions on commercial arbitrations, enforcement resistance, governing-law audits, and complex cross-border data governance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setConsultationOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#0A1D37] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F2647] shadow-lg flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4 text-[#B08D57]" />
              <span>Instruct Counsel</span>
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#0A1D37]/20 text-[#0A1D37] text-xs sm:text-sm font-semibold hover:bg-white flex items-center justify-center gap-1"
            >
              <span>Explore Academy</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
