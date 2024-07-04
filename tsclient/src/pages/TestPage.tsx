import React, { useState, useEffect } from "react";
import useGeolocation from "@/Geolocation";
import useFetchPlaces from "@/FetchPlaces";

const TestPage = () => {
  const latitude = 0;
  const longitude = 0;
  const { data, loading, error } = useFetchPlaces(latitude, longitude);

  useEffect(() => {
    // You can perform any side effects here if needed when data, loading or error changes.
  }, [data, loading, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: </div>;

  return (
    <div>
      <h1>Places</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestPage;
