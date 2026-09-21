---
version: 1.36.0
date: 2026-09-21
---

# Integration Guide

## Overview

This guide explains how to embed the PinMeTo Locator widgets on your website.

## Available Widgets

### Locator Widget

Locator with search, filtering, and map integration.

```html
<div style="height: 600px">
  <div data-locator-widget
       data-account-id="YOUR_ACCOUNT_ID"
       data-app-id="YOUR_APP_ID"
       data-local-page-path="/locations">
  </div>
</div>
<script type="module" src="https://public.pinmeto.com/locator/locator.js"></script>
```

### Local Page Widget

Single location detail page.

```html
<div data-local-page-widget
     data-account-id="YOUR_ACCOUNT_ID"
     data-app-id="YOUR_APP_ID"
     data-base-path="/locations">
</div>
<script type="module" src="https://public.pinmeto.com/locator/local-page.js"></script>
```

## Configuration Options

### Locator Widget Attributes

| Attribute | Required | Description |
| --------- | -------- | ----------- |
| `data-locator-widget` | Yes | Marks the element as a locator widget mount point (no value needed) |
| `data-account-id` | Yes | Your PinMeTo account identifier |
| `data-app-id` | Yes | Your application identifier |
| `data-local-page-path` | No | Base URL path for location detail pages. When set, each location card links to the location's detail page (e.g., `/locations/store-123`) |
| `data-log-level` | No | Console log verbosity: `DEBUG`, `INFO`, or `WARN`. Disabled by default |

### Local Page Widget Attributes

| Attribute | Required | Description |
| --------- | -------- | ----------- |
| `data-local-page-widget` | Yes | Marks the element as a local page widget mount point (no value needed) |
| `data-account-id` | Yes | Your PinMeTo account identifier |
| `data-app-id` | Yes | Your application identifier |
| `data-base-path` | Yes | Base URL path for location pages (e.g., `/locations`). Used for routing and navigation |
| `data-log-level` | No | Console log verbosity: `DEBUG`, `INFO`, or `WARN`. Disabled by default |

## Theming

Widget appearance is managed through PinMeTo's
configuration API. The following properties are
applied automatically when the widget loads:

**Colors:**

- Background color
- Text color
- Button color
- Button text color

**Typography:**

- Font family

Theme values are configured in the PinMeTo platform
and applied at runtime. There are no data attributes
for theming — the widgets read their theme from the
server-side configuration tied to your account.

Both widgets use BEM-scoped CSS class names
(prefixed with `pmt-`) to avoid style collisions
with your page. Widget styles are injected into a
`<style>` tag inside the widget element.

## Language

Widget labels (search placeholder, buttons, opening
hours, status text) are translated at runtime. The
language is chosen in this order:

1. The **Widget language** setting under
   **Account Settings > Locator & Local Pages**,
   unless it is set to **Auto (use page language)**.
2. The `lang` attribute on the host page's `<html>`
   element (`<html lang="sv-SE">` selects Swedish).
3. The visitor's browser language.
4. English.

Location content itself (names, descriptions, custom
fields) is shown as entered in PinMeTo and is not
translated.

### Multi-language sites

To serve the same locations in several languages,
set the widget language to **Auto**, then embed one
locator and one local page widget per language
prefix, each on a page with the matching `lang`
attribute:

```html
<!-- https://example.com/sv/butiker -->
<html lang="sv">
  ...
  <div data-locator-widget
       data-account-id="YOUR_ACCOUNT_ID"
       data-app-id="YOUR_APP_ID"
       data-local-page-path="/sv/butiker">
  </div>
```

```html
<!-- https://example.com/fr/magasins -->
<html lang="fr">
  ...
  <div data-locator-widget
       data-account-id="YOUR_ACCOUNT_ID"
       data-app-id="YOUR_APP_ID"
       data-local-page-path="/fr/magasins">
  </div>
```

Give each local page widget its own `data-base-path`
(`/sv/butiker`, `/fr/magasins`) and add a rewrite
rule for every base path; see
[Server Configuration](server-configuration.md).
Each language version of a location page gets its
own canonical URL. Link the versions together with
`hreflang` tags in your page template; see
[SEO Benefits](seo-benefits.md).

Translations are available for English, Swedish,
French, German, Dutch, Polish, Spanish, Finnish and
Portuguese. Other languages fall back to English.

## Custom Fields

If your account uses custom location data fields (contact our Support team if not)
you can surface them in both widgets. This is configured in the Store Locator
settings page in the PinMeTo **Account Settings**.

Before a custom field can appear in the widget, it must first be added to
the **publicCustomFields** allowlist via the PinMeTo Public API app. Only
fields on that list are included in the location data served to the widget.
Any field not listed there is stripped before it reaches the browser,
regardless of what is set in the Store Locator configuration.

### Sub-header

You can surface a custom field as a sub-header below the location name in both the
Locator and Local Page widgets.

Once a field is allowlisted, select it as the sub-header source in the
Store Locator settings page. The widget will then display that field's
value below the location name for any location where the value is a
non-empty string. Locations without the field, or with an empty value,
show no sub-header.

### Page footer

You can surface a custom field as a page footer block on the Local Page widget.
Unlike the sub-header, the page footer only appears on the Local Page, not in the
Locator list view.

Once a field is allowlisted, select it as the page footer source in the
Store Locator settings page. The Local Page widget will then display that
field's value as a text block below the main location content for any location
where the value is a non-empty string. Locations without the field, or with an
empty value, show no page footer section.

## Events

The widgets do not emit custom JavaScript events.
All user interactions (search, filtering, location
selection, navigation) are handled internally within
the widget.

## Widget Sizing

The locator widget fills the full dimensions of its
parent element (`height: 100%`, `width: 100%`).
The widget element **must be the sole child** of its
container — do not place headings, paragraphs, or
other elements alongside it. The container must have
an explicit height, or the widget will be invisible.

The local page widget fills the width of its
container (`width: 100%`) and grows with its content,
so no explicit height is needed.

```html
<!-- Locator: sole child of a container with height -->
<div style="height: 600px">
  <div data-locator-widget
       data-account-id="YOUR_ACCOUNT_ID"
       data-app-id="YOUR_APP_ID"
       data-local-page-path="/locations">
  </div>
</div>

<!-- Local page: width comes from its parent -->
<div data-local-page-widget
     data-account-id="YOUR_ACCOUNT_ID"
     data-app-id="YOUR_APP_ID"
     data-base-path="/locations">
</div>
```

## Debugging

Add the `data-log-level` attribute to enable console logging for either widget:

```html
<div data-locator-widget
     data-account-id="YOUR_ACCOUNT_ID"
     data-app-id="YOUR_APP_ID"
     data-local-page-path="/locations"
     data-log-level="DEBUG">
</div>
```

| Level | Output |
| ----- | ------ |
| `DEBUG` | All messages: API requests, state changes, route parsing, render cycles |
| `INFO` | Key lifecycle events: widget mounted, data loaded, language resolved |
| `WARN` | Problems only: failed API calls, geolocation denied, missing translations |

Logging is disabled by default. Remove the attribute to silence output.

## Troubleshooting

### Widget does not appear

- Verify that the container element has the correct
  data attribute (`data-locator-widget` or
  `data-local-page-widget`).
- Confirm that `data-account-id` and `data-app-id`
  are both present. The widget silently skips
  mounting if any required attribute is missing.
- For the locator widget, ensure the widget element
  is the **sole child** of a container with an
  explicit height (e.g.,
  `<div style="height: 600px">`). The widget fills
  its parent's height — if the parent has no height,
  or other elements share the container, the widget
  may overflow or be invisible.

### 404 errors on location URLs

- The local page widget uses client-side routing.
  Your web server must be configured to serve the
  HTML page for all paths under the base path.
  See the
  [Server Configuration](server-configuration.md)
  guide.

### Styles look wrong or broken

- The widgets use BEM-scoped class names prefixed
  with `pmt-` to minimize style collisions. If your
  page uses aggressive global CSS resets or styles
  that target all `div`, `table`, or `a` elements,
  they may affect the widget. Scope such rules to
  avoid the widget container.
- Verify the widget script is loading without errors
  in the browser's Network tab.

### Console debugging

- Add `data-log-level="DEBUG"` to the widget element
  to see detailed console output including API
  requests, state transitions, and render cycles.
