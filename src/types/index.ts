export interface BlogComment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  replies?: {
    id: string;
    author: string;
    avatar: string;
    date: string;
    content: string;
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  updated: string;
  readTime: string;
  image: string;
  featured: boolean;
  published: boolean;
  views: number;
  likes: number;
  relatedCourseId?: string;
  content: string;
  comments: BlogComment[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'resource';
  preview?: boolean;
  contentSnippet?: string;
}

export interface CourseModule {
  title: string;
  lessons: Lesson[];
}

export interface CourseQuiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  price: number;
  instructor: string;
  instructorTitle: string;
  instructorAvatar?: string;
  rating: number;
  students: number;
  image: string;
  description: string;
  longDescription: string;
  outcomes: string[];
  audience: string;
  prerequisites: string;
  curriculum: CourseModule[];
  faqs: { question: string; answer: string }[];
  quiz: CourseQuiz;
  related: string[];
  published: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  admissions: string[];
  languages: string[];
  courses: string[];
  experience: string;
  email: string;
}

export interface Enrollment {
  courseId: string;
  completedLessons: string[];
  enrolledAt: string;
  quizPassed: boolean;
  certificateId?: string;
  certificateIssuedAt?: string;
}

export interface ConsultationInquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  practiceArea: string;
  jurisdiction: string;
  description: string;
  urgency: 'Routine' | 'Urgent' | 'Immediate';
  createdAt: string;
  status: 'New' | 'Under Review' | 'Responded';
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyServices: string[];
  governingFrameworks: string[];
  leadCounsel: string;
  relatedCategory: string;
  courseId?: string;
}

export type NavigationPath = 
  | 'home'
  | 'practice-areas'
  | 'courses'
  | 'course-detail'
  | 'blogs'
  | 'blog-detail'
  | 'team'
  | 'learn'
  | 'admin';
