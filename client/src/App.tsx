import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { getSiteBasePath } from "@/lib/sitePaths";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Academic from "./pages/Academic";
import SchoolLife from "./pages/SchoolLife";
import ContactUs from "./pages/ContactUs";

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/index.html" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/about/" component={AboutUs} />
      <Route path="/about.html" component={AboutUs} />
      <Route path="/academic" component={Academic} />
      <Route path="/academic/" component={Academic} />
      <Route path="/academic.html" component={Academic} />
      <Route path="/school-life" component={SchoolLife} />
      <Route path="/school-life/" component={SchoolLife} />
      <Route path="/school-life.html" component={SchoolLife} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/contact/" component={ContactUs} />
      <Route path="/contact.html" component={ContactUs} />
      <Route path="/404" component={NotFound} />
      <Route path="/404/" component={NotFound} />
      <Route path="/404.html" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const routerBase = import.meta.env.DEV ? "" : getSiteBasePath();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <WouterRouter base={routerBase}>
          <TooltipProvider>
            <ScrollManager />
            <Toaster />
            <Router />
          </TooltipProvider>
        </WouterRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
