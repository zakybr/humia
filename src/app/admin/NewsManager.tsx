"use client";

import { useActionState, useState } from "react";
import type { NewsItem } from "@/lib/types";
import {
  createNews,
  updateNews,
  deleteNews,
  toggleNewsPublished,
} from "./actions";

const field =
  "mt-1.5 w-full border border-line bg-surface px-3 py-2 text-[15px] text-ink transition-colors focus:border-accent-ink";
const label = "eyebrow block";

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[0.625rem] uppercase tracking-[0.14em] ${
        published
          ? "border-accent-ink/30 text-accent-ink"
          : "border-line-strong text-muted"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function CreateNews() {
  const [state, action, pending] = useActionState(createNews, {});
  return (
    <form action={action} className="border border-line bg-surface p-6">
      <h3 className="text-lg text-ink">Add news</h3>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="n-title" className={label}>
            Title
          </label>
          <input id="n-title" name="title" type="text" required className={field} />
        </div>
        <div>
          <label htmlFor="n-body" className={label}>
            Body
          </label>
          <textarea id="n-body" name="body" rows={3} className={`${field} resize-y`} />
        </div>
        <label className="flex items-center gap-2 text-sm text-body">
          <input type="checkbox" name="published" className="size-4 accent-[var(--accent)]" />
          Publish immediately
        </label>
        {state.error ? (
          <p role="alert" className="text-sm text-[#b3261e]">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center border border-ink bg-ink px-5 text-sm text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-60"
        >
          {pending ? "Saving…" : "Add news"}
        </button>
      </div>
    </form>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState(updateNews, {});

  return (
    <li className="border border-line bg-surface p-6">
      {!editing ? (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <StatusPill published={item.published} />
              <span className="font-[family-name:var(--font-geist-mono)] text-xs text-muted">
                {new Date(item.created_at).toLocaleDateString("en-NZ", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h4 className="mt-2 text-lg text-ink">{item.title}</h4>
            {item.body ? (
              <p className="mt-1 line-clamp-2 text-sm text-body">{item.body}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm text-accent-ink hover:underline"
            >
              Edit
            </button>
            <form action={toggleNewsPublished}>
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="next" value={(!item.published).toString()} />
              <button type="submit" className="text-sm text-muted hover:text-ink">
                {item.published ? "Unpublish" : "Publish"}
              </button>
            </form>
            <form
              action={deleteNews}
              onSubmit={(e) => {
                if (!confirm("Delete this news item?")) e.preventDefault();
              }}
            >
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-sm text-[#b3261e] hover:underline">
                Delete
              </button>
            </form>
          </div>
        </div>
      ) : (
        <form action={action} className="space-y-4">
          <input type="hidden" name="id" value={item.id} />
          <div>
            <label className={label}>Title</label>
            <input name="title" type="text" required defaultValue={item.title} className={field} />
          </div>
          <div>
            <label className={label}>Body</label>
            <textarea name="body" rows={3} defaultValue={item.body} className={`${field} resize-y`} />
          </div>
          <label className="flex items-center gap-2 text-sm text-body">
            <input
              type="checkbox"
              name="published"
              defaultChecked={item.published}
              className="size-4 accent-[var(--accent)]"
            />
            Published
          </label>
          {state.error ? (
            <p role="alert" className="text-sm text-[#b3261e]">
              {state.error}
            </p>
          ) : null}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-10 items-center border border-ink bg-ink px-5 text-sm text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="inline-flex h-10 items-center border border-line-strong px-5 text-sm text-ink hover:border-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}

export default function NewsManager({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-6">
      <CreateNews />
      {items.length === 0 ? (
        <p className="text-sm text-muted">No news yet.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <NewsRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
