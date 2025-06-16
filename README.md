# Notes App Deployment Guide

This repository contains a full-stack Notes App with a React frontend and Express backend. Follow these instructions to deploy both the client and server.

## Client Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Vite
   - Root Directory: client
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
6. Add Environment Variables:
   - VITE_GOOGLE_CLIENT_ID
   - VITE_API_URL (set this to your Render server URL after deploying backend)
7. Click "Deploy"

## Server Deployment (Render)

1. Go to [Render](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: notes-app-server
   - Root Directory: server
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
5. Add Environment Variables:
   - MONGO_URI
   - PORT (Render will provide its own port)
   - JWT_SECRET
   - GOOGLE_CLIENT_ID
   - CORS_ORIGIN (set to your Vercel frontend URL)
6. Click "Create Web Service"

## Post-Deployment

1. After deploying the server to Render, copy its URL
2. Update the `VITE_API_URL` in your Vercel client deployment
3. After deploying the client to Vercel, copy its URL
4. Update the `CORS_ORIGIN` in your Render server deployment

## Environment Variables

### Client (.env.production)
```bash
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=your-render-server-url
```

### Server (.env.production)
```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
CORS_ORIGIN=your-vercel-client-url
```

## Important Notes

1. Make sure your Google OAuth 2.0 credentials are configured with the correct Authorized JavaScript origins and redirect URIs for both development and production domains.
2. The MongoDB URI should be from a production database cluster.
3. Generate a strong JWT secret for production.
4. Enable CORS only for your production frontend domain.
