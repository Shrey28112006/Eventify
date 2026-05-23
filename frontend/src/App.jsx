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
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:p-10">
      <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -left-24 top-24 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <p className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-bold uppercase tracking-wide text-zinc-100">
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
        Eventify Starter
      </p>

      <h1 className="relative text-4xl font-black leading-tight sm:text-5xl">
        Discover events happening near you
      </h1>
      <p className="relative mt-4 max-w-2xl text-lg text-zinc-300">
        Browse, book tickets, and manage your plans in one place—built for
        fast event discovery and smooth checkout.
      </p>

      <div className="relative mt-8 flex flex-wrap gap-4">
        <Link
          to="/login"
          className="rounded-xl border border-white/10 bg-cyan-400/90 px-5 py-3 text-sm font-extrabold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:brightness-110"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="rounded-xl border border-white/10 bg-fuchsia-400/90 px-5 py-3 text-sm font-extrabold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:brightness-110"
        >
          Signup
        </Link>
        <Link
          to="/dashboard"
          className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/15"
        >
          Dashboard
        </Link>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h1 className="text-4xl font-black">404</h1>
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

