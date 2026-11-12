import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { LEGAL_IMAGE_PRESETS } from '../data/initialData';
import { X, PenSquare, Eye, Save, Sparkles, Image as ImageIcon, Tag, User, BookOpen } from 'lucide-react';

export const BlogEditorModal: React.FC = () => {
  const { blogEditorPost, setBlogEditorPost, addPost, updatePost, team, courses, navigateTo } = useApp();

  const isNew = blogEditorPost === 'new';
  const existing = typeof blogEditorPost === 'object' && blogEditorPost !== null ? blogEditorPost : null;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Arbitration');
  const [author, setAuthor] = useState('Dr. Amara Okonkwo');
  const [authorRole, setAuthorRole] = useState('Managing Partner & Arbitrator');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
  const [tagsInput, setTagsInput] = useState('');
  const [image, setImage] = useState(LEGAL_IMAGE_PRESETS[0].url);
  const [readTime, setReadTime] = useState('6 min read');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [relatedCourseId, setRelatedCourseId] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setSubtitle(existing.subtitle || '');
      setCategory(existing.category);
      setAuthor(existing.author);
      setAuthorRole(existing.authorRole || 'Legal Counsel');
      setAuthorAvatar(existing.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
      setTagsInput(existing.tags.join(', '));
      setImage(existing.image);
      setReadTime(existing.readTime);
      setFeatured(existing.featured);
      setPublished(existing.published);
      setRelatedCourseId(existing.relatedCourseId || '');
      setContent(existing.content);
      setActiveTab('edit');
    } else if (isNew) {
      setTitle('');
      setSlug('');
      setSubtitle('');
      setCategory('Arbitration');
      setAuthor('Dr. Amara Okonkwo');
      setAuthorRole('Managing Partner & Arbitrator');
      setAuthorAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
      setTagsInput('Arbitration, International Law, Dispute Settlement');
      setImage(LEGAL_IMAGE_PRESETS[0].url);
      setReadTime('5 min read');
      setFeatured(false);
      setPublished(true);
      setRelatedCourseId('');
      setContent(`<h2>Overview of the Legal Development</h2>
<p>
  Recent regulatory and judicial shifts have significant implications for practitioners advising multinational enterprises. In this analysis, we examine the governing jurisprudence, practical operational risks, and recommended drafting safeguards.
</p>

<h2>Statutory Framework & Key Precedents</h2>
<p>
  Under international standards, parties must take proactive steps to ensure compliance before enforcement disputes arise.
</p>

<blockquote>
  "Clarity in the primary dispute agreement prevents jurisdictional deadlocks before arbitral tribunals."
</blockquote>

<h2>Strategic Recommendations for In-House Counsel</h2>
<ul>
  <li>Review existing cross-border counterparty agreements for ambiguous forum clauses.</li>
  <li>Document service of process through certified dual-track mechanisms.</li>
  <li>Ensure periodic regulatory audits align with current supranational directives.</li>
</ul>`);
      setActiveTab('edit');
    }
  }, [blogEditorPost, existing, isNew]);

  if (!blogEditorPost) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleAuthorSelect = (authorName: string) => {
    setAuthor(authorName);
    const member = team.find((t) => t.name === authorName);
    if (member) {
      setAuthorRole(member.role);
      setAuthorAvatar(member.image);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalTags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    if (existing) {
      updatePost(existing.id, {
        title: title.trim(),
        slug: finalSlug,
        subtitle: subtitle.trim(),
        category,
        author,
        authorRole,
        authorAvatar,
        tags: finalTags,
        image,
        readTime,
        featured,
        published,
        relatedCourseId: relatedCourseId || undefined,
        content
      });
      setBlogEditorPost(null);
    } else {
      const created = addPost({
        title: title.trim(),
        slug: finalSlug,
        subtitle: subtitle.trim(),
        category,
        author,
        authorRole,
        authorAvatar,
        tags: finalTags,
        image,
        date: new Date().toISOString().slice(0, 10),
        readTime,
        featured,
        published,
        relatedCourseId: relatedCourseId || undefined,
        content
      });
      setBlogEditorPost(null);
      navigateTo('blog-detail', created.slug);
    }
  };

  const categories = [
    'Arbitration',
    'Cross-Border Contracts',
    'Data & Privacy',
    'Consumer Protection',
    'Real Estate',
    'Legal Writing',
    'AI & Technology Law',
    'International Trade',
    'Sovereign Disputes'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={() => setBlogEditorPost(null)}
    >
      <div
        className="bg-[#FCFAF5] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#B08D57]/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#0A1D37]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#B08D57]/15 text-[#B08D57]">
              <PenSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0A1D37]">
                {existing ? 'Edit Legal Analysis / Blog' : 'Draft & Publish Legal Article'}
              </h3>
              <p className="text-xs text-[#5E6A7A]">
                Dynamic legal publishing engine for the Lex Global Advocacy Legal Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#F7F3EB] p-1 rounded-lg border border-[#0A1D37]/10 flex text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'edit' ? 'bg-[#0A1D37] text-white shadow-sm' : 'text-[#5E6A7A] hover:text-[#0A1D37]'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md font-medium flex items-center gap-1 transition-colors ${
                  activeTab === 'preview' ? 'bg-[#0A1D37] text-white shadow-sm' : 'text-[#5E6A7A] hover:text-[#0A1D37]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>
            <button
              onClick={() => setBlogEditorPost(null)}
              className="p-1.5 rounded-full hover:bg-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Article Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Cross-Border Enforcement of Commercial Awards..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-sm text-[#0A1D37] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 font-serif font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#5E6A7A]">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#0A1D37]/15 bg-white text-xs font-mono text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>

            {/* Subtitle / Excerpt */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                Subtitle & Lead Excerpt *
              </label>
              <textarea
                rows={2}
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="A concise summary of the legal doctrine, judicial holding, or transactional risk discussed..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-sm text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            {/* Category & Author & Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-xs font-medium text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Author Practitioner
                </label>
                <select
                  value={author}
                  onChange={(e) => handleAuthorSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-xs font-medium text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                >
                  {team.map((t) => (
                    <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
                  ))}
                  <option value="Lex Global Research Council">Lex Global Research Council</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g., 7 min read"
                  className="w-full px-3 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>

            {/* Tags & Related Course */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Tags (Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Arbitration, New York Convention, Compliance"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Linked Executive Course</span>
                </label>
                <select
                  value={relatedCourseId}
                  onChange={(e) => setRelatedCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-xs font-medium text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
                >
                  <option value="">None / Standalone Analysis</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cover Image & Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Cover Image URL (or select from legal presets)</span>
              </label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#0A1D37]/15 bg-white text-xs text-[#0A1D37] focus:outline-none focus:border-[#B08D57]"
              />
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                {LEGAL_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-lg border transition-all ${
                      image === preset.url
                        ? 'bg-[#B08D57] text-white border-[#B08D57]'
                        : 'bg-white text-[#5E6A7A] border-[#0A1D37]/10 hover:border-[#B08D57]/40'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Body Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37]">
                  Article Content (HTML formatting allowed) *
                </label>
                <span className="text-[11px] text-[#5E6A7A]">
                  Supports &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;blockquote&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;
                </span>
              </div>
              <textarea
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 rounded-xl border border-[#0A1D37]/15 bg-white text-sm font-mono text-[#0A1D37] leading-relaxed focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20"
              />
            </div>

            {/* Publishing Settings Toggles */}
            <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#0A1D37]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#0A1D37] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#B08D57] focus:ring-[#B08D57] border-[#0A1D37]/30"
                  />
                  <span>Published on Legal Hub</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-[#0A1D37] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#B08D57] focus:ring-[#B08D57] border-[#0A1D37]/30"
                  />
                  <span>Hero Featured Guide</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBlogEditorPost(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647] shadow-md transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{existing ? 'Save Article' : 'Publish Article'}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Live Preview Mode */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#B08D57] font-semibold uppercase tracking-wider">
                <span>{category}</span>
                <span>•</span>
                <span>{readTime}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] leading-tight">
                {title || 'Untitled Legal Guide'}
              </h1>
              <p className="font-serif italic text-lg text-[#5E6A7A] leading-relaxed">
                {subtitle || 'Article excerpt and summary will appear here.'}
              </p>
              <div className="flex items-center gap-3 py-3 border-y border-[#0A1D37]/10">
                <img
                  src={authorAvatar}
                  alt={author}
                  className="w-10 h-10 rounded-full object-cover border border-[#B08D57]"
                />
                <div>
                  <div className="text-xs font-bold text-[#0A1D37]">{author}</div>
                  <div className="text-[11px] text-[#5E6A7A]">{authorRole}</div>
                </div>
              </div>
              {image && (
                <div className="rounded-xl overflow-hidden aspect-video shadow-md">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
              )}
              <div
                className="prose prose-slate max-w-none text-[#39465A] text-base leading-relaxed space-y-4 font-sans [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#0A1D37] [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-[#0A1D37] [&>blockquote]:border-l-4 [&>blockquote]:border-[#B08D57] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#0A1D37] [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
