import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { BlogEditorModal } from './components/BlogEditorModal';
import { QuickViewModal } from './components/QuickViewModal';
import { TeamModal } from './components/TeamModal';
import { ConsultationModal } from './components/ConsultationModal';
import { LessonModal } from './components/LessonModal';
import { CertificateModal } from './components/CertificateModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PracticeAreasPage } from './pages/PracticeAreasPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LearnPage } from './pages/LearnPage';
import { TeamPage } from './pages/TeamPage';
import { AdminPage } from './pages/AdminPage';

const PageRouter: React.FC = () => {
  const { activeRoute } = useApp();

  switch (activeRoute.path) {
    case 'home':
      return <HomePage />;
    case 'practice-areas':
      return <PracticeAreasPage />;
    case 'blogs':
      return <BlogsPage />;
    case 'blog-detail':
      return <BlogDetailPage />;
    case 'courses':
      return <CoursesPage />;
    case 'course-detail':
      return <CourseDetailPage />;
    case 'learn':
      return <LearnPage />;
    case 'team':
      return <TeamPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <HomePage />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F3EB] text-[#17202E]">
        <Header />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />

        {/* Global Overlays & Modals */}
        <CommandPalette />
        <BookmarksDrawer />
        <BlogEditorModal />
        <QuickViewModal />
        <TeamModal />
        <ConsultationModal />
        <LessonModal />
        <CertificateModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
