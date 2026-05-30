# Personal Blog + Apps Starter for Cloudflare Pages

This is a static Astro website with:

- Homepage
- Blog section
- Public apps section
- Optional password-protected apps folder
- Decap CMS admin page at `/admin/`
- Markdown-based blog posts

## Recommended structure

```text
/
  Home page
/blog/
  Public blog
/apps/
  Apps portfolio page
/apps/qrcodegen.html
  Public QR tool
/apps/private/
  Password-protected apps
/admin/
  CMS editor for blog posts
```

## 1. Install locally

Install Node.js first. Then run:

```bash
npm install
npm run dev
```

Local preview usually opens at:

```text
http://localhost:4321
```

## 2. Edit the site name/domain

Open:

```text
astro.config.mjs
```

Replace:

```js
site: 'https://example.com'
```

with your real domain when ready.

## 3. Add blog posts manually

Blog posts live here:

```text
src/content/blog/
```

Each post is a `.md` Markdown file.

## 4. Add your public standalone HTML apps

Place public HTML/JS apps here:

```text
public/apps/
```

Your QR tool should stay public. Save or rename it as:

```text
public/apps/qrcodegen.html
```

It will be available online at:

```text
/apps/qrcodegen.html
```

## 5. Add protected apps

Place protected apps here:

```text
public/apps/private/
```

Example:

```text
public/apps/private/internal-dashboard.html
```

That file will be available at:

```text
/apps/private/internal-dashboard.html
```

but it can be protected either with Cloudflare Access or the included Pages Function password gate.

## 6. Option A: Protect private apps with Cloudflare Access

This is the recommended professional option.

Protect only this path:

```text
/apps/private/*
```

Do **not** protect all of `/apps/*`, because the QR tool must remain public.

## 7. Option B: Protect private apps with the included password gate

This starter includes:

```text
functions/apps/private/_middleware.js
```

In Cloudflare Pages, add an environment variable:

```text
APPS_PASSWORD = your-secret-password
```

Then every file under `/apps/private/` will ask for a password.

The public QR tool at `/apps/qrcodegen.html` remains open.

## 8. Push to GitHub

Create a new GitHub repository and push this folder:

```bash
git init
git add .
git commit -m "Initial personal site"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## 9. Connect to Cloudflare Pages

In Cloudflare:

- Go to Workers & Pages
- Create application
- Pages
- Import existing Git repository
- Select your repository
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

## 10. Configure Decap CMS

Open:

```text
public/admin/config.yml
```

Replace:

```yaml
repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
```

with your real GitHub repo, for example:

```yaml
repo: mkallis/my-personal-site
```

Then commit and push.

## 11. Important Decap login note

Decap CMS needs GitHub authentication. On Cloudflare, this usually requires a small GitHub OAuth proxy hosted as a Cloudflare Worker. Until you configure that proxy, the `/admin/` page may load but login/publishing may not work.

You can still publish posts manually by editing Markdown files in GitHub.

## 12. Cloudflare build settings summary

```text
Framework preset: Astro or None
Build command: npm run build
Build output directory: dist
Production branch: main
```
