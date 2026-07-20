"use client";

import {
  useActionState,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  Award,
  Check,
  Loader2,
  Plus,
  RotateCcw,
  Trash2,
  Users,
  UserCheck,
} from "lucide-react";
import { resetAboutSection, saveAboutSection } from "@/app/admin/actions";
import {
  ABOUT_ADVISORY_KEY,
  ABOUT_REPRESENTATIVES_KEY,
  ABOUT_TRUSTEES_KEY,
  DEFAULT_ABOUT_CONTENT,
  type AboutContent,
  type AdvisoryMember,
  type Trustee,
} from "@/lib/about";
import { Collapsible } from "./collapsible";
import { ImageUploader } from "./image-uploader";

const fieldClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none focus:border-blue";

/** Shared save + reset controls for an About section. */
function SectionControls({
  sectionKey,
  value,
  onReset,
  disabled,
  extra,
}: {
  sectionKey: string;
  value: unknown;
  onReset: () => void;
  disabled?: boolean;
  extra?: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(saveAboutSection, {});
  const [saved, setSaved] = useState(false);
  const [resetting, startReset] = useTransition();

  useEffect(() => {
    if (state.ok) {
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="mt-5 border-t border-line pt-5">
      {state.error ? (
        <p
          role="alert"
          className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <form action={formAction}>
          <input type="hidden" name="key" value={sectionKey} />
          <input type="hidden" name="value" value={JSON.stringify(value)} />
          <button
            type="submit"
            disabled={pending || disabled}
            className="btn-primary !h-11 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving
              </>
            ) : (
              "Save changes"
            )}
          </button>
        </form>

        {extra}

        <button
          type="button"
          disabled={resetting}
          onClick={() => {
            if (!confirm("Reset this section back to the original content?")) {
              return;
            }
            const fd = new FormData();
            fd.set("key", sectionKey);
            startReset(async () => {
              await resetAboutSection(fd);
              onReset();
            });
          }}
          className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-navy disabled:opacity-60"
        >
          <RotateCcw size={14} />
          Reset to original
        </button>

        {saved ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
            <Check size={16} />
            Saved and live
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TrusteesEditor({ initial }: { initial: Trustee[] }) {
  const [items, setItems] = useState<Trustee[]>(initial);

  const setName = (i: number, name: string) =>
    setItems((prev) => prev.map((t, j) => (j === i ? { ...t, name } : t)));
  const setPhoto = (i: number, photo: string) =>
    setItems((prev) => prev.map((t, j) => (j === i ? { ...t, photo } : t)));
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, j) => j !== i));
  const add = () => setItems((prev) => [...prev, { name: "", photo: "" }]);

  const cleaned = items.filter((t) => t.name.trim() || t.photo);

  return (
    <div>
      <ul className="space-y-4">
        {items.map((trustee, i) => (
          <li
            key={i}
            className="rounded-xl border border-line bg-sky/40 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-ink">
                Trustee {i + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(i)}
                className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-red-700"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
            <div className="mt-3 grid gap-4">
              <input
                value={trustee.name}
                onChange={(e) => setName(i, e.target.value)}
                placeholder="Full name"
                className={fieldClass}
              />
              <ImageUploader
                initialUrl={trustee.photo}
                onChange={(url) => setPhoto(i, url)}
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={add}
        className="btn-secondary mt-4 !h-11 text-sm"
      >
        <Plus size={16} />
        Add a trustee
      </button>

      <SectionControls
        sectionKey={ABOUT_TRUSTEES_KEY}
        value={cleaned}
        onReset={() => setItems(DEFAULT_ABOUT_CONTENT.trustees)}
      />
    </div>
  );
}

function RepresentativesEditor({ initial }: { initial: string[] }) {
  const [items, setItems] = useState<string[]>(initial);

  const setName = (i: number, name: string) =>
    setItems((prev) => prev.map((n, j) => (j === i ? name : n)));
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, j) => j !== i));
  const add = () => setItems((prev) => [...prev, ""]);

  const cleaned = items.map((n) => n.trim()).filter(Boolean);

  return (
    <div>
      <ul className="space-y-3">
        {items.map((name, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(i, e.target.value)}
              placeholder={`Representative ${i + 1}`}
              className={fieldClass}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remove representative ${i + 1}`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-soft hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={add}
        className="btn-secondary mt-4 !h-11 text-sm"
      >
        <Plus size={16} />
        Add a representative
      </button>

      <SectionControls
        sectionKey={ABOUT_REPRESENTATIVES_KEY}
        value={cleaned}
        onReset={() => setItems(DEFAULT_ABOUT_CONTENT.representatives)}
      />
    </div>
  );
}

function AdvisoryEditor({ initial }: { initial: AdvisoryMember[] }) {
  const [items, setItems] = useState<AdvisoryMember[]>(initial);

  const setName = (i: number, name: string) =>
    setItems((prev) => prev.map((m, j) => (j === i ? { ...m, name } : m)));
  const setBio = (i: number, bio: string) =>
    setItems((prev) => prev.map((m, j) => (j === i ? { ...m, bio } : m)));
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, j) => j !== i));
  const add = () => setItems((prev) => [...prev, { name: "", bio: "" }]);

  const cleaned = items.filter((m) => m.name.trim() || m.bio.trim());

  return (
    <div>
      <ul className="space-y-4">
        {items.map((member, i) => (
          <li key={i} className="rounded-xl border border-line bg-sky/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-ink">Member {i + 1}</p>
              <button
                type="button"
                onClick={() => remove(i)}
                className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-red-700"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
            <div className="mt-3 space-y-3">
              <input
                value={member.name}
                onChange={(e) => setName(i, e.target.value)}
                placeholder="Full name and qualifications"
                className={fieldClass}
              />
              <textarea
                value={member.bio}
                onChange={(e) => setBio(i, e.target.value)}
                rows={4}
                placeholder="Short biography"
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-blue"
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={add}
        className="btn-secondary mt-4 !h-11 text-sm"
      >
        <Plus size={16} />
        Add a member
      </button>

      <SectionControls
        sectionKey={ABOUT_ADVISORY_KEY}
        value={cleaned}
        onReset={() => setItems(DEFAULT_ABOUT_CONTENT.advisory)}
      />
    </div>
  );
}

export function AboutManager({ about }: { about: AboutContent }) {
  return (
    <div>
      <p className="max-w-2xl leading-relaxed text-soft">
        Edit the people listed on the About page. Open a section, make your
        changes, then save. Updates appear on the public website straight away.
      </p>

      <div className="mt-6 space-y-4">
        <Collapsible
          title="Board of Trustees"
          subtitle={`${about.trustees.length} people`}
          icon={Users}
          defaultOpen
        >
          <TrusteesEditor initial={about.trustees} />
        </Collapsible>

        <Collapsible
          title="Ummah representatives"
          subtitle={`${about.representatives.length} people`}
          icon={UserCheck}
        >
          <RepresentativesEditor initial={about.representatives} />
        </Collapsible>

        <Collapsible
          title="Advisory board"
          subtitle={`${about.advisory.length} people`}
          icon={Award}
        >
          <AdvisoryEditor initial={about.advisory} />
        </Collapsible>
      </div>
    </div>
  );
}
