---
version: 1.20.1
date: 2026-07-28
---

# PinMeTo Locator — Quick-Start Guide

## What Is PinMeTo Locator?

PinMeTo Locator adds a locator and individual
location pages to your website. Visitors can search
for nearby locations, view details like opening
hours and contact information, and get directions —
all embedded directly on your site.

## What You Get

### Locator

A search-enabled widget that helps visitors find
your locations. Features include:

- **Search by address or city** — visitors type a
  location and see nearby results ranked by distance
- **Adjustable search radius** — filter results by
  distance
- **Interactive map** — locations shown as pins on a
  Google Maps view
- **List and map views** — switch between a list of
  results and a full map

### Local Pages

A dedicated page for each of your locations, with:

- **Opening hours** — regular and special hours
  displayed clearly
- **Contact information** — phone, email, and
  physical address
- **Get Directions** — link that opens Google Maps
  with the location pre-filled
- **Static map** — a map image showing the
  location's position
Each location page has its own URL
(e.g., `yoursite.com/locations/store-name`), making
it easy to share and link to specific locations.

## Benefits for Your Business

### Improved Local Search Visibility

Every location gets its own indexable page on your
website. Search engines like Google can discover and
rank each location independently, which improves
your visibility for local searches like
"coffee shop near me" or "store in Stockholm."

### Rich Search Results

The widget automatically adds structured data
(Schema.org markup) to each location page. This
helps search engines display rich results with your
business name, address, opening hours, and contact
details directly in search listings.

### Professional Social Sharing

When someone shares a location page link on
Facebook, LinkedIn, or other platforms, the preview
automatically shows the location name and
description — no manual configuration needed.

### Works on All Devices

The widgets adapt to any screen size. On desktop,
visitors see a side-by-side layout with the list and
map. On mobile, the layout stacks vertically for
easy scrolling and tapping.

### Matches Your Brand

Colors, button styles, and typography are configured
through the PinMeTo platform to match your website's
look and feel. The widgets blend in with your
existing design.

## What's Needed for Integration

1. **Contact PinMeTo.** Reach out to your Customer
   Success Manager or support to request the locator
   and access to its settings.

2. **Choose where to place the locator.** Discuss
   with your webmaster or IT department which part
   of your website the locator will live on. This
   is the path where your customers will go to
   visit the local pages (e.g., `/locations`).

3. **Add the widgets to your website.** Your
   webmaster or IT department needs to add the
   following snippets to your site. The widgets are
   lightweight (under 20 KB) and run independently
   from your site's existing code. They use
   BEM-scoped CSS class names (prefixed with
   `pmt-`) to avoid style collisions with your
   page.

   **Locator widget:**

   ```html
   <div style="height: 600px">
     <div data-locator-widget
          data-account-id="your-id"
          data-app-id="your-app"
          data-local-page-path="/locations">
     </div>
   </div>
   <script type="module"
     src="https://public.pinmeto.com/locator/locator.js">
   </script>
   ```

   **Local page widget:**

   ```html
   <div data-local-page-widget
        data-account-id="your-id"
        data-app-id="your-app"
        data-base-path="/locations">
   </div>
   <script type="module"
     src="https://public.pinmeto.com/locator/local-page.js">
   </script>
   ```

   The `data-account-id` and `data-app-id` can be
   found in **Account Settings > Public API**. The
   `data-base-path` (and `data-local-page-path`) is
   the path decided in step 2. The full
   [Integration Guide](integration-guide.md) has
   details on all available options.

4. **Configure server URL rewrites.** Your IT
   department or backend team needs to configure
   the server to support location page URLs.
   Because each location has its own URL path
   (e.g., `/locations/store-name`), the server
   must be configured to serve your HTML page for
   all paths under the location directory. This is
   a standard "URL rewrite" rule that any web
   server supports — configuration examples are
   available for Nginx, Apache, Vercel, Netlify,
   and other platforms. Technical details and
   examples for the most common servers are
   available in the
   [Server Configuration](server-configuration.md)
   guide.

   Without this configuration, visitors who open a
   shared location link directly would see a
   "Page Not Found" error instead of the location
   page.

5. **Customize the appearance.** Once the locator
   and local pages are working properly, configure
   the settings to match your website's look and
   feel. Go to **Account Settings > Locator &
   Local Pages** to adjust:

   - **Map** — check "Show Map" and provide a
     Google Maps API key from Google Cloud Console
     (request it from your IT department or
     webmaster). The key must meet the
     [Google Maps API key requirements](#google-maps-api-key-requirements)
     below.
   - **Language, font family, and colors** — set
     these to match your brand

   Reload the locator and local pages in your
   browser to see the changes take effect.

### What PinMeTo Provides

- Account and application identifiers for your
  widgets
- Location data management through the PinMeTo
  platform
- Widgets hosted on `public.pinmeto.com` — no
  need to download or maintain widget code
- A locator configuration admin tool in the PinMeTo
  system for configuring themes, map settings, and
  other widget options

### What Your Team Provides

- A technical person (webmaster, IT department, or
  backend developer) who can make changes to your
  website and server configuration — they will add
  the widget snippets and set up the URL rewrite
  rules required for local pages
- Adding the HTML snippets to a page on your
  website where you want the widgets to be embedded
- A Google Maps API key that meets the
  [Google Maps API key requirements](#google-maps-api-key-requirements)
  below, and an optional Map ID with map styling
  configured in your Google Cloud Console
- Theme configuration using the PinMeTo Locator
  admin tool to match your brand's colors,
  typography, and visual style

## Google Maps API key requirements

The two widgets use different Google Maps APIs.
The API key you configure for your account must
have **both** enabled in Google Cloud Console:

- **Maps JavaScript API** — used by the locator
  widget for the interactive map
- **Maps Static API** — used by the local page
  widget for the static map image

A key with only one of these enabled will work
for one widget but not the other. The most
common issue after a key rotation is a key that
has Maps JavaScript API enabled but not Maps
Static API.

If the key has HTTP referrer restrictions, your
website's domain (including any subdomains you
use) must be in the allowed referrers list. The
same applies to any IP or application
restrictions. The Google Cloud project that owns
the key must also have billing enabled.

For instructions on how to set up Google Cloud and
generating an API key please see the [Google Documentation](https://developers.google.com/maps/documentation/javascript/get-api-key?setupProd=prerequisites#get-a-standard-api-key)

### Verifying your key

Open the following URL in a browser, replacing
`YOUR_KEY` with the key from your account
configuration:

```text
https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=400x200&key=YOUR_KEY
```

If a world map appears, the key works for static
maps from your current network. If an error
image appears instead, the message text in the
image names the exact misconfiguration (missing
API, blocked referrer, billing disabled, etc.).

## Next Steps

- [Integration Guide](integration-guide.md) —
  embedding widgets, configuration options,
  theming, and troubleshooting
- [Server Configuration](server-configuration.md) —
  rewrite rules for deep linking, caching, and
  CORS setup
- [SEO Benefits](seo-benefits.md) — local search
  optimization, structured data, meta tags, and
  verification tools
