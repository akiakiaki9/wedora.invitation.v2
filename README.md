# Alisher & Yulduz — wedding invitation

A standalone, multilingual Next.js wedding invitation with a velvet-curtain reveal, a Quran verse, music, and full-screen scroll-snapping sections.
The event section includes a live countdown to November 1, 2026 at 14:00 Uzbekistan time.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home route redirects to `/ru`; language options are `/ru`, `/en`, `/uz`, and `/oz`.

The invitation uses two decorative wedding background images from Unsplash instead of implying that stock photos are the couple's album:

- [Wedding ceremony photo](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=88)
- [Wedding floral photo](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=86)

The images are covered by the [Unsplash License](https://unsplash.com/license). The Arabic verse is Quran 30:21 (Surah Ar-Rum); its reference is displayed in the invitation.

The local background images and music are in `public/`. The venue links to Bonu Restaurant on Google Maps. Edit `src/app/[lang]/page.js` to change translated text or event details.
