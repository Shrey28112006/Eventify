import { Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import EventManagePage from "./pages/EventManagePage.jsx";
import MyBookingsPage from "./pages/MyBookingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function Home() {
  const reviews = [
    {
      name: "Aarav",
      text: "Booked concert tickets in under 2 minutes. Super smooth experience.",
    },
    {
      name: "Priya",
      text: "The UI feels premium and event discovery is insanely fast.",
    },
    {
      name: "Rohan",
      text: "Love the dashboard and booking flow. Everything feels modern.",
    },
    {
      name: "Neha",
      text: "Best student event platform I’ve used so far.",
    },
    {
      name: "Kunal",
      text: "The animations and dark theme look absolutely amazing.",
    },
  ];

  const featuredEvents = [
    {
      title: "Neon Music Festival",
      category: "Music",
      attendees: "14K+",
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Startup Connect 2026",
      category: "Business",
      attendees: "5K+",
      color: "from-fuchsia-500/20 to-pink-500/20",
    },
    {
      title: "BGMI Championship",
      category: "Gaming",
      attendees: "20K+",
      color: "from-lime-500/20 to-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl sm:p-12">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative max-w-4xl">
          <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-xl">
            Eventify Platform
          </p>

          <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight sm:text-7xl">
            Discover
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 bg-clip-text text-transparent">
              {" "}
              unforgettable{" "}
            </span>
            events near you.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            Browse concerts, gaming tournaments, hackathons, festivals,
            startup meetups, and premium experiences—all in one modern
            platform built for seamless event discovery.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/login"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-black text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(34,211,238,0.45)]"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-8 py-4 text-sm font-black text-black shadow-[0_0_40px_rgba(217,70,239,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(217,70,239,0.45)]"
            >
              Signup
            </Link>
          </div>
        </div>

        {/* FEATURED EVENT */}
        <div className="relative mt-14">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Featured Event
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Cyber Music Festival 2026
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-zinc-400">
              Experience an immersive night of live performances,
              electronic music, cinematic visuals, and unforgettable
              energy with thousands of attendees.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            Discover
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Event Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Explore premium experiences across entertainment, technology,
            gaming, business, and culture.
          </p>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Music",
              desc: "Concerts, festivals and live performances.",
              glow: "from-cyan-500/20 to-blue-500/20",
              emoji: "🎵",
            },
            {
              title: "Gaming",
              desc: "Esports tournaments and gaming events.",
              glow: "from-fuchsia-500/20 to-pink-500/20",
              emoji: "🎮",
            },
            {
              title: "Technology",
              desc: "Hackathons, conferences and tech expos.",
              glow: "from-violet-500/20 to-indigo-500/20",
              emoji: "💻",
            },
            {
              title: "Startup",
              desc: "Networking, innovation and founder meetups.",
              glow: "from-lime-500/20 to-emerald-500/20",
              emoji: "🚀",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${item.glow} p-6 transition duration-500 hover:-translate-y-2 hover:border-white/20`}
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl backdrop-blur-xl">
                  {item.emoji}
                </div>

                <h3 className="text-2xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING EVENTS */}
      <section>
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            Trending
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Popular Events
          </h2>

          <p className="mt-2 text-zinc-400">
            Explore the most popular experiences happening now.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br ${event.color} p-7 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]`}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-300">
                  {event.category}
                </p>

                <h3 className="mt-5 text-3xl font-black leading-tight">
                  {event.title}
                </h3>

                <p className="mt-4 text-zinc-300">
                  {event.attendees} interested attendees
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] py-10 backdrop-blur-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            Community
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Loved by attendees
          </h2>

          <p className="mt-3 text-zinc-400">
            Thousands of users trust Eventify for discovering events.
          </p>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex gap-6">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="min-w-[340px] rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-lg font-black text-black">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-black">
                      {review.name}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      Verified Attendee
                    </p>
                  </div>
                </div>

                <p className="leading-8 text-zinc-300">
                  “{review.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-2xl">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            Eventify Growth
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Built for modern event experiences
          </h2>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="rounded-[30px] border border-cyan-400/10 bg-cyan-500/5 p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-cyan-400">
              10K+
            </h3>

            <p className="mt-4 text-lg font-semibold text-white">
              Tickets booked
            </p>

            <p className="mt-2 leading-7 text-zinc-400">
              Thousands of users successfully booked events through Eventify.
            </p>
          </div>

          <div className="rounded-[30px] border border-fuchsia-400/10 bg-fuchsia-500/5 p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-fuchsia-400">
              500+
            </h3>

            <p className="mt-4 text-lg font-semibold text-white">
              Events hosted
            </p>

            <p className="mt-2 leading-7 text-zinc-400">
              Concerts, hackathons, gaming tournaments and more.
            </p>
          </div>

          <div className="rounded-[30px] border border-lime-400/10 bg-lime-500/5 p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-lime-400">
              99%
            </h3>

            <p className="mt-4 text-lg font-semibold text-white">
              Positive reviews
            </p>

            <p className="mt-2 leading-7 text-zinc-400">
              Trusted by attendees for seamless event discovery and booking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h1 className="text-4xl font-black">
        404
      </h1>

      <p className="mt-3 text-lg font-medium text-zinc-300">
        The page you're looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
      >
        Go back home
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/event" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/manage-events" element={<EventManagePage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}