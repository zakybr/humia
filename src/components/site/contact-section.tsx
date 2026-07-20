"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, whatsAppLink } from "@/lib/site";

const topics = [
  "General question",
  "Pengajian (lectures)",
  "Quran classes (TPQ)",
  "Marriage celebrant",
  "Donations and zakat",
] as const;

/**
 * Contact runs over a WhatsApp click-to-chat link, so sending a message
 * costs nothing to operate: no forms backend, no email service, no server.
 */
export function ContactSection() {
  const [topic, setTopic] = useState<string>(topics[0]);

  const message = `Assalamu'alaikum HUMIA, I would like to ask about: ${topic}`;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <span className="eyebrow">Contact</span>
        <h2 className="mt-3 text-3xl sm:text-4xl">Get in touch</h2>
        <p className="mt-4 max-w-md leading-relaxed">
          Questions about lectures, Quran classes for the kids, or how to get
          involved? Message us on WhatsApp and a committee member will reply,
          usually the same day.
        </p>
        <p className="mt-3 text-sm text-soft">
          Prefer email? Write to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-navy underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <label htmlFor="topic" className="block text-sm font-semibold text-ink">
          What is your message about?
        </label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-2.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none focus:border-blue"
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <a
          href={whatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5 w-full"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>

        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(topic)}`}
          className="btn-secondary mt-2.5 w-full"
        >
          <Mail size={18} />
          Send an email instead
        </a>

        <p className="mt-4 text-center text-xs text-soft">
          WhatsApp opens with your message ready to send.
        </p>
      </div>
    </div>
  );
}
