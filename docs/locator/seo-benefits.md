---
version: 1.18.9
date: 2026-04-01
---

# SEO Benefits

## Overview

The PinMeTo Locator widgets are designed to improve
your local search visibility and provide a better user
experience for customers finding your locations.

## Local SEO Advantages

### Individual Location Pages

Each location gets a dedicated, indexable URL
(e.g., `/locations/location-123`), allowing search
engines to:

- Index each location separately
- Display location-specific information in search results
- Support location-based search queries

### Meta Tags

When the local page widget loads a location detail
view, it injects SEO meta tags into the host page's
`<head>`:

**Standard tags:**

- `<title>` — `"{name} - {city}"`
- `<meta name="description">` — location's short description, or a generated fallback
- `<link rel="canonical">` — the current page URL

**Open Graph tags (for social sharing):**

- `og:title`, `og:description` — same as standard tags
- `og:type` — `"place"`
- `og:url` — same as canonical
- `place:location:latitude`, `place:location:longitude` — coordinates

All injected tags are marked with `data-pmt-seo` for
idempotent cleanup on re-render.

### Structured Data

The widget injects a
`<script type="application/ld+json">` tag with
Schema.org LocalBusiness structured data:

- Business name and address (PostalAddress)
- Opening hours (OpeningHoursSpecification per day/span)
- Contact information (phone, email — when available)
- Geographic coordinates (GeoCoordinates)

### Client-Side Rendering

The SEO tags and structured data described above are
injected by JavaScript when the widget loads. Search
engines that execute JavaScript — including Google
and Bing — will index the content normally.

Crawlers that do not execute JavaScript will not see
location-specific meta tags or structured data. For
the majority of search traffic this is not an issue,
as Google's crawler processes JavaScript by default.

### Mobile-Friendly

Both widgets use responsive layouts with a breakpoint
at 768px:

**Locator widget:**

- Desktop: location list on the left (fixed width),
  map fills remaining space
- Mobile: map on top (300px tall), scrollable
  location list below

**Local page widget:**

- Desktop: two-column grid for location details and
  opening hours
- Mobile: single-column layout, all sections stacked
  vertically

## Verifying SEO Output

### Local Verification

1. Open a location detail page in your browser
2. Open DevTools (F12) and inspect `<head>` for:
   - `<meta>` tags with `data-pmt-seo` attribute
   - `<link rel="canonical" data-pmt-seo>` tag
   - `<script type="application/ld+json" data-pmt-seo>` tag
3. Copy the JSON-LD content and paste it into the
   [Schema Markup Validator](https://validator.schema.org/)
   to check for errors

### Social Sharing Previews

These tools require the page to be deployed to a public URL.

**Facebook:**

1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Paste the location page URL and click "Debug"
3. Verify og:title, og:description, og:type are correct
4. Click "Scrape Again" to force a fresh fetch after changes

**LinkedIn:**

1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Paste the URL to preview how LinkedIn renders the Open Graph tags

**Twitter/X:**
Paste a link in a tweet draft — the card preview appears in the composer.

### Structured Data Validation

1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Paste the location page URL
3. Verify the LocalBusiness schema is detected and valid
4. Check for warnings about missing recommended fields

### Using ngrok for Local Testing

If the page is not yet deployed, you can expose localhost temporarily:

```bash
ngrok http 3001
```

Use the generated public URL with the validation tools above.

## Best Practices

1. Use descriptive, keyword-rich location names
2. Ensure consistent NAP (Name, Address, Phone) data
3. Configure proper canonical URLs
4. Submit location URLs to search engine sitemaps
