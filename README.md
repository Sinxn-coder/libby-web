# Liblet Marketing & Legal Website

Production-ready, zero-dependency static website for **Liblet** (Kamaliya Campus Central Library system), developed by **Etriq**.

This repository serves as the deployment source for Cloudflare Pages at `https://liblet.etriq.online` and provides:
- The main marketing, features, and platform showcase homepage
- Official administrative desktop software distribution (`/admin-download/`)
- Institutional Privacy Policy (`/privacy-policy/`)
- Terms of Service (`/terms-of-service/`)
- Public Account Deletion Request Portal (`/account-deletion/`)

---

## 📁 Repository & Site Structure

The repository root is the deployable root for Cloudflare Pages:

```text
.
├── index.html                    # Main Liblet landing & interactive showcase page
├── style.css                     # Primary styles and visual design tokens
├── script.js                     # Showcase interactions, dynamic demos & animations
├── policy.css                    # Scoped typography and styling for legal pages
├── policy.js                     # Smooth scroll & navigation helpers for legal pages
├── privacy-policy/
│   └── index.html                # Clean URL route (/privacy-policy/)
├── privacy-policy.html           # File fallback route
├── terms-of-service/
│   └── index.html                # Clean URL route (/terms-of-service/)
├── terms-of-service.html         # File fallback route
├── account-deletion/
│   └── index.html                # Clean URL route (/account-deletion/)
├── account-deletion.html         # File fallback route
├── admin-download/
│   └── index.html                # Clean URL route (/admin-download/)
├── assets/                       # UI illustrations, logos, icons, and mockups
│   ├── app_icon.png
│   ├── back.png
│   ├── etriqlogo.webp
│   ├── front.png
│   ├── libby_logo.png
│   ├── logo.png
│   ├── maintanence.webp
│   └── windows_icon.PNG
├── downloads/
│   ├── Liblet_Admin_Setup_v1.5.0.exe  # Windows release installer (18.35 MB)
│   ├── Liblet.apk                     # Android application package
│   └── Liblet_Windows.zip             # Portable Windows package
├── CLOUDFLARE_PAGES_SETUP.md     # Step-by-step Cloudflare Pages setup guide
└── README.md                     # Repository documentation
```

---

## 🎨 Design Tokens & Branding

- **Primary Green:** `#015B3D`
- **Deep Emerald Base:** `#013B2A`
- **Accent Mint:** `#34D399` / `#D9EFE4`
- **Surface Dark:** `#0D1512` / `#16221D`
- **Warm Ivory:** `#F5F3EB`
- **Typography:** *Space Grotesk* (Headings), *Plus Jakarta Sans* (Interface & copy), *Inter* (Legal body).

---

## 💻 Local Preview

Run any standard local HTTP server directly from the repository root:

### Option 1: Python 3
```bash
python -m http.server 8000
```
Then navigate to:
- Homepage: `http://localhost:8000/`
- Admin Download: `http://localhost:8000/admin-download/`
- Privacy Policy: `http://localhost:8000/privacy-policy/`
- Terms of Service: `http://localhost:8000/terms-of-service/`
- Account Deletion: `http://localhost:8000/account-deletion/`

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## 🚀 Cloudflare Pages Configuration

This repository is optimized for zero-configuration, zero-build deployment:

- **Framework Preset:** `None` / `Static Site`
- **Build Command:** *(Leave empty)*
- **Build Output Directory:** `/` (or root `.`)
- **Production Branch:** `main`
- **Custom Domain:** `liblet.etriq.online`
