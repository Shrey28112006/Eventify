import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      saveToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-md rounded-3xl border-4 border-black bg-white p-8 text-black shadow-[8px_8px_0_0_#000]">
        <p className="mb-4 inline-block rounded-full border-2 border-black bg-pink-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
          Signup
        </p>
        <h1 className="text-3xl font-black">Create your account</h1>
        <p className="mt-2 text-sm text-slate-700">
          Join Eventify and start managing events.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Name</span>
            <input
              className="w-full rounded-xl border-4 border-black px-4 py-3 outline-none"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">Email</span>
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
            <span className="mb-2 block text-sm font-bold">Password</span>
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
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;
