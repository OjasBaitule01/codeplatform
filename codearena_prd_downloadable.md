# CodeArena PRD

## Overview
CodeArena is a competitive programming platform built using React.js, Node.js, Express.js, and MongoDB. It allows admins to create coding contests with timed problems, automated judging, live leaderboards, and practice archives.

## Core Features
- Authentication with JWT
- Contest creation and management
- Problem management
- Multi-language code submissions
- Real-time verdicts (AC/WA/TLE/CE)
- Live leaderboards
- Editorial solutions
- Practice mode
- Admin dashboard

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Real-time: Socket.IO
- Code Execution: Judge0 API / Docker Sandbox

## User Roles
- Student
- Admin
- Moderator
- Guest

## APIs
### Auth
- POST /api/auth/register
- POST /api/auth/login

### Contests
- GET /api/contests
- POST /api/contests

### Problems
- GET /api/problems
- POST /api/problems

## Database Collections
### Users
- name
- email
- password
- role

### Problems
- title
- description
- difficulty
- tags

### Contests
- title
- startTime
- endTime
- leaderboard

## Future Features
- AI code review
- Plagiarism detection
- Virtual contests
- Mobile app

## Deployment
- Frontend on Vercel
- Backend on Render/Railway
- MongoDB Atlas database

