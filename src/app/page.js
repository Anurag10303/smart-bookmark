"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useRouter } from "next/navigation";
import AddBookmark from "./components/AddBookmark";
import BookmarkList from "./components/BookmarkList";

export default function Home() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          console.log("Realtime:", payload);

          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [payload.new, ...prev]);
          }

          if (payload.eventType === "DELETE") {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    } else {
      setUser(user);
      fetchBookmarks();
    }
  };

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  if (!user) return null; // prevent flash

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Smart Bookmark</h1>

        <p className="text-center text-gray-500 mb-8">
          Save and manage your favorite links
        </p>
        <AddBookmark />
        <BookmarkList
          bookmarks={bookmarks}
          onBookmarkDeleted={(id) =>
            setBookmarks((prev) => prev.filter((b) => b.id !== id))
          }
        />
      </div>
    </div>
  );
}
