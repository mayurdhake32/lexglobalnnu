import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  Heart,
  Share2,
  Printer,
  Copy,
  PenSquare,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  Send,
  ThumbsUp,
  CornerDownRight,
  UserCheck
} from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const {
    activeRoute,
    posts,
    courses,
    navigateTo,
    likePost,
    toggleBookmark,
    isBookmarked,
    addComment,
    addCommentReply,
    likeComment,
    setBlogEditorPost,
    setTeamModalId,
    showToast
  } = useApp();

  const slug = activeRoute.param;
  const post = posts.find((p) => p.slug === slug);

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // Comment input state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // Headings state extracted from content
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (el.scrollTop / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse headings from content
  useEffect(() => {
    if (!post) return;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const foundHeadings: { id: string; text: string; level: number }[] = [];

    const headingEls = tempDiv.querySelectorAll('h2, h3');
    headingEls.forEach((h, idx) => {
      const text = h.textContent || '';
      const id = 'heading-' + idx;
      foundHeadings.push({
        id,
        text,
        level: h.tagName.toLowerCase() === 'h2' ? 2 : 3
      });
    });

    setHeadings(foundHeadings);
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#0A1D37]">Article not found</h2>
        <p className="text-sm text-[#5E6A7A]">
          The legal guide you requested may have been archived or unpublished.
        </p>
        <button
          onClick={() => navigateTo('blogs')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1D37] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Legal Hub</span>
        </button>
      </div>
    );
  }

  const relatedCourse = courses.find((c) => c.id === post.relatedCourseId);
  const relatedArticles = posts
    .filter((p) => p.id !== post.id && p.published && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  // Injected content with IDs for headings
  const getProcessedContent = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const headingEls = tempDiv.querySelectorAll('h2, h3');
    headingEls.forEach((h, idx) => {
      h.setAttribute('id', 'heading-' + idx);
    });
    return tempDiv.innerHTML;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Direct article URL copied to clipboard.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    addComment(post.id, {
      author: commentAuthor.trim() || 'Practitioner',
      content: commentContent.trim()
    });
    setCommentContent('');
  };

  const handleReplySubmit = (e: React.FormEvent, parentCommentId: string) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    addCommentReply(post.id, parentCommentId, {
      author: replyAuthor.trim() || 'Practitioner',
      content: replyContent.trim()
    });
    setReplyContent('');
    setReplyingToCommentId(null);
  };

  return (
    <div className="relative">
      {/* Fixed top reading progress bar */}
      <div
        className="fixed top-[80px] left-0 h-1 bg-gradient-to-r from-[#B08D57] to-[#D4B483] z-30 transition-all duration-75 no-print"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 text-xs text-[#5E6A7A] no-print">
          <button
            onClick={() => navigateTo('blogs')}
            className="flex items-center gap-1.5 hover:text-[#0A1D37] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Legal Hub Directory</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#0A1D37]/40">/</span>
            <span className="text-[#B08D57] font-semibold">{post.category}</span>
          </div>
        </div>

        {/* Header Hero */}
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B08D57] text-white">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A1D37] text-white">
                Featured Authority
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D37] leading-[1.12] tracking-tight">
            {post.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#39465A] leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author & Timestamp Bar */}
          <div className="py-4 border-y border-[#0A1D37]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#B08D57]"
              />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#0A1D37]">
                  {post.author}
                </div>
                <div className="text-[11px] text-[#5E6A7A]">
                  {post.authorRole}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#5E6A7A]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Published {post.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image Banner */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden aspect-[21/9] bg-[#0A1D37] shadow-xl border border-[#0A1D37]/10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* Action Bar */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#0A1D37]/10 flex items-center justify-between gap-2 no-print shadow-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>{post.likes} Appreciations</span>
                </button>
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                    isBookmarked(post.id)
                      ? 'border-[#B08D57] bg-[#B08D57]/15 text-[#B08D57]'
                      : 'border-[#0A1D37]/15 text-[#0A1D37] hover:bg-[#0A1D37]/5'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(post.id) ? 'fill-[#B08D57]' : ''}`} />
                  <span>{isBookmarked(post.id) ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full text-[#5E6A7A] hover:text-[#0A1D37] hover:bg-[#0A1D37]/5"
                  title="Copy Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-full text-[#5E6A7A] hover:text-[#0A1D37] hover:bg-[#0A1D37]/5"
                  title="Print Article"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setBlogEditorPost(post)}
                  className="p-2 rounded-full text-[#B08D57] hover:bg-[#B08D57]/10"
                  title="Edit Article in CMS"
                >
                  <PenSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Injected Content Body */}
            <div
              className="prose prose-slate max-w-none text-[#39465A] text-base sm:text-lg leading-relaxed space-y-6 font-sans [&>h2]:font-serif [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-[#0A1D37] [&>h2]:pt-6 [&>h3]:font-serif [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-[#0A1D37] [&>h3]:pt-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#B08D57] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#0A1D37] [&>blockquote]:font-serif [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2"
              dangerouslySetInnerHTML={{ __html: getProcessedContent() }}
            />

            {/* Statutory Disclaimer Box */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-900 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Academic Notice & Jurisdictional Variance:</strong> This legal analysis is published under the Lex Global Advocacy educational charter. Procedural rules, national statutory statutes of limitation, and judicial interpretations evolve rapidly; counsel must consult primary legal authorities in the governing court or seat before acting.
              </div>
            </div>

            {/* Author Profile Bio Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#0A1D37]/10 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#B08D57] flex-shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57]">
                  About the Author
                </span>
                <h4 className="font-serif font-bold text-lg text-[#0A1D37]">
                  {post.author}
                </h4>
                <p className="text-xs text-[#5E6A7A] leading-relaxed">
                  Admitted advocate providing cross-border arbitration and transactional advice through Lex Global Advocacy. Author of specialized commentaries on international treaties and regulatory regimes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const member = posts.find((p) => p.author === post.author);
                      if (member) navigateTo('team');
                    }}
                    className="text-xs font-semibold text-[#0A1D37] hover:text-[#B08D57] inline-flex items-center gap-1"
                  >
                    <span>View Full Practitioner Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Comment & Discussion Section */}
            <section className="space-y-6 pt-6 border-t border-[#0A1D37]/10 no-print">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#B08D57]" />
                  <h3 className="font-serif font-bold text-xl text-[#0A1D37]">
                    Legal Practitioner Discussion ({post.comments ? post.comments.length : 0})
                  </h3>
                </div>
                <span className="text-xs text-[#5E6A7A]">Moderated Professional Forum</span>
              </div>

              {/* Add Comment Box */}
              <form onSubmit={handleCommentSubmit} className="p-5 rounded-2xl bg-[#FCFAF5] border border-[#0A1D37]/10 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your Name & Title (e.g., Adv. Julian Sterling)"
                    className="w-full sm:w-1/2 px-3.5 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                  />
                  <span className="text-[11px] text-[#5E6A7A] hidden sm:inline">
                    Leave your analytical perspective on this precedent
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Share a counter-precedent, procedural observation, or practical application..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647] transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>Post Analysis</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {(!post.comments || post.comments.length === 0) ? (
                  <div className="py-8 text-center text-xs text-[#5E6A7A] italic">
                    Be the first practitioner to contribute commentary on this legal analysis.
                  </div>
                ) : (
                  post.comments.map((cm) => (
                    <div key={cm.id} className="p-4 rounded-xl bg-white border border-[#0A1D37]/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cm.avatar}
                            alt={cm.author}
                            className="w-8 h-8 rounded-full object-cover border border-[#B08D57]/40"
                          />
                          <div>
                            <div className="text-xs font-bold text-[#0A1D37]">{cm.author}</div>
                            <div className="text-[10px] text-[#5E6A7A]">{cm.date}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => likeComment(post.id, cm.id)}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            cm.isLiked ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{cm.likes}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-[#39465A] leading-relaxed pl-10">
                        {cm.content}
                      </p>

                      {/* Reply toggle */}
                      <div className="pl-10 pt-1 flex items-center gap-4 text-xs">
                        <button
                          onClick={() => setReplyingToCommentId(replyingToCommentId === cm.id ? null : cm.id)}
                          className="text-[#B08D57] hover:underline font-semibold flex items-center gap-1"
                        >
                          <CornerDownRight className="w-3 h-3" />
                          <span>Reply</span>
                        </button>
                      </div>

                      {/* Reply Form */}
                      {replyingToCommentId === cm.id && (
                        <form
                          onSubmit={(e) => handleReplySubmit(e, cm.id)}
                          className="ml-10 p-3 rounded-xl bg-[#FCFAF5] border border-[#0A1D37]/10 space-y-2 animate-in fade-in"
                        >
                          <input
                            type="text"
                            value={replyAuthor}
                            onChange={(e) => setReplyAuthor(e.target.value)}
                            placeholder="Your Name (e.g., Counsel)"
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none"
                          />
                          <textarea
                            rows={2}
                            required
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your response..."
                            className="w-full p-2 text-xs rounded-lg border border-[#0A1D37]/15 bg-white text-[#0A1D37] focus:outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setReplyingToCommentId(null)}
                              className="px-3 py-1 text-xs text-[#5E6A7A]"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1 text-xs font-semibold rounded-full bg-[#0A1D37] text-white"
                            >
                              Send Reply
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Nested Replies */}
                      {cm.replies && cm.replies.length > 0 && (
                        <div className="ml-10 space-y-2 pt-2 border-t border-[#0A1D37]/5">
                          {cm.replies.map((rep) => (
                            <div key={rep.id} className="p-3 rounded-lg bg-[#FCFAF5] border border-[#0A1D37]/5">
                              <div className="flex items-center gap-2 mb-1">
                                <img
                                  src={rep.avatar}
                                  alt={rep.author}
                                  className="w-6 h-6 rounded-full object-cover border border-[#B08D57]/40"
                                />
                                <span className="text-xs font-bold text-[#0A1D37]">{rep.author}</span>
                                <span className="text-[10px] text-[#5E6A7A]">• {rep.date}</span>
                              </div>
                              <p className="text-xs text-[#39465A] pl-8">{rep.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Table of Contents & Linked Course) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-28 no-print">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B08D57] block">
                  On this Page
                </span>
                <nav className="space-y-1.5 text-xs text-[#5E6A7A]">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-1 hover:text-[#0A1D37] transition-colors leading-snug ${
                        h.level === 3 ? 'pl-3 text-[11px]' : 'font-medium'
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Linked Executive Course Banner */}
            {relatedCourse && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0A1D37] to-[#0F2647] text-white shadow-xl space-y-3 border border-[#B08D57]/30">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D4B483]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Related Master Programme</span>
                </span>
                <h4 className="font-serif font-bold text-lg leading-tight">
                  {relatedCourse.title}
                </h4>
                <p className="text-xs text-[#F7F3EB]/70 leading-relaxed line-clamp-3">
                  {relatedCourse.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('course-detail', relatedCourse.slug)}
                    className="w-full py-2.5 rounded-full bg-[#B08D57] hover:bg-[#D4B483] text-[#0A1D37] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <span>View Course Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Save Reading List Quick Card */}
            <div className="p-4 rounded-xl bg-[#FCFAF5] border border-[#0A1D37]/10 flex items-center justify-between text-xs text-[#0A1D37]">
              <span>Saved for offline study?</span>
              <button
                onClick={() => toggleBookmark(post.id)}
                className="font-semibold text-[#B08D57] hover:underline"
              >
                {isBookmarked(post.id) ? 'Saved in List ✓' : 'Add to Reading List'}
              </button>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-[#0A1D37]/10 max-w-6xl mx-auto space-y-6 no-print">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                Related Reading
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0A1D37] mt-1">
                More analysis in {post.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateTo('blog-detail', rel.slug)}
                  className="rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm p-4 cursor-pointer group transition-all"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full aspect-[16/10] rounded-xl object-cover mb-3"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57]">
                    {rel.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#0A1D37] group-hover:text-[#B08D57] transition-colors line-clamp-2 mt-1 leading-snug">
                    {rel.title}
                  </h4>
                  <div className="text-[11px] text-[#5E6A7A] mt-2 flex items-center justify-between">
                    <span>{rel.readTime}</span>
                    <span className="text-[#0A1D37] font-semibold flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3 text-[#B08D57]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
