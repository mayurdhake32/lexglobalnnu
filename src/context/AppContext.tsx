import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { BlogPost, Course, TeamMember, Enrollment, ConsultationInquiry, NavigationPath, PracticeArea } from '../types';
import { INITIAL_COURSES, INITIAL_POSTS, INITIAL_TEAM, PRACTICE_AREAS } from '../data/initialData';

interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation
  activeRoute: { path: NavigationPath; param?: string; query?: Record<string, string> };
  navigateTo: (path: NavigationPath, param?: string, query?: Record<string, string>) => void;

  // Data
  posts: BlogPost[];
  courses: Course[];
  team: TeamMember[];
  practiceAreas: PracticeArea[];
  enrollments: Record<string, Enrollment>;
  bookmarks: string[];
  inquiries: ConsultationInquiry[];

  // Post Actions
  addPost: (postData: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments' | 'updated'>) => BlogPost;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  togglePublishPost: (id: string) => void;
  likePost: (id: string) => void;
  addComment: (postId: string, comment: { author: string; content: string }) => void;
  addCommentReply: (postId: string, commentId: string, reply: { author: string; content: string }) => void;
  likeComment: (postId: string, commentId: string) => void;
  toggleBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;

  // Course & LMS Actions
  enrollCourse: (courseId: string) => { success: boolean; message: string };
  isEnrolled: (courseId: string) => boolean;
  getProgress: (courseId: string) => number;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  submitQuiz: (courseId: string, selectedAnswerIndex: number) => { isCorrect: boolean; explanation: string };
  issueCertificate: (courseId: string) => string;

  // Consultation Inquiries
  submitInquiry: (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => void;

  // Modals & Drawers
  quickViewCourseId: string | null;
  setQuickViewCourseId: (id: string | null) => void;
  teamModalId: string | null;
  setTeamModalId: (id: string | null) => void;
  consultationOpen: boolean;
  setConsultationOpen: (open: boolean) => void;
  lessonModalData: { courseId: string; lessonId: string } | null;
  setLessonModalData: (data: { courseId: string; lessonId: string } | null) => void;
  certificateCourseId: string | null;
  setCertificateCourseId: (id: string | null) => void;
  blogEditorPost: BlogPost | null | 'new';
  setBlogEditorPost: (post: BlogPost | null | 'new') => void;
  bookmarksDrawerOpen: boolean;
  setBookmarksDrawerOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // System
  toasts: ToastItem[];
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetToDemoData: () => void;
}

const STORAGE_KEYS = {
  POSTS: 'lga_posts_v2',
  COURSES: 'lga_courses_v2',
  ENROLLMENTS: 'lga_enrollments_v2',
  BOOKMARKS: 'lga_bookmarks_v2',
  INQUIRIES: 'lga_inquiries_v2',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function parseHash(): { path: NavigationPath; param?: string; query?: Record<string, string> } {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [routePart, queryPart] = hash.split('?');
  const segments = routePart.split('/').filter(Boolean);

  const query: Record<string, string> = {};
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    params.forEach((val, key) => {
      query[key] = val;
    });
  }

  if (segments.length === 0 || segments[0] === '') {
    return { path: 'home', query };
  }
  if (segments[0] === 'courses') {
    return { path: 'courses', query };
  }
  if (segments[0] === 'course' && segments[1]) {
    return { path: 'course-detail', param: segments[1], query };
  }
  if (segments[0] === 'blogs') {
    return { path: 'blogs', query };
  }
  if (segments[0] === 'blog' && segments[1]) {
    return { path: 'blog-detail', param: segments[1], query };
  }
  if (segments[0] === 'team') {
    return { path: 'team', param: segments[1], query };
  }
  if (segments[0] === 'learn') {
    return { path: 'learn', query };
  }
  if (segments[0] === 'admin') {
    return { path: 'admin', query };
  }

  return { path: 'home', query };
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [activeRoute, setActiveRoute] = useState(parseHash());

  // Data states with localStorage sync
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.POSTS);
      return raw ? JSON.parse(raw) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
      return raw ? JSON.parse(raw) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [enrollments, setEnrollments] = useState<Record<string, Enrollment>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      return raw ? JSON.parse(raw) : {
        c4: {
          courseId: 'c4',
          completedLessons: ['l1'],
          enrolledAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          quizPassed: false
        }
      };
    } catch {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return raw ? JSON.parse(raw) : ['p1'];
    } catch {
      return ['p1'];
    }
  });

  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return raw ? JSON.parse(raw) : [
        {
          id: 'inq-101',
          name: 'Genevieve Laurent',
          email: 'g.laurent@meridian-ventures.fr',
          organization: 'Meridian Capital Partners',
          practiceArea: 'International Commercial & Treaty Arbitration',
          jurisdiction: 'France / Singapore',
          description: 'Seeking legal guidance regarding enforcement of a SIAC partial award against a commercial subsidiary of a North African state enterprise.',
          urgency: 'Urgent',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'Under Review'
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals & Overlays
  const [quickViewCourseId, setQuickViewCourseId] = useState<string | null>(null);
  const [teamModalId, setTeamModalId] = useState<string | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [lessonModalData, setLessonModalData] = useState<{ courseId: string; lessonId: string } | null>(null);
  const [certificateCourseId, setCertificateCourseId] = useState<string | null>(null);
  const [blogEditorPost, setBlogEditorPost] = useState<BlogPost | null | 'new'>(null);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [enrollments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [inquiries]);

  // Hash router listener
  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut for command palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = useCallback((path: NavigationPath, param?: string, query?: Record<string, string>) => {
    let hash = '#/';
    if (path === 'home') {
      hash = '#/';
    } else if (path === 'courses') {
      hash = '#/courses';
    } else if (path === 'course-detail' && param) {
      hash = `#/course/${param}`;
    } else if (path === 'blogs') {
      hash = '#/blogs';
    } else if (path === 'blog-detail' && param) {
      hash = `#/blog/${param}`;
    } else if (path === 'team') {
      hash = param ? `#/team/${param}` : '#/team';
    } else if (path === 'learn') {
      hash = '#/learn';
    } else if (path === 'admin') {
      hash = '#/admin';
    }

    if (query && Object.keys(query).length > 0) {
      const q = new URLSearchParams(query).toString();
      hash += `?${q}`;
    }

    window.location.hash = hash;
  }, []);

  // Post Actions
  const addPost = useCallback((postData: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments' | 'updated'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: 'p-' + Date.now(),
      views: 1,
      likes: 0,
      updated: postData.date || new Date().toISOString().slice(0, 10),
      comments: []
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast(`Article "${newPost.title}" created successfully!`, 'success');
    return newPost;
  }, [showToast]);

  const updatePost = useCallback((id: string, updates: Partial<BlogPost>) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            updated: new Date().toISOString().slice(0, 10)
          };
        }
        return p;
      })
    );
    showToast('Article updated.', 'success');
  }, [showToast]);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setBookmarks((prev) => prev.filter((bId) => bId !== id));
    showToast('Article deleted.', 'info');
  }, [showToast]);

  const togglePublishPost = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.published;
          showToast(nextState ? 'Article published to Legal Hub.' : 'Article set to draft.', 'info');
          return { ...p, published: nextState };
        }
        return p;
      })
    );
  }, [showToast]);

  const likePost = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      })
    );
    showToast('Thank you for appreciating this article!', 'success');
  }, [showToast]);

  const addComment = useCallback((postId: string, commentData: { author: string; content: string }) => {
    const newComment = {
      id: 'cm-' + Date.now(),
      author: commentData.author.trim() || 'Legal Practitioner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      date: new Date().toISOString().slice(0, 10),
      content: commentData.content.trim(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [newComment, ...(p.comments || [])]
          };
        }
        return p;
      })
    );
    showToast('Comment posted to discussion.', 'success');
  }, [showToast]);

  const addCommentReply = useCallback((postId: string, commentId: string, replyData: { author: string; content: string }) => {
    const newReply = {
      id: 'reply-' + Date.now(),
      author: replyData.author.trim() || 'Legal Practitioner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      date: new Date().toISOString().slice(0, 10),
      content: replyData.content.trim()
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map((c) => {
              if (c.id === commentId) {
                return {
                  ...c,
                  replies: [...(c.replies || []), newReply]
                };
              }
              return c;
            })
          };
        }
        return p;
      })
    );
    showToast('Reply published.', 'success');
  }, [showToast]);

  const likeComment = useCallback((postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map((c) => {
              if (c.id === commentId) {
                const liked = !c.isLiked;
                return {
                  ...c,
                  likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
                  isLiked: liked
                };
              }
              return c;
            })
          };
        }
        return p;
      })
    );
  }, []);

  const toggleBookmark = useCallback((postId: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(postId);
      if (exists) {
        showToast('Removed from reading list', 'info');
        return prev.filter((id) => id !== postId);
      } else {
        showToast('Saved to your reading list', 'success');
        return [...prev, postId];
      }
    });
  }, [showToast]);

  const isBookmarked = useCallback((postId: string) => bookmarks.includes(postId), [bookmarks]);

  // Course / LMS
  const isEnrolled = useCallback((courseId: string) => Boolean(enrollments[courseId]), [enrollments]);

  const getProgress = useCallback((courseId: string) => {
    const enrollment = enrollments[courseId];
    if (!enrollment) return 0;
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const totalLessons = course.curriculum.reduce((acc, mod) => acc + mod.lessons.length, 0);
    if (totalLessons === 0) return 0;
    return Math.min(100, Math.round((enrollment.completedLessons.length / totalLessons) * 100));
  }, [courses, enrollments]);

  const enrollCourse = useCallback((courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return { success: false, message: 'Course not found.' };

    if (enrollments[courseId]) {
      return { success: true, message: 'Already enrolled in this course.' };
    }

    setEnrollments((prev) => ({
      ...prev,
      [courseId]: {
        courseId,
        completedLessons: [],
        enrolledAt: new Date().toISOString(),
        quizPassed: false
      }
    }));

    showToast(`Successfully enrolled in "${course.title}". Opening learning dashboard…`, 'success');
    return { success: true, message: 'Enrolled successfully.' };
  }, [courses, enrollments, showToast]);

  const toggleLessonCompletion = useCallback((courseId: string, lessonId: string) => {
    setEnrollments((prev) => {
      const current = prev[courseId] || {
        courseId,
        completedLessons: [],
        enrolledAt: new Date().toISOString(),
        quizPassed: false
      };

      const exists = current.completedLessons.includes(lessonId);
      const nextCompleted = exists
        ? current.completedLessons.filter((id) => id !== lessonId)
        : [...current.completedLessons, lessonId];

      const updated = {
        ...current,
        completedLessons: nextCompleted
      };

      return {
        ...prev,
        [courseId]: updated
      };
    });
  }, []);

  const submitQuiz = useCallback((courseId: string, selectedAnswerIndex: number) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return { isCorrect: false, explanation: 'Course not found.' };

    const isCorrect = selectedAnswerIndex === course.quiz.answer;
    setEnrollments((prev) => {
      const current = prev[courseId] || {
        courseId,
        completedLessons: [],
        enrolledAt: new Date().toISOString(),
        quizPassed: false
      };

      return {
        ...prev,
        [courseId]: {
          ...current,
          quizPassed: isCorrect
        }
      };
    });

    if (isCorrect) {
      showToast('Knowledge Check Passed! Certificate requirements updated.', 'success');
    } else {
      showToast('Not quite. Review the module and try again.', 'warning');
    }

    return {
      isCorrect,
      explanation: course.quiz.explanation
    };
  }, [courses, showToast]);

  const issueCertificate = useCallback((courseId: string) => {
    const certId = 'LGA-CERT-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    setEnrollments((prev) => {
      const current = prev[courseId];
      if (!current) return prev;
      return {
        ...prev,
        [courseId]: {
          ...current,
          certificateId: current.certificateId || certId,
          certificateIssuedAt: current.certificateIssuedAt || now
        }
      };
    });

    showToast('Official Certificate issued! Click to view and download.', 'success');
    return certId;
  }, [showToast]);

  // Consultation Inquiries
  const submitInquiry = useCallback((data: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ConsultationInquiry = {
      ...data,
      id: 'inq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast('Your confidential inquiry has been submitted. Counsel will reach out within 24 hours.', 'success');
  }, [showToast]);

  // Demo Reset
  const resetToDemoData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.ENROLLMENTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);

    setPosts(INITIAL_POSTS);
    setCourses(INITIAL_COURSES);
    setEnrollments({
      c4: {
        courseId: 'c4',
        completedLessons: ['l1'],
        enrolledAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        quizPassed: false
      }
    });
    setBookmarks(['p1']);
    setInquiries([]);
    showToast('Reset to pristine demonstration data.', 'info');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        activeRoute,
        navigateTo,
        posts,
        courses,
        team: INITIAL_TEAM,
        practiceAreas: PRACTICE_AREAS,
        enrollments,
        bookmarks,
        inquiries,
        addPost,
        updatePost,
        deletePost,
        togglePublishPost,
        likePost,
        addComment,
        addCommentReply,
        likeComment,
        toggleBookmark,
        isBookmarked,
        enrollCourse,
        isEnrolled,
        getProgress,
        toggleLessonCompletion,
        submitQuiz,
        issueCertificate,
        submitInquiry,
        quickViewCourseId,
        setQuickViewCourseId,
        teamModalId,
        setTeamModalId,
        consultationOpen,
        setConsultationOpen,
        lessonModalData,
        setLessonModalData,
        certificateCourseId,
        setCertificateCourseId,
        blogEditorPost,
        setBlogEditorPost,
        bookmarksDrawerOpen,
        setBookmarksDrawerOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toasts,
        showToast,
        removeToast,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
