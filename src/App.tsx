import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthProvider';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import EducationPage from './pages/EducationPage';
import PublicationsPage from './pages/PublicationsPage';
import ProjectsPage from './pages/ProjectsPage';
import StudentNotesPage from './pages/StudentNotesPage';
import CertificatesPage from './pages/CertificatesPage';
import GalleryPage from './pages/GalleryPage';
import ExperiencePage from './pages/ExperiencePage';


// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

import AdminProfile from './pages/admin/AdminProfile';
import AdminEducation from './pages/admin/AdminEducation';
import AdminPublications from './pages/admin/AdminPublications';
import AdminProjects from './pages/admin/AdminProjects';
import AdminStudentNotes from './pages/admin/AdminStudentNotes';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminGallery from './pages/admin/AdminGallery';
import AdminExperience from './pages/admin/AdminExperience';


// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/education" element={<EducationPage />} />
                        <Route path="/publications" element={<PublicationsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/student-notes" element={<StudentNotesPage />} />
                        <Route path="/certificates" element={<CertificatesPage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                        <Route path="/experience" element={<ExperiencePage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute>
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/education"
                element={
                  <ProtectedRoute>
                    <AdminEducation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/publications"
                element={
                  <ProtectedRoute>
                    <AdminPublications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/student-notes"
                element={
                  <ProtectedRoute>
                    <AdminStudentNotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/certificates"
                element={
                  <ProtectedRoute>
                    <AdminCertificates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/gallery"
                element={
                  <ProtectedRoute>
                    <AdminGallery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/experience"
                element={
                  <ProtectedRoute>
                    <AdminExperience />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
