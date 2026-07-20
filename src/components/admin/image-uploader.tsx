"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKET } from "@/lib/supabase/config";

/**
 * Photo picker for admins. Uploads straight to the public Supabase storage
 * bucket and hands back the public URL. The hidden input carries the value
 * inside the surrounding form.
 */
export function ImageUploader({
  name,
  initialUrl = "",
  onChange,
}: {
  name?: string;
  initialUrl?: string;
  onChange?: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function update(next: string) {
    setUrl(next);
    onChange?.(next);
  }

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { cacheControl: "3600" });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      update(data.publicUrl);
    } catch (e) {
      setError(
        e instanceof Error
          ? `Upload failed: ${e.message}`
          : "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {name ? <input type="hidden" name={name} value={url} /> : null}

      <div className="flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-line bg-sky">
          {url ? (
            <Image src={url} alt="Event photo" fill className="object-cover" sizes="112px" />
          ) : (
            <div className="grid h-full place-items-center text-soft">
              <ImagePlus size={20} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-secondary !h-10 text-sm disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Uploading photo
              </>
            ) : (
              <>
                <ImagePlus size={15} />
                {url ? "Change photo" : "Add a photo"}
              </>
            )}
          </button>
          {url ? (
            <button
              type="button"
              onClick={() => update("")}
              className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-red-700"
            >
              <Trash2 size={14} />
              Remove photo
            </button>
          ) : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
