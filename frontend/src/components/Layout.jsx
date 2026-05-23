import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10"
        aria-label={`Page: ${location.pathname}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

