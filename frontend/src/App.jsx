import { Link, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import EventPage from "./pages/EventPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function Home() {
  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-4xl rounded-3xl border-4 border-black bg-white p-8 text-black shadow-[8px_8px_0_0_#000]">
        <p className="mb-4 inline-block rounded-full border-2 border-black bg-yellow-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
          Eventify Starter
        </p>
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">
          Beginner-friendly MERN starter for event management
        </h1>
        <p className="mt-4 max-w-2xl text-lg">
          React Vite, Tailwind CSS, React Router, Express.js, JWT auth, and
          MongoDB Atlas are organized in a clean structure ready to scale.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/login"
            className="rounded-xl border-4 border-black bg-lime-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-xl border-4 border-black bg-pink-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Signup
          </Link>
          <Link
            to="/dashboard"
            className="rounded-xl border-4 border-black bg-sky-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
          >
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="max-w-xl rounded-3xl border-4 border-black bg-orange-200 p-8 text-black shadow-[8px_8px_0_0_#000]">
        <h1 className="text-4xl font-black">404</h1>
        <p className="mt-3 text-lg font-medium">
          The page you're looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl border-4 border-black bg-white px-5 py-3 font-bold shadow-[4px_4px_0_0_#000]"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
