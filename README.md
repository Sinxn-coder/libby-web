# Libby Privacy Policy Website

Standalone, lightweight, production-ready website publishing the official Privacy Policy for **Libby** (Kamaliya Campus Central Library system). 

This website satisfies Google Play Store, Apple App Store, and institutional app distribution privacy policy URL requirements.

---

## 📁 Directory Structure

```text
hostweb/
├── assets/
│   └── logo.png              # Official Libby logo asset
├── downloads/
│   ├── Libby.apk             # Android package
│   └── Libby_Windows.zip     # Windows desktop package
├── privacy-policy/
│   └── index.html            # Primary Privacy Policy route (/privacy-policy/)
├── index.html                # Libby landing page (links to policy)
├── policy.css                # Scoped Libby editorial styling & tokens
├── policy.js                 # Smooth scroll, TOC spy, back-to-top interaction
├── privacy-policy.html       # Direct fallback route (/privacy-policy.html)
├── script.js                 # Landing page device detection script
├── style.css                 # Landing page styles
└── README.md                 # Deployment & configuration instructions
```

---

## 🎨 Design Tokens & Branding

- **Primary Green:** `#015B3D`
- **Deep Green:** `#013B2A`
- **Mint:** `#D9EFE4`
- **Warm Ivory:** `#F5F3EB`
- **Charcoal:** `#242C28`
- **Typography:** *Newsreader* / *Playfair Display* (Editorial headings) + *Inter* (Legible body copy at 17px with 1.75 line height).

---

## 💻 Local Preview

Run any standard local HTTP server inside the `hostweb` directory:

### Option 1: Python 3 (Recommended)
```bash
cd hostweb
python -m http.server 8000
```
Then navigate to:
- Privacy Policy: `http://localhost:8000/privacy-policy/`
- Direct File Route: `http://localhost:8000/privacy-policy.html`
- Homepage: `http://localhost:8000/`

### Option 2: Node.js (npx serve)
```bash
cd hostweb
npx serve .
```

---

## 🚀 Recommended Deployment Options

Because this is a completely static, zero-dependency website, it can be hosted permanently with zero cost and high availability.

### 1. Cloudflare Pages (Recommended for Store URLs)
1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** (or direct upload).
2. Set **Build output directory** to `hostweb` (no build command needed).
3. Cloudflare automatically issues a free, managed SSL certificate and global CDN caching.
4. Your permanent URL will be `https://<project-name>.pages.dev/privacy-policy/`.

### 2. GitHub Pages
1. Go to repository **Settings** > **Pages**.
2. Select branch `main` and folder `/hostweb` (or deploy via GitHub Actions).
3. Your permanent URL will be `https://<username>.github.io/<repo>/privacy-policy/`.

### 3. Netlify
1. Connect repository or run `npx netlify deploy --dir=hostweb --prod`.
2. Permanent URL: `https://<site-name>.netlify.app/privacy-policy/`.

---

## ⚠️ Pre-Publication Institutional Action Items

Before submitting this URL to app stores or public directories, confirm and replace the bracketed placeholders in `Section 12: Institutional Contact Details`:

1. **Official Library Contact Email:** e.g., `library@kamaliya.edu`
2. **Campus Physical Address / Room:** e.g., `Central Library Block, Kamaliya Campus`
3. **Official Library Telephone Number**
4. **Data Privacy Officer / Institutional Contact Person**
