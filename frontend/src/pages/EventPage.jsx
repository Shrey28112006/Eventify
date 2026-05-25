import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/auth.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function EventPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-4xl rounded-3xl border-4 border-black bg-white p-8 text-black shadow-[8px_8px_0_0_#000]">
        <p className="mb-4 inline-block rounded-full border-2 border-black bg-sky-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
          Events
        </p>
        <h1 className="text-4xl font-black leading-tight">Event Management UI</h1>
        <p className="mt-4 max-w-2xl text-lg">
          This route was part of the starter protected-route demo. The real Events CRUD UI is now under:
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/event"
            className="rounded-xl border-4 border-black bg-lime-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Go to Events
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EventPage;

