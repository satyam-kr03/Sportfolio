import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Register</h2>
          <p className="text-muted-foreground">
            Create a new account to get started.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button>Register</Button>
            <Button variant="secondary">Register as Admin</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
