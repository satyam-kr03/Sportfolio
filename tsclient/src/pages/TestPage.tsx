import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TestPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitPlayer = async () => {
    navigate("/register-player", { state: { username, password } });
  };

  const onSubmitOrganizer = async () => {
    navigate("/register-organizer", { state: { username, password } });
  };

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
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={onSubmitPlayer}>Register as Player</Button>
            <Button onClick={onSubmitOrganizer} variant="secondary">
              Register as Organizer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
