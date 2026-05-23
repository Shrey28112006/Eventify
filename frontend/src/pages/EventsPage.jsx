import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const ALL_CATEGORIES = [
  "All",
  "Music",
  "Business",
  "Tech",
  "Sports",
  "Arts",
  "Education",
  "Community",
];

function EventCard({ event }) {
  return (
    <Link
      to={`/event/${event._id}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/60 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-fuchsia-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              {event.category}
            </p>
            <h3 className="mt-2 text-lg font-black text-white">{event.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">
              {event.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-zinc-400">Date</p>
            <p className="text-sm font-bold text-white">
              {event.date ? new Date(event.date).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
            {event.venue}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
            {event.availableSeats} available
          </span>
        </div>

        <div className="mt-5 text-sm font-bold text-cyan-200">View details →</div>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        setMessage("");

        // Pull all then filter in UI for beginner simplicity.
        const res = await fetch(`${API_URL}/api/event/all`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch events");

        // backend returns: { success, events }
        setEvents(data.events || []);
      } catch (err) {
        setMessage(err.message || "Failed to load events");
      } finally {
        setIsLoading(false);
      }

      // Debugging helper (uncomment if needed):
      // console.log("Events API response:", data);
    }


    fetchEvents();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events.filter((e) => {
      const categoryOk =
        activeCategory === "All" ? true : e.category === activeCategory;

      const queryOk =
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.description || "").toLowerCase().includes(q);

      return categoryOk && queryOk;
    });
  }, [events, query, activeCategory]);


  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Events
          </p>
          <h1 className="mt-2 text-3xl font-black text-white">Explore what’s on</h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-300">
            Search events by name/description and filter by category.
          </p>
        </div>

        <div className="sm:w-[360px]">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={
                active
                  ? "rounded-full border border-cyan-400/60 bg-cyan-400/20 px-4 py-2 text-xs font-extrabold text-cyan-200"
                  : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-200 hover:bg-white/10"
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length ? (
          filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-300">
            No events match your search.
          </div>
        )}
      </div>
    </section>
  );
}

