import { useEffect, useMemo, useState } from "react";
import { getToken } from "../utils/auth.js";
import { apiFetch } from "../utils/api";

const initialForm = {
  title: "",
  description: "",
  category: "Tech",
  date: "",
  venue: "",
  capacity: 0,
};

function normalizeDateInput(value) {
  return value ? new Date(value) : null;
}

export default function EventManagePage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const token = useMemo(() => getToken(), []);

  async function fetchEvents() {
    setIsLoading(true);
    setMessage("");

    try {
      const data = await apiFetch(
        "/api/event/my-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(data.events || []);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchEvents();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((curr) => ({
      ...curr,
      [name]:
        name === "capacity"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setMessage("");

    if (!token) {
      setMessage(
        "Please login to create/edit events."
      );

      setIsLoading(false);
      return;
    }

    const payload = {
      ...form,
      date: normalizeDateInput(form.date),
    };

    if (
      payload.date instanceof Date &&
      !Number.isNaN(payload.date.getTime())
    ) {
      payload.date =
        payload.date.toISOString();
    } else {
      payload.date = form.date;
    }

    try {
      const url = editingId
        ? `/api/event/${editingId}`
        : `/api/event`;

      const method = editingId
        ? "PUT"
        : "POST";

      const data = await apiFetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      setMessage(
        data.message || "Success"
      );

      setEditingId(null);
      setForm(initialForm);

      await fetchEvents();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(event) {
    setEditingId(event._id);

    setForm({
      title: event.title ?? "",
      description:
        event.description ?? "",
      category:
        event.category ?? "Tech",

      date: event.date
        ? new Date(event.date)
            .toISOString()
            .slice(0, 10)
        : "",

      venue: event.venue ?? "",

      capacity:
        event.capacity ?? 0,
    });
  }

  async function handleDelete(id) {
    setIsLoading(true);
    setMessage("");

    try {
      if (!token) {
        throw new Error(
          "Please login to delete events."
        );
      }

      const data = await apiFetch(
        `/api/event/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        data.message || "Event deleted"
      );

      if (editingId === id) {
        setEditingId(null);
        setForm(initialForm);
      }

      await fetchEvents();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">

      {/* HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Manage Events
          </p>

          <h1 className="mt-2 text-3xl font-black text-white">
            Create, edit & delete
          </h1>

          <p className="mt-2 text-sm text-zinc-300">
            Only events created by you
            are shown here.
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-7 grid gap-4"
      >

        <div className="grid gap-4 sm:grid-cols-2">

          {/* TITLE */}
          <label className="block">

            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Title
            </span>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
              required
            />
          </label>

          {/* CATEGORY */}
          <label className="block">

            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Category
            </span>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
            >
              {[
                "Music",
                "Business",
                "Tech",
                "Sports",
                "Arts",
                "Education",
                "Community",
              ].map((c) => (
                <option
                  key={c}
                  value={c}
                >
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* DESCRIPTION */}
        <label className="block">

          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
            Description
          </span>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
            required
          />
        </label>

        {/* ROW */}
        <div className="grid gap-4 sm:grid-cols-3">

          {/* DATE */}
          <label className="block">

            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Date
            </span>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
              required
            />
          </label>

          {/* VENUE */}
          <label className="block">

            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Venue
            </span>

            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
              required
            />
          </label>

          {/* CAPACITY */}
          <label className="block">

            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Capacity
            </span>

            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
              min={0}
              required
            />
          </label>
        </div>

        {/* MESSAGE */}
        {message ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
            {message}
          </div>
        ) : null}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-cyan-400/90 px-5 py-3 text-sm font-extrabold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading
            ? "Saving..."
            : editingId
            ? "Update event"
            : "Create event"}
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-10">

        <h2 className="text-xl font-black text-white">
          Your events
        </h2>

        <p className="mt-2 text-sm text-zinc-300">
          Only events created by you
          appear here.
        </p>

        <div className="mt-6 overflow-x-auto">

          <table className="w-full min-w-[680px] border-separate border-spacing-0">

            <thead>
              <tr>
                {[
                  "Title",
                  "Category",
                  "Date",
                  "Venue",
                  "Capacity",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b border-white/10 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {events.length ? (
                events.map((e) => (
                  <tr key={e._id}>

                    <td className="border-b border-white/10 px-4 py-4 text-sm text-white">
                      {e.title}
                    </td>

                    <td className="border-b border-white/10 px-4 py-4 text-sm text-zinc-200">
                      {e.category}
                    </td>

                    <td className="border-b border-white/10 px-4 py-4 text-sm text-zinc-200">
                      {e.date
                        ? new Date(
                            e.date
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="border-b border-white/10 px-4 py-4 text-sm text-zinc-200">
                      {e.venue}
                    </td>

                    <td className="border-b border-white/10 px-4 py-4 text-sm text-zinc-200">
                      {e.capacity}
                    </td>

                    <td className="border-b border-white/10 px-4 py-4">

                      <div className="flex flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            startEdit(e)
                          }
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              e._id
                            )
                          }
                          className="rounded-lg border border-pink-400/30 bg-pink-400/10 px-3 py-2 text-xs font-bold text-pink-200 transition hover:bg-pink-400/20"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-6 text-sm text-zinc-300"
                    colSpan={6}
                  >
                    No events created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}