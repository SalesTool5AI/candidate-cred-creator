
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGate } from "@/components/AuthGate";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import CaseStudy from "./pages/CaseStudy";
import Admin from "./pages/Admin";
import HowISellPage from "./pages/HowISell";
import WhatIBringPage from "./pages/WhatIBring";
import MoreThanSellerPage from "./pages/MoreThanSeller";
import MyValuesPage from "./pages/MyValues";
import SalesPerformancePage from "./pages/SalesPerformance";
import CaseStudiesPage from "./pages/CaseStudies";
import ProfessionalJourneyPage from "./pages/ProfessionalJourney";
import TestimonialsPage from "./pages/Testimonials";
import SalesTechStackPage from "./pages/SalesTechStack";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthGate>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/how-i-sell" element={<HowISellPage />} />
              <Route path="/how-i-sell/sales-tech-stack" element={<SalesTechStackPage />} />
              <Route path="/what-i-bring" element={<WhatIBringPage />} />
              <Route path="/what-i-bring/sales-performance" element={<SalesPerformancePage />} />
              <Route path="/what-i-bring/case-studies" element={<CaseStudiesPage />} />
              <Route path="/what-i-bring/professional-journey" element={<ProfessionalJourneyPage />} />
              <Route path="/more-than-seller" element={<MoreThanSellerPage />} />
              <Route path="/my-values" element={<MyValuesPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/case-study/:slug" element={<CaseStudy />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AuthGate>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
