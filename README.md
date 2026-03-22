# 📄 ResumeCraft

> An AI-powered resume builder built with React, TypeScript, Vite, and Google Gemini — backed by Firebase and deployed on Vercel. 

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://resumecraft-topaz.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini-4285F4?logo=google)](#)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 🌐 Live Demo

👉 [resumecraft-topaz.vercel.app](https://resumecraft-topaz.vercel.app)

---

## ✨ Features

- **AI Resume Generation** — Powered by Google Gemini API to craft professional, tailored resumes from user input
- **Firebase Backend** — Firestore database for storing and retrieving resume data securely
- **Firestore Security Rules** — Fine-grained data access control via `firestore.rules`
- **Type-Safe Codebase** — 98%+ TypeScript for reliability across the entire app
- **Fast Build** — Vite-powered development and production builds
- **Vercel Deployment** — Seamlessly hosted and auto-deployed on Vercel

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript | Frontend UI & type safety |
| Vite | Build tool & dev server |
| Google Gemini API | AI-powered resume generation |
| Firebase / Firestore | Backend database & data storage |
| Firestore Security Rules | Data access control |
| Vercel | Hosting & deployment |

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Google Gemini API key](https://ai.google.dev/)
- A [Firebase project](https://firebase.google.com/) with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhanu99517/resumecraft.git
   cd resumecraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   APP_URL=http://localhost:5173
   ```

   > ⚠️ Never commit your real API keys to version control. `.env.local` is already listed in `.gitignore`.

4. **Configure Firebase**

   Update `firebase-applet-config.json` with your Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/).

5. **Deploy Firestore rules**

   ```bash
   firebase deploy --only firestore:rules
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## 🏗️ Project Structure

```
resumecraft/
├── src/                        # Main source code
│   └── ...                     # Components, pages, services
├── .env.example                # Environment variable template
├── firebase-applet-config.json # Firebase app configuration
├── firebase-blueprint.json     # Firebase project blueprint
├── firestore.rules             # Firestore security rules
├── index.html                  # HTML entry point
├── metadata.json               # App metadata
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## ☁️ Deploying to Vercel

1. Push your code to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Add the following environment variables in Vercel's project settings:

   | Key | Value |
   |---|---|
   | `GEMINI_API_KEY` | Your Google Gemini API key |
   | `APP_URL` | Your Vercel deployment URL (e.g. `https://resumecraft-topaz.vercel.app`) |

4. Click **Deploy**

> ⚠️ Both `GEMINI_API_KEY` and `APP_URL` **must** be set in Vercel's Environment Variables dashboard — not just in `.env.local` — for the app to work in production.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key for AI resume generation |
| `APP_URL` | ✅ Yes | The hosted URL of the app (used for API callbacks and self-referential links) |

---

## 🔥 Firebase Setup

This project uses **Firestore** for backend data storage. To configure it:

1. Create a project at [firebase.google.com](https://firebase.google.com/)
2. Enable **Firestore Database** in the Firebase Console
3. Copy your Firebase config into `firebase-applet-config.json`
4. Review and deploy `firestore.rules` to secure your database:
   ```bash
   firebase deploy --only firestore:rules
   ```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Bhanu** — [@Bhanu99517](https://github.com/Bhanu99517)

---

*Built with ❤️ using React, TypeScript, Vite, Google Gemini AI, and Firebase*
