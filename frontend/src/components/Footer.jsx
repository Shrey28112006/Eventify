export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          <div className="text-sm text-zinc-400">
            Built with React, Tailwind, Express, MongoDB, and JWT.
          </div>
        </div>
      </div>
    </footer>
  );
}

