
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { useState, useEffect } from "react";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CodingPlatform from "./pages/CodingPlatform";
import NotFound from "./pages/NotFound";
import Learning from "./pages/Learning";
import Github from "./pages/Github";
import Achievements from "./pages/Achievements";
import Academics from "./pages/Academics";
import Resume from "./pages/Resume";
import SWOT from "./pages/SWOT";
import Calendar from "./pages/Calendar";
import AIGuidance from "./pages/AIGuidance";
import Pomodoro from "./pages/Pomodoro";
import TodoList from "./pages/TodoList";
import Internships from "./pages/Internships";
import LearningResources from "./pages/LearningResources";
import MockInterviews from "./pages/MockInterviews";
import Opportunities from "./pages/Opportunities";
import Settings from "./pages/Settings";
import LearningHub from "./pages/LearningHub";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simple check if user is logged in from localStorage
  useEffect(() => {
    const checkAuth = () => {
      const savedLoginState = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(savedLoginState === "true");
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Simple login/logout functions
  const handleSuccessfulLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={
                isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Login onSuccessfulLogin={handleSuccessfulLogin} />
              } 
            />
            
            {/* Protected Routes */}
            <Route path="/" element={
              isLoggedIn ? 
              <MainLayout><Dashboard /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/coding" element={
              isLoggedIn ? 
              <MainLayout><CodingPlatform /></MainLayout> : 
              <Navigate to="/login" replace />
            } />

            <Route path="/learning" element={
              isLoggedIn ? 
              <MainLayout><Learning /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/github" element={
              isLoggedIn ? 
              <MainLayout><Github /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/achievements" element={
              isLoggedIn ? 
              <MainLayout><Achievements /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/academics" element={
              isLoggedIn ? 
              <MainLayout><Academics /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/resume" element={
              isLoggedIn ? 
              <MainLayout><Resume /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/swot" element={
              isLoggedIn ? 
              <MainLayout><SWOT /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/calendar" element={
              isLoggedIn ? 
              <MainLayout><Calendar /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/ai-guidance" element={
              isLoggedIn ? 
              <MainLayout><AIGuidance /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/pomodoro" element={
              isLoggedIn ? 
              <MainLayout><Pomodoro /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/todo" element={
              isLoggedIn ? 
              <MainLayout><TodoList /></MainLayout> : 
              <Navigate to="/login" replace />
            } />

            <Route path="/certifications" element={
              isLoggedIn ? 
              <MainLayout><Certifications /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/internships" element={
              isLoggedIn ? 
              <MainLayout><Internships /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/resources" element={
              isLoggedIn ? 
              <MainLayout><LearningResources /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/interviews" element={
              isLoggedIn ? 
              <MainLayout><MockInterviews /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/opportunities" element={
              isLoggedIn ? 
              <MainLayout><Opportunities /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/settings" element={
              isLoggedIn ? 
              <MainLayout><Settings /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            {/* New combined Learning Hub route */}
            <Route path="/learning-hub" element={
              isLoggedIn ? 
              <MainLayout><LearningHub /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
