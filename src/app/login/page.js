"use client";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      router.push("/");
    }
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-3">Smart Bookmark</h1>
        <p className="text-gray-500 mb-8">
          Save and manage your favorite links securely.
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.25-.93 2.3-1.98 3.01v2.5h3.2c1.88-1.73 2.96-4.27 2.96-7.24 0-.49-.04-.97-.12-1.45z"
            />
            <path
              fill="currentColor"
              d="M12.17 21c2.7 0 4.97-.9 6.63-2.45l-3.2-2.5c-.9.6-2.04.95-3.43.95-2.64 0-4.88-1.78-5.68-4.17H3.19v2.62A9.98 9.98 0 0012.17 21z"
            />
            <path
              fill="currentColor"
              d="M6.49 12.83a5.99 5.99 0 010-3.66V6.55H3.19a9.98 9.98 0 000 8.9l3.3-2.62z"
            />
            <path
              fill="currentColor"
              d="M12.17 5.01c1.47 0 2.8.51 3.84 1.5l2.88-2.88C17.13 1.92 14.87 1 12.17 1 8.21 1 4.83 3.24 3.19 6.55l3.3 2.62c.8-2.39 3.04-4.16 5.68-4.16z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}
