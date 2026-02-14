"use client";
import { supabase } from "../lib/supabaseClient";

export default function BookmarkList({ bookmarks, onBookmarkDeleted }) {
  const handleDelete = async (id) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (!error) {
      onBookmarkDeleted(id);
    }
  };

  return (
    <div>
      {bookmarks.map((b) => (
        <div key={b.id} className="border p-4 mb-4 rounded-xl flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{b.title}</h3>
            <a href={b.url} target="_blank" className="text-blue-600 text-sm">
              {b.url}
            </a>
          </div>

          <button onClick={() => handleDelete(b.id)} className="text-red-600">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
