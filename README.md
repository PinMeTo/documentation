# PinMeTo API Documentation

This page has technical documentation on PinMeTo APIs. For a non-technical description, see our [help article](https://help.pinmeto.com/en/article/introducing-the-pinmeto-api-kl3pwj/).

## Overview

Integration with PinMeTo offers the ability to fetch information and send updates through our APIs for:
- Locations
- Insights
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

Insights and Reviews can be queried through GraphQL interfaces.

[Reviews, Facebook Insights](docs/insights-v2.md)

Google Insights: found in [PinMeTo Places](https://places.pinmeto.com/listings) under API > Documentation after logging into the product.

## Sample Code

[Examples](samples/)
