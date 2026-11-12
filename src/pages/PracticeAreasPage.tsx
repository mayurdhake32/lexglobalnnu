import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  FileCheck,
  Shield,
  Users,
  Building,
  PenTool,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  Gavel,
  Briefcase
} from 'lucide-react';

export const PracticeAreasPage: React.FC = () => {
  const {
    practiceAreas,
    courses,
    posts,
    team,
    navigateTo,
    setConsultationOpen,
    setQuickViewCourseId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedAreaId, setExpandedAreaId] = useState<string | null>(null);

  const categories = [
    'All',
    'Arbitration',
    'Cross-Border Contracts',
    'Data & Privacy',
    'Consumer Protection',
    'Real Estate',
    'Legal Writing'
  ];

  const filteredAreas = practiceAreas.filter((pa) => {
    const matchesCategory =
      selectedFilter === 'All' || pa.relatedCategory === selectedFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      pa.title.toLowerCase().includes(q) ||
      pa.shortDesc.toLowerCase().includes(q) ||
      pa.fullDesc.toLowerCase().includes(q) ||
      pa.keyServices.some((s) => s.toLowerCase().includes(q)) ||
      pa.governingFrameworks.some((f) => f.toLowerCase().includes(q)) ||
      pa.leadCounsel.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#B08D57]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#B08D57]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#B08D57]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#B08D57]" />;
      case 'Building':
        return <Building className="w-6 h-6 text-[#B08D57]" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-[#B08D57]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#B08D57]" />;
    }
  };

  return (
    <div className="space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Hero */}
      <section className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1D37]/5 border border-[#B08D57]/40 text-[#B08D57] text-xs font-semibold uppercase tracking-[0.2em]">
          <Gavel className="w-3.5 h-3.5" />
          <span>Specialized Advisory & International Advocacy</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1D37] tracking-tight leading-[1.1]">
          Core Practice Areas & Legal Expertise
        </h1>

        <p className="text-base sm:text-lg text-[#39465A] leading-relaxed">
          From transnational treaty arbitrations and multi-currency commercial pacts to GDPR transfer impact assessments and forensic title investigations, our partners deliver rigorous, cross-border advocacy.
        </p>

        {/* Global Competence Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#5E6A7A]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0A1D37]/10 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
            Strict Conflict-Check Protocol
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0A1D37]/10 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57]" />
            ICC, LCIA, SIAC & ICSID Panels
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0A1D37]/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            Common Law & Civil Law Harmonisation
          </span>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white p-4 sm:p-6 rounded-2xl border border-[#0A1D37]/10 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#5E6A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search practices, frameworks, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-[#FCFAF5] border border-[#0A1D37]/10 focus:border-[#B08D57] focus:bg-white outline-none transition-all placeholder:text-[#5E6A7A]/60"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-[#5E6A7A] mr-1 hidden sm:block flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedFilter === cat
                    ? 'bg-[#0A1D37] text-white shadow-xs'
                    : 'bg-[#FCFAF5] text-[#5E6A7A] hover:text-[#0A1D37] border border-[#0A1D37]/5 hover:border-[#0A1D37]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredAreas.map((area) => {
          const leadPerson = team.find((t) => t.name === area.leadCounsel);
          const relatedCourse = courses.find((c) => c.id === area.courseId);
          const relatedArticles = posts.filter(
            (p) => p.published && (p.category === area.relatedCategory || p.relatedCourseId === area.courseId)
          ).slice(0, 2);
          const isExpanded = expandedAreaId === area.id;

          return (
            <div
              key={area.id}
              className="bg-white rounded-2xl border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Summary */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FCFAF5] border border-[#B08D57]/30 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {getIcon(area.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0A1D37]/5 text-[#0A1D37] border border-[#0A1D37]/10">
                    {area.relatedCategory}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0A1D37] group-hover:text-[#B08D57] transition-colors leading-snug">
                    {area.title}
                  </h3>
                  <p className="text-sm text-[#39465A] mt-2.5 leading-relaxed">
                    {area.shortDesc}
                  </p>
                </div>

                {/* Lead Counsel Callout */}
                {leadPerson && (
                  <div className="p-3.5 rounded-xl bg-[#FCFAF5] border border-[#0A1D37]/5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={leadPerson.image}
                        alt={leadPerson.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#B08D57]"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#B08D57] block">
                          Practice Lead
                        </span>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#0A1D37]">
                          {leadPerson.name}
                        </h4>
                        <span className="text-[11px] text-[#5E6A7A] block">
                          {leadPerson.role} • {leadPerson.experience}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('team', leadPerson.id)}
                      className="text-xs font-semibold text-[#0A1D37] hover:text-[#B08D57] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Bio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                    </button>
                  </div>
                )}

                {/* Key Legal Services Checklist */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E6A7A]">
                    Key Advisory & Representation Services:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {area.keyServices.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#39465A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57] flex-shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Governing Legal Frameworks */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E6A7A]">
                    Governing Frameworks & Treaties:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {area.governingFrameworks.map((fw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FCFAF5] text-[#0A1D37] border border-[#0A1D37]/10"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Deep-Dive */}
                {isExpanded && (
                  <div className="pt-4 border-t border-[#0A1D37]/10 space-y-4 animate-in fade-in duration-300">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E6A7A] mb-1">
                        Domain Methodology:
                      </h4>
                      <p className="text-xs text-[#39465A] leading-relaxed">
                        {area.fullDesc}
                      </p>
                    </div>

                    {/* Associated Masterclass */}
                    {relatedCourse && (
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FCFAF5] to-white border border-[#B08D57]/30 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-5 h-5 text-[#B08D57] flex-shrink-0" />
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#B08D57] block">
                              Accredited Academy Masterclass
                            </span>
                            <span className="font-serif font-bold text-xs text-[#0A1D37] block line-clamp-1">
                              {relatedCourse.title}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setQuickViewCourseId(relatedCourse.id)}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-[#0A1D37] text-[#F7F3EB] hover:bg-[#0F2647] flex items-center gap-1 flex-shrink-0"
                        >
                          <span>Syllabus</span>
                          <ExternalLink className="w-3 h-3 text-[#B08D57]" />
                        </button>
                      </div>
                    )}

                    {/* Related Legal Hub Articles */}
                    {relatedArticles.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E6A7A] block">
                          Published Practice Briefs:
                        </span>
                        <div className="space-y-1.5">
                          {relatedArticles.map((article) => (
                            <div
                              key={article.id}
                              onClick={() => navigateTo('blog-detail', article.slug)}
                              className="p-2 rounded-lg bg-[#FCFAF5] hover:bg-[#B08D57]/10 cursor-pointer transition-colors flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2 line-clamp-1">
                                <BookOpen className="w-3.5 h-3.5 text-[#B08D57] flex-shrink-0" />
                                <span className="font-medium text-[#0A1D37] hover:text-[#B08D57]">
                                  {article.title}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#5E6A7A] flex-shrink-0 ml-2">
                                {article.readTime}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 py-4 sm:px-8 bg-[#FCFAF5] border-t border-[#0A1D37]/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setExpandedAreaId(isExpanded ? null : area.id)}
                  className="text-xs font-semibold text-[#5E6A7A] hover:text-[#0A1D37] flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Show Less' : 'Methodology & Articles'}</span>
                  <span className="text-[#B08D57]">{isExpanded ? '▲' : '▼'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {relatedCourse && (
                    <button
                      onClick={() => navigateTo('course-detail', relatedCourse.slug)}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-[#0A1D37]/20 text-[#0A1D37] hover:bg-white transition-all"
                    >
                      Course
                    </button>
                  )}
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647] flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Instruct Counsel</span>
                    <ArrowRight className="w-3 h-3 text-[#B08D57]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3-Step Instruction Lifecycle Section */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#0A1D37]/10 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Institutional Protocol
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0A1D37]">
            How We Engage on High-Stakes Cross-Border Matters
          </h2>
          <p className="text-sm text-[#5E6A7A]">
            A transparent, confidential, three-stage instruction protocol designed to protect client privilege and eliminate conflict-of-interest risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FCFAF5] border border-[#0A1D37]/5 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#0A1D37] text-white font-serif font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="font-serif font-bold text-base text-[#0A1D37]">
              Confidential Conflict Check
            </h3>
            <p className="text-xs text-[#5E6A7A] leading-relaxed">
              We clear potential conflicts across our London, Singapore, Geneva, and Indian rosters before receiving any privileged evidentiary dossiers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FCFAF5] border border-[#0A1D37]/5 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#B08D57] text-white font-serif font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="font-serif font-bold text-base text-[#0A1D37]">
              Scope & Lex Arbitri Formulation
            </h3>
            <p className="text-xs text-[#5E6A7A] leading-relaxed">
              A bespoke engagement letter setting out substantive governing law, procedural milestones, evidentiary timetables, and fixed fee structures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FCFAF5] border border-[#0A1D37]/5 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#0A1D37] text-white font-serif font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="font-serif font-bold text-base text-[#0A1D37]">
              Intervention & Worldwide Relief
            </h3>
            <p className="text-xs text-[#5E6A7A] leading-relaxed">
              Deploying emergency arbitrator applications, Section 9 court protections, or coordinated multi-jurisdictional enforcement defenses.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setConsultationOpen(true)}
            className="px-8 py-3.5 rounded-full bg-[#0A1D37] text-white text-sm font-semibold hover:bg-[#0F2647] shadow-lg inline-flex items-center gap-2"
          >
            <Scale className="w-4 h-4 text-[#B08D57]" />
            <span>Submit Privileged Instruction Request</span>
          </button>
        </div>
      </section>
    </div>
  );
};
