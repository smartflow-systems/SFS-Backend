import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/StatsCard";
import { Users, DollarSign, Activity, Zap, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrgData {
  org: { name: string; plan: string | null };
  team: { id: string; email: string; role: string; isActive: boolean }[];
  subscriptions: { subscription: { status: string; plan: string } | null; product: { name: string } | null }[];
}

const PLAN_PRICE: Record<string, string> = { free: "$0", starter: "$9", pro: "$29", enterprise: "$99" };

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery<OrgData>({ queryKey: ["/api/orgs/me"] });

  const activeMembers = data?.team.filter((u) => u.isActive).length ?? 0;
  const currentPlan = data?.org.plan ?? "free";
  const activeSubs = data?.subscriptions.filter((s) => s.subscription?.status === "active") ?? [];
  const monthlyRevenue = activeSubs.reduce((sum, s) => {
    const price = parseInt(PLAN_PRICE[s.subscription?.plan ?? "free"]?.replace("$", "") ?? "0", 10);
    return sum + price;
  }, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          {data?.org.name} — overview of team and subscription usage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Team Members"
          value={activeMembers}
          icon={Users}
        />
        <StatsCard
          title="Active Subscriptions"
          value={activeSubs.length}
          icon={Activity}
        />
        <StatsCard
          title="Current Plan"
          value={currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          icon={Zap}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue}`}
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>{activeMembers} active member{activeMembers !== 1 ? "s" : ""}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.team.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm font-mono truncate">{member.email}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">{member.role}</Badge>
                    {!member.isActive && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                  </div>
                </div>
              ))}
              {(!data?.team || data.team.length === 0) && (
                <p className="text-sm text-muted-foreground">No team members yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
            <CardDescription>Active product access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeSubs.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm font-medium">{s.product?.name ?? "SFS Platform"}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs capitalize">{s.subscription?.plan}</Badge>
                    <Badge className="text-xs">{s.subscription?.status}</Badge>
                  </div>
                </div>
              ))}
              {activeSubs.length === 0 && (
                <p className="text-sm text-muted-foreground">No active subscriptions.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
