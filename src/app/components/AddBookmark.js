"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddBookmark({ onBookmarkAdded }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!title || !url) {
      alert("All fields are required");
      return;
    }

    // STRICT URL validation
    // CLEAN + SMART URL VALIDATION

    let formattedUrl = url.trim();

    // Auto-add https if missing
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    try {
      const parsed = new URL(formattedUrl);

      // Allow only http and https
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        alert("Only http or https URLs are allowed");
        return;
      }

      // Must have a valid hostname with at least one dot
      if (!parsed.hostname.includes(".")) {
        alert("Please enter a valid domain");
        return;
      }
    } catch {
      alert("Please enter a valid URL");
      return;
    }
    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          title,
          url: formattedUrl,
          user_id: user.id,
        },
      ])
      .select();
    if (!error && data) {
      onBookmarkAdded?.(data[0]);
    }
    if (error) {
      console.log(error);
      return;
    }
    console.log("Callback:", onBookmarkAdded);
    console.log("Insert data:", data);
    setTitle("");
    setUrl("");
  };

  return (
    <div className="mb-6">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="url"
        value={url}
        className="border p-2 w-full mb-4 rounded"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Bookmark
      </button>
    </div>
  );
}
