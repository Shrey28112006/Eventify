import { Link } from "react-router-dom";
import { clearToken, getToken } from "../utils/auth.js";

function DashboardPage() {
  const token = getToken();

  function handleLogout() {
    clearToken();
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-4xl rounded-3xl border-4 border-black bg-white p-8 text-black shadow-[8px_8px_0_0_#000]">
        <p className="mb-4 inline-block rounded-full border-2 border-black bg-lime-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
          Dashboard
        </p>
        <h1 className="text-4xl font-black leading-tight">Event Dashboard</h1>
        <p className="mt-4 max-w-2xl text-lg">
          This protected page is only meant for signed-in users. Use it as the
          starting point for event management features like creating events,
          viewing bookings, and managing attendees.
        </p>

        <div className="mt-6 rounded-2xl border-4 border-black bg-slate-100 p-4">
          <p className="text-sm font-bold uppercase tracking-wide">Token status</p>
          <p className="mt-2 break-all text-sm">
            {token ? token : "No token found. Please log in again."}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/event"
            className="rounded-xl border-4 border-black bg-sky-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            View protected API route
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border-4 border-black bg-pink-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
