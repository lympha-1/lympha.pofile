# Lympha Resto – profile page (React + Vite + Tailwind)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Edit your details
Everything (phones, WhatsApp, email, website, address, Maps link, Instagram/Facebook,
Google review link, about text, share URL) lives in **`src/data/profile.js`**.
Search for `REPLACE` – those are placeholders.

Set `shareUrl` to your final public address so the QR code and share buttons always use it.

## Structure
```
src/
├── data/profile.js        all content + links
├── lib/utils.js           copy, vCard, share-URL helpers
├── components/
│   ├── Header.jsx  SocialTile.jsx  ActionButtons.jsx  ContactList.jsx
│   ├── ReviewBadge.jsx  AboutFooter.jsx  ShareModal.jsx  Toast.jsx
│   ├── TealPanel.jsx  NoiseDefs.jsx   (textured green surface + grain filter)
│   └── icons.jsx          icons cut directly from your two SVG files
└── assets/                logo, Google badge, share arrow (webp)
```
