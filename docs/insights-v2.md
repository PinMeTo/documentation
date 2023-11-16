# Insights API v2 reference

PinMeTo Insights API v2 is a GraphQL interface to perform queries about your **reviews** and **insights** for Google and Facebook.

## Notice

**IMPORTANT: Insights about Google and Facebook are deprecated in Insights API v2 as of 2023-11-16**

* All data for Insights has been migrated to Insights API v3, and we recommend using v3 for querying **insights** for Google and Facebook.
* For querying **reviews** for Google and Facebook you should continue to use Insights API v2 until this data is migrated to v3.

## Usage

### Authorization
Obtain an API access token as documented in [Api access token](access_token.md)

### GraphQL GUI

Use the GraphQL GUI to explore data and see query documentation.

Endpoint for GraphQL GUI: `https://api.pinmeto.com/v2/<<account_id>>/insights/?access_token=<<access_token>>`
