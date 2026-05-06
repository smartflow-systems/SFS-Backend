import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye, EyeOff, RotateCw } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState("sk_live_************************");

  const envVars = [
    { key: "DATABASE_URL", value: "postgresql://***", visible: false },
    { key: "STRIPE_SECRET_KEY", value: "sk_live_***", visible: false },
    { key: "RESEND_API_KEY", value: "re_***", visible: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application configuration</p>
      </div>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account" data-testid="tab-account">Account</TabsTrigger>
          <TabsTrigger value="api" data-testid="tab-api">API Keys</TabsTrigger>
          <TabsTrigger value="integrations" data-testid="tab-integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  data-testid="input-email"
                />
              </div>
              <Button data-testid="button-save-profile">Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  data-testid="input-current-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  data-testid="input-new-password"
                />
              </div>
              <Button data-testid="button-update-password">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Production API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="font-mono"
                    data-testid="input-api-key"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                    data-testid="button-toggle-api-key"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" data-testid="button-copy-api-key">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" data-testid="button-regenerate-key">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Regenerate Key
                </Button>
                <Button variant="outline" data-testid="button-create-key">
                  Create New Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Configure your application environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {envVars.map((env, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                    data-testid={`env-${env.key}`}
                  >
                    <div className="flex-1">
                      <p className="font-mono text-sm font-medium">{env.key}</p>
                      <p className="font-mono text-xs text-muted-foreground">{env.value}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage third-party integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Stripe", "Resend", "Google Analytics"].map((service) => (
                  <div
                    key={service}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                    data-testid={`service-${service.toLowerCase()}`}
                  >
                    <div>
                      <p className="font-medium">{service}</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
