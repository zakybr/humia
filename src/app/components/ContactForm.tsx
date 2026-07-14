"use client";

import { useState, type FormEvent } from "react";

const CONTACT_EMAIL = "humianewzealand@gmail.com";

/**
 * No-backend contact form: on submit it composes a message and opens the
 * visitor's email client via a mailto: link, pre-addressed to HUMIA. Fully
 * labelled and keyboard-accessible; errors are announced via role="alert".
 */
export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstName.trim() || !message.trim()) {
      setError("Please add your name and a short message so we can reply.");
      return;
    }
    setError("");

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const subject = `Website enquiry from ${fullName}`;
    const body = [
      `Name: ${fullName}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      "",
      message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  }

  const fieldClass =
    "mt-2 w-full border border-line bg-surface px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-accent-ink";
  const labelClass = "eyebrow block";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-first" className={labelClass}>
            First name <span className="text-accent-ink">*</span>
          </label>
          <input
            id="cf-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cf-last" className={labelClass}>
            Last name
          </label>
          <input
            id="cf-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message <span className="text-accent-ink">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-[#b3261e]">
          {error}
        </p>
      ) : null}

      {sent ? (
        <p role="status" className="text-sm text-accent-ink">
          Thanks — your email app should have opened with your message ready to
          send. If it didn&rsquo;t, email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        className="group inline-flex h-12 items-center justify-center gap-2 border border-ink bg-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-ink"
      >
        Send message
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </button>
    </form>
  );
}
