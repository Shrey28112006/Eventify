import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/auth.js";
import { apiFetch } from "../utils/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const token = useMemo(() => getToken(), []);

  const [me, setMe] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);

        const [meData, eventsData, bookingsData] = await Promise.all([
          apiFetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          apiFetch("/api/event/all"),
          apiFetch("/api/booking/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (cancelled) return;

        setMe(meData.user);
        setEvents(eventsData.events || []);
        setBookings(bookingsData.bookings || []);
      } catch (err) {
        if (!cancelled) {
          setMessage(err.message || "Failed to load dashboard");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    if (token) {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [token]);

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  const stats = useMemo(() => {
    const totalEvents = events.length;

    const upcomingEvents = events.filter((e) => {
      if (!e.date) return false;
      return new Date(e.date).getTime() >= Date.now();
    }).length;

    return {
      totalEvents,
      upcomingEvents,
      totalBookings: bookings.length,
    };
  }, [events, bookings]);

  const imageByCategory = {
    Tech:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",

    Music:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",

    Business:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",

    Sports:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-[#030712] px-4 py-6 text-white">

      <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-5 xl:grid-cols-[340px_1fr]">

        {/* SIDEBAR */}
        <aside className="sticky top-6 h-fit rounded-[32px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

          {/* PROFILE */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-5">

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-4xl font-black text-black shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                {me?.name?.slice(0, 1)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-3xl font-black text-white">
                  {me?.name || "User"}
                </h2>

                <p className="truncate text-base text-zinc-400">
                  {me?.email}
                </p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mt-8 space-y-4">

            <Link
              to="/"
              className="flex items-center rounded-3xl border border-cyan-400/20 bg-cyan-400/5 px-6 py-5 text-lg font-bold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              Home
            </Link>

            <Link
              to="/event"
              className="flex items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-lg font-bold text-zinc-300 transition hover:border-fuchsia-400/30 hover:bg-white/[0.05]"
            >
              Events
            </Link>

            <Link
              to="/manage-events"
              className="flex items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-lg font-bold text-zinc-300 transition hover:border-fuchsia-400/30 hover:bg-white/[0.05]"
            >
              Manage Events
            </Link>

            <Link
              to="/my-bookings"
              className="flex items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-lg font-bold text-zinc-300 transition hover:border-fuchsia-400/30 hover:bg-white/[0.05]"
            >
              My Bookings
            </Link>
          </div>

          {/* SIDEBAR CARD */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 p-6">

            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              EVENTIFY PRO
            </p>

            <h3 className="mt-5 text-4xl font-black leading-tight text-white">
              Create unforgettable experiences
            </h3>

            <p className="mt-5 text-base leading-8 text-zinc-400">
              Organize events, manage bookings, and track engagement from one premium dashboard.
            </p>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 py-5 text-xl font-black text-black transition hover:brightness-110"
          >
            Logout
          </button>
        </aside>

        {/* MAIN */}
        <main className="space-y-5">

          {/* HERO */}
          <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-6 xl:p-7">

            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">

              {/* LEFT */}
              <div className="max-w-4xl">

                <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
                  Dashboard Overview
                </p>

                <h1 className="mt-5 text-5xl font-black leading-none xl:text-6xl">
                  Welcome back,
                  <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                    {" "}
                    {me?.name?.split(" ")[0] || "User"}
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                  Track events, monitor bookings, and manage everything from one modern dashboard experience.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">

                <Link
                  to="/manage-events"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-base font-black text-white transition hover:border-cyan-400/30"
                >
                  Create Event
                </Link>

                <Link
                  to="/my-bookings"
                  className="rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-4 text-base font-black text-black transition hover:brightness-110"
                >
                  View Bookings
                </Link>

              </div>
            </div>

            {/* STATS */}
            <div className="relative z-10 mt-7 grid gap-4 xl:grid-cols-3">

              <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-5">

                <p className="text-sm font-black uppercase tracking-[0.25em] text-zinc-400">
                  Total Events
                </p>

                <h2 className="mt-4 text-6xl font-black text-white">
                  {stats.totalEvents}
                </h2>
              </div>

              <div className="rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-5">

                <p className="text-sm font-black uppercase tracking-[0.25em] text-zinc-400">
                  Upcoming Events
                </p>

                <h2 className="mt-4 text-6xl font-black text-white">
                  {stats.upcomingEvents}
                </h2>
              </div>

              <div className="rounded-3xl border border-lime-400/20 bg-gradient-to-br from-lime-500/10 to-transparent p-5">

                <p className="text-sm font-black uppercase tracking-[0.25em] text-zinc-400">
                  Total Bookings
                </p>

                <h2 className="mt-4 text-6xl font-black text-white">
                  {stats.totalBookings}
                </h2>
              </div>

            </div>
          </section>

          {/* EVENTS + BOOKINGS */}
          <div className="mt-6 grid gap-4 2xl:grid-cols-[1.2fr_0.85fr]">

            {/* EVENTS */}
            <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-3xl font-black text-white">
                  Upcoming Events
                </h2>

                <Link
                  to="/event"
                  className="text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
                >
                  View all →
                </Link>
              </div>

              <div className="space-y-4">

                {[...events]
                  .slice(0, 4)
                  .map((e) => (
                    <Link
                      key={e._id}
                      to={`/event/${e._id}`}
                      className="group flex items-center gap-4 rounded-[26px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.06]"
                    >

                      {/* EVENT IMAGE */}
                      <div className="h-24 w-24 overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/15 to-fuchsia-500/15">

                        <img
                          src={
                            imageByCategory[e.category] ||
                            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
                          }
                          alt={e.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">

                        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                          {e.category}
                        </p>

                        <h3 className="mt-1 truncate text-2xl font-black text-white">
                          {e.title}
                        </h3>

                        <p className="mt-2 truncate text-sm text-zinc-400">
                          {e.venue}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {e.date
                            ? new Date(e.date).toLocaleDateString()
                            : "Coming soon"}
                        </p>
                      </div>

                      {/* SEATS */}
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center">

                        <div className="text-4xl font-black text-white">
                          {e.availableSeats ?? e.capacity ?? 0}
                        </div>

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                          Seats
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>

            {/* BOOKINGS */}
            <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-3xl font-black text-white">
                  Recent Bookings
                </h2>

                <Link
                  to="/my-bookings"
                  className="text-sm font-bold text-fuchsia-300 transition hover:text-fuchsia-200"
                >
                  View all →
                </Link>
              </div>

              <div className="space-y-4">

                {[...bookings]
                  .slice(0, 4)
                  .map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center gap-3 rounded-[26px] border border-white/10 bg-white/[0.04] p-4 transition hover:border-fuchsia-400/30"
                    >

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/15 to-cyan-500/15 text-2xl">
                        🎫
                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="text-xs font-black uppercase tracking-[0.25em] text-fuchsia-300">
                          {b.event?.category ?? "Event"}
                        </p>

                        <h3 className="mt-1 truncate text-xl font-black text-white">
                          {b.event?.title ?? "Unknown Event"}
                        </h3>

                        <p className="mt-2 truncate text-sm text-zinc-400">
                          {b.event?.venue ?? "Venue"}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {new Date(b.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 px-4 py-3">

                        <div className="text-2xl font-black text-white">
                          ×{b.tickets}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
              {message}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}