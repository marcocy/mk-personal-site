# Implementation Checklist

## Public apps

- [ ] Keep the QR tool public.
- [ ] Rename/copy your QR app to `public/apps/qrcodegen.html`.
- [ ] Confirm it opens at `/apps/qrcodegen.html`.
- [ ] Add more public apps under `public/apps/`.

## Private apps

- [ ] Add protected apps under `public/apps/private/`.
- [ ] Do not put the QR tool inside `public/apps/private/`.
- [ ] Choose one protection method:
  - [ ] Cloudflare Access, recommended; protect only `/apps/private/*`.
  - [ ] Included Pages Function password gate.

## If using the included password gate

- [ ] In Cloudflare Pages, add environment variable `APPS_PASSWORD`.
- [ ] Deploy the site.
- [ ] Open `/apps/private/` and test the password.
- [ ] Open `/apps/qrcodegen.html` and confirm it remains public.

## If using Cloudflare Access

- [ ] Create a Zero Trust Access application.
- [ ] Set the protected path to `/apps/private/*` only.
- [ ] Allow your email or selected emails.
- [ ] Confirm `/apps/qrcodegen.html` remains public.
