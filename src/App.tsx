import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AITools from "./pages/AITools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="events" element={<div className="p-8 text-center text-muted-foreground">Events & Bookings - Coming Soon</div>} />
            <Route path="payments" element={<div className="p-8 text-center text-muted-foreground">Payments & Credits - Coming Soon</div>} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="messaging" element={<div className="p-8 text-center text-muted-foreground">WhatsApp Messaging - Coming Soon</div>} />
            <Route path="files" element={<div className="p-8 text-center text-muted-foreground">File Manager - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Settings - Coming Soon</div>} />
            <Route path="backup" element={<div className="p-8 text-center text-muted-foreground">Backup & Sync - Coming Soon</div>} />
            <Route path="analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics - Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
