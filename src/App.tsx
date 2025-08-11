import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import ImageAnalysis from "./pages/ImageAnalysis";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import AboutUs from "./pages/AboutUs";
import Doctors from "./pages/Doctors";
import WaitList from "./pages/Waitlist";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
}

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Routes with Auth Provider
const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/wait-list" element={<WaitList />} />
        
        {/* Protected routes */}
        <Route path="/symptom-analyzer" element={
          <ProtectedRoute>
            <SymptomAnalyzer />
          </ProtectedRoute>
        } />
        <Route path="/image-analysis" element={
          <ProtectedRoute>
            <ImageAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Auth routes - redirect if already logged in */}
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : <Login />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/" replace /> : <Signup />
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;