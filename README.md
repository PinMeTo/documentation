# PinMeTo API Documentation

This page has technical documentation on PinMeTo APIs. For an overview of when and how to use the APIs in an integration, see our [help article](https://help.pinmeto.com/en/article/introducing-the-pinmeto-api-kl3pwj/).

## Overview

Integration with PinMeTo offers the ability to fetch information and send updates through our APIs for:
- Locations
- Insights (Google, Facebook and Apple)
- Keywords and Ratings
- Reviews' details

## Endpoints

- Test: https://api.test.pinmeto.com
- Production: https://api.pinmeto.com

## Authentication

Authentication to all APIs is done through standard OAuth 2.0.

Documentation on how to obtain an access token can be found [here](docs/access_token.md).

## Usage

### Locations API v2 for managing locations data

The [Locations API v2](docs/locations-v2.md) is a REST API for fetching and updating location data that is managed in Listings.

### Reviews API v2 for querying reviews with text

Reviews can be queried through the [Insights API v2 GraphQL interface](docs/insights-v2.md).

### Keywords and Ratings API v3 for querying keywords and reviews without text

Keywords and Ratings metrics can be queried through the Insights API v3 OpenAPI interface. Documentation for Insights API v3 is found after logging in to the PinMeTo platform in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation. For testing purposes, some parameters will be filled with account data.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/v3/).

### Insights API v4 for quering metrics coming from Google, Facebook and Apple 

Insights for Google, Facebook and Apple are available through the Insights API v4 OpenAPI interface. The documentation can be found in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/v4/).

### Media API v1 for managing locations media 

Images can be manage via Media API v1 OpenAPI interface. The documentation can be found in [Account Settings](https://places.pinmeto.com/account-settings/) under API > Documentation.

If you do not have an account to login with, you can access the page anonymously using this link (https://api.pinmeto.com/documentation/media/v1/).

## Sample code

[Examples](samples/)
