"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarPlus, ChevronDown, Pencil, Trash2, X } from "lucide-react";
import { createEvent, deleteEvent, updateEvent } from "@/app/admin/actions";
import type { EventRecord } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { EventForm } from "./event-form";

function EventRow({ event, isPast }: { event: EventRecord; isPast: boolean }) {
  const [editing, setEditing] = useState(false);

  return (
    <li className="rounded-2xl border border-line bg-white">
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-sky sm:block">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="grid h-full place-items-center text-xs text-soft">
              No photo
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-ink">{event.title}</p>
          <p className="mt-0.5 text-sm text-soft">
            {formatEventDate(event.event_date)}, {formatEventTime(event.event_date)}
          </p>
          {isPast ? (
            <span className="mt-1 inline-block rounded-full bg-sky px-2.5 py-0.5 text-xs font-medium text-soft">
              Already happened
            </span>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl text-navy hover:bg-sky"
            aria-label={editing ? `Close editor for ${event.title}` : `Edit ${event.title}`}
          >
            {editing ? <X size={18} /> : <Pencil size={18} />}
          </button>
          <form
            action={deleteEvent}
            onSubmit={(e) => {
              if (!confirm(`Delete "${event.title}"? This cannot be undone.`)) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="id" value={event.id} />
            <button
              type="submit"
              className="grid h-11 w-11 place-items-center rounded-xl text-soft hover:bg-red-50 hover:text-red-700"
              aria-label={`Delete ${event.title}`}
            >
              <Trash2 size={18} />
            </button>
          </form>
        </div>
      </div>

      {editing && (
        <div className="border-t border-line p-4 sm:p-5">
          <EventForm
            action={updateEvent}
            event={event}
            onDone={() => setEditing(false)}
          />
        </div>
      )}
    </li>
  );
}

export function EventsManager({
  upcoming,
  past,
}: {
  upcoming: EventRecord[];
  past: EventRecord[];
}) {
  const [adding, setAdding] = useState(false);
  const [showPast, setShowPast] = useState(false);

  return (
    <div className="space-y-8">
      {/* Add new event */}
      <section className="rounded-2xl border border-line bg-white">
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="flex w-full items-center justify-between p-5 text-left"
          aria-expanded={adding}
        >
          <span className="flex items-center gap-3 text-lg font-semibold text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky text-navy">
              <CalendarPlus size={19} />
            </span>
            Add a new event
          </span>
          <ChevronDown
            size={20}
            className={`text-soft transition-transform ${adding ? "rotate-180" : ""}`}
          />
        </button>
        {adding && (
          <div className="border-t border-line p-5">
            <EventForm action={createEvent} onDone={() => setAdding(false)} />
          </div>
        )}
      </section>

      {/* Upcoming */}
      <section>
        <h2 className="text-xl font-semibold text-ink">
          Upcoming events ({upcoming.length})
        </h2>
        <p className="mt-1 text-sm text-soft">
          These show on the website right now. Tap the pencil to change one.
        </p>
        {upcoming.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {upcoming.map((event) => (
              <EventRow key={event.id} event={event} isPast={false} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-line bg-sky p-6 text-center text-sm text-soft">
            No upcoming events yet. Use &ldquo;Add a new event&rdquo; above.
          </p>
        )}
      </section>

      {/* Past */}
      <section>
        <button
          type="button"
          onClick={() => setShowPast((v) => !v)}
          className="flex items-center gap-2 text-xl font-semibold text-ink"
          aria-expanded={showPast}
        >
          Past events ({past.length})
          <ChevronDown
            size={19}
            className={`text-soft transition-transform ${showPast ? "rotate-180" : ""}`}
          />
        </button>
        <p className="mt-1 text-sm text-soft">
          Past events stay on the website as a photo record. You can still add
          or change their photos here.
        </p>
        {showPast && (
          <ul className="mt-4 space-y-3">
            {past.map((event) => (
              <EventRow key={event.id} event={event} isPast />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
