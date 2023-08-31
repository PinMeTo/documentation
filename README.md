# PinMeTo API Documentation

This page has technical documentation on PinMeTo APIs. For a non-technical description, see our [help article](https://help.pinmeto.com/en/article/introducing-the-pinmeto-api-kl3pwj/).

## Overview

Integration with PinMeTo offers the ability to fetch information and send updates through our APIs for:
- Locations
- Insights for Google and Facebook
- Reviews

## Endpoints

- Test: https://api.test.pinmeto.com
- Production: https://api.pinmeto.com

## Authentication API Reference

Authentication to all APIs is done through standard OAuth 2.0.

Documentation on how to obtain an access token can be found [here](docs/access_token.md).

## Location API Reference

The Location API is a REST API for fetching and updating Listings data.

[Current version (v2.0)](docs/locations-v2.md)

## Insights & Reviews API Reference

Insights for Facebook and Reviews can be queried through the [API v2 GraphQL interface](docs/insights-v2.md).

Ratings and Insights for Google and Facebook can be queried through the API v3 OpenAPI interface. Documentation for API v3 is found after logging in to the PinMeTo platform in [Listings](https://places.pinmeto.com/listings) under API > Documentation.

## Sample Code

[Examples](samples/)
