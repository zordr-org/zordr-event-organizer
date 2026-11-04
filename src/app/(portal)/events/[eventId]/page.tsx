"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getEventById } from "@/services/events.service";
import { formatTicketPrice } from "@/lib/frontend-validation";

export default function EventPreviewPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = getEventById(eventId);

  if (!event) {
    return <main className="mx-auto max-w-4xl p-6"><h1 className="text-2xl font-bold">Event not found</h1><p className="mt-3">This event is unavailable or has been removed.</p><Link href="/events" className="mt-5 inline-block text-emerald-700 underline">View all events</Link></main>;
  }

  const price = formatTicketPrice(event.ticketPrice);
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <Link href="/events" className="text-sm font-semibold text-emerald-700">← All events</Link>
      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold text-emerald-700">Event Preview · {event.status}</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">{event.title}</h1>
        <p className="mt-3 text-slate-600">{event.shortDescription}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div><dt className="text-sm text-slate-500">Date and time</dt><dd>{event.date} · {event.time}</dd></div>
          <div><dt className="text-sm text-slate-500">Venue</dt><dd>{event.venueName || event.venue}<br />{event.address}</dd></div>
        </dl>
      </header>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold">About this event</h2>
        <p className="mt-3 whitespace-pre-line text-slate-600">{event.detailedDescription}</p>
        {event.venueInstructions && <p className="mt-4 text-sm text-slate-600">{event.venueInstructions}</p>}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold">Tickets</h2>
        <h3 className="mt-3 font-semibold">{event.ticketName}</h3>
        <p className="mt-1 text-slate-600">{event.ticketDescription}</p>
        <p className="mt-3 text-xl font-bold">{price === "Invalid price" ? price : `₹${price}`}</p>
      </section>
      <Link href={`/events/${encodeURIComponent(event.id)}/edit/1`} className="inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white">Edit event</Link>
    </main>
  );
}
