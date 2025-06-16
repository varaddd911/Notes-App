import React from 'react';
import Menubar from './Menubar';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Menubar />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Notes App</h1>
          <div className="prose prose-invert">
            <p className="mb-4">
              Welcome to Notes App, a modern and intuitive note-taking application built with React
              and backed by a secure Node.js server. Our app provides a seamless experience for
              creating, organizing, and managing your notes.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Secure Google Authentication</li>
              <li>Create and manage personal and work notes</li>
              <li>Dark/Light theme support</li>
              <li>Responsive design for all devices</li>
              <li>Real-time search functionality</li>
              <li>Date scheduling for notes</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Technologies Used</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>React with Vite</li>
              <li>Tailwind CSS</li>
              <li>shadcn/ui Components</li>
              <li>Node.js & Express</li>
              <li>MongoDB</li>
              <li>Google OAuth 2.0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
