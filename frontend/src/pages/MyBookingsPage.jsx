import { useEffect, useState } from "react";
import { getToken } from "../utils/auth.js";
import { apiFetch } from "../utils/api";

export default function MyBookingsPage() {
  const token = getToken();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMyBookings() {
    try {
      if (!token) {
        setMessage("Please login to view your bookings.");
        setBookings([]);
        return;
      }

      const data = await apiFetch("/api/booking/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(data.bookings || []);
    } catch (err) {
      setMessage(err?.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMyBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            My Bookings
          </p>
          <h1 className="mt-2 text-3xl font-black text-white">Your ticket history</h1>
        </div>
      </div>

      {message ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
          {message}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-6 text-zinc-300">Loading...</div>
      ) : bookings.length ? (
        <div className="mt-6 space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    {b.event?.category ?? "Event"}
                  </div>
                  <div className="mt-2 text-lg font-black text-white">
                    {b.event?.title ?? "Unknown event"}
                  </div>
                  <div className="mt-1 text-sm text-zinc-300">
                    {b.event?.venue ? `Venue: ${b.event.venue}` : ""}
                    {b.event?.date ? ` • Date: ${new Date(b.event.date).toLocaleDateString()}` : ""}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Tickets
                  </div>
                  <div className="mt-1 text-xl font-black text-white">{b.tickets}</div>
                  <div className="mt-2 text-xs text-zinc-400">
                    Booked: {new Date(b.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !message && <div className="mt-6 text-zinc-300">No bookings yet.</div>
      )}
    </section>
  );
}

