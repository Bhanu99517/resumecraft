# 🔒 Security Policy — ResumeCraft

Thank you for helping keep ResumeCraft and its users safe. This document outlines the security model of the project, how to responsibly report vulnerabilities, and best practices for contributors and self-hosters.

---

## 📦 Supported Versions

| Version | Supported |
|---|---|
| `main` (latest) | ✅ Actively maintained |
| Older branches | ❌ No security patches |

Always use the latest code from the `main` branch for the most up-to-date security fixes.

---

## 🛡️ Security Architecture

ResumeCraft handles user-generated resume data and integrates with external services. Below is a summary of how security is enforced at each layer.

### 1. Authentication

- All user data operations require a **verified Firebase authenticated session**
- Unauthenticated users cannot read or write any private data
- Authentication state is checked server-side via Firestore Security Rules — not just client-side

### 2. Firestore Security Rules

Access to Firestore collections is strictly controlled via `firestore.rules`. Here is a summary of the rules in place:

| Collection | Read | Create | Update | Delete |
|---|---|---|---|---|
| `users` | Owner only | Owner only (validated) | Owner only (validated, `uid` immutable) | Owner only |
| `resumes` | Owner only | Owner only (validated) | Owner only (validated) | Owner only |
| `saved_resumes` | Owner only | Authenticated + owner | Authenticated + owner | Authenticated + owner |
| `shared_resumes` | **Public** | Authenticated users | ❌ Immutable | ❌ Immutable |
| All others | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |

#### Schema Validation

All write operations to `users` and `resumes` collections are validated server-side with the following checks:

- **`users`** — requires `uid` (non-empty string, max 128 chars) and `email` (validated format); optional `displayName` (max 100 chars) and `photoURL` (must be a valid `http/https` URL)
- **`resumes`** / **`saved_resumes`** — requires `userId` and `data` (map); optional `title` (max 200 chars), `name` (max 200 chars), and `template` (max 100 chars)
- The `uid` field on user documents is **immutable** — it cannot be changed after creation

#### Default Deny

A catch-all rule explicitly denies read and write access to any collection not listed above:
```
match /{document=**} {
  allow read, write: if false;
}
```

### 3. API Key Management

ResumeCraft uses the **Google Gemini API** key (`GEMINI_API_KEY`) for AI resume generation. Key handling rules:

- API keys must **never** be hardcoded in source code or committed to version control
- Use `.env.local` for local development (already in `.gitignore`)
- In production, keys must be stored as **Vercel Environment Variables** — not in `.env` files
- Rotate any key immediately if it is ever accidentally exposed
- The `.env.example` file should contain only **placeholder values**, never real keys

> ⚠️ If you find a real API key accidentally committed to this repository, please report it immediately using the process below.

### 4. Shared Resumes

The `shared_resumes` collection is **publicly readable** by design, to allow resume sharing via link. However:

- Shared resumes are **immutable** once created — they cannot be updated or deleted
- Only authenticated users can create shared resumes
- Do not include sensitive personal data in shared resumes that you do not intend to be public

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in ResumeCraft, please **do not open a public GitHub issue**. Public disclosure before a fix is available puts users at risk.

### How to Report

Report vulnerabilities privately via one of the following:

- **GitHub Private Vulnerability Reporting** — Use the [Security tab](https://github.com/Bhanu99517/resumecraft/security) → "Report a vulnerability"
- **Email** — Contact the maintainer directly through their GitHub profile: [@Bhanu99517](https://github.com/Bhanu99517)

### What to Include

Please provide as much of the following as possible:

- A clear description of the vulnerability
- The affected component (e.g. Firestore rules, API key handling, frontend)
- Steps to reproduce the issue
- Potential impact or exploitability
- Any suggested fix or mitigation (optional but appreciated)

### Response Timeline

| Stage | Target Time |
|---|---|
| Acknowledgement of report | Within **3 days** |
| Initial assessment | Within **7 days** |
| Fix or mitigation | Within **30 days** (depending on severity) |
| Public disclosure | After fix is deployed |

---

## 🔐 Security Best Practices for Self-Hosters

If you fork or self-host ResumeCraft, follow these practices:

- **Rotate all API keys** before deploying — never reuse keys from this repo's `.env.example`
- **Review and deploy `firestore.rules`** before going live — do not use the default open Firestore rules
- **Set `APP_URL`** to your exact production domain to prevent unintended redirect targets
- **Enable Firebase App Check** for additional protection against unauthorized API access
- **Monitor Firebase usage** in the Firebase Console for unexpected spikes that may indicate abuse
- **Restrict Gemini API key usage** in the Google Cloud Console to only your deployment domain
- **Enable Vercel's DDoS protection and rate limiting** for production deployments

---

## 📋 Known Security Considerations

| Area | Notes |
|---|---|
| `shared_resumes` | Publicly readable by design. Avoid storing sensitive PII in shared resumes. |
| Gemini API | AI-generated content is sent to Google's servers. Do not submit confidential data to the AI. |
| Client-side env vars | `VITE_*` prefixed variables are bundled into the frontend build and visible in the browser. Use only non-sensitive values for these. |

---

## 👤 Maintainer

**Bhanu** — [@Bhanu99517](https://github.com/Bhanu99517)

---

*ResumeCraft takes the security of user resume data seriously. Thank you for helping keep this project safe.*
