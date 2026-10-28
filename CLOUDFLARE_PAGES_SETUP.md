# Libby Marketing & Legal Pages — Cloudflare Pages Setup

This directory (`hostweb/`) is a standalone, lightweight, zero-dependency static website containing:
- Landing & download portal (`index.html`)
- Official Privacy Policy (`privacy-policy/index.html` & `privacy-policy.html`)
- Terms of Service (`terms-of-service/index.html` & `terms-of-service.html`)
- Account Deletion Request Portal (`account-deletion/index.html` & `account-deletion.html`)

Planned production domain: `https://libby.etriq.online`

---

## Cloudflare Pages Deployment Guide (Step-by-Step)

### Option A: Direct Git Integration (Recommended)
1. **Log in to Cloudflare Dashboard:** Navigate to [dash.cloudflare.com](https://dash.cloudflare.com/).
2. **Open Workers & Pages:** Click on **Compute (Workers & Pages)** in the left sidebar > **Create application** > **Pages** tab > **Connect to Git**.
3. **Select Repository:** Choose the `libby` repository.
4. **Build Settings:**
   - **Project Name:** `libby` (or custom name).
   - **Production Branch:** `main`.
   - **Framework Preset:** `None` / `Static Site`.
   - **Build Command:** *(Leave empty)*.
   - **Build Output Directory:** `hostweb`.
   - **Root Directory:** *(Leave empty, or set to `/` if using repository root)*.
5. **Click Save and Deploy:** Cloudflare Pages will build the preview and assign a default URL: `https://libby.pages.dev`.

### Option B: Direct Upload via Wrangler CLI
If deploying directly without Git connection:
```bash
npx wrangler pages deploy hostweb --project-name=libby
```

---

## Attaching the Custom Domain: `libby.etriq.online`

1. In the Cloudflare Pages project overview, go to the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter `libby.etriq.online` and click **Continue**.
4. **DNS Configuration:**
   - **If `etriq.online` is already managed on Cloudflare DNS:** Cloudflare will automatically add the `CNAME` record (`libby` -> `<project>.pages.dev`) and provision an SSL/TLS certificate.
   - **If `etriq.online` is managed on an external DNS provider (e.g. GoDaddy, Namecheap, Hostinger):** Add a `CNAME` record in your DNS zone:
     - **Type:** `CNAME`
     - **Host / Name:** `libby`
     - **Value / Target:** `<project>.pages.dev` (e.g., `libby.pages.dev`)
     - **TTL:** Auto or 300 seconds
5. Wait for DNS propagation and SSL certificate activation (typically 2–10 minutes).
6. Verify public HTTPS availability at `https://libby.etriq.online`.

---

## Route Map & Verification Matrix

| Route | Canonical Target | Description |
| :--- | :--- | :--- |
| `/` | `https://libby.etriq.online/` | Libby Landing Page & Download Showcase |
| `/privacy-policy/` | `https://libby.etriq.online/privacy-policy/` | Official Privacy Policy (Plain Language, India Jurisdiction) |
| `/terms-of-service/` | `https://libby.etriq.online/terms-of-service/` | Official Terms of Service (Library Lending Guidelines) |
| `/account-deletion/` | `https://libby.etriq.online/account-deletion/` | Public Account Deletion Request Portal (Google Play Compliant) |
