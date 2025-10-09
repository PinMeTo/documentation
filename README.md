# PinMeTo API Documentation

This page has technical documentation on PinMeTo APIs. For an overview of when and how to use the APIs in an integration, see our [help article](https://help.pinmeto.com/en/article/introducing-the-pinmeto-api-kl3pwj/).

## Overview

Integration with PinMeTo offers the ability to fetch information and send updates through our APIs for:
### Locations and Media
- Locations <mark> v4 released! </mark>
- Media

### Performance
- Insights (Google, Facebook and Apple)
- Ratings
- Keywords
- Reviews

## Endpoints

- Test: https://api.test.pinmeto.com
- Production: https://api.pinmeto.com

## Authentication

Authentication to all APIs is done through standard OAuth 2.0.

Documentation on how to obtain an access token can be found [here](docs/access_token.md).

## Locations and Media

### Locations <mark> v4 released! </mark>

**Endpoint**: `https://locations.api.pinmeto.com/`

The Locations API v4 is a RESTful API for fetching and updating location data that is managed in Listings.

The Open API specification can be found in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/locations/v4/).

### Media API 

Images can be managed via Media API v1. The documentation can be found in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/media/v1/).

## Performance
### Insights (Google, Facebook and Apple)

Metrics coming from Google, Facebook and Apple are available through the Insights API v4 interface. The documentation can be found in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/v4/).

### Ratings

Ratings metrics (reviews without text) can be queried through the Insights API v3 interface in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/v3/).

### Keywords

Keywords metrics can be queried through the Insights API v3 interface. The documentation can be found after logging in to the PinMeTo platform in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation. For testing purposes, some parameters will be filled with your account data.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/v3/).

### Reviews

Reviews can be queried through the [Insights API v2 GraphQL interface](docs/insights-v2.md).



## Sample code

[Examples](samples/)
