
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkshopDashboard from "./pages/WorkshopDashboard";
import NewOrder from "./pages/NewOrder";
import Customers from "./pages/Customers";
import ProductManagement from "./pages/ProductManagement";
import Reports from "./pages/Reports";
import ExternalServices from "./pages/ExternalServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workshop/:workshopId/dashboard" element={<WorkshopDashboard />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/external-services" element={<ExternalServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
