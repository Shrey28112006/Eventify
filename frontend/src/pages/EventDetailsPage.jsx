import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const EVENTS = [
  {
    id: "1",
    title: "Neon Night: Tech & Music",
    category: "Tech",
    date: "Aug 18",
    venue: "Downtown Hall",
    attendees: 1240,
    description:
      "A high-energy evening where builders meet music lovers. Expect lightning talks, live synth sets, and great networking.",
    highlights: [
      "Lightning talks",
      "Live synth performance",
      "Networking lounge",
      "After-hours DJ set"
    ]
  },
  {
    id: "2",
    title: "Founder Sprint: Business Talks",
    category: "Business",
    date: "Sep 02",
    venue: "Innovation Center",
    attendees: 780,
    description:
      "Practical growth strategies from operators. Bring your questions and leave with clear next steps.",
    highlights: [
      "Operator panel",
      "Live Q&A",
      "Startup resources",
      "Weekly follow-up community"
    ]
  },
  {
    id: "3",
    title: "Stadium Pulse: Community Sports",
    category: "Sports",
    date: "Sep 21",
    venue: "City Stadium",
    attendees: 1530,
    description:
      "Friendly tournaments and community vibes. Meet local teams, play games, and cheer together.",
    highlights: [
      "Mini tournaments",
      "Team meet & greet",
      "Family-friendly activities",
      "Community merch"
    ]
  }
];

export default function EventDetailsPage() {
  const { id } = useParams();

  const event = useMemo(() => EVENTS.find((e) => e.id === id), [id]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            {event ? event.category : "Event"}
          </p>
          <h1 className="mt-2 text-3xl font-black text-white">
            {event ? event.title : "Event not found"}
          </h1>
          <p className="mt-3 text-sm text-zinc-300">
            {event ? event.description : "Please pick a valid event from the list."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Details
          </p>
          {event ? (
            <div className="mt-3 space-y-2 text-sm">
              <p>
                <span className="text-zinc-400">Date:</span> {event.date}
              </p>
              <p>
                <span className="text-zinc-400">Venue:</span> {event.venue}
              </p>
              <p>
                <span className="text-zinc-400">Attendees:</span>{" "}
                {event.attendees}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {event ? (
        <div className="mt-8">
          <h2 className="text-lg font-black text-white">Highlights</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {event.highlights.map((h) => (
              <li
                key={h}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/event"
          className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
        >
          Back to events
        </Link>
      </div>
    </section>
  );
}

