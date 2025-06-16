import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Index } from "./pages/Index";
import { AdaugareId } from "./pages/AdaugareId";
import { Cautare } from "./pages/Cautare";
import { Setari } from "./pages/Setari";
import { PaginaInexistenta } from "./pages/PaginaInexistenta";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add" element={<AdaugareId />} />
            <Route path="/search" element={<Cautare />} />
            <Route path="/settings" element={<Setari />} />
            <Route path="*" element={<PaginaInexistenta />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
