import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/auth.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

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
        setMessage("");

        if (!token) {
          setMessage("Please log in again.");
          setMe(null);
          setEvents([]);
          setBookings([]);
          return;
        }

        const [meRes, eventsRes, bookingsRes] = await Promise.all([
          fetch(`${API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/api/event/all`),
          fetch(`${API_URL}/api/booking/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Safely parse JSON. If backend returns HTML (wrong route / wrong URL), show a clear error.
        async function parseJsonSafe(resp) {
          const ct = resp.headers.get("content-type") || "";
          if (!ct.includes("application/json")) {
            const text = await resp.text();
            throw new Error(
              `API returned non-JSON response (content-type: ${ct}). First bytes: ${text.slice(
                0,
                120
              )}`
            );
          }
          return resp.json();
        }

        const [meData, eventsData, bookingsData] = await Promise.all([
          parseJsonSafe(meRes),
          parseJsonSafe(eventsRes),
          parseJsonSafe(bookingsRes),
        ]);

        if (!meRes.ok) throw new Error(meData.message || "Failed to load user");
        if (!eventsRes.ok) throw new Error(eventsData.message || "Failed to load events");
        if (!bookingsRes.ok) throw new Error(bookingsData.message || "Failed to load bookings");


        if (cancelled) return;

        setMe(meData.user);
        setEvents(eventsData.events || []);
        setBookings(bookingsData.bookings || []);
      } catch (err) {
        if (cancelled) return;
        setMessage(err.message || "Failed to load dashboard");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
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
      const d = new Date(e.date);
      return d.toString() !== "Invalid Date" && d.getTime() >= Date.now();
    }).length;
    const totalBookings = bookings.length;
    return { totalEvents, upcomingEvents, totalBookings };
  }, [events, bookings]);

  const recentActivity = useMemo(() => {
    // Since we don't have an activity feed endpoint, we approximate using latest bookings.
    return [...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((b) => ({
        id: b._id,
        title: b.event?.title ?? "Event",
        category: b.event?.category ?? "Event",
        when: b.createdAt,
        tickets: b.tickets,
      }));
  }, [bookings]);

  return (
    <div className="min-h-[calc(100vh-8rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-[260px]">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/40 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-sm font-black text-black">
                  {me?.name ? me.name.slice(0, 1).toUpperCase() : "U"}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-extrabold text-white">
                    {me?.name ?? "Your account"}
                  </div>
                  <div className="truncate text-xs font-semibold text-zinc-400">
                    {me?.email ?? (token ? "Loading..." : "Not logged in")}
                  </div>
                </div>
              </div>

              <nav className="mt-5 space-y-1">
                <Link
                  to="/"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/event"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
                >
                  Events
                </Link>
                <Link
                  to="/manage-events"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
                >
                  Create / Manage
                </Link>
                <Link
                  to="/my-bookings"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
                >
                  My bookings
                </Link>
              </nav>

              <div className="mt-5 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-sm font-extrabold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:brightness-110"
                >
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="flex-1">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/30 p-5 sm:p-7">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Dashboard
                  </p>
                  <h1 className="mt-2 text-3xl font-black text-white">
                    Welcome{me?.name ? `, ${me.name.split(" ")[0]}` : ""} 👋
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-zinc-300">
                    Manage events, view seat availability, and track your bookings.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/manage-events"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-white/10 hover:border-cyan-400/40"
                  >
                    Create event
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-sm font-extrabold text-black transition hover:brightness-110"
                  >
                    View bookings
                  </Link>
                </div>
              </div>

              {/* Alerts */}
              {message ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
                  {message}
                </div>
              ) : null}

              {/* Loading skeleton */}
              {isLoading ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {/* Stats */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40">
                      <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Total events
                      </div>
                      <div className="mt-2 text-3xl font-black text-white">
                        {stats.totalEvents}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40">
                      <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Upcoming
                      </div>
                      <div className="mt-2 text-3xl font-black text-white">
                        {stats.upcomingEvents}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-fuchsia-400/40">
                      <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        My bookings
                      </div>
                      <div className="mt-2 text-3xl font-black text-white">
                        {stats.totalBookings}
                      </div>
                    </div>
                  </div>

                  {/* Two-column layout */}
                  <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">
                    {/* Upcoming events */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-white">Upcoming events</h2>
                        <Link
                          to="/event"
                          className="text-sm font-bold text-cyan-200 hover:underline"
                        >
                          Explore
                        </Link>
                      </div>

                      {events.length === 0 ? (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
                          No events found yet.
                        </div>
                      ) : (
                        <div className="mt-4 space-y-3">
                          {[...events]
                            .sort((a, b) => {
                              const ad = a.date ? new Date(a.date).getTime() : 0;
                              const bd = b.date ? new Date(b.date).getTime() : 0;
                              return ad - bd;
                            })
                            .slice(0, 5)
                            .map((e) => (
                              <Link
                                key={e._id}
                                to={`/event/${e._id}`}
                                className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-white/10"
                              >
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <div className="truncate text-xs font-bold uppercase tracking-wider text-cyan-300">
                                      {e.category}
                                    </div>
                                    <div className="truncate text-base font-extrabold text-white">
                                      {e.title}
                                    </div>
                                    <div className="mt-1 text-sm text-zinc-300">
                                      {e.venue} • {e.date ? new Date(e.date).toLocaleDateString() : "—"}
                                    </div>
                                  </div>
                                  <div className="mt-2 sm:mt-0 text-sm font-bold text-zinc-200">
                                    {e.availableSeats ?? e.capacity ?? 0} seats
                                  </div>
                                </div>
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* My bookings + activity */}
                    <div>
                      <h2 className="text-xl font-black text-white">My bookings</h2>
                      {bookings.length === 0 ? (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
                          No bookings yet. Book a seat from an event details page.
                        </div>
                      ) : (
                        <div className="mt-4 space-y-3">
                          {[...bookings]
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .slice(0, 4)
                            .map((b) => (
                              <div
                                key={b._id}
                                className="rounded-2xl border border-white/10 bg-white/5 p-4"
                              >
                                <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                  {b.event?.category ?? "Event"}
                                </div>
                                <div className="mt-1 text-sm font-extrabold text-white">
                                  {b.event?.title ?? "Unknown event"}
                                </div>
                                <div className="mt-1 text-sm text-zinc-300">
                                  Tickets: {b.tickets} • {b.event?.venue ?? ""}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400">
                          Recent activity
                        </h3>
                        {recentActivity.length === 0 ? (
                          <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                            Activity will appear here after you book tickets.
                          </div>
                        ) : (
                          <div className="mt-3 space-y-2">
                            {recentActivity.map((a) => (
                              <div
                                key={a.id}
                                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400/30"
                              >
                                <div className="min-w-0">
                                  <div className="truncate text-xs font-bold uppercase tracking-wider text-cyan-300">
                                    {a.category}
                                  </div>
                                  <div className="truncate text-sm font-extrabold text-white">
                                    {a.title}
                                  </div>
                                  <div className="mt-1 text-xs font-semibold text-zinc-300">
                                    {new Date(a.when).toLocaleString()}
                                  </div>
                                </div>
                                <div className="text-sm font-extrabold text-white">×{a.tickets}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

