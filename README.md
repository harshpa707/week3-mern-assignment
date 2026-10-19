# Week 3 MERN Assignments

This project covers both PDFs:
1. Backend REST API: Express, MongoDB/Mongoose, CRUD, JWT authentication, Postman.
2. Full-stack integration: React + Axios, React Router protected route, task CRUD/filtering, Multer image upload and preview.

## Requirements
- Node.js LTS
- MongoDB local service OR MongoDB Atlas connection string
- Postman (for API tests)

## Run backend
```bash
cd backend
npm install
```
Create `backend/.env` (copy `.env.example`) and set your MongoDB URI and JWT secret.
```bash
npm run dev
```
API starts at `http://localhost:5000`.

## Run frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL Vite prints (usually `http://localhost:5173`). Register a user, log in, and add tasks.

## Postman checklist
1. POST `/api/auth/register` JSON `{ "name":"Harsh Pandey", "email":"harsh@example.com", "password":"Harsh1234" }`
2. POST `/api/auth/login` with same email/password; copy `token` from response.
3. In Postman Authorization choose Bearer Token and paste token.
4. GET `/api/tasks`, POST `/api/tasks`, GET `/api/tasks/:id`, PUT `/api/tasks/:id`, DELETE `/api/tasks/:id`.
5. POST `/api/upload` as form-data with key `image` set to File. Authentication not required for the demo upload route.

## Submission notes
- Do not submit your real `.env` or Atlas password publicly. Submit `.env.example` instead.
- Include screenshots of successful Postman requests and your running React application if your teacher asks.
- These are two assignment briefs implemented in one reusable project. Confirm with your teacher if they require separate repositories.
