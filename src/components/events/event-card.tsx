import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import type { EventRecord } from "@/lib/types";
import { dateBadge, formatEventDate, formatEventTime } from "@/lib/format";

export function EventCard({ event }: { event: EventRecord }) {
  const badge = dateBadge(event.event_date);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      {event.image_url ? (
        <div className="relative aspect-[16/9]">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </div>
      ) : null}

      <div className="flex flex-1 gap-4 p-5">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-sky text-navy">
          <span className="text-xl font-bold leading-none">{badge.day}</span>
          <span className="text-xs font-semibold uppercase">{badge.month}</span>
        </div>

        <div className="min-w-0">
          {event.category ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-blue">
              {event.category}
            </p>
          ) : null}
          <h3 className="mt-0.5 text-lg font-semibold text-ink">{event.title}</h3>

          <div className="mt-2 space-y-1 text-sm text-soft">
            <p className="flex items-center gap-1.5">
              <Clock size={14} className="shrink-0" />
              {formatEventDate(event.event_date)}, {formatEventTime(event.event_date)}
            </p>
            {event.excerpt ? (
              <p className="flex items-center gap-1.5">
                <MapPin size={14} className="shrink-0" />
                {event.excerpt}
              </p>
            ) : null}
          </div>

          {event.body ? (
            <p className="mt-2.5 text-sm leading-relaxed text-body">{event.body}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
