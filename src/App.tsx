
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import SystemOwnerLanding from "./pages/SystemOwnerLanding";
import CreateWorkshop from "./pages/CreateWorkshop";
import WorkshopDashboard from "./pages/WorkshopDashboard";
import NewOrder from "./pages/NewOrder";
import PieceDetails from "./pages/PieceDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/system-owner" element={<SystemOwnerLanding />} />
            <Route path="/create-workshop" element={<CreateWorkshop />} />
            <Route path="/workshop/:workshopId/dashboard" element={<WorkshopDashboard />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/piece/:pieceId" element={<PieceDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
