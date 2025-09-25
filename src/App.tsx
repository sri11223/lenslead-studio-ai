import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Events from "./pages/Events";
import Payments from "./pages/Payments";
import AITools from "./pages/AITools";
import Messaging from "./pages/Messaging";
import FileManager from "./pages/FileManager";
import Settings from "./pages/Settings";
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
            <Route path="events" element={<Events />} />
            <Route path="payments" element={<Payments />} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="files" element={<FileManager />} />
            <Route path="settings" element={<Settings />} />
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
