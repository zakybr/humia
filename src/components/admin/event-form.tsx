"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import type { ActionResult } from "@/app/admin/actions";
import type { EventRecord } from "@/lib/types";
import { toDatetimeLocal } from "@/lib/format";
import { ImageUploader } from "./image-uploader";

const CATEGORIES = [
  "Pengajian",
  "Community",
  "Religious Holidays",
  "Education",
  "Volunteer",
];

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none focus:border-blue";

/**
 * One form handles both "add" and "edit". Big touch targets, plain
 * language labels, and a clear success message for less technical users.
 */
export function EventForm({
  action,
  event,
  onDone,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  event?: EventRecord;
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      onDone?.();
    }
  }, [state, onDone]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {event ? <input type="hidden" name="id" value={event.id} /> : null}

      <div>
        <label htmlFor={`title-${event?.id ?? "new"}`} className="block text-sm font-semibold text-ink">
          Event name
        </label>
        <input
          id={`title-${event?.id ?? "new"}`}
          name="title"
          required
          defaultValue={event?.title ?? ""}
          placeholder="e.g. Monthly Pengajian"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`date-${event?.id ?? "new"}`} className="block text-sm font-semibold text-ink">
            Date and time
          </label>
          <input
            id={`date-${event?.id ?? "new"}`}
            name="event_date"
            type="datetime-local"
            required
            defaultValue={event?.event_date ? toDatetimeLocal(event.event_date) : ""}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`category-${event?.id ?? "new"}`} className="block text-sm font-semibold text-ink">
            Type of event
          </label>
          <select
            id={`category-${event?.id ?? "new"}`}
            name="category"
            defaultValue={event?.category ?? CATEGORIES[0]}
            className={fieldClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`location-${event?.id ?? "new"}`} className="block text-sm font-semibold text-ink">
          Location <span className="font-normal text-soft">(optional)</span>
        </label>
        <input
          id={`location-${event?.id ?? "new"}`}
          name="location"
          defaultValue={event?.excerpt ?? ""}
          placeholder="e.g. Mt Roskill War Memorial Hall"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={`description-${event?.id ?? "new"}`} className="block text-sm font-semibold text-ink">
          Details <span className="font-normal text-soft">(optional)</span>
        </label>
        <textarea
          id={`description-${event?.id ?? "new"}`}
          name="description"
          rows={3}
          defaultValue={event?.body ?? ""}
          placeholder="Anything people should know: speaker, food, what to bring."
          className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-blue"
        />
      </div>

      <div>
        <span className="block text-sm font-semibold text-ink">
          Photo <span className="font-normal text-soft">(optional)</span>
        </span>
        <div className="mt-2">
          <ImageUploader name="image_url" initialUrl={event?.image_url ?? ""} />
        </div>
      </div>

      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Saving
          </>
        ) : event ? (
          "Save changes"
        ) : (
          "Add event"
        )}
      </button>
    </form>
  );
}
