import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { saveToken } from "../utils/auth.js";
import { apiFetch } from "../utils/api";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestSeqRef = useRef(0);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    requestSeqRef.current += 1;
    const mySeq = requestSeqRef.current;

    setMessage("");
    setIsLoading(true);

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",

        // FIXED RETRY CONFIG
        retryCount: 3,
        retryOn: ["backend_offline", "timeout"],
        retryDelayMs: 1000,

        timeoutMs: 8000,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (mySeq !== requestSeqRef.current) return;

      saveToken(data.token);

      navigate("/dashboard");
    } catch (error) {
      if (mySeq !== requestSeqRef.current) return;

      setMessage(error?.message || "Login failed");
    } finally {
      if (mySeq !== requestSeqRef.current) return;

      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-md rounded-3xl border-4 border-black bg-white p-8 text-black shadow-[8px_8px_0_0_#000]">
        <p className="mb-4 inline-block rounded-full border-2 border-black bg-sky-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
          Login
        </p>

        <h1 className="text-3xl font-black">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-700">
          Sign in to access your event dashboard.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Email
            </span>

            <input
              className="w-full rounded-xl border-4 border-black px-4 py-3 outline-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Password
            </span>

            <input
              className="w-full rounded-xl border-4 border-black px-4 py-3 outline-none"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {message ? (
            <p className="rounded-xl border-2 border-black bg-red-100 px-4 py-3 text-sm font-medium">
              {message}
            </p>
          ) : null}

          <button
            className="w-full rounded-xl border-4 border-black bg-lime-300 px-5 py-3 font-bold shadow-[4px_4px_0_0_#000] disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold underline"
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;