# PinMeTo Public API Integration Guide

## Overview

The PinMeTo Public API is a read-only REST API that provides access to location data through a highly available CDN. All location data is served from JSON files, ensuring fast response times and high availability.

## Authentication

Currently, the API does not require authentication for reading location data. All endpoints are publicly accessible.

## API Version

Current version: `v1`

## Technical documentation

Is [here](https://api.pinmeto.com/documentation/public-api/v1).

## Recommendations

- **Verify data freshness**: Check the `updatedAt` timestamp.
- **Batch requests efficiently**: When retrieving multiple locations, use the `/locations` endpoint instead of multiple single-location requests `/locations/{StoreID}`.
- **Always check status codes**: Don't assume successful responses.

## How to enable it?

Please contact our support team to discuss your requirements. If the public API aligns with your needs, they can enable access for your account. Then you can create credentials (Apps) from Account Settings > Public API.
