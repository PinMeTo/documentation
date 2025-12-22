# PinMeTo Public API Integration Guide

## Overview

The PinMeTo Public API is a read-only REST API that provides access to location data through a highly available CDN. All location data is served from JSON files, ensuring fast response times and high availability.

## Base URL

**Production:** `https://public.pinmeto.com`

**Test:** `https://public.api.test.pinmeto.com`

## Authentication

Currently, the API does not require authentication for reading location data. All endpoints are publicly accessible.

## API Version

Current version: `v1`

All endpoints are prefixed with `/api/v1/`

## Endpoints

### 1. Get All Locations

Retrieve an array with all locations.

**Endpoint:** `GET /api/v1/{AccountID}/{appId}/locations`

**Query Parameters:**
- `AccountID` (required): The site/account identifier

**Example Request:**
```bash
curl -X GET "https://public.pinmeto.com/api/v1/pinmeto/9b47e418f21e1768749392/locations"
```

<details>
<summary>Response:</summary>
<br>

```
{
  "locations": [
    {
        type: "storefront",
        siteName: "pinmeto",
        storeId: "pinmeto-001",
        name: "PinMeTo",
        locationDescriptor: "Malmö",
        description: {
            long: "PinMeTo is a leading Swedish SaaS company specialized in location management for multi-location businesses. The advanced software solution streamlines accurate information across popular platforms such as Google, Apple, Bing, and Facebook.",
            short: "Built for multi-location brands, PinMeTo is a location marketing tool for online presence management."
        },
        location: { 
            lat: 55.6073834, 
            lon: 13.0009805 
        },
        address: {
            street: "Adelgatan 9",
            zip: "211 22",
            city: "Malmö",
            state: "Skåne County",
            country: "Sweden"
        },
        contact: { 
            phone: "+46 73-142 59 13", 
            email: "hello@pinmeto.com" 
        },
        openingDate: "2017-09-01",
        permanentlyClosed: false,
        temporarilyClosedUntil: "",
        temporarilyClosedMessage: "",
        isAlwaysOpen: false,
        specialOpenHours: [
            {
                start: "2025-12-24",
                end: "2025-12-24",
                isClosed: true,
                openTime: "0000",
                closeTime: "0000"
            },
            {
                start: "2025-12-25",
                end: "2025-12-25",
                isClosed: true,
                openTime: "0000",
                closeTime: "0000"
            }
        ],
        openHours: {
            mon: { state: "Open", span: [{ open: "0800", close: "1700" }] },
            tue: { state: "Open", span: [{ open: "0800", close: "1700" }] },
            wed: { state: "Open", span: [{ open: "0800", close: "1700" }] },
            thu: { state: "Open", span: [{ open: "0800", close: "1700" }] },
            fri: { state: "Open", span: [{ open: "0800", close: "1700" }] },
            sat: { state: "Closed", span: [] },
            sun: { state: "Closed", span: [] }
        },
        updatedAt: "2025-12-19T13:55:08.575Z"    
    }
  ]
}

```
</details>


### 2. Get Single Location

Retrieve a specific location by store ID.

**Endpoint:** `GET /api/v1/{AccountID}/{appId}/locations/{StoreID}`

**Query Parameters:**
- `AccountID` (required): The site/account identifier
- `storeId` (required): The unique store identifier

**Example Request:**
```bash
curl -X GET "https://public.pinmeto.com/api/v1/pinmeto/9b47e418f21e1768749392/locations/pinmeto-001"
```

<details>
<summary>Response:</summary>
<br>

```
{
    type: "storefront",
    siteName: "pinmeto",
    storeId: "pinmeto-001",
    name: "PinMeTo",
    locationDescriptor: "Malmö",
    description: {
        long: "PinMeTo is a leading Swedish SaaS company specialized in location management for multi-location businesses. The advanced software solution streamlines accurate information across popular platforms such as Google, Apple, Bing, and Facebook.",
        short: "Built for multi-location brands, PinMeTo is a location marketing tool for online presence management."
    },
    location: { 
        lat: 55.6073834, 
        lon: 13.0009805 
    },
    address: {
        street: "Adelgatan 9",
        zip: "211 22",
        city: "Malmö",
        state: "Skåne County",
        country: "Sweden"
    },
    contact: { 
        phone: "+46 73-142 59 13", 
        email: "hello@pinmeto.com" 
    },
    openingDate: "2017-09-01",
    permanentlyClosed: false,
    temporarilyClosedUntil: "",
    temporarilyClosedMessage: "",
    isAlwaysOpen: false,
    specialOpenHours: [
        {
            start: "2025-12-24",
            end: "2025-12-24",
            isClosed: true,
            openTime: "0000",
            closeTime: "0000"
        },
        {
            start: "2025-12-25",
            end: "2025-12-25",
            isClosed: true,
            openTime: "0000",
            closeTime: "0000"
        }
    ],
    openHours: {
        mon: { state: "Open", span: [{ open: "0800", close: "1700" }] },
        tue: { state: "Open", span: [{ open: "0800", close: "1700" }] },
        wed: { state: "Open", span: [{ open: "0800", close: "1700" }] },
        thu: { state: "Open", span: [{ open: "0800", close: "1700" }] },
        fri: { state: "Open", span: [{ open: "0800", close: "1700" }] },
        sat: { state: "Closed", span: [] },
        sun: { state: "Closed", span: [] }
    },
    updatedAt: "2025-12-19T13:55:08.575Z"    
}

```
</details>

## Response Structure


### Location Object

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Type of location (e.g., "storefront") |
| `siteName` | string | Name of the site |
| `storeId` | string | Store identifier |
| `name` | string | Location name |
| `locationDescriptor` | string | Location descriptor/label |
| `description` | object | Description object with long and short fields |
| `location` | object | Coordinates with lat and lon |
| `address` | object | Address information |
| `contact` | object | Contact information |
| `openingDate` | string | Opening date (YYYY-MM-DD format) |
| `permanentlyClosed` | boolean | Whether location is permanently closed |
| `temporarilyClosedUntil` | string | Temporary closure end date |
| `temporarilyClosedMessage` | string | Temporary closure message |
| `isAlwaysOpen` | boolean | Whether location is always open |
| `specialOpenHours` | array | Array of special opening hours |
| `openHours` | object | Regular opening hours by day |
| `updatedAt` | string | Last update timestamp (ISO format) |
| `verification` | object | Verification status |
| `networkData` | object | Optional network-specific data |

<details>
  <summary>Nested Objects</summary>
  
#### Description Object
```
{
    long: string,   // Detailed description
    short: string   // Brief description
}
```

#### Location Object
```
{
    lat: number,    // Latitude
    lon: number     // Longitude
}
```

#### Address Object
```
{
    street: string,     // Street address
    zip: string,        // Postal code
    city: string,       // City
    state: string,      // State/province
    country: string,    // Country
    province?: string   // Optional province field
}
```

#### Contact Object
```
{
    phone: string,      // Phone number
    email: string       // Email address
}
```

#### Special Open Hours Item
```
{
    start: string,          // Start date (YYYY-MM-DD)
    end: string,            // End date (YYYY-MM-DD)
    label?: string,         // Optional label
    isClosed: boolean,      // Whether closed during this period
    openTime: string,       // Opening time (HHMM format)
    closeTime: string       // Closing time (HHMM format)
}
```

#### Open Hours Object
```
{
    mon: DayHours,
    tue: DayHours,
    wed: DayHours,
    thu: DayHours,
    fri: DayHours,
    sat: DayHours,
    sun: DayHours
}
```

#### Day Hours Object
```
{
    state: string,          // "Open" | "Closed"
    span: Array<{           // Array of time spans
        open: string,         // Opening time (HHMM)
        close: string         // Closing time (HHMM)
    }>
}
```

#### Verification Object
```
{
    addressVerified: boolean,       // Address verification status
    serviceAreasVerified: boolean   // Service areas verification status
}
```

#### Network Data Object (Optional)
```
{
    google?: {
        actionLinks: array,
        serviceItems: array,
        media: object
    }
}
```
</details>

---

## Status Codes

- `200 OK`: Successful request, data returned
- `400 Bad Request`: Missing or invalid required parameters
- `404 Not Found`: Requested location or site does not exist
- `500 Internal Server Error`: Unexpected server error occurred

## Error Response Format

All error responses follow a consistent JSON structure:

```json
{
  "error": "Human-readable error description"
}
```

## Recommendations
- **Verify data freshness**: Check the `updatedAt` timestamp.
- **Batch requests efficiently**: When retrieving multiple locations, use the `/locations` endpoint instead of multiple single-location requests `/locations/{StoreID}`.
- **Always check status codes**: Don't assume successful responses.

