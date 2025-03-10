
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ThemeDetails from "./pages/ThemeDetails";
import ThemeCode from "./pages/ThemeCode";
import NotFound from "./pages/NotFound";
import Templates from "./pages/Templates";
import Projects from "./pages/Projects";
import Latest from "./pages/Latest";
import Featured from "./pages/Featured";

// Create a new QueryClient for react-query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/theme/:id" element={<ThemeDetails />} />
          <Route path="/theme/:id/code" element={<ThemeCode />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/featured" element={<Featured />} />
          
          {/* Category specific routes */}
          <Route path="/landing" element={<Index initialCategory="landing" />} />
          <Route path="/dashboard" element={<Index initialCategory="dashboard" />} />
          <Route path="/portfolio" element={<Index initialCategory="portfolio" />} />
          <Route path="/ecommerce" element={<Index initialCategory="ecommerce" />} />
          <Route path="/blog" element={<Index initialCategory="blog" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
