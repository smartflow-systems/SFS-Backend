import { StatsCard } from "@/components/StatsCard";
import { Users, DollarSign, Activity, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  const recentEvents = [
    { name: "page_view", path: "/dashboard", user: "user_123", time: "1 min ago" },
    { name: "button_click", path: "/billing", user: "user_456", time: "3 mins ago" },
    { name: "form_submit", path: "/settings", user: "user_789", time: "5 mins ago" },
    { name: "api_call", path: "/api/users", user: "user_321", time: "8 mins ago" },
    { name: "page_view", path: "/analytics", user: "user_654", time: "12 mins ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track user behavior and application metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="1,234"
          change="+12.5%"
          trend="up"
          icon={Users}
        />
        <StatsCard
          title="Active Sessions"
          value="342"
          change="+5.2%"
          trend="up"
          icon={Activity}
        />
        <StatsCard
          title="Conversion Rate"
          value="3.2%"
          change="+0.8%"
          trend="up"
          icon={Zap}
        />
        <StatsCard
          title="Revenue"
          value="$12.4K"
          change="+15.2%"
          trend="up"
          icon={DollarSign}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
              <p className="text-muted-foreground">Chart visualization placeholder</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
            <CardDescription>Breakdown of subscription revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
              <p className="text-muted-foreground">Chart visualization placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest tracked analytics events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b last:border-0"
                data-testid={`event-${idx}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Badge variant="outline" className="font-mono text-xs">
                    {event.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground truncate">{event.path}</span>
                  <span className="text-sm text-muted-foreground font-mono">{event.user}</span>
                </div>
                <span className="text-sm text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
