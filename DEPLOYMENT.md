# Deployment Guide

## Backend (Render)

1. Create a new **Web Service** in Render from this repository.
2. Render reads `render.yaml` automatically.
3. Set secret environment variables in Render:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CORS_ORIGINS` (set to your Vercel frontend URL, e.g. `https://your-app.vercel.app`)
4. Deploy and copy backend URL, e.g. `https://task-manager-api.onrender.com`.

## Frontend (Vercel)

1. Import the `client` directory as a Vercel project.
2. Build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variable:
   - `VITE_API_URL=https://your-render-service.onrender.com/api`
4. Deploy.

## Verify Production

1. Open Vercel app.
2. Sign up/login.
3. Create, update, and delete tasks.
4. Confirm browser network calls target Render API URL and all responses are successful.
