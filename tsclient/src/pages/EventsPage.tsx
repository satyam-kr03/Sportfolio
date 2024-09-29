import { Link } from "react-router-dom";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/UserContext";
import { Event } from "@/components/event";

const EventsPage = () => {
  const [data, setData] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/events", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
      console.log(fetchedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  function EventsList() {
    if (!data) return <div>Loading...</div>;

    // Transform the data to an array
    const eventsArray = Object.keys(data).map((key) => ({
      name: data[key].name,
      organizer: data[key].organizer,
      sport: data[key].sport,
      type: data[key].type,
      date: data[key].date,
      venue: data[key].venue,
      address: data[key].address,
      city: data[key].city,
      ageGroup: data[key].age_group,
      gender: data[key].gender_cat,
    }));

    return (
      <div className="flex flex-wrap gap-4">
        {eventsArray.map((event, index) => (
          <Event
            title={event.name}
            key={index}
            host={event.organizer}
            sport={event.sport}
            eventType={event.type}
            date={event.date}
            venue={event.venue}
            address={event.address}
            city={event.city}
            ageGroup="18-35"
            gender={event.gender}
            description="Join us for an exciting basketball tournament at the Acme Sports Center. Compete against players from across the region in a friendly and competitive environment."
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              to={"/"}
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to={"/organizer-dashboard"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              to={"#"}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Events
            </Link>
            <Link
              to={"/"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to={"/"}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link to={"/"} className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  to={"/"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  My Events
                </Link>
                <Link
                  to={"/"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to={"/profile"}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link to={"/"}>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <EventsList />
        </main>
      </div>
    </div>
  );
};

export default EventsPage;
