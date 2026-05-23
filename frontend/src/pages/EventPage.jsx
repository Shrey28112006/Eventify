import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/auth.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function EventPage() {
  const [message, setMessage] = useState("Loading protected event data...");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function loadEventData() {
      const token = getToken();

      if (!token) {
        setMessage("No token found. Please login first.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/event/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load protected event data");
        }

        setMessage(data.message);
        setUserName(data.user?.name ?? "");
      } catch (error) {
        setMessage(error.message);
      }
    }

    loadEventData();
  }, []);

  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-4xl rounded-3xl border-4 border-black bg-white p-8 text-black shadow-[8px_8px_0_0_#000]">
        <p className="mb-4 inline-block rounded-full border-2 border-black bg-sky-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
          Protected Event Route
        </p>
        <h1 className="text-4xl font-black leading-tight">Event Route</h1>
        <p className="mt-4 max-w-2xl text-lg">{message}</p>

        {userName ? (
          <div className="mt-6 rounded-2xl border-4 border-black bg-lime-100 p-4">
            <p className="text-sm font-bold uppercase tracking-wide">Signed in as</p>
            <p className="mt-2 text-lg font-bold">{userName}</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/dashboard"
            className="rounded-xl border-4 border-black bg-lime-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Back to dashboard
          </Link>
          <Link
            to="/login"
            className="rounded-xl border-4 border-black bg-pink-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EventPage;
