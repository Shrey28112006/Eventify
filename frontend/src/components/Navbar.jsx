import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/auth.js";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthed = useMemo(() => !!token, [token]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  function handleLogout() {
    clearToken();
    setIsMenuOpen(false);
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 font-black text-black">
            E
          </span>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-wide text-white">EVENTIFY</div>
            <div className="text-xs text-zinc-400">Manage events with ease</div>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-zinc-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/event">Events</NavLink>
          {isAuthed ? (
            <NavLink to="/dashboard">Dashboard</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}

          {isAuthed ? (
            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-sm font-extrabold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/signup">Signup</NavLink>
          )}
        </nav>
      </div>

      {isMenuOpen ? (
        <div id="mobile-menu" className="sm:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-3">
              <div className="grid gap-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/event">Events</NavLink>
                {isAuthed ? (
                  <NavLink to="/dashboard">Dashboard</NavLink>
                ) : (
                  <NavLink to="/login">Login</NavLink>
                )}
                {isAuthed ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-left text-sm font-extrabold text-black"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink to="/signup">Signup</NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

