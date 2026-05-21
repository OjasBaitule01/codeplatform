# CodeArena

A competitive programming platform scaffold using React, Node.js, Express, and MongoDB.

## Features
- Authentication with JWT
- Admin contest and problem management
- Timed contests and leaderboard support
- Multi-language submission flow (placeholder judge)
- Practice archive and difficulty filtering
- Stylish React frontend with modern UI

## Setup

### Backend
1. Open `e:\\natu\\AVC\\backend`
2. Run `npm install`
3. Create `.env` with:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/codearena
   JWT_SECRET=supersecret
   PORT=5000
   ```
4. Run `npm run dev`

### Frontend
1. Open `e:\\natu\\AVC\\frontend`
2. Run `npm install`
3. Run `npm run dev`

## Notes
- The backend judge is a stub and should be extended to support real code execution.
- Use the API routes in `backend/routes` for auth, problems, contests, and submissions.
