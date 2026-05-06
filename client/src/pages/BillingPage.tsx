import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download } from "lucide-react";

export default function BillingPage() {
  const currentPlan = {
    name: "Pro",
    price: "$29",
    period: "month",
    features: ["Unlimited users", "Advanced analytics", "Priority support", "Custom integrations"]
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Up to 100 users", "Basic analytics", "Email support", "Standard integrations"]
    },
    {
      name: "Pro",
      price: "$29",
      features: ["Unlimited users", "Advanced analytics", "Priority support", "Custom integrations"],
      current: true
    },
    {
      name: "Enterprise",
      price: "$99",
      features: ["Everything in Pro", "Dedicated account manager", "SLA guarantee", "Custom contracts"]
    }
  ];

  const invoices = [
    { date: "Nov 1, 2024", amount: "$29.00", status: "Paid", id: "INV-001" },
    { date: "Oct 1, 2024", amount: "$29.00", status: "Paid", id: "INV-002" },
    { date: "Sep 1, 2024", amount: "$29.00", status: "Paid", id: "INV-003" },
  ];

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
              <CardDescription>You are currently on the {currentPlan.name} plan</CardDescription>
            </div>
            <Badge>Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold">{currentPlan.price}</span>
            <span className="text-muted-foreground">/ {currentPlan.period}</span>
          </div>
          <ul className="space-y-3">
            {currentPlan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="gap-4 flex-wrap">
          <Button variant="outline" data-testid="button-manage-subscription">
            Manage Subscription
          </Button>
          <Button variant="outline" data-testid="button-update-payment">
            Update Payment Method
          </Button>
        </CardFooter>
      </Card>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary" : ""} data-testid={`card-plan-${plan.name.toLowerCase()}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.current && <Badge>Current</Badge>}
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
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.current ? "secondary" : "default"}
                  disabled={plan.current}
                  data-testid={`button-select-${plan.name.toLowerCase()}`}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Download and view past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
                data-testid={`invoice-${invoice.id}`}
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">{invoice.id}</p>
                  </div>
                  <p className="font-mono font-medium">{invoice.amount}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{invoice.status}</Badge>
                  <Button variant="ghost" size="icon" data-testid={`button-download-${invoice.id}`}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
