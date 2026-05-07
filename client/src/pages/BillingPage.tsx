import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    price: "$9",
    features: ["Up to 5 users", "Basic analytics", "Email support", "Standard integrations"],
  },
  {
    key: "pro",
    name: "Pro",
    price: "$29",
    features: ["Unlimited users", "Advanced analytics", "Priority support", "Custom integrations"],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "$99",
    features: ["Everything in Pro", "Dedicated account manager", "SLA guarantee", "Custom contracts"],
  },
];

interface OrgData {
  org: { id: string; name: string; plan: string | null; stripeCustomerId: string | null };
  team: { id: string; email: string; role: string }[];
  subscriptions: { subscription: { status: string; currentPeriodEnd: string | null } | null }[];
}

export default function BillingPage() {
  const { data, isLoading } = useQuery<OrgData>({ queryKey: ["/api/orgs/me"] });

  const currentPlan = data?.org.plan ?? "free";
  const activeSub = data?.subscriptions.find((s) => s.subscription?.status === "active");

  const checkoutMutation = useMutation({
    mutationFn: async (plan: string) => {
      const res = await apiRequest("POST", "/api/billing/create-checkout", { plan });
      return res.json() as Promise<{ url: string }>;
    },
    onSuccess: ({ url }) => { if (url) window.location.href = url; },
  });

  const portalMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/billing/portal");
      return res.json() as Promise<{ url: string }>;
    },
    onSuccess: ({ url }) => { if (url) window.location.href = url; },
  });

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
        <h1 className="text-3xl font-bold mb-2">Billing & Subscriptions</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the <strong className="capitalize">{currentPlan}</strong> plan
              </CardDescription>
            </div>
            <Badge variant={activeSub ? "default" : "secondary"}>
              {activeSub ? "Active" : currentPlan === "free" ? "Free" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        {activeSub?.subscription?.currentPeriodEnd && (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Renews {new Date(activeSub.subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </CardContent>
        )}
        <CardFooter className="gap-4 flex-wrap">
          <Button
            variant="outline"
            onClick={() => portalMutation.mutate()}
            disabled={!data?.org.stripeCustomerId || portalMutation.isPending}
            data-testid="button-manage-subscription"
          >
            {portalMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Manage Subscription
          </Button>
        </CardFooter>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.key;
            return (
              <Card key={plan.key} className={isCurrent ? "border-primary" : ""} data-testid={`card-plan-${plan.key}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle>{plan.name}</CardTitle>
                    {isCurrent && <Badge>Current</Badge>}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isCurrent ? "secondary" : "default"}
                    disabled={isCurrent || checkoutMutation.isPending}
                    onClick={() => !isCurrent && checkoutMutation.mutate(plan.key)}
                    data-testid={`button-select-${plan.key}`}
                  >
                    {checkoutMutation.isPending && checkoutMutation.variables === plan.key && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {isCurrent ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
