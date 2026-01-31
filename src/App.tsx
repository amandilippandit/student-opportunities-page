import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OpportunityDetail from "./pages/OpportunityDetail";
import OpportunitiesCMS from "./pages/OpportunitiesCMS";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const [opportunities, setOpportunities] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {loading && <p>Loading...</p>}

{opportunities.map((op) => (
  <div key={op.id} className="border p-4 rounded mb-4">
    <h2 className="text-lg font-bold">{op.title}</h2>
    <p>{op.organization}</p>
    <p>{op.description}</p>

    <a
      href={op.apply_link}
      target="_blank"
      className="text-blue-600 underline"
    >
      Apply
    </a>
  </div>
))}
{
  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("is_active", true)
      .order("deadline", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setOpportunities(data || []);
    }

    setLoading(false);
  };

  fetchOpportunities();
}, []);

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/opportunity/:id" element={<OpportunityDetail />} />
          <Route path="/cms" element={<OpportunitiesCMS />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
