import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Scale, Globe, ArrowRight, Mail, ShieldCheck } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { team, setTeamModalId, setConsultationOpen } = useApp();
  const [filterSpecialty, setFilterSpecialty] = useState('');

  const specialties = Array.from(new Set(team.map((t) => t.specialty)));

  const filteredTeam = filterSpecialty
    ? team.filter((t) => t.specialty === filterSpecialty)
    : team;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#0A1D37]/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            <Users className="w-3.5 h-3.5" />
            <span>Our Global Legal Bench</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1D37] mt-2 tracking-tight">
            Practitioners, Arbitrators & Scholars
          </h1>
          <p className="text-sm sm:text-base text-[#39465A] mt-2 max-w-2xl leading-relaxed">
            Our counsel bench brings decades of senior advocacy before international arbitral tribunals, supranational courts, and enterprise transaction boards.
          </p>
        </div>

        <button
          onClick={() => setConsultationOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1D37] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F2647] shadow-md transition-all"
        >
          <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>Instruct Counsel / Inquiries</span>
        </button>
      </div>

      {/* Specialty Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterSpecialty('')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
            !filterSpecialty
              ? 'bg-[#0A1D37] text-white shadow-sm'
              : 'bg-white border border-[#0A1D37]/15 text-[#0A1D37] hover:border-[#B08D57]'
          }`}
        >
          All Counsel ({team.length})
        </button>
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setFilterSpecialty(spec === filterSpecialty ? '' : spec)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
              filterSpecialty === spec
                ? 'bg-[#B08D57] text-white shadow-sm'
                : 'bg-white border border-[#0A1D37]/15 text-[#0A1D37] hover:border-[#B08D57]'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            onClick={() => setTeamModalId(member.id)}
            className="rounded-2xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/60 shadow-sm hover:shadow-xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#B08D57] shadow-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57] block">
                    {member.role}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#0A1D37] group-hover:text-[#B08D57] transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#5E6A7A] block mt-0.5">
                    {member.experience} in practice
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F7F3EB] text-[11px] font-medium text-[#0A1D37] border border-[#0A1D37]/10">
                  {member.specialty}
                </span>
              </div>

              <p className="text-xs text-[#39465A] line-clamp-3 leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* Admissions list */}
              <div className="space-y-1.5 text-xs text-[#5E6A7A] pt-3 border-t border-[#0A1D37]/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#0A1D37] flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#B08D57]" />
                  <span>Admissions:</span>
                </div>
                <div className="text-[11px] text-[#39465A] truncate">
                  {member.admissions.join(' • ')}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#0A1D37]/5 flex items-center justify-between text-xs text-[#B08D57] font-semibold">
              <span className="group-hover:underline">View Full Dossier</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Banner */}
      <div className="p-8 rounded-2xl bg-[#FCFAF5] border border-[#B08D57]/30 text-center space-y-4 max-w-3xl mx-auto">
        <ShieldCheck className="w-8 h-8 text-[#B08D57] mx-auto" />
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1D37]">
          Conflict Checks & Engagement Protocols
        </h3>
        <p className="text-xs sm:text-sm text-[#5E6A7A] leading-relaxed max-w-xl mx-auto">
          All formal instructions and arbitrator nominations undergo rigorous institutional screening in compliance with international bar council guidelines and the IBA Guidelines on Conflicts of Interest.
        </p>
        <button
          onClick={() => setConsultationOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#0A1D37] text-white text-xs font-semibold hover:bg-[#0F2647] shadow-md"
        >
          Initiate Intake Clearance
        </button>
      </div>
    </div>
  );
};
