import React, { useState, useEffect } from "react";
import useGeolocation from "@/Geolocation";
import axios from "axios";

function findPlaces(latitude, longitude) {
  const url = "/places";
  const data = {
    latitude: latitude,
    longitude: longitude,
  };

  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}

export default function TestPage() {
  const { position, error, loading } = useGeolocation();

  findPlaces(7.735282, 48.586797);

  return <div></div>;
}
