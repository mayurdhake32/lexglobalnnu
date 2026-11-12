import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  GraduationCap,
  Users,
  Inbox,
  PenSquare,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  RotateCcw,
  Plus,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    posts,
    courses,
    inquiries,
    enrollments,
    deletePost,
    togglePublishPost,
    setBlogEditorPost,
    navigateTo,
    resetToDemoData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'blogs' | 'courses' | 'inquiries'>('blogs');
  const [filterBlogSearch, setFilterBlogSearch] = useState('');

  const totalEnrollments = Object.keys(enrollments).length;
  const totalCertificates = Object.values(enrollments).filter((e) => e.quizPassed).length;

  const filteredPosts = posts.filter(
    (p) =>
      !filterBlogSearch ||
      p.title.toLowerCase().includes(filterBlogSearch.toLowerCase()) ||
      p.author.toLowerCase().includes(filterBlogSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(filterBlogSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-[#0A1D37]/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Content Management & Institutional Registrar
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1D37] mt-1.5 tracking-tight">
            Institutional Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#5E6A7A] mt-1">
            Publish, edit, and moderate legal commentary, executive programmes, and client intake requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBlogEditorPost('new')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#B08D57] text-white hover:bg-[#9A7A47] shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Article</span>
          </button>
          <button
            onClick={resetToDemoData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-[#0A1D37]/5 transition-colors"
            title="Reset demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5E6A7A] mb-2">
            <span>Articles Published</span>
            <FileText className="w-4 h-4 text-[#B08D57]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
            {posts.filter((p) => p.published).length}
          </span>
          <span className="text-[11px] text-[#5E6A7A] block mt-1">
            {posts.filter((p) => !p.published).length} in draft status
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5E6A7A] mb-2">
            <span>Executive Courses</span>
            <GraduationCap className="w-4 h-4 text-[#B08D57]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
            {courses.length}
          </span>
          <span className="text-[11px] text-[#5E6A7A] block mt-1">
            Across 5 core legal domains
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5E6A7A] mb-2">
            <span>Local LMS Enrollments</span>
            <Users className="w-4 h-4 text-[#B08D57]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
            {totalEnrollments}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">
            {totalCertificates} credentials earned
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5E6A7A] mb-2">
            <span>Client Inquiries</span>
            <Inbox className="w-4 h-4 text-[#B08D57]" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1D37]">
            {inquiries.length}
          </span>
          <span className="text-[11px] text-[#5E6A7A] block mt-1">
            Confidential intakes logged
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-[#0A1D37]/10 pb-2">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'blogs'
              ? 'bg-[#0A1D37] text-white shadow-sm'
              : 'text-[#0A1D37]/70 hover:bg-[#0A1D37]/5'
          }`}
        >
          Legal Hub Articles ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'courses'
              ? 'bg-[#0A1D37] text-white shadow-sm'
              : 'text-[#0A1D37]/70 hover:bg-[#0A1D37]/5'
          }`}
        >
          Curricula & Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'inquiries'
              ? 'bg-[#0A1D37] text-white shadow-sm'
              : 'text-[#0A1D37]/70 hover:bg-[#0A1D37]/5'
          }`}
        >
          Client Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Tab 1: Articles / Blogs */}
      {activeTab === 'blogs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <input
              type="text"
              value={filterBlogSearch}
              onChange={(e) => setFilterBlogSearch(e.target.value)}
              placeholder="Filter by title, author, or category..."
              className="px-3.5 py-2 text-xs rounded-xl border border-[#0A1D37]/15 bg-white text-[#0A1D37] sm:w-80 focus:outline-none focus:border-[#B08D57]"
            />
            <button
              onClick={() => setBlogEditorPost('new')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1D37] text-white text-xs font-semibold hover:bg-[#0F2647]"
            >
              <Plus className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Draft New Article</span>
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FCFAF5] border-b border-[#0A1D37]/10 text-[#5E6A7A] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Metrics</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1D37]/5">
                  {filteredPosts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FCFAF5]/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 max-w-xs">
                            <span
                              onClick={() => navigateTo('blog-detail', p.slug)}
                              className="font-serif font-bold text-xs text-[#0A1D37] hover:text-[#B08D57] cursor-pointer truncate block"
                            >
                              {p.title}
                            </span>
                            <span className="text-[11px] text-[#5E6A7A] truncate block">
                              {p.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#0A1D37] whitespace-nowrap">
                        {p.category}
                      </td>
                      <td className="py-3 px-4 text-[#5E6A7A] whitespace-nowrap">
                        {p.author}
                      </td>
                      <td className="py-3 px-4 text-[#5E6A7A] whitespace-nowrap">
                        {p.date}
                      </td>
                      <td className="py-3 px-4 text-[#5E6A7A] whitespace-nowrap">
                        {p.views} views • {p.likes} likes
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            p.published
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => togglePublishPost(p.id)}
                            className="p-1.5 rounded-lg text-[#5E6A7A] hover:text-[#0A1D37] hover:bg-[#0A1D37]/5"
                            title={p.published ? 'Unpublish to draft' : 'Publish to hub'}
                          >
                            {p.published ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 text-emerald-600" />}
                          </button>
                          <button
                            onClick={() => setBlogEditorPost(p)}
                            className="p-1.5 rounded-lg text-[#B08D57] hover:bg-[#B08D57]/10"
                            title="Edit Article"
                          >
                            <PenSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePost(p.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Courses */}
      {activeTab === 'courses' && (
        <div className="rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FCFAF5] border-b border-[#0A1D37]/10 text-[#5E6A7A] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Masterclass</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Tuition</th>
                  <th className="py-3 px-4">Instructor</th>
                  <th className="py-3 px-4">Enrolled Learners</th>
                  <th className="py-3 px-4 text-right">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0A1D37]/5">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FCFAF5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-serif font-bold text-xs sm:text-sm text-[#0A1D37]">
                      {c.title}
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6A7A]">{c.category}</td>
                    <td className="py-3.5 px-4 text-[#5E6A7A]">{c.level}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#0A1D37]">
                      {c.price === 0 ? 'Free' : `₹${c.price.toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6A7A]">{c.instructor}</td>
                    <td className="py-3.5 px-4 text-[#5E6A7A]">{c.students}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigateTo('course-detail', c.slug)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#B08D57] hover:underline"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-white border border-[#0A1D37]/10 p-6">
              <Inbox className="w-10 h-10 text-[#5E6A7A]/40 mx-auto mb-2" />
              <h4 className="font-serif font-bold text-base text-[#0A1D37]">No intake inquiries lodged</h4>
              <p className="text-xs text-[#5E6A7A] mt-1">
                New confidential client consultation requests submitted through the portal will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl bg-white border border-[#0A1D37]/10 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A1D37]/5 pb-3">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#0A1D37]">
                        {inq.name}
                      </h4>
                      <div className="text-xs text-[#5E6A7A]">
                        {inq.email} • {inq.organization || 'Individual Party'} • {inq.jurisdiction}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inq.urgency === 'Immediate'
                          ? 'bg-rose-100 text-rose-800'
                          : inq.urgency === 'Urgent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {inq.urgency} Urgency
                      </span>
                      <span className="text-[11px] text-[#5E6A7A]">{inq.createdAt.slice(0, 10)}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57] block mb-1">
                      Practice Area: {inq.practiceArea}
                    </span>
                    <p className="text-xs text-[#39465A] bg-[#FCFAF5] p-3.5 rounded-xl border border-[#0A1D37]/5 leading-relaxed">
                      {inq.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
