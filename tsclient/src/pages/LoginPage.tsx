import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken, isLoggedIn, logout } from "@/UserContext";

import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // setError("");
      console.log("No token found");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
      console.log(data.role);
      if (data.role === "player") {
        navigate("/dashboard");
      }
      if (data.role === "organizer") {
        navigate("/organizer-dashboard");
      }
    } catch (err) {
      // setError(err.message);
      setUserData(null);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          "/login",
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => response.data)
        .then((data) => {
          if (data.access_token) {
            // Store the token in localStorage
            localStorage.setItem("access_token", data.access_token);
            console.log("Login successful");
          }
        });
    } catch (e) {
      console.error("Login failed:");
    } finally {
      setLoading(false);
    }

    fetchUserData();
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder=""
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {/* 
            <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Button
              variant="link"
              className="text-balance hover:underline"
              onClick={() => navigate("/register")}
            >
              Register Here
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/react.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
