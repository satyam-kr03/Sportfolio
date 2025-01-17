import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0a0a0a] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6 text-[#00e6b8]" />
          <span className="sr-only">Sports Event Management</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-[#00e6b8] underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            to="/"
            className="text-sm font-medium hover:text-[#00e6b8] underline underline-offset-4"
          >
            Pricing
          </Link>
          <Link
            to="/"
            className="text-sm font-medium hover:text-[#00e6b8] underline underline-offset-4"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-sm font-medium hover:text-[#00e6b8] underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Elevate Your Sports Events
              </h1>
              <p className="max-w-[800px] mx-auto text-lg text-[#b3b3b3]">
                Our cutting-edge platform streamlines event management,
                empowering organizers to create unforgettable experiences.
              </p>
              <div className="flex justify-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-[#00e6b8] px-8 text-sm font-medium text-[#0a0a0a] shadow transition-colors hover:bg-[#00c6a5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00e6b8] disabled:pointer-events-none disabled:opacity-50">
                      Get Started
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Continue to your account
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        If you already have an account, click the login button
                        to proceed. Otherwise, please register first.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Link to="/register">
                        {" "}
                        <AlertDialogAction>Register</AlertDialogAction>{" "}
                      </Link>
                      <Link to="/login">
                        {" "}
                        <AlertDialogAction>Login</AlertDialogAction>
                      </Link>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Link
                  to="/"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-[#00e6b8] bg-transparent px-8 text-sm font-medium text-[#00e6b8] shadow-sm transition-colors hover:bg-[#00e6b8] hover:text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00e6b8] disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 bg-[#1a1a1a] rounded-lg p-6">
                <CalendarDaysIcon className="h-12 w-12 text-[#00e6b8]" />
                <h3 className="text-2xl font-bold">Event Planning</h3>
                <p className="text-[#b3b3b3] text-center">
                  Streamline the entire event planning process, from
                  registration to scheduling and logistics.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 bg-[#1a1a1a] rounded-lg p-6">
                <TicketIcon className="h-12 w-12 text-[#ff66c4]" />
                <h3 className="text-2xl font-bold">Ticketing</h3>
                <p className="text-[#b3b3b3] text-center">
                  Offer seamless online ticketing and payment solutions to
                  simplify event access.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 bg-[#1a1a1a] rounded-lg p-6">
                <InfoIcon className="h-12 w-12 text-[#9b59ff]" />
                <h3 className="text-2xl font-bold">Analytics</h3>
                <p className="text-[#b3b3b3] text-center">
                  Gain valuable insights into event performance and attendee
                  behavior with our advanced analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#1a1a1a]">
        <p className="text-xs text-[#b3b3b3]">
          &copy; 2024 SportChastic. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/"
            className="text-xs hover:text-[#00e6b8] underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            to="/"
            className="text-xs hover:text-[#00e6b8] underline underline-offset-4"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function TicketIcon(props) {
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
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}
