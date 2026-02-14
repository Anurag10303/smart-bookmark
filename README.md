# Smart Bookmark App

## Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS

## Features
- Google OAuth login
- Private bookmarks per user (RLS enabled)
- Realtime updates across tabs
- URL validation
- Deployed on Vercel

## Challenges Faced
- OAuth redirect_uri mismatch
- Realtime publication setup
- State duplication due to manual + realtime updates
- Folder structure issues with src/

## Setup Instructions
1. Clone repo
2. Add .env.local
3. Run npm install
4. Run npm run dev