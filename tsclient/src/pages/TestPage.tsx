import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function TestPage() {
  return (
    <div className="w-1/2 h-96 mx-auto bg-background">
      <MapContainer center={[40.505, -100.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{" "}
        <Marker position={[40.505, -100.09]}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
