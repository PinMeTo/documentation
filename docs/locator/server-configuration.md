---
version: 1.17.6
date: 2026-03-09
---

# Server Configuration

## Overview

The Local Page widget uses client-side routing with
clean URLs (e.g., `/locations/location-123`). Your web
server must be configured to serve the HTML page for
all location paths.

## Deep Linking

When a user navigates directly to a location URL —
by clicking a shared link, a search engine result,
or a browser bookmark — the server receives a
request for a path that does not correspond to a
physical file.

Without configuration, the server returns a 404
error. The rewrite rules below tell the server to
return your HTML page for any path under the
location base path, allowing the widget's JavaScript
router to handle the URL.

## Rewrite Rules

### Nginx

```nginx
# Serve index.html for all /locations/* paths
location /locations {
    try_files $uri $uri/ /index.html;
}
```

### Apache

```apache
# Enable rewrite engine
RewriteEngine On

# Serve index.html for /locations/* paths
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^locations/(.*)$ /index.html [L]
```

### Vercel (vercel.json)

```json
{
  "rewrites": [
    { "source": "/locations/:path*", "destination": "/index.html" }
  ]
}
```

### Netlify (_redirects)

```text
/locations/*  /index.html  200
```

## Cache Configuration

**Widget scripts** (`locator.js`, `local-page.js`)
are versioned and can be cached aggressively:

```text
Cache-Control: public, max-age=31536000, immutable
```

**HTML pages** that contain the widget must be served
fresh so that deep-linked URLs always return the
current page:

```text
Cache-Control: no-cache
```

This means the browser will revalidate the HTML on
each request (typically a fast 304 response) while
keeping widget scripts cached long-term.

## CORS Configuration

CORS headers are generally not required. The widget
scripts are loaded via a standard `<script>` tag
from the PinMeTo CDN, which does not trigger
cross-origin restrictions. API requests from the
widget go directly from the browser to
`public.pinmeto.com`, which provides its own CORS
headers.
