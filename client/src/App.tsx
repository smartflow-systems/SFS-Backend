import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import BillingPage from "@/pages/BillingPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import SettingsPage from "@/pages/SettingsPage";
import WebhooksPage from "@/pages/WebhooksPage";
import { CreditCard, BarChart2, Settings, Webhook, LayoutDashboard } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/billing", label: "Billing", icon: CreditCard },
  { path: "/analytics", label: "Analytics", icon: BarChart2 },
  { path: "/webhooks", label: "Webhooks", icon: Webhook },
  { path: "/settings", label: "Settings", icon: Settings },
];

function Nav() {
  const [location] = useLocation();
  return (
    <aside className="w-56 shrink-0 border-r min-h-screen p-4 space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-4">
        SFS Backend
      </p>
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          href={path}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
            location === path
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </aside>
  );
}

function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to SFS Backend. Use the sidebar to navigate.</p>
    </div>
  );
}

function Router() {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 p-8">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/billing" component={BillingPage} />
          <Route path="/analytics" component={AnalyticsPage} />
          <Route path="/webhooks" component={WebhooksPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
