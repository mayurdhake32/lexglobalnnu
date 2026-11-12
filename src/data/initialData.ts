import { BlogPost, Course, TeamMember } from '../types';

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Dr. Amara Okonkwo',
    role: 'Managing Partner',
    specialty: 'International Commercial & Treaty Arbitration',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Okonkwo founded Lex Global Advocacy after eighteen years in international dispute resolution across Europe, Africa, and Southeast Asia. She has sat as sole arbitrator, co-arbitrator, and counsel in over forty-five proceedings under ICC, LCIA, SIAC, and ICSID rules. She holds a Ph.D. in International Dispute Settlement from Cambridge and advises sovereign entities and infrastructure consortia.',
    admissions: ['Nigeria', 'England & Wales (Solicitor-Advocate)', 'Singapore (SICC Registered)'],
    languages: ['English', 'Yoruba', 'French'],
    courses: ['c1'],
    experience: '18 years',
    email: 'okonkwo@lexglobaladvocacy.org'
  },
  {
    id: 't2',
    name: 'Adv. Priya Menon',
    role: 'Partner, Transactional Practice',
    specialty: 'Cross-Border Contracts & Technology Transactions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Priya leads the cross-border transactional practice, advising institutional funds, cross-border fintech platforms, and enterprise software providers on cross-jurisdictional M&A, intellectual property licensing, and governing-law structures. Former legal director at an international sovereign investment vehicle.',
    admissions: ['India', 'New York (First Department)'],
    languages: ['English', 'Hindi', 'Malayalam'],
    courses: ['c2'],
    experience: '14 years',
    email: 'menon@lexglobaladvocacy.org'
  },
  {
    id: 't3',
    name: 'Dr. Sofia Lindqvist',
    role: 'Head of Data, Privacy & AI Governance',
    specialty: 'Cross-Border Data Transfers & Regulatory Compliance',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Lindqvist provides counsel on European GDPR, UK GDPR, Swiss FADP, and Asia-Pacific comparative privacy regimes. She previously advised the European Data Protection Board working group on Standard Contractual Clauses and currently councils multinational enterprises on enterprise AI risk frameworks.',
    admissions: ['Sweden', 'United Kingdom'],
    languages: ['English', 'Swedish', 'German', 'Danish'],
    courses: ['c3'],
    experience: '12 years',
    email: 'lindqvist@lexglobaladvocacy.org'
  },
  {
    id: 't4',
    name: 'Adv. Rohan Desai',
    role: 'Senior Counsel, Consumer & Market Practices',
    specialty: 'E-Commerce Liability & Cross-Border Consumer Rights',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Rohan is a seasoned advocate who has represented consumer collectives, platform operators, and digital commerce coalitions before national appellate commissions. He focuses on deceptive patterns, cross-border payment disputes, and digital contract enforcement.',
    admissions: ['Supreme Court of India', 'Delhi High Court Bar'],
    languages: ['English', 'Hindi', 'Gujarati'],
    courses: ['c4'],
    experience: '10 years',
    email: 'desai@lexglobaladvocacy.org'
  },
  {
    id: 't5',
    name: 'Adv. Nandita Rao',
    role: 'Real Estate & Infrastructure Counsel',
    specialty: 'Foreign Inward Investment & Real Property Due Diligence',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    bio: 'Nandita advises cross-border institutional property funds, diaspora buyers, and family offices on commercial acquisition title investigations, municipal sanction verification, and regulatory clearances across high-growth international corridors.',
    admissions: ['India', 'Singapore (Foreign Law Practice)'],
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    courses: ['c5'],
    experience: '15 years',
    email: 'rao@lexglobaladvocacy.org'
  },
  {
    id: 't6',
    name: 'Adv. Sameer Qureshi',
    role: 'Director of Advocacy & Legal Writing Institute',
    specialty: 'Appellate Submissions & Judicial Communication',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Sameer trains senior counsel, judges, and corporate law departments across the Commonwealth in persuasive legal drafting and precision advocacy. He is an editor for the International Journal of Legal Craft and author of three practitioner handbooks.',
    admissions: ['India', 'Honourable Society of Lincoln’s Inn (London)'],
    languages: ['English', 'Urdu', 'Hindi'],
    courses: ['c6'],
    experience: '13 years',
    email: 'qureshi@lexglobaladvocacy.org'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    slug: 'international-commercial-arbitration',
    title: 'International Commercial Arbitration: Strategy & Practice',
    category: 'Arbitration',
    level: 'Advanced',
    duration: '8 weeks · 24 lessons',
    price: 4999,
    instructor: 'Dr. Amara Okonkwo',
    instructorTitle: 'Arbitrator on LCIA, SIAC & ICC Panels',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    students: 1420,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    description: 'A practitioner-led masterclass on drafting arbitration agreements, seat selection, emergency arbitral measures, evidence, and cross-border enforcement under the New York Convention.',
    longDescription: 'This comprehensive programme is structured for arbitration practitioners, in-house counsel, and litigators who represent clients in international proceedings. Through detailed case dossiers, award drafts, and mock procedural orders, participants master institutional rules (ICC, LCIA, SIAC) and unpick complex jurisdictional disputes.',
    outcomes: [
      'Draft ironclad multi-tiered dispute resolution clauses robust against jurisdictional challenge',
      'Select arbitration seat, governing law, and tribunal composition strategically',
      'Deploy emergency arbitrator mechanisms and interim injunctions across borders',
      'Master the 1958 New York Convention defences and global asset attachment'
    ],
    audience: 'Litigation advocates, corporate legal counsel, international trade specialists, and LLM scholars.',
    prerequisites: 'Foundational understanding of commercial contracts and civil court procedure.',
    curriculum: [
      {
        title: 'Module 1: The Arbitration Agreement & Jurisdictional Foundations',
        lessons: [
          { id: 'l1', title: 'The New York Convention 1958 in Modern Practice', duration: '28 min', type: 'video', preview: true, contentSnippet: 'Analysis of Article II and Article V, public policy doctrine, and the test for valid arbitration agreements across contracting states.' },
          { id: 'l2', title: 'Drafting Dispute Resolution Clauses: Pathology & Perfection', duration: '32 min', type: 'video', preview: true, contentSnippet: 'Preventing split clauses, non-existent arbitral institutions, and conflicting governing laws.' },
          { id: 'l3', title: 'Selecting the Seat vs Venue: Practical Repercussions', duration: '24 min', type: 'text', preview: false, contentSnippet: 'Why the legal seat governs lex arbitri, supervisory court powers, and set-aside actions.' }
        ]
      },
      {
        title: 'Module 2: Procedural Management & Evidence Under IBA Rules',
        lessons: [
          { id: 'l4', title: 'Emergency Arbitrators & Interim Measures', duration: '25 min', type: 'video', preview: false, contentSnippet: 'Obtaining freezing orders and preservation directives before tribunal constitution.' },
          { id: 'l5', title: 'Witness Statements, Document Production & Redfern Schedules', duration: '30 min', type: 'video', preview: false, contentSnippet: 'Applying the IBA Rules on the Taking of Evidence in International Arbitration.' },
          { id: 'l6', title: 'Virtual Hearings & Cybersecurity Protocols', duration: '20 min', type: 'resource', preview: false, contentSnippet: 'Seoul Protocol compliance and safeguarding confidential commercial witness testimony.' }
        ]
      },
      {
        title: 'Module 3: Award Formulation, Set-Aside & Enforcement',
        lessons: [
          { id: 'l7', title: 'Drafting Awards: Minimising Set-Aside Vulnerability', duration: '29 min', type: 'video', preview: false, contentSnippet: 'Structuring findings of fact, governing law analysis, and interest calculation.' },
          { id: 'l8', title: 'Cross-Border Enforcement & Sovereign Asset Attachment', duration: '35 min', type: 'video', preview: false, contentSnippet: 'Overcoming sovereign immunity shields under the restrictive immunity doctrine.' }
        ]
      }
    ],
    faqs: [
      { question: 'Is this course tailored to a specific country?', answer: 'The curriculum addresses international commercial arbitration principles under the New York Convention, UNCITRAL Model Law, ICC, and LCIA rules, with comparative notes for the UK, EU, Singapore, US, and India.' },
      { question: 'Will I receive an accredited certificate?', answer: 'Yes. Upon passing all module knowledge checks and the final assessment, you will unlock a verifiable Lex Global Advocacy Certificate of Completion.' },
      { question: 'Are clause templates and checklists included?', answer: 'Yes. Downloadable clause libraries, Redfern schedule templates, and procedural order models are provided in lesson resources.' }
    ],
    quiz: {
      question: 'Under Article V(1)(c) of the 1958 New York Convention, what is a recognised ground for refusing recognition and enforcement of an award?',
      options: [
        'The arbitral tribunal rendered an award not dealing with a difference contemplated by or not falling within the terms of the submission to arbitration',
        'The prevailing party was represented by counsel from a non-member state',
        'The hearing was conducted in an official language other than Latin or French',
        'The respondent was dissatisfied with the commercial outcome of the damages computation'
      ],
      answer: 0,
      explanation: 'Article V(1)(c) provides that enforcement may be refused if the award deals with a difference not contemplated by or not falling within the submission to arbitration, or contains decisions on matters beyond the scope of the submission.'
    },
    related: ['c2', 'c3'],
    published: true
  },
  {
    id: 'c2',
    slug: 'cross-border-contract-drafting',
    title: 'Cross-Border Contract Drafting & Negotiation',
    category: 'Cross-Border Contracts',
    level: 'Intermediate',
    duration: '6 weeks · 18 lessons',
    price: 3499,
    instructor: 'Adv. Priya Menon',
    instructorTitle: 'International Commercial & M&A Counsel',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    students: 1180,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    description: 'Master the art of drafting commercial agreements that bridge common law and civil law doctrines, allocate foreign exchange risks, and withstand cross-border disputes.',
    longDescription: 'When contractual counterparties operate under different legal systems, standard boilerplate can produce catastrophic unintended liabilities. This course equips lawyers and corporate negotiators with techniques to structure clear indemnities, force majeure provisions, representations and warranties, and currency adjustment clauses.',
    outcomes: [
      'Structure governing law, forum selection, and enforcement mechanisms seamlessly',
      'Draft battle-tested indemnity, limitation of liability, and liquidated damages provisions',
      'Harmonize international terms with Incoterms 2020 and Vienna Sales Convention (CISG)',
      'Negotiate representations, warranties, and disclosure letters across borders'
    ],
    audience: 'In-house counsel, transactional associates, commercial contracts managers, and corporate founders.',
    prerequisites: 'Basic knowledge of contract law doctrines.',
    curriculum: [
      {
        title: 'Module 1: Architecture of the International Agreement',
        lessons: [
          { id: 'l1', title: 'Governing Law vs Forum Clauses: Resolving Conflict of Laws', duration: '22 min', type: 'video', preview: true, contentSnippet: 'Decoupling governing law from jurisdiction and evaluating Rome I Regulation standards.' },
          { id: 'l2', title: 'Representations, Warranties & Indemnities: Cross-System Divergence', duration: '28 min', type: 'video', preview: true, contentSnippet: 'How common law concepts of warranty breach differ from civil law performance defects.' }
        ]
      },
      {
        title: 'Module 2: Risk Allocation & Commercial Protections',
        lessons: [
          { id: 'l3', title: 'Drafting Consequential Loss & Liability Caps', duration: '26 min', type: 'video', preview: false, contentSnippet: 'Examining Hadley v Baxendale exclusions and gross negligence carve-outs.' },
          { id: 'l4', title: 'Modern Force Majeure, Hardship & Sanctions Clauses', duration: '24 min', type: 'resource', preview: false, contentSnippet: 'ICC 2020 Force Majeure clause models and geopolitical compliance triggers.' }
        ]
      }
    ],
    faqs: [
      { question: 'Is this applicable to tech and SaaS contracts?', answer: 'Yes, dedicated case studies explore cross-border SaaS, SLA indemnities, and data licensing agreements.' }
    ],
    quiz: {
      question: 'Which of the following is true regarding a governing law clause in a cross-border commercial contract?',
      options: [
        'A governing law clause automatically dictates which court has exclusive procedural jurisdiction',
        'A governing law clause selects the substantive legal system used to interpret rights, while jurisdiction determines the forum for disputes',
        'Governing law is invalid if parties choose a neutral third-country legal system such as English or New York law',
        'Governing law clauses supersede mandatory public policy and criminal statutes of the enforcement state'
      ],
      answer: 1,
      explanation: 'Substantive governing law (e.g., English or Swiss law) interprets the meaning and performance of the contract, whereas jurisdiction or arbitration clauses determine the forum that hears the dispute.'
    },
    related: ['c1', 'c3'],
    published: true
  },
  {
    id: 'c3',
    slug: 'global-data-privacy-compliance',
    title: 'Global Data Privacy, GDPR & AI Governance',
    category: 'Data & Privacy',
    level: 'Intermediate',
    duration: '7 weeks · 21 lessons',
    price: 3999,
    instructor: 'Dr. Sofia Lindqvist',
    instructorTitle: 'European & International Privacy Counsel',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    students: 950,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    description: 'Navigate GDPR, EU AI Act, international transfer mechanisms (SCCs, BCRs), and regulatory breach reporting protocols with confidence.',
    longDescription: 'An operational and legal deep-dive for Data Protection Officers, technology counsel, and risk managers navigating multi-jurisdictional data compliance. Learn how to perform Transfer Impact Assessments (TIAs), respond to international regulatory investigations, and draft Data Processing Agreements (DPAs).',
    outcomes: [
      'Conduct rigorous Transfer Impact Assessments (TIAs) compliant with Schrems II precedents',
      'Execute EU and UK Standard Contractual Clauses with necessary supplementary measures',
      'Establish a 72-hour cross-border data breach notification response command',
      'Implement AI governance checks aligned with the EU AI Act risk categorisation'
    ],
    audience: 'Privacy lawyers, DPOs, compliance officers, and cloud architects.',
    prerequisites: 'Familiarity with enterprise data workflows.',
    curriculum: [
      {
        title: 'Module 1: Principles, Lawful Bases & Cross-Border Mechanisms',
        lessons: [
          { id: 'l1', title: 'GDPR Fundamentals in Cross-Border Operations', duration: '24 min', type: 'video', preview: true, contentSnippet: 'Territorial scope under Article 3 and accountability principle documentation.' },
          { id: 'l2', title: 'Standard Contractual Clauses & Supplementary Technical Measures', duration: '30 min', type: 'video', preview: true, contentSnippet: 'Implementing Module 1-4 clauses, encryption in transit/rest, and access controls.' }
        ]
      },
      {
        title: 'Module 2: Breach Response & Emerging AI Regulatory Regimes',
        lessons: [
          { id: 'l3', title: 'The 72-Hour Data Breach Protocol', duration: '25 min', type: 'video', preview: false, contentSnippet: 'Risk assessments, lead supervisory authority notification, and communication to data subjects.' },
          { id: 'l4', title: 'EU AI Act Compliance for Enterprise Counsel', duration: '28 min', type: 'text', preview: false, contentSnippet: 'High-risk classification, conformity assessments, and transparency requirements.' }
        ]
      }
    ],
    faqs: [
      { question: 'Does this cover US State privacy acts (CCPA/CPRA)?', answer: 'Yes, comparative matrices contrasting GDPR with California, Virginia, and APAC regulations (Singapore PDPA) are included.' }
    ],
    quiz: {
      question: 'Following the CJEU Schrems II ruling, what must an organisation conduct before transferring personal data outside the EEA using Standard Contractual Clauses (SCCs)?',
      options: [
        'A verbal notification to the European Data Protection Board',
        'A Transfer Impact Assessment (TIA) evaluating destination country public surveillance laws and supplementary safeguards',
        'A mandatory 30-day public notice in the EU Official Gazette',
        'A notarised indemnity waiver signed by all individual data subjects'
      ],
      answer: 1,
      explanation: 'Schrems II mandates that data exporters conduct a Transfer Impact Assessment to determine whether the recipient country’s laws provide equivalent protection, adopting supplementary measures if needed.'
    },
    related: ['c1', 'c2'],
    published: true
  },
  {
    id: 'c4',
    slug: 'consumer-protection-across-borders',
    title: 'Cross-Border Consumer Protection & Platform Law',
    category: 'Consumer Protection',
    level: 'Beginner',
    duration: '5 weeks · 15 lessons',
    price: 0,
    instructor: 'Adv. Rohan Desai',
    instructorTitle: 'Consumer Protection & Digital Platform Advocate',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    students: 2340,
    image: 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1400&q=80',
    description: 'An open-access foundational course on consumer statutory rights, deceptive design patterns, cross-border e-commerce disputes, and complaint advocacy.',
    longDescription: 'Consumers and digital merchants frequently encounter jurisdictional deadlocks when purchases cross borders. This accessible course explains statutory warranties, chargeback frameworks, consumer commission litigation, and digital platform liability.',
    outcomes: [
      'Identify deceptive dark patterns and deceptive trade practices prohibited under modern statutes',
      'Navigate consumer protection commissions and dispute mechanisms effectively',
      'Resolve e-commerce delivery failures, refund refusals, and product liability claims',
      'Understand statutory limitation periods and evidentiary standards in consumer advocacy'
    ],
    audience: 'Consumers, paralegals, junior advocates, e-commerce managers, and consumer ombudsman teams.',
    prerequisites: 'None. This course is offered entirely free to advance public legal literacy.',
    curriculum: [
      {
        title: 'Module 1: Consumer Rights Frameworks',
        lessons: [
          { id: 'l1', title: 'Who is a Consumer? Statutory Definitions & Exclusions', duration: '18 min', type: 'video', preview: true, contentSnippet: 'Distinguishing commercial transactions from consumer purchases and third-party marketplace liabilities.' },
          { id: 'l2', title: 'Unfair Trade Practices & False Advertising', duration: '22 min', type: 'video', preview: true, contentSnippet: 'Substantiation of claims, misleading discounts, and product defect jurisprudence.' }
        ]
      },
      {
        title: 'Module 2: Practical Remedies & Forum Advocacy',
        lessons: [
          { id: 'l3', title: 'Drafting an Effective Consumer Notice & Complaint', duration: '20 min', type: 'resource', preview: true, contentSnippet: 'Sample notice templates, statement of claim, and annexure compilation.' },
          { id: 'l4', title: 'Cross-Border Payment Chargebacks and Platform ADR', duration: '19 min', type: 'text', preview: false, contentSnippet: 'Mastercard and Visa chargeback codes, PayPal mediation, and statutory ombudsman schemes.' }
        ]
      }
    ],
    faqs: [
      { question: 'Is this course completely free?', answer: 'Yes. Lex Global Advocacy provides this course free of tuition as part of our pro-bono educational charter.' }
    ],
    quiz: {
      question: 'What is the primary legal definition of an "Unfair Contract Term" in consumer protection legislation?',
      options: [
        'Any term written in font smaller than 14pt',
        'A term that creates a significant imbalance in the parties’ rights to the detriment of the consumer contrary to good faith',
        'Any clause that requires payment in digital currency',
        'A term requiring electronic signatures instead of physical wet ink'
      ],
      answer: 1,
      explanation: 'Standard consumer protection acts define unfair terms as those that cause a significant imbalance in rights and obligations arising under the contract, to the detriment of the consumer, contrary to the requirement of good faith.'
    },
    related: ['c2', 'c6'],
    published: true
  },
  {
    id: 'c5',
    slug: 'cross-border-real-estate-due-diligence',
    title: 'Cross-Border Real Estate Transactions & Title Due Diligence',
    category: 'Real Estate',
    level: 'Advanced',
    duration: '7 weeks · 20 lessons',
    price: 4499,
    instructor: 'Adv. Nandita Rao',
    instructorTitle: 'International Real Estate & Title Counsel',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    students: 620,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80',
    description: 'Learn institutional-grade title search methodologies, foreign ownership restrictions, escrow structuring, and transaction closing checklists.',
    longDescription: 'Real property transactions involving foreign investors require exhaustive verification of thirty-year title chains, zoning approvals, environmental encumbrances, and tax withholding. This course equips transactional practitioners with hands-on due-diligence toolkits.',
    outcomes: [
      'Construct a 30-year forensic root-of-title investigation report',
      'Identify agricultural conversion restrictions, easement encumbrances, and pending lis pendens litigation',
      'Structure foreign direct investment (FDI) compliance and repatriation protocols',
      'Draft institutional closing escrow agreements and title warranties'
    ],
    audience: 'Real estate lawyers, private wealth advisors, institutional property funds, and conveyance practitioners.',
    prerequisites: 'Knowledge of basic property and conveyancing law.',
    curriculum: [
      {
        title: 'Module 1: The Root of Title & Revenue Records',
        lessons: [
          { id: 'l1', title: 'Forensic Title Tracing: Thirty-Year Search Methodology', duration: '26 min', type: 'video', preview: true, contentSnippet: 'Examining registered deeds, index registers, revenue mutations, and partition deeds.' },
          { id: 'l2', title: 'Encumbrance Certificates, Lis Pendens & Court Searches', duration: '24 min', type: 'video', preview: true, contentSnippet: 'Detecting undisclosed mortgages, government acquisitions, and court stay orders.' }
        ]
      }
    ],
    faqs: [
      { question: 'Does this cover tax clearances on property disposal?', answer: 'Yes, withholding tax obligations (e.g. FIRPTA in the US, Section 195 in India, CGT in the UK) are analyzed in depth.' }
    ],
    quiz: {
      question: 'What is the doctrine of "Lis Pendens" in real property conveyancing?',
      options: [
        'A property automatically increases in appraised value once registered',
        'During ongoing litigation regarding property title, the property cannot be transferred or alienated so as to affect the rights of any party under the decree',
        'Title deeds become public domain after 100 years',
        'Only commercial banks can conduct real estate auctions'
      ],
      answer: 1,
      explanation: 'The doctrine of Lis Pendens stipulates that while a suit or proceeding regarding title or rights in immovable property is pending, the property cannot be alienated by any party so as to prejudice the opposing party.'
    },
    related: ['c2', 'c3'],
    published: true
  },
  {
    id: 'c6',
    slug: 'legal-writing-for-global-practice',
    title: 'Legal Writing & Persuasive Advocacy for Global Practice',
    category: 'Legal Writing',
    level: 'All Levels',
    duration: '4 weeks · 12 lessons',
    price: 0,
    instructor: 'Adv. Sameer Qureshi',
    instructorTitle: 'Director of Advocacy & Senior Appellate Advocate',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    students: 3100,
    image: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1400&q=80',
    description: 'Transform complex legal arguments into compelling, razor-sharp submissions, client memos, and judicial briefs. Free for all legal professionals.',
    longDescription: 'Judges and clients read under intense time constraints. This writing-intensive programme strips away legalese, archaic Latin formulas, and convoluted syntax to instill precision, narrative momentum, and clarity into modern legal prose.',
    outcomes: [
      'Master the Executive Summary and IRAC/CREAC structural architectures',
      'Eliminate nominalisations, passive obfuscations, and archaic legal cliches',
      'Frame procedural issues persuasively to win judicial sympathy early',
      'Draft concise, actionable client advisory opinions in plain business English'
    ],
    audience: 'Junior associates, judicial law clerks, senior advocates, and legal writers.',
    prerequisites: 'None. Free open-access course.',
    curriculum: [
      {
        title: 'Module 1: The Architecture of Clear Thought',
        lessons: [
          { id: 'l1', title: 'The One-Page Executive Legal Memo', duration: '18 min', type: 'video', preview: true, contentSnippet: 'Structuring the Question Presented, Brief Answer, and Core Recommendation.' },
          { id: 'l2', title: 'Paragraph Momentum & Topic Sentences', duration: '20 min', type: 'text', preview: true, contentSnippet: 'Building logical bridges between premises, precedent analysis, and conclusions.' }
        ]
      }
    ],
    faqs: [
      { question: 'Are there writing exercises with model answers?', answer: 'Yes, each lesson includes an interactive "before-and-after" redrafting dossier.' }
    ],
    quiz: {
      question: 'What is the primary advantage of active voice in legal advocacy writing?',
      options: [
        'It makes sentences longer and more impressive',
        'It identifies the actor clearly, reduces ambiguity regarding legal duty, and makes arguments more forceful and direct',
        'It prevents the opposing party from cross-examining documents',
        'It is strictly required by the New York Convention'
      ],
      answer: 1,
      explanation: 'Active voice specifies who must perform what action (e.g. "The Respondent breached" rather than "A breach was committed"), removing uncertainty regarding legal agency and responsibility.'
    },
    related: ['c1', 'c2'],
    published: true
  }
];

export const LEGAL_IMAGE_PRESETS = [
  { label: 'Law Library & Volumes', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Contract Signing & Fountain Pen', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Technology & Cybersecurity Shield', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Digital Commerce & Transactions', url: 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1400&q=80' },
  { label: 'International Diplomacy & Flags', url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Modern Office & Legal Briefcase', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Architectural Real Property', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Courtroom Gavel & Scales', url: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1400&q=80' }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'p1',
    slug: 'new-york-convention-enforcement-primer',
    title: 'The 1958 New York Convention: A Strategic Guide to Global Award Enforcement',
    subtitle: 'Why the New York Convention remains the undisputed bedrock of cross-border dispute resolution — and how sophisticated counsel pre-empt Article V challenges.',
    category: 'Arbitration',
    tags: ['Arbitration', 'New York Convention', 'Enforcement', 'Cross-Border', 'Litigation'],
    author: 'Dr. Amara Okonkwo',
    authorRole: 'Managing Partner & Arbitrator',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date: '2026-10-18',
    updated: '2026-10-22',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    featured: true,
    published: true,
    views: 3420,
    likes: 184,
    relatedCourseId: 'c1',
    content: `
      <p class="lead text-lg font-serif italic text-[#39465A] border-l-4 border-[#B08D57] pl-4 my-6">
        "An arbitral award is only as valuable as the assets it can successfully attach. International arbitration that ignores post-award execution is an academic exercise."
      </p>

      <h2>The Enduring Genius of the 1958 Architecture</h2>
      <p>
        Over 170 contracting states adhere to the Convention on the Recognition and Enforcement of Foreign Arbitral Awards (the New York Convention). Its foundational premise is deceptively simple: foreign arbitral awards must be recognized as binding and enforced generally in accordance with the rules of procedure of the territory where the award is relied upon, without re-litigating the underlying merits of the dispute.
      </p>
      <p>
        Unlike judgments rendered by state courts—which often require bilateral enforcement treaties, letters rogatory, or reciprocal exequatur proceedings—arbitral awards benefit from an international presumption of validity.
      </p>

      <h2>The Exhaustive Grounds of Article V</h2>
      <p>
        Article V represents an exhaustive list of defenses. A national enforcing court cannot craft novel common-law grounds to deny enforcement; it is strictly constrained to the defenses established under Article V(1) (raised by the resisting party) and Article V(2) (invoked ex officio by the court).
      </p>

      <h3>1. Incapacity and Agreement Invalidity (Article V(1)(a))</h3>
      <p>
        Resisting parties often claim that the signatory lacked requisite corporate authority or that the underlying arbitration clause violates the law of the seat. Proactive transactional counsel eliminate this vulnerability by obtaining formal board resolutions and specifying a clear governing law for the arbitration agreement itself.
      </p>

      <h3>2. Lack of Proper Notice or Due Process (Article V(1)(b))</h3>
      <p>
        Due process violations remain the most frequently litigated defense. To insulate an award, tribunals and prevailing counsel must ensure documented service of notices through formal courier confirmations, verifiable electronic transmissions, and reasonable extensions where time zones or translation needs arise.
      </p>

      <h3>3. Excess of Mandate (Article V(1)(c))</h3>
      <p>
        Where an award ventures into claims or counterclaims never submitted to the tribunal, Article V(1)(c) permits severability: the enforcing court may enforce those portions within the submission while excising the ultra vires holdings.
      </p>

      <blockquote>
        "The public policy exception under Article V(2)(b) is construed with extreme narrowness across major pro-enforcement seats. It applies only when enforcement would violate the forum state's most fundamental notions of morality and justice."
      </blockquote>

      <h2>Practical Checklist for Transactional and Dispute Counsel</h2>
      <ul>
        <li><strong>Verify contracting status:</strong> Ensure both the seat jurisdiction and all potential asset jurisdictions have ratified the Convention without fatal reservations.</li>
        <li><strong>Preserve the original certified documents:</strong> Maintain apostilled or consularized copies of the arbitration agreement and award, along with certified translations into the enforcement jurisdiction’s official court language.</li>
        <li><strong>Deploy simultaneous asset tracing:</strong> Pre-judgment freezing orders and worldwide Mareva injunctions should be co-ordinated in jurisdictions where debtor subsidiaries maintain trade receivables, letters of credit, or bank accounts.</li>
      </ul>

      <p class="mt-8 text-sm text-[#5E6A7A] bg-[#FCFAF5] p-4 rounded-xl border border-[#0A1D37]/10">
        <em>Statutory Disclaimer:</em> This commentary is provided for educational and analytical purposes only. International enforcement requires jurisdiction-specific counsel licensed in the relevant execution forums.
      </p>
    `,
    comments: [
      {
        id: 'cm1',
        author: 'Julian Sterling, KC',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        date: '2026-10-20',
        content: 'Superb breakdown, Dr. Okonkwo. In English Commercial Court jurisprudence, the threshold for Article V(1)(b) notice challenges has indeed remained high. Documenting electronic delivery receipts has proven decisive in recent enforcement resisting applications.',
        likes: 14,
        isLiked: false,
        replies: [
          {
            id: 'cm1-r1',
            author: 'Dr. Amara Okonkwo',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            date: '2026-10-21',
            content: 'Thank you Julian. Indeed, the LCIA 2020 rules on electronic notifications have significantly mitigated those evidentiary challenges.'
          }
        ]
      },
      {
        id: 'cm2',
        author: 'Elena Vasquez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        date: '2026-10-22',
        content: 'Particularly appreciated the emphasis on severability under Article V(1)(c). We frequently see tribunals award declaratory relief that strayed slightly outside the initial terms of reference.',
        likes: 8,
        isLiked: false
      }
    ]
  },
  {
    id: 'p2',
    slug: 'gdpr-cross-border-transfers-post-schrems',
    title: 'Cross-Border Data Transfers Under GDPR: The Compliance Blueprint',
    subtitle: 'Navigating Standard Contractual Clauses, Transfer Impact Assessments (TIAs), and supplementary encryption protocols in high-risk foreign jurisdictions.',
    category: 'Data & Privacy',
    tags: ['GDPR', 'Data Privacy', 'Compliance', 'EU Law', 'Cybersecurity'],
    author: 'Dr. Sofia Lindqvist',
    authorRole: 'Head of Data & Privacy',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    date: '2026-10-14',
    updated: '2026-10-17',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    featured: false,
    published: true,
    views: 2890,
    likes: 142,
    relatedCourseId: 'c3',
    content: `
      <h2>The Global Reach of Chapter V GDPR</h2>
      <p>
        Under Chapter V of the General Data Protection Regulation (Regulation (EU) 2016/679), personal data cannot leave the European Economic Area unless the importing country guarantees an essentially equivalent level of protection, or the data exporter implements appropriate safeguards.
      </p>

      <h2>The Modern Transfer Impact Assessment (TIA)</h2>
      <p>
        Merely signing the European Commission’s modular Standard Contractual Clauses (SCCs) is no longer a safe harbor. Following the Court of Justice of the European Union (CJEU) landmark Schrems II decision, exporters must carry out a documented Transfer Impact Assessment.
      </p>
      <ul>
        <li><strong>Step 1: Mapping the Data Flow:</strong> Categorize data sensitivity, special categories of personal data (Article 9), and whether data is stored at rest or merely routed through sub-processors.</li>
        <li><strong>Step 2: Legal Environment Evaluation:</strong> Assess destination laws concerning government surveillance and national security intercept powers.</li>
        <li><strong>Step 3: Supplementary Technical Measures:</strong> Implement end-to-end encryption where keys are held exclusively within the EEA, pseudonymization, or multi-party split processing.</li>
      </ul>

      <blockquote>
        "If foreign statutory laws mandate backdoors or access to unencrypted cryptographic keys without independent judicial oversight, SCCs alone cannot legitimize the transfer."
      </blockquote>

      <h2>Contractual Auditing & Breach Escalation</h2>
      <p>
        Organizations must ensure their Data Processing Agreements contain strict 48-hour notification triggers upon receiving governmental subpoena requests, backed by obligations to exhaust legal challenges before disclosing EEA citizen data.
      </p>
    `,
    comments: [
      {
        id: 'cm3',
        author: 'Marc Dubois',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        date: '2026-10-16',
        content: 'Essential guidance. The distinction between encryption keys held by US cloud providers versus customer-managed keys held within the EU has been the focal point of our latest supervisory audits.',
        likes: 11,
        isLiked: false
      }
    ]
  },
  {
    id: 'p3',
    slug: 'drafting-bulletproof-indemnities-international-contracts',
    title: 'Drafting Bulletproof Indemnities in Cross-Border Commercial Agreements',
    subtitle: 'Bridging the common law and civil law divide on consequential damages, gross negligence carve-outs, and liability caps.',
    category: 'Cross-Border Contracts',
    tags: ['Contracts', 'Drafting', 'Commercial Law', 'Risk Management'],
    author: 'Adv. Priya Menon',
    authorRole: 'Partner, Transactional Practice',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    date: '2026-10-06',
    updated: '2026-10-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    featured: false,
    published: true,
    views: 2150,
    likes: 98,
    relatedCourseId: 'c2',
    content: `
      <h2>Why Indemnities Generate Intense Cross-Border Friction</h2>
      <p>
        In common-law drafting traditions (England, US, Singapore, India), an indemnity creates an independent, debt-based primary obligation to hold another harmless. In civil-law jurisdictions (France, Germany, Switzerland), an indemnity is frequently assimilated into the statutory framework of breach of contractual duty and damages.
      </p>

      <h2>The Three Deadly Sins of Boilerplate Indemnification</h2>
      <ol>
        <li><strong>Failing to specify whether causation rules apply:</strong> Without precise wording, courts may debate whether common-law rules of remoteness (Hadley v Baxendale) or mitigation apply to indemnified claims.</li>
        <li><strong>Allowing uncapped exposure for non-IP claims:</strong> While IP third-party infringement is traditionally uncapped, general operational indemnities should always be tied to aggregate contract liability caps.</li>
        <li><strong>Ignoring the Defense Protocol:</strong> Who controls settlement negotiations when a third party sues? The agreement must specify whether the indemnifying party has the right to conduct the defense with counsel approved by the indemnified party.</li>
      </ol>
    `,
    comments: []
  },
  {
    id: 'p4',
    slug: 'cross-border-ecommerce-consumer-disputes',
    title: 'Consumer Rights in Cross-Border E-Commerce: Jurisdiction & Chargebacks',
    subtitle: 'How digital buyers and global merchants navigate payment disputes, unfair contract terms, and forum non conveniens.',
    category: 'Consumer Protection',
    tags: ['Consumer Rights', 'E-Commerce', 'Fintech', 'Dispute Resolution'],
    author: 'Adv. Rohan Desai',
    authorRole: 'Consumer Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    date: '2026-09-28',
    updated: '2026-10-01',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1400&q=80',
    featured: false,
    published: true,
    views: 1980,
    likes: 85,
    relatedCourseId: 'c4',
    content: `
      <h2>The Global Shopping Cart: Whose Law Governs?</h2>
      <p>
        When an individual in Madrid or Mumbai purchases a subscription or physical good from an entity registered in Delaware or Dublin, standard click-wrap terms of service frequently specify exclusive foreign courts.
      </p>
      <p>
        However, modern consumer protection legislation (including the EU Brussels I bis Regulation and Indian Consumer Protection Act 2019) renders foreign jurisdiction clauses unenforceable against domestic consumers if the merchant actively directed its commercial activities to the consumer's country of residence.
      </p>
      <h2>Practical Remedies for Defective or Undelivered Goods</h2>
      <ul>
        <li><strong>Bank Chargebacks:</strong> Utilizing credit card schemes (Visa/Mastercard Reason Code 13.1 for merchandise not received) within 120 days.</li>
        <li><strong>Statutory Ombudsman:</strong> Filing through national online consumer redressal portals with certified transaction receipts.</li>
      </ul>
    `,
    comments: []
  },
  {
    id: 'p5',
    slug: 'sovereign-immunity-asset-tracing',
    title: 'Sovereign Immunity & Asset Tracing in International Arbitration',
    subtitle: 'The commercial activity exception: When states act as market participants, their foreign assets become subject to execution.',
    category: 'Arbitration',
    tags: ['Sovereign Immunity', 'State Contracts', 'Arbitration', 'Enforcement'],
    author: 'Dr. Amara Okonkwo',
    authorRole: 'Managing Partner',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date: '2026-09-18',
    updated: '2026-09-20',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    featured: false,
    published: true,
    views: 3100,
    likes: 167,
    relatedCourseId: 'c1',
    content: `
      <h2>The Distinction Between Immunity from Jurisdiction and Immunity from Execution</h2>
      <p>
        Securing an arbitral award against a sovereign state is half the battle. While submitting to an ICC or ICSID arbitration clause constitutes an unequivocal waiver of immunity from jurisdiction, it rarely operates as an automatic waiver of immunity from execution.
      </p>
      <h2>The Restrictive Immunity Doctrine</h2>
      <p>
        Most contemporary jurisdictions differentiate between <em>acta jure imperii</em> (sovereign acts) and <em>acta jure gestionis</em> (commercial acts). Assets dedicated to sovereign functions (diplomatic bank accounts, military matériel, central bank reserves) enjoy absolute immunity. In contrast, commercial enterprise holdings, state-owned airline receivables, and mineral royalty escrow funds can be subject to court-ordered attachment.
      </p>
    `,
    comments: []
  },
  {
    id: 'p6',
    slug: 'plain-language-craft-international-legal-writing',
    title: 'The Architecture of Clarity: Plain-Language Craft in International Advocacy',
    subtitle: 'Why eliminating legalistic archaic formulas is a vital risk-mitigation strategy for modern international counsel.',
    category: 'Legal Writing',
    tags: ['Legal Writing', 'Advocacy', 'Clarity', 'Professional Standards'],
    author: 'Adv. Sameer Qureshi',
    authorRole: 'Director of Advocacy',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-30',
    updated: '2026-09-02',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1400&q=80',
    featured: false,
    published: true,
    views: 2600,
    likes: 195,
    relatedCourseId: 'c6',
    content: `
      <h2>Legalese is Not Precision; It is Obfuscation</h2>
      <p>
        Phrases like <em>"heretofore," "witnesseth," "inter alia,"</em> and <em>"provided always that"</em> do not render a document more legally sound. Instead, they strain reader comprehension, introduce conflicting provisos, and invite judicial skepticism.
      </p>
      <h2>Four Principles of Masterful Legal Prose</h2>
      <ol>
        <li><strong>Lead with the conclusion:</strong> Adopt the Bottom Line Up Front (BLUF) discipline. Busy general counsel and judges should not have to read through thirty pages of historical recital to learn who prevails.</li>
        <li><strong>Prefer active agents:</strong> Write <em>"The Tribunal rejected the claim"</em> rather than <em>"The claim was rejected by the Tribunal."</em></li>
        <li><strong>Keep one operative idea per sentence:</strong> Complex statutory references should be broken down into clean conditional subparagraphs.</li>
        <li><strong>Audit for nominalisations:</strong> Replace <em>"made an application for the rectification of"</em> with <em>"applied to rectify."</em></li>
      </ol>
    `,
    comments: []
  }
];

import { PracticeArea } from '../types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'pa-1',
    slug: 'international-arbitration',
    title: 'International Commercial & Treaty Arbitration',
    shortDesc: 'Advocacy before ICC, LCIA, SIAC, and ICSID tribunals, emergency relief, and worldwide award enforcement under the 1958 New York Convention.',
    fullDesc: 'Our arbitration practice represents sovereigns, global infrastructure consortia, and multinationals in multi-jurisdictional disputes. We specialize in drafting bulletproof dispute clauses, securing emergency arbitral injunctions, and piercing sovereign immunity shields to execute awards globally.',
    iconName: 'Scale',
    keyServices: [
      'Bespoke multi-tiered arbitration agreement drafting',
      'Seat selection and procedural law optimization (lex arbitri)',
      'Emergency arbitrator and worldwide freezing order applications',
      'Article V New York Convention defense and enforcement actions',
      'Sovereign commercial asset tracing and attachment'
    ],
    governingFrameworks: ['1958 New York Convention', 'UNCITRAL Model Law', 'IBA Rules on Taking Evidence', 'ICC & LCIA Rules'],
    leadCounsel: 'Dr. Amara Okonkwo',
    relatedCategory: 'Arbitration',
    courseId: 'c1'
  },
  {
    id: 'pa-2',
    slug: 'cross-border-contracts',
    title: 'Cross-Border Contracts & Technology Transactions',
    shortDesc: 'Bridging common law and civil law systems in cross-border M&A, technology licensing, supply chains, and governing-law structures.',
    fullDesc: 'We structure commercial agreements that remain resilient when tested across disparate legal regimes. Our counsel unpicks the divergence between civil law and common law concepts of warranty breach, indemnity causation, and hardship.',
    iconName: 'FileCheck',
    keyServices: [
      'Governing law, jurisdiction, and Rome I Regulation analysis',
      'Indemnity, consequential loss, and liability cap architecture',
      'Cross-border SaaS, software licensing, and IP assignments',
      'International supply agreements under Incoterms 2020 & CISG',
      'Force majeure and geopolitical sanctions risk mitigation'
    ],
    governingFrameworks: ['Rome I & II Regulations', 'Incoterms 2020', 'UN Convention on Contracts for International Sale of Goods (CISG)'],
    leadCounsel: 'Adv. Priya Menon',
    relatedCategory: 'Cross-Border Contracts',
    courseId: 'c2'
  },
  {
    id: 'pa-3',
    slug: 'data-privacy-ai',
    title: 'Global Data Privacy, GDPR & AI Governance',
    shortDesc: 'Navigating European GDPR, UK GDPR, cross-border transfer mechanisms, and compliance with the emerging EU AI Act.',
    fullDesc: 'We guide digital enterprises, cloud providers, and global platforms through international regulatory scrutiny, multi-jurisdiction data breach reporting, and rigorous Transfer Impact Assessments.',
    iconName: 'Shield',
    keyServices: [
      'Documented Transfer Impact Assessments (TIAs) under Schrems II',
      'Execution of EU and UK Standard Contractual Clauses (SCCs)',
      '72-Hour rapid cross-border data breach command and notification',
      'EU AI Act risk classification and conformity documentation',
      'Cross-border Data Processing Agreements (DPAs) and sub-processor audits'
    ],
    governingFrameworks: ['Regulation (EU) 2016/679 (GDPR)', 'UK Data Protection Act 2018', 'EU Artificial Intelligence Act', 'California CPRA'],
    leadCounsel: 'Dr. Sofia Lindqvist',
    relatedCategory: 'Data & Privacy',
    courseId: 'c3'
  },
  {
    id: 'pa-4',
    slug: 'consumer-protection',
    title: 'Cross-Border Consumer Protection & Digital Platforms',
    shortDesc: 'Defending against unfair trade practices, algorithmic deception, cross-border chargebacks, and marketplace liabilities.',
    fullDesc: 'As digital commerce transcends national borders, we provide strategic counsel on consumer commission litigation, digital terms of service compliance, and cross-border payment dispute resolution.',
    iconName: 'Users',
    keyServices: [
      'Deceptive design pattern and dark pattern compliance audits',
      'Consumer commission litigation and representative complaint advocacy',
      'Card scheme chargeback resolution (Visa & Mastercard dispute codes)',
      'Marketplace seller terms and unfair contract terms defense',
      'Multi-currency statutory refund and warranty enforcement'
    ],
    governingFrameworks: ['EU Brussels I bis Regulation', 'Consumer Protection Act 2019', 'FTC Unfair and Deceptive Practices Guides'],
    leadCounsel: 'Adv. Rohan Desai',
    relatedCategory: 'Consumer Protection',
    courseId: 'c4'
  },
  {
    id: 'pa-5',
    slug: 'real-estate-title',
    title: 'International Real Property & Title Due Diligence',
    shortDesc: 'Forensic thirty-year title investigations, agricultural zoning clearances, foreign inward investment compliance, and escrow structuring.',
    fullDesc: 'We protect institutional property funds, family offices, and diaspora purchasers from disputed title chains, undisclosed encumbrances, and regulatory acquisition hurdles across high-growth corridors.',
    iconName: 'Building',
    keyServices: [
      'Thirty-year root-of-title investigation and forensic deed tracing',
      'Encumbrance certificate verification and lis pendens court searches',
      'Foreign Direct Investment (FDI) property structuring and repatriation',
      'Agricultural land conversion and municipal approval audits',
      'Institutional closing escrow and title indemnity agreements'
    ],
    governingFrameworks: ['Transfer of Property Statutes', 'FDI Regulatory Guidelines', 'Conveyancing & Land Registration Acts'],
    leadCounsel: 'Adv. Nandita Rao',
    relatedCategory: 'Real Estate',
    courseId: 'c5'
  },
  {
    id: 'pa-6',
    slug: 'legal-writing-advocacy',
    title: 'Appellate Advocacy & Legal Writing Institute',
    shortDesc: 'Refining judicial submissions, appellate briefs, and executive legal memos for maximum persuasive velocity and clarity.',
    fullDesc: 'Our advocacy institute trains senior practitioners, corporate legal departments, and appellate counsel in the craft of clear, authoritative legal writing that cuts through judicial cognitive fatigue.',
    iconName: 'PenTool',
    keyServices: [
      'Senior appellate brief formulation and judicial strategy review',
      'Executive legal memo architecture (BLUF/CREAC methodologies)',
      'Plain-language redrafting of complex commercial and statutory opinions',
      'Judicial communication and persuasive oral submission preparation',
      'Institutional legal drafting handbooks for multinational legal teams'
    ],
    governingFrameworks: ['Commonwealth Appellate Practice Rules', 'Plain Language International Standards', 'Supreme Court Practice Directives'],
    leadCounsel: 'Adv. Sameer Qureshi',
    relatedCategory: 'Legal Writing',
    courseId: 'c6'
  }
];
