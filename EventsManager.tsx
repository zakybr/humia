"use client";

import { useActionState, useState } from "react";
import type { EventItem } from "@/lib/types";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventPublished,
} from "./actions";

const field =
  "mt-1.5 w-full border border-line bg-panel-2 px-3 py-2 text-[15px] text-ink transition-colors focus:border-signal";
const label = "eyebrow block";

/** ISO string -> value for <input type="datetime-local"> in local time. */
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 border px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.14em] ${
        published
          ? "border-signal-line text-signal"
          : "border-line-strong text-muted"
      }`}
    >
      {published ? (
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
      ) : null}
      {published ? "Published" : "Draft"}
    </span>
  );
}

function Fields({ item }: { item?: EventItem }) {
  return (
    <>
      <div>
        <label className={label}>Title</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={item?.title}
          className={field}
        />
      </div>
      <div>
        <label className={label}>Date &amp; time</label>
        <input
          name="starts_at"
          type="datetime-local"
          required
          defaultValue={item ? toLocalInput(item.starts_at) : undefined}
          className={`${field} [color-scheme:light]`}
        />
      </div>
      <div>
        <label className={label}>Location</label>
        <input
          name="location"
          type="text"
          defaultValue={item?.location ?? ""}
          className={field}
        />
      </div>
      <div>
        <label className={label}>Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={item?.description}
          className={`${field} resize-y`}
        />
      </div>
    </>
  );
}

function CreateEvent() {
  const [state, action, pending] = useActionState(createEvent, {});
  return (
    <form action={action} className="border border-line bg-panel p-6">
      <h3 className="text-lg text-ink">Add event</h3>
      <div className="mt-4 space-y-4">
        <Fields />
        <label className="flex items-center gap-2.5 text-sm text-body">
          <input
            type="checkbox"
            name="published"
            className="size-4 accent-[var(--signal)]"
          />
          Publish immediately
        </label>
        {state.error ? (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="btn btn-solid h-10 px-5 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Add event"}
        </button>
      </div>
    </form>
  );
}

function EventRow({ item }: { item: EventItem }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState(updateEvent, {});

  return (
    <li className="border border-line bg-panel p-6">
      {!editing ? (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <StatusPill published={item.published} />
              <span className="mono text-xs text-signal">
                {new Date(item.starts_at).toLocaleString("en-NZ", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <h4 className="mt-2.5 text-lg text-ink">{item.title}</h4>
            {item.location ? (
              <p className="mt-1 text-sm text-muted">{item.location}</p>
            ) : null}
            {item.description ? (
              <p className="mt-1 line-clamp-2 text-sm text-body">
                {item.description}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-signal transition-colors hover:text-signal-strong"
            >
              Edit
            </button>
            <form action={toggleEventPublished}>
              <input type="hidden" name="id" value={item.id} />
              <input
                type="hidden"
                name="next"
                value={(!item.published).toString()}
              />
              <button
                type="submit"
                className="text-muted transition-colors hover:text-ink"
              >
                {item.published ? "Unpublish" : "Publish"}
              </button>
            </form>
            <form
              action={deleteEvent}
              onSubmit={(e) => {
                if (!confirm("Delete this event?")) e.preventDefault();
              }}
            >
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                className="text-danger transition-opacity hover:opacity-80"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ) : (
        <form action={action} className="space-y-4">
          <input type="hidden" name="id" value={item.id} />
          <Fields item={item} />
          <label className="flex items-center gap-2.5 text-sm text-body">
            <input
              type="checkbox"
              name="published"
              defaultChecked={item.published}
              className="size-4 accent-[var(--signal)]"
            />
            Published
          </label>
          {state.error ? (
            <p role="alert" className="text-sm text-danger">
              {state.error}
            </p>
          ) : null}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="btn btn-solid h-10 px-5 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn btn-outline h-10 px-5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}

export default function EventsManager({ items }: { items: EventItem[] }) {
  return (
    <div className="space-y-6">
      <CreateEvent />
      {items.length === 0 ? (
        <p className="text-sm text-muted">No events yet.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <EventRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
