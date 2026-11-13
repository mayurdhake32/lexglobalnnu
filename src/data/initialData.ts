import { BlogPost, Course, TeamMember } from '../types';

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Adv. Sanjay Patil',
    role: 'Former District Judge & Former President, District Consumer Commission',
    specialty: 'Judicial Adjudication, Consumer Protection & Appellate Practice',
    image: 'sanjaypatil.jpeg',
    bio: 'Adv. Sanjay Patil is a revered jurist, Former District Judge, and Former President of the District Consumer Disputes Redressal Commission with distinguished service in the Indian judicial system.',
    admissions: ['Bar Council of Maharashtra & Goa', 'Bombay High Court', 'State Consumer Commission'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c5'],
    experience: '30 years',
    email: 'patil@lexglobaladvocacy.org'
  },
  {
    id: 't2',
    name: 'Adv. Kishor Vadane',
    role: 'Former District Judge & Former President, District Consumer Commission',
    specialty: 'Judicial Adjudication, Consumer Redressal & International Arbitration',
    image: 'kishor vadane.jpeg',
    bio: 'Advocate Kishor Vadane is a distinguished Former District Judge and Former President of the District Consumer Disputes Redressal Commission who also leads cross-border commercial disputes and arbitration strategy.',
    admissions: ['Bar Council of Maharashtra & Goa', 'Bombay High Court', 'State Consumer Commission'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c1'],
    experience: '30 years',
    email: 'vadane@lexglobaladvocacy.org'
  },
  {
    id: 't3',
    name: 'Adv. Shridhar Kulkarni',
    role: 'Former District Judge & Former President, District Consumer Commission',
    specialty: 'Judicial Adjudication, Consumer Protection Appeals & Commercial Arbitration',
    image: 'shridhark.jpeg',
    bio: 'Former District and Additional Sessions Judge and Former President of the District Consumer Disputes Redressal Commission in Maharashtra. Decades of judicial tenure presiding over high-stakes civil trials, consumer appeals, and arbitration enforcement.',
    admissions: ['Bar Council of Maharashtra & Goa', 'Higher Judicial Service (Retd.)', 'State Consumer Commission'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c1'],
    experience: '32 years',
    email: 'kulkarni@lexglobaladvocacy.org'
  },
  {
    id: 't4',
    name: 'Prof. Dr. Santosh Keshav Kakade',
    role: 'Founder & CEO · Former President & Member, State Consumer Commission, Mumbai · Senior Medicolegal Consultant',
    specialty: 'Medical Law, Medicolegal Consultancy, Healthcare Governance, Consumer Dispute Resolution & AI/Cyber Governance',
    image: 'santoshkakde.png',
    bio: 'Prof. Dr. Santosh Keshav Kakade is a distinguished legal academician, medical professional, surgeon and medicolegal consultant with over three decades of multidisciplinary experience in medicine, law, healthcare administration, consumer dispute resolution and legal education.',
    admissions: [],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c4'],
    experience: '30+ years',
    email: 'founder@lexglobaladvocacy.org'
  },
  {
    id: 't5',
    name: 'Adv. Ravindra Nagre',
    role: 'Former President, District Consumer Commission',
    specialty: 'Civil, Criminal Trial Advocacy & Consumer Jurisprudence',
    image: 'RAVINDRANAGARE.jpeg',
    bio: '27+ years of advocacy experience alongside dedicated judicial service as Former President of the District Consumer Disputes Redressal Commission.',
    admissions: ['Bar Council of Maharashtra & Goa', 'Bombay High Court', 'State Consumer Commission'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c4'],
    experience: '27 years',
    email: 'nagre@lexglobaladvocacy.org'
  },
  {
    id: 't6',
    name: 'Adv. Anand Bhalchandra Joshi',
    role: 'Former President, DCDRC (District Consumer Commission)',
    specialty: 'B.A., LL.B., LL.M., GDC&A, Diploma in Cyber Law, Cr.Vastu Shastra · Consumer Protection, Cyber Law & Banking Liability',
    image: 'anandjoshi1.jpeg',
    bio: 'Adv. Anand Bhalchandra Joshi (B.A., LL.B., LL.M., GDC&A, Diploma in Cyber Law, Cr.Vastu Shastra) served as Former President of the District Consumer Disputes Redressal Commission (DCDRC). Veteran authority on consumer protection rights, cyber law, co-operative law, banking and insurance claim repudiations, and commercial conciliation.',
    admissions: ['Bar Council of Maharashtra & Goa', 'District & Sessions Court Bar', 'State Consumer Commission'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c4'],
    experience: '28 years',
    email: 'joshi@lexglobaladvocacy.org'
  },
  {
    id: 't7',
    name: 'Adv. Sanjay Borwal',
    role: 'Former President, District Consumer Commission',
    specialty: 'Consumer Grievance Redressal & Public Utility Disputes',
    image: 'sanjayb.jpeg',
    bio: 'Former President of the District Consumer Disputes Redressal Commission. Expert in consumer grievance redressal forums (CGRF), public utility and power disputes, and builder-buyer contractual litigation.',
    admissions: ['Bar Council of Maharashtra & Goa', 'Bombay High Court', 'Consumer Grievance Redressal Forum'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c5'],
    experience: '26 years',
    email: 'borwal@lexglobaladvocacy.org'
  },
  {
    id: 't8',
    name: 'Adv. Avinash Prabhune',
    role: 'Former Member, District Consumer Commission',
    specialty: 'Consumer Protection Advocacy & Constitutional Writs',
    image: 'avinash_prabhune.jpg',
    bio: 'Former Judicial Member of the District Consumer Disputes Redressal Commission and petitioner in landmark High Court consumer tribunal jurisprudence. Focuses on builder-buyer disputes, utility deficiencies, and contempt proceedings.',
    admissions: ['Bar Council of Maharashtra & Goa', 'High Court Bar Association Nagpur', 'State Consumer Commission'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c4'],
    experience: '24 years',
    email: 'prabhune@lexglobaladvocacy.org'
  },
  {
    id: 't9',
    name: 'Adv. Mahesh Dhake',
    role: 'Former Member, District Consumer Commission',
    specialty: 'BSL.LL.B., A.D.C.A., AI and Law · Consumer Redressal, Corporate Finance, Banking, D.R.T & Recovery',
    image: 'maheshdhake.jpeg',
    bio: '25+ years practicing advocate (BSL.LL.B., A.D.C.A., and AI and Law) and Former Member, District Consumer Disputes Redressal Commission, Ahmednagar, specializing in banking, SARFAESI, D.R.T & corporate recovery.',
    admissions: ['Bar Council of Maharashtra & Goa', 'Bombay High Court'],
    languages: ['English', 'Marathi', 'Hindi'],
    courses: ['c2'],
    experience: '25 years',
    email: 'dhake@lexglobaladvocacy.org'
  }
];

export const INITIAL_COURSES: Course[] = [];

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

export const INITIAL_POSTS: BlogPost[] = [];

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
