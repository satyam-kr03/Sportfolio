import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TestPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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
      setError(null);
    } catch (err) {
      // setError(err.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader className="text-2xl font-bold">User Data</CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        {userData ? (
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(userData, null, 2)}
          </pre>
        ) : (
          <p>No user data available</p>
        )}
        <Button onClick={fetchUserData} className="mt-4">
          Refresh Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestPage;
