import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Trash2, TestTube } from "lucide-react";
import { useState } from "react";

export default function WebhooksPage() {
  const [webhookUrl, setWebhookUrl] = useState("");
  
  const webhooks = [
    {
      id: "wh_1",
      url: "https://api.example.com/webhooks/stripe",
      events: ["payment.succeeded", "subscription.updated"],
      status: "active"
    },
    {
      id: "wh_2",
      url: "https://api.example.com/webhooks/user-events",
      events: ["user.created", "user.deleted"],
      status: "active"
    }
  ];

  const recentDeliveries = [
    {
      id: "del_1",
      event: "payment.succeeded",
      url: "https://api.example.com/webhooks/stripe",
      status: 200,
      timestamp: "2 minutes ago"
    },
    {
      id: "del_2",
      event: "subscription.updated",
      url: "https://api.example.com/webhooks/stripe",
      status: 200,
      timestamp: "15 minutes ago"
    },
    {
      id: "del_3",
      event: "user.created",
      url: "https://api.example.com/webhooks/user-events",
      status: 500,
      timestamp: "1 hour ago"
    }
  ];

  const handleAddWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding webhook:", webhookUrl);
    setWebhookUrl("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Webhooks</h1>
        <p className="text-muted-foreground">Manage webhook endpoints and monitor deliveries</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Webhook Endpoint</CardTitle>
          <CardDescription>Create a new webhook to receive events</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddWebhook} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Endpoint URL</Label>
              <div className="flex gap-2">
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder="https://api.example.com/webhooks"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1"
                  data-testid="input-webhook-url"
                />
                <Button type="submit" data-testid="button-add-webhook">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Webhooks</CardTitle>
          <CardDescription>Manage your webhook endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="border rounded-lg p-4 space-y-3"
                data-testid={`webhook-${webhook.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded truncate">
                        {webhook.url}
                      </code>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="secondary" className="font-mono text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {webhook.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" data-testid={`button-test-${webhook.id}`}>
                    <TestTube className="h-3 w-3 mr-2" />
                    Test
                  </Button>
                  <Button variant="outline" size="sm" data-testid={`button-delete-${webhook.id}`}>
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Monitor webhook delivery status and responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
                data-testid={`delivery-${delivery.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Badge variant="outline" className="font-mono text-xs">
                      {delivery.event}
                    </Badge>
                    <Badge
                      variant={delivery.status === 200 ? "secondary" : "destructive"}
                      className="font-mono text-xs"
                    >
                      {delivery.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{delivery.url}</p>
                </div>
                <span className="text-sm text-muted-foreground">{delivery.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
