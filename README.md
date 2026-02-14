# Smart Bookmark

A secure, real-time bookmark management application built using Next.js (App Router) and Supabase.

Users authenticate using Google OAuth, store personal bookmarks securely, and see updates reflected instantly across multiple browser tabs.

## Problems Faced & How They Were Solved

#### 1. OAuth Redirect Issues

Google OAuth initially failed due to incorrect redirect URI configuration. This was resolved by properly configuring authorized origins and redirect URLs in Google Cloud and Supabase.

#### 2. Real-Time Updates Not Working in Production

Realtime updates worked locally but failed after deployment. The issue was caused by initializing the subscription before authentication was fully established. The fix was to ensure realtime subscriptions are created only after confirming the user session.

#### 3. Duplicate Insertions

Bookmarks appeared twice because both optimistic updates and realtime events were inserting the same record. This was resolved by adding duplicate prevention logic.

#### 4. Insert Not Updating in Same Tab

Same-tab insertions did not reflect immediately in production. This was solved by properly combining optimistic UI updates with realtime synchronization.

## Tech Stack

1. Next.js (App Router)

2. Supabase (Authentication, PostgreSQL, Realtime)

3. Tailwind CSS

4. Vercel (Deployment)

## Features

1. Google OAuth authentication

2. Protected routes (login required)

3. User-specific bookmarks using Row Level Security (RLS)

4. Real-time updates across browser tabs

5. Optimistic UI updates

6. Strict URL validation

7. Production deployment on Vercel

## Project Structure

```
smart-bookmark/
│
├── src/
│ ├── app/
│ │ ├── page.js # Protected home/dashboard page
│ │ ├── login/
│ │ │ └── page.js # Login page (Google OAuth)
│ │ └── layout.js # Root layout
│ │
│ ├── components/
│ │ ├── AddBookmark.js # Form for adding bookmarks
│ │ └── BookmarkList.js # Displays bookmark list
│ │
│ └── lib/
│ └── supabaseClient.js # Supabase client configuration
│
├── public/
├── .env.local # Environment variables (not committed)
├── package.json
└── README.md
```

## Architecture Overview

### Authentication

1. Google OAuth handled via Supabase

2. JWT-based session management

3. Unauthenticated users redirected to /login

4. Logged-in users redirected to /

### Database

1. A bookmarks table stores:

2. Unique ID

3. User ID (linked to authenticated user)

4. Title

5. URL

6. Created timestamp

### Security (Row Level Security)

#### Row Level Security ensures:

1. Users can only view their own bookmarks

2. Users can only insert their own bookmarks

3. Users can only delete their own bookmarks

4. This guarantees complete user data isolation.

## Real-Time Behavior

1. The application uses Supabase Realtime subscriptions to:

2. Sync bookmark inserts across multiple tabs

3. Sync bookmark deletions across multiple tabs

4. Optimistic UI updates ensure:

5. Immediate update in the same tab

6. Seamless synchronization in other tabs

## Local Setup Instructions

1. Clone the Repository
   ```
   git clone https://github.com/YOUR_USERNAME/smart-bookmark.git
   cd smart-bookmark
   ```
2. Install Dependencies

```
  npm install
```

3. Create Environment Variables

Create a .env.local file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

Do not use the service role key.

4. Run the Application

```
   npm run dev
```

Visit:

```
http://localhost:3000
```

## Deployment (Vercel)

1. Push project to GitHub

2. Import repository into Vercel

3. Add environment variables in Vercel settings

4. Update Supabase and Google OAuth production URLs

5. Redeploy

## Security Notes

1. Row Level Security enabled

2. No sensitive keys exposed to the client

3. Database access restricted by authenticated user ID

4. Protected routes enforced in frontend

## Final Summary

1. Smart Bookmark demonstrates:

2. Secure OAuth authentication

3. Multi-tenant data isolation using RLS

4. Real-time database synchronization

5. Optimistic UI architecture

6. Production deployment debugging

7. Handling environment differences between local and deployed builds
