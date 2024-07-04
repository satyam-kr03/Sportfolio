import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export function Event({
  title,
  host,
  sport,
  eventType,
  date,
  venue,
  address,
  city,
  ageGroup,
  gender,
  description,
}) {
  return (
    <Card className="w-full max-w-md p-6 grid gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="bg-primary rounded-md p-3 flex items-center justify-center">
          <CalendarIcon className="w-6 h-6 text-primary-foreground" />
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">Hosted by {host}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Sport</p>
            <p className="text-muted-foreground">{sport}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Event Type</p>
            <p className="text-muted-foreground">{eventType}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Date</p>
            <p className="text-muted-foreground">{date}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Venue</p>
            <p className="text-muted-foreground">{venue}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Address</p>
            <p className="text-muted-foreground">{address}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">City</p>
            <p className="text-muted-foreground">{city}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Age Group</p>
            <p className="text-muted-foreground">{ageGroup}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Gender</p>
            <p className="text-muted-foreground">{gender}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Description</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
