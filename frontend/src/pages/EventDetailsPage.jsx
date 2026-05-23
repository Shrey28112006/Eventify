import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getToken } from "../utils/auth.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export default function EventDetailsPage() {
  const { id } = useParams();
  const token = useMemo(() => getToken(), []);

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  async function fetchEvent() {
    try {
      setIsLoading(true);
      setMessage("");

      const res = await fetch(`${API_URL}/api/event/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Event not found");
      setEvent(data.event);
    } catch (err) {
      setMessage(err.message);
      setEvent(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleBook(e) {
    e.preventDefault();
    if (!token) {
      setMessage("Please login to book tickets.");
      return;
    }

    setIsBooking(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/booking/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tickets: Number(tickets) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      setMessage(data.message || "Booking successful!");
      setTickets(1);
      await fetchEvent();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
      {isLoading ? (
        <div className="text-zinc-300">Loading...</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {event ? event.category : "Event"}
              </p>
              <h1 className="mt-2 text-3xl font-black text-white">
                {event ? event.title : "Event not found"}
              </h1>
              <p className="mt-3 text-sm text-zinc-300">
                {event ? event.description : "Please pick a valid event."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Details
              </p>
              {event ? (
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="text-zinc-400">Date:</span>{" "}
                    {event.date ? new Date(event.date).toLocaleDateString() : "—"}
                  </p>
                  <p>
                    <span className="text-zinc-400">Venue:</span>{" "}
                    {event.venue}
                  </p>
                  <p>
                    <span className="text-zinc-400">Available seats:</span>{" "}
                    {event.availableSeats}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {message ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
              {message}
            </div>
          ) : null}

          {event ? (
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
              <div>
                <h2 className="text-lg font-black text-white">Book tickets</h2>
                <p className="mt-2 text-sm text-zinc-300">
                  Choose how many tickets you want to book.
                </p>

                <form onSubmit={handleBook} className="mt-5 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Tickets
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={event.availableSeats}
                      value={tickets}
                      onChange={(e) => setTickets(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isBooking || event.availableSeats === 0}
                    className="w-full rounded-xl bg-cyan-400/90 px-5 py-3 text-sm font-extrabold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {event.availableSeats === 0
                      ? "Sold out"
                      : isBooking
                        ? "Booking..."
                        : "Book now"}
                  </button>

                  {token ? (
                    <Link
                      to="/my-bookings"
                      className="block text-center text-sm font-bold text-cyan-200 hover:underline"
                    >
                      View my bookings →
                    </Link>
                  ) : (
                    <p className="text-center text-sm text-zinc-400">
                      Login required to book.
                    </p>
                  )}
                </form>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Summary
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="text-zinc-400">Capacity:</span> {event.capacity}
                  </p>
                  <p>
                    <span className="text-zinc-400">Available seats:</span> {event.availableSeats}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/event"
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              Back to events
            </Link>
          </div>
        </>
      )}
    </section>
  );
}


