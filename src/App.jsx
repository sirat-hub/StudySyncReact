import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "./components/layouts/Navbar";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import PageNotFound from "./components/pages/PageNotFound";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardPage from "./components/pages/DashboardPage";
import GroupsPage from "./components/pages/GroupsPage";
import EconomyPage from "./components/pages/EconomyPage";
import MatchingPage from "./components/pages/MatchingPage";
import SessionRoom from "./components/pages/SessionRoom";
import { initializeTheme } from './utils/themeUtils';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ message: "Join us now to be part of this", from: location.pathname }} replace />;
  }
  return children;
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="w-full flex justify-center"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/groups" 
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/economy" 
            element={
              <ProtectedRoute>
                <EconomyPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matching" 
            element={
              <ProtectedRoute>
                <MatchingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/session/:id" 
            element={
              <ProtectedRoute>
                <SessionRoom />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden bg-[#0F0F13] text-white">
      
      {/* Animated Background Orbs */}
      <div className="fixed top-[-5%] left-[-10%] w-96 h-96 bg-[var(--accent-purple)] opacity-[var(--glow-opacity)] rounded-full mix-blend-screen filter blur-[128px] animate-blob1 pointer-events-none z-0 transition-all duration-300" />
      <div className="fixed top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-[var(--accent-green)] opacity-[calc(var(--glow-opacity)-0.05)] rounded-full mix-blend-screen filter blur-[128px] animate-blob2 animation-delay-2000 pointer-events-none z-0 transition-all duration-300" />
      <div className="fixed bottom-[-10%] left-[20%] w-[25rem] h-[25rem] bg-[var(--accent-pink)] opacity-[calc(var(--glow-opacity)-0.05)] rounded-full mix-blend-screen filter blur-[128px] animate-blob1 animation-delay-4000 pointer-events-none z-0 transition-all duration-300" />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

      <Navbar />
      
      <main className="relative flex-1 pt-28 pb-10 px-4 md:px-8 max-w-7xl w-full mx-auto z-10 flex flex-col items-center">
        <AnimatedRoutes />
      </main>
      
      <footer className="w-full text-center p-8 bg-black/40 backdrop-blur-md border-t border-white/5 text-[color:var(--text-muted)] font-medium z-10">
        &copy; 2025 StudySync. Built with ❤️ for Students.
      </footer>
    </div>
  );
}

export default App;
