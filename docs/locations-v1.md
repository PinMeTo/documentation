# Locations API v1 reference

**IMPORTANT! Locations API v1 is deprecated as of 2020-04-27**
All functionality of the Locations API has been migrated to [Locations API v2](locations-v2.md). We recommend modifying any clients to use v2 instead, and not implementing any new clients with v1 as this version will be removed in the future.

<br />
<br />
<br />

### PinMeTo API v1 is JSON API for get and update information about your locations

#### Login into Listings to get these keys

- AccountId, `<<account_id>>`
- App id, `<<app_id>>`
- App Secret, `<<app_secret>>`

#### Field encoding notes

- OpeningDate: formatted YYYY-MM-DD
- SpecialOpenHours: use [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatting of strings
ie. *YYYY-MM-DDTHH:mm:ss.sssZ*
  - When setting closed dates (`isClosed: true`) an entry is needed for each day that is closed.
  - Cannot last longer than 24 hours, must end at latest 1159.

## Recommendations

- A accesstoken is valid for 1 hour so *do* cache it
- When using this api to build a storelocator *do* cache the result on your webserver and avoid calling `/locations` for every search

## Rate limit

You are allowed to do 3600 request/hour. In the header from each response you get information about your
ratelimit

##### Example of ratelimit in header

```
HEADER
 x-ratelimit-limit: '3600'
 x-ratelimit-reset: '1452787466'
 x-ratelimit-remaining: '3599'
 content-type: 'application/json; charset=utf-8'
 content-length: '2564'
 date: 'Thu, 14 Jan 2016 15:04:25 GMT'
```

## Access Token

[Documented here](Api-access-token)

## Fetch all locations

If you have your access token you can get information about all your locations.

### Endpoint `/v1/<<account_id>>/locations`

`https://api.pinmeto.com/v1/<<account_id>>/locations`

And add http header `Authorization: Bearer YOUR_ACCESS_TOKEN`

#### Parameters

- **pagesize** = (Number) Number of locations that the request returns, default 100, max 250 | optional
- **next** = (String) Id of starting point to next page
- **before** = (String) Id of starting point to previous page

##### Result

<ul>
 <li><b>paging</b>: (Object)
  <ul>
   <li><b>next</b>: (String) | Url to get next page with locations</li>
   <li><b>before</b>: (String) | Url to get previous page with locations</li>
  </ul>
 </li>
 <li>
  <b>data</b>: (Array)
  <ul>
   <li><b>name</b>: (String)</li>
   <!--li ng-show="customGoogleName"><b>googleName</b>: (String)</li>
<li ng-show="customFacebookName"><b>facebookName</b>: (String)</li-->
   <li><b>storeId</b>: (String)</li>
   <li><b>shortDescription</b>: (String, max length 240)</li>
   <li><b>longDescription</b>: (String, max length 750)</li>
   <li><b style="text-decoration: line-through;">text</b> (deprecated, use shortDescription) : (String)</li>
   <li><b>openingDate</b>: (String)</li>
   <li><b>contact</b>: (Object)
    <ul>
     <li><b>phone</b>: (String)</li>
     <li><b>homepage</b>: (String)</li>
     <li><b>email</b>: (String)</li>
    </ul>
   </li>
   <li><b>address</b>: (Object)
    <ul>
     <li><b>street</b>: (String)</li>
     <li><b>zip</b>: (String)</li>
     <li><b>city</b>: (String)</li>
     <li><b>country</b>: (String)</li>
    </ul>
   </li>
   <li><b>permanentlyClosed</b>: (Boolean)</li>
   <li><b>isAlwaysOpen<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.isAlwaysOpen}}"></sup></b>:
    (Boolean)</li>
   <li><b>locationDescriptor</b>: (String)</li>
   <li><b>location</b>: (Object)
    <ul>
     <li><b>lat</b>: (Number)</li>
     <li><b>lon</b>: (Number)</li>
    </ul>
   </li>
   <li><b>openHours</b>: (Object)
    <ul>
     <li><b>mon</b>: (Object)
      <ul>
       <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
        (String)</li>
       <li><b>span</b>: (Array)
        <ul>
         <li><b>open</b>: (String)</li>
         <li><b>close</b>: (String)</li>
        </ul>
       </li>
      </ul>
     </li>
     <li>...</li>
     <li><b>sun</b>: (Object)
      <ul>
       <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
        (String)</li>
       <li><b>span</b>: (Array)
        <ul>
         <li><b>open</b>: (String)</li>
         <li><b>close</b>: (String)</li>
        </ul>
       </li>
      </ul>
     </li>
    </ul>
   </li>
   <li><b>specialOpenHours<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.specialOpenHours}}"></sup></b>:
    (Array)
    <ul>
     <li><b>label</b>: (String)</li>
     <li><b>startDate</b>: (ISO Date string)</li>
     <li><b>endDate</b>: (ISO Date string)</li>
     <li><b>openTime</b>: (String)</li>
     <li><b>endTime</b>: (String)</li>
     <li><b>isClosed</b>: (Boolean)</li>
    </ul>
   </li>
   <li><b>network</b>: (Object)
    <ul>
     <li><b>facebook</b>: (Object)
      <ul>
       <li><b>pageId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
      </ul>
     </li>
     <li><b>google</b>: (Object)
      <ul>
       <li><b>placeId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
       <li><b>newReviewUrl</b>: (String)</li>
      </ul>
     </li>
     <li><b>bing</b>: (Object)
      <ul>
       <li><b>link</b>: (String)</li>
      </ul>
     </li>
    </ul>
   </li>
   <li><b>googleName</b>: (String) - if google custom name is enabled</li>
   <li><b>facebookName</b>: (String) - if facebook custom name is enabled</li>
   <li><b>wifiSsid</b>: (String, max length 32)</li>
  </ul>
 </li>
</ul>

##### Example result

```Javascript
{
  "data": [
    {
      "name": "Name of location"
      "storeId": "api-location",
      "text": "The location marketing platform for chain businesses.",
      "shortDescription": "The location marketing platform for chain businesses.",
      "longDescription": "The location marketing platform for chain businesses.",
      "openingDate": "2013-02-01",
      "contact": {
        "phone": "+46 70 2336879",
        "homepage": "http://www.google.com",
        "email": "test@pinmeto.com"
      },
      "address": {
        "street": "testgatan 4",
        "zip": "217 41",
        "city": "Malmö",
        "country": "Sweden"
      },
      "locationDescriptor": "API locationDescriptor",
      "location": {
        "lat": 59.333755678571,
        "lon": 18.056143908447
      },
      "openHours": {
        "mon": {
          "state": "Open",
          "span": [
            {
              "open": "0900",
              "close": "1700"
            }
          ]
        },
        "tue": {
          "state": "Open",
          "span": [
            {
              "open": "0900",
              "close": "1700"
            }
          ]
        },
        "wed": {
          "state": "Open",
          "span": [
            {
              "open": "0900",
              "close": "1700"
            }
          ]
        },
        "thu": {
          "state": "Open",
          "span": [
            {
              "open": "0900",
              "close": "1500"
            }
          ]
        },
        "fri": {
          "state": "Open",
          "span": [
            {
              "open": "0900",
              "close": "1700"
            }
          ]
        },
        "sat": {
          "state": "Closed",
          "span": []
        },
        "sun": {
          "state": "Closed",
          "span": []
        }
      },
      "specialOpenHours": [
        {
          "startDate": "2017-05-28T00:00:00.000Z",
          "endDate": "2017-05-28T00:00:00.000Z",
          "openTime": "1000",
          "closeTime": "2000",
          "isClosed": false,
          "label": "Mothers day"
        },
        {
          "startDate": "2017-07-04T00:00:00.000Z",
          "endDate": "2017-07-04T00:00:00.000Z",
          "openTime": "0000",
          "closeTime": "0000",
          "isClosed": true,
          "label": "Independence day"
        },
        {
          "startDate": "2017-11-24T00:00:00.000Z",
          "endDate": "2017-11-24T00:00:00.000Z",
          "openTime": "0000",
          "closeTime": "2400",
          "isClosed": false,
          "label": "Black friday"
        }
      ],
      "network": {
        "facebook": {
          "pageId": "1605390276379843",
          "link": "https://www.facebook.com/Pinmeto.Malmo/"
        },
        "google": {
          "placeId": "ChIJpbpzuV6hU0YRG49xL3Bp8m8",
          "link": "https://maps.google.com/?cid=8066625813127204635",
          "newReviewUrl": "https://search.google.com/local/writereview?placeid=ChIJF9eIJ12dX0YRogcSnTh1G6s"
        },
        "wifiSsid": "pinmeto"
      },
  ...
      {
        "name": "Name of location",
        "storeId": "store-id",
        "shortDescription": "The location marketing platform for chain businesses.",
        "longDescription": "The location marketing platform for chain businesses.",
        "contact": {
          "phone": "+46 70 2336879",
          "homepage": "http://www.google.com",
          "email": "test@pinmeto.com"
        },
        "address": {
          "street": "testgatan 2",
          "zip": "217 41",
          "city": "Malmö",
          "country": "Sweden"
        },
        "locationDescriptor": "API locationDescriptor",
        "location": {
          "lat": 9.333755678571002,
          "lon": 8.056143908447002
        },
        "openHours": {
          "mon": {
            "state": "Open",
            "span": [
              {
                "open": "0900",
                "close": "1700"
              }
            ]
          },
          "tue": {
            "state": "Open",
            "span": [
              {
                "open": "0900",
                "close": "1700"
              }
            ]
          },
          "wed": {
            "state": "Open",
            "span": [
              {
                "open": "0900",
                "close": "1700"
              }
            ]
          },
          "thu": {
            "state": "Open",
            "span": [
              {
                "open": "0900",
                "close": "1500"
              }
            ]
          },
          "fri": {
            "state": "Open",
            "span": [
              {
                "open": "0900",
                "close": "1700"
              }
            ]
          },
          "sat": {
            "state": "Closed",
            "span": []
          },
          "sun": {
            "state": "Closed",
            "span": []
          }
        },
        "specialOpenHours": [
          {
            "startDate": "2017-05-28T00:00:00.000Z",
            "endDate": "2017-05-28T00:00:00.000Z",
            "openTime": "1000",
            "closeTime": "2000",
            "isClosed": false,
            "label": "Mothers day"
          },
          {
            "startDate": "2017-07-04T00:00:00.000Z",
            "endDate": "2017-07-04T00:00:00.000Z",
            "openTime": "0000",
            "closeTime": "0000",
            "isClosed": true,
            "label": "Independence day"
          },
          {
            "startDate": "2017-11-24T00:00:00.000Z",
            "endDate": "2017-11-24T00:00:00.000Z",
            "openTime": "0000",
            "closeTime": "2400",
            "isClosed": false,
            "label": "Black friday"
          }
        ],
        "network": {
          "facebook": {
            "pageId": "1605390276379843",
            "link": "https://www.facebook.com/Pinmeto.Malmo/"
          },
          "google": {
            "placeId": "ChIJpbpzuV6hU0YRG49xL3Bp8m8",
            "link": "https://maps.google.com/?cid=8066625813127204635"
          },
    },
    "googleName": "name",
    "facebookName": "name",
        "wifiSsid": "pinmeto"
      }
    ],
    "paging": {
    before: "https://api.pinmeto.com/v1/pinmeto/locations?before=569649b49c5ec8685e11175e"
    next: "https://api.pinmeto.com/v1/pinmeto/locations?next=569652a91151474860f5e173"
    }
  }
```

#### Curl call to get all locations

`curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -X GET https://api.pinmeto.com/v1/<<account_id>>/locations`

## Fetch one location

If you have your access token you can get information about one location

#### Endpoint GET: `/v1/<<account_id>>/locations/YOUR_STORE_ID`

`https://api.pinmeto.com/v1/<<account_id>>/locations/YOUR_STORE_ID`

And add http header `Authorization: Bearer YOUR_ACCESS_TOKEN`

##### Result

<ul>
 <li>
  <b>data</b>: (Object)
  <ul>
   <li><b>name</b>: (String)</li>
   <li><b>googleName</b>: (String)</li>
   <li><b>facebookName</b>: (String)</li>
   <li><b>storeId</b>: (String)</li>
   <li><b>shortDescription</b>: (String, max length 240)</li>
   <li><b>longDescription</b>: (String, max length 750)</li>
   <li><b style="text-decoration: line-through;">text</b> (deprecated, use shortDescription) : (String)</li>
   <li><b>contact</b>: (Object)
    <ul>
     <li><b>phone</b>: (String)</li>
     <li><b>homepage</b>: (String)</li>
     <li><b>email</b>: (String)</li>
    </ul>
   </li>
   <li><b>address</b>: (Object)
    <ul>
     <li><b>street</b>: (String)</li>
     <li><b>zip</b>: (String)</li>
     <li><b>city</b>: (String)</li>
     <li><b>country</b>: (String)</li>
    </ul>
   </li>
   <li><b>permanentlyClosed</b>: (Boolean)</li>
   <li><b>isAlwaysOpen<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.isAlwaysOpen}}"></sup></b>:
    (Boolean)</li>
   <li><b>locationDescriptor</b>: (String)</li>
   <li><b>location</b>: (Object)
    <ul>
     <li><b>lat</b>: (Number)</li>
     <li><b>lon</b>: (Number)</li>
    </ul>
   </li>
   <li><b>openHours</b>: (Object)
    <ul>
     <li><b>mon</b>: (Object)
      <ul>
       <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
        (String)</li>
       <li><b>span</b>: (Array)
        <ul>
         <li><b>open</b>: (String)</li>
         <li><b>close</b>: (String)</li>
        </ul>
       </li>
      </ul>
     </li>
     <li>...</li>
     <li><b>sun</b>: (Object)
      <ul>
       <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
        (String)</li>
       <li><b>span</b>: (Array)
        <ul>
         <li><b>open</b>: (String)</li>
         <li><b>close</b>: (String)</li>
        </ul>
       </li>
      </ul>
     </li>
    </ul>
   </li>
   <li><b>specialOpenHours<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.specialOpenHours}}"></sup></b>:
    (Array)
    <ul>
     <li><b>label</b>: (String)</li>
     <li><b>startDate</b>: (ISO Date string)</li>
     <li><b>endDate</b>: (ISO Date string)</li>
     <li><b>openTime</b>: (String)</li>
     <li><b>endTime</b>: (String)</li>
     <li><b>isClosed</b>: (Boolean)</li>
    </ul>
   </li>
   <li><b>network</b>: (Object)
    <ul>
     <li><b>facebook</b>: (Object)
      <ul>
       <li><b>pageId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
      </ul>
     </li>
     <li><b>google</b>: (Object)
      <ul>
       <li><b>placeId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
      </ul>
     </li>
     <li><b>foursquare</b>: (Object)
      <ul>
       <li><b>venueId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
      </ul>
     </li>
     <li><b>bing</b>: (Object)
      <ul>
       <li><b>link</b>: (String)</li>
      </ul>
     </li>
    </ul>
   </li>
   <li><b>googleName</b>: (String) - if google custom name is enabled</li>
   <li><b>facebookName</b>: (String) - if facebook custom name is enabled</li>
   <li><b>wifiSsid</b>: (String, max length 32)</li>
  </ul>
 </li>
</ul>

##### Example result

```Javascript
{
  "data": {
    "name": "Name of location"
    "storeId": "1337",
    "shortDescription": "The location marketing platform for chain businesses.",
    "longDescription": "The location marketing platform for chain businesses.",
    "contact": {
      "phone": "+46 739 60 61 40",
      "email": "hello@pinmeto.com",
      "homepage": "http://www.pinmeto.com/"
    },
    "permanentlyClosed": false,
    "isAlwaysOpen": false,
    "address": {
      "street": "testgatan 2",
      "zip": "211 19",
      "city": "Malmö",
      "country": "Sweden"
    },
    "locationDescriptor": "Malmö",
    "location": {
      "lat": 55.6105169,
      "lon": 12.9936406
    },
    "openHours": {
      "mon": {
        "state": "Open",
        "span": [
          {
            "open": "0900",
            "close": "1700"
          }
        ]
      },
      "tue": {
        "state": "Open",
        "span": [
          {
            "open": "0900",
            "close": "1700"
          }
        ]
      },
      "wed": {
        "state": "Open",
        "span": [
          {
            "open": "0900",
            "close": "1700"
          }
        ]
      },
      "thu": {
        "state": "Open",
        "span": [
          {
            "open": "0900",
            "close": "1500"
          }
        ]
      },
      "fri": {
        "state": "Open",
        "span": [
          {
            "open": "0900",
            "close": "1700"
          }
        ]
      },
      "sat": {
        "state": "Closed",
        "span": []
      },
      "sun": {
        "state": "Closed",
        "span": []
      }
    },
    "specialOpenHours": [
      {
        "startDate": "2017-05-28T00:00:00.000Z",
        "endDate": "2017-05-28T00:00:00.000Z",
        "openTime": "1000",
        "closeTime": "2000",
        "isClosed": false,
        "label": "Mothers day"
      },
      {
        "startDate": "2017-07-04T00:00:00.000Z",
        "endDate": "2017-07-04T00:00:00.000Z",
        "openTime": "0000",
        "closeTime": "0000",
        "isClosed": true,
        "label": "Independence day"
      },
      {
        "startDate": "2017-11-24T00:00:00.000Z",
        "endDate": "2017-11-24T00:00:00.000Z",
        "openTime": "0000",
        "closeTime": "2400",
        "isClosed": false,
        "label": "Black friday"
      }
    ],
    "network": {
      "facebook": {
        "pageId": "1605390276379843",
        "link": "https://www.facebook.com/Pinmeto.Malmo/"
      },
      "google": {
        "placeId": "ChIJpbpzuV6hU0YRG49xL3Bp8m8",
        "link": "https://maps.google.com/?cid=8066625813127204635"
      },
      "foursquare": {
        "venueId": "5263ffd511d2505034dc70ac",
        "link": "https://foursquare.com/v/5263ffd511d2505034dc70ac"
      }
 },
 "googleName": "name",
 "facebookName": "name",
    "wifiSsid": "pinmeto"
  }
}
```

#### Curl call to get a location

`curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -X GET https://api.pinmeto.com/v1/<<account_id>>/locations/YOUR_STORE_ID`

## Update a location

Note that the name of a location is no longer possible to update using the api. You need to include your access_token in the Authorization header ("Bearer " + YOUR_ACCESS_TOKEN'). Or add `access_token : YOUR_ACCESS_TOKEN` in the body , but be sure that your request headers is `Content-Type: application/x-www-form-urlencoded`

#### Endpoint PUT: `/v1/<<account_id>>/locations/YOUR_STORE_ID`

`https://api.pinmeto.com/v1/<<account_id>>/locations/YOUR_STORE_ID`

##### Properties to update

<ul>
 <li><b>googleName</b>: (String)</li>
 <li><b>facebookName</b>: (String)</li>
 <li><b>shortDescription</b>: (String, max length 240)</li>
 <li><b>longDescription</b>: (String, max length 750)</li>
 <li><b style="text-decoration: line-through;">text</b> (deprecated, use shortDescription) : (String)</li>
 <li><b>contact</b>: (Object)
  <ul>
   <li><b>phone</b>: (String)</li>
   <li><b>homepage</b>: (String)</li>
   <li><b>email</b>: (String)</li>
  </ul>
 </li>
 <li><b>address</b>: (Object)
  <ul>
   <li><b>street</b>: (String)</li>
   <li><b>zip</b>: (String)</li>
   <li><b>city</b>: (String)</li>
   <li><b>country</b>: (String)</li>
  </ul>
 </li>
 <li><b>permanentlyClosed</b>: (Boolean)</li>
 <li><b>isAlwaysOpen<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.isAlwaysOpen}}"></sup></b>:
  (Boolean)</li>
 <li><b>locationDescriptor</b>: (String)</li>
 <li><b>location</b>: (Object)
  <ul>
   <li><b>lat</b>: (Number)</li>
   <li><b>lon</b>: (Number)</li>
  </ul>
 </li>
 <li><b>openHours</b>: (Object)
  <ul>
   <li><b>mon</b>: (Object)
    <ul>
     <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
      (String)</li>
     <li><b>span</b>: (Array)
      <ul>
       <li><b>open</b>: (String)</li>
       <li><b>close</b>: (String)</li>
      </ul>
     </li>
    </ul>
   </li>
   <li>...</li>
   <li><b>sun</b>: (Object)
    <ul>
     <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
      (String)</li>
     <li><b>span</b>: (Array)
      <ul>
       <li><b>open</b>: (String)</li>
       <li><b>close</b>: (String)</li>
      </ul>
     </li>
    </ul>
   </li>
  </ul>
 </li>
 <li><b>specialOpenHours<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.specialOpenHours}} {{description.specialOpenHours_update}}"></sup></b>:
  (Array)
  <ul>
   <li><b>label</b>: (String)</li>
   <li><b>startDate</b>: (ISO Date string)</li>
   <li><b>endDate</b>: (ISO Date string)</li>
   <li><b>openTime</b>: (String)</li>
   <li><b>endTime</b>: (String)</li>
   <li><b>isClosed</b>: (Boolean)</li>
  </ul>
 </li>
 <li><b>googleName</b>: (String) - if google custom name is enabled</li>
 <li><b>facebookName</b>: (String) - if facebook custom name is enabled</li>
 <li><b>wifiSsid</b>: (String, max length 32)</li>
</ul>

##### Example of PUT request with access_token in Authorization-header

```
PUT /v1/<<account_id>>/locations/YOUR_STORE_ID HTTP/1.1
Authorization: Bearer 77813e40da005550c53bd8e06fc59e8ae76e2694
Host: https://api.pinmeto.com
Content-Type: application/json

Body:
{
 "locationDescriptor": "API locationDescriptor",
 "address": {
  "street": "testgatan 4",
  "zip": "217 41",
  "city": "Malmö",
  "country": "Sweden"
 },
 "location": {
  "lat": 59.333755678571,
  "lon": 18.056143908447
 },
 "contact": {
  "phone": "+46 70 2336879",
  "email": "test@example.com",
  "homepage": "http://www.google.com"
 }
}
```

##### Example of PUT request with access_token in the body

```
PUT /v1/<<<account_id>>>/locations/YOUR_STORE_ID HTTP/1.1
Host: https://api.pinmeto.com
Content-Type: 'application/x-www-form-urlencoded'
Authorization: Bearer 77813e40da005550c53bd8e06fc59e8ae76e2694

Body:
{
 locationDescriptor: 'API locationDescriptor',
 address: {
  street: 'testgatan 4',
  zip: '217 41',
  city: 'Malmö',
  country: 'Sweden'
 },
 location: {
  lat: 59.333755678571,
  lon: 18.056143908447
 },
 contact: {
  phone: '+46 70 2336879',
  email: 'test@example.com',
  homepage: 'http://www.google.com'
 }
}
```

#### Curl call to update a location

```bash
curl -X PUT \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d 'locationDescriptor'='Malmoe' \
  -d 'specialOpenHours'='[{"startDate": "2018-12-31","endDate":"2018-12-31","openTime":"1100", "closeTime": "1500", "isClosed": false, "label":"New Years Eve"}]' \
  https://api.pinmeto.com/v1/<<account_id>>/locations/YOUR_STORE_ID
```

## Create a location

You need to include your access_token in the Authorization header ("Bearer " + YOUR_ACCESS_TOKEN'). Or add `access_token : YOUR_ACCESS_TOKEN` in the body , but be sure that your request headers is `Content-Type: application/x-www-form-urlencoded`

#### Endpoint POST: `/v1/<<account_id>>/locations`

`https://api.pinmeto.com/v1/<<account_id>>/locations`

##### Properties

<ul>
 <!--li ng-show="customGoogleName"><b>googleName</b>: (String) <b>required</b></li>
<li ng-show="customFacebookName"><b>facebookName</b>: (String) <b>required</b></li-->
 <li><b>storeId</b>: (String) <b>required</b></li>
 <li><b>shortDescription</b>: (String, max length 240)</li>
 <li><b>longDescription</b>: (String, max length 750)</li>
 <li><b style="text-decoration: line-through;">text</b> (deprecated, use shortDescription) : (String)</li>
 <li><b>contact</b>: (Object) <b>required</b>
  <ul>
   <li><b>phone</b>: (String)</li>
   <li><b>homepage</b>: (String)</li>
   <li><b>email</b>: (String)</li>
  </ul>
 </li>
 <li><b>address</b>: (Object) <b>required</b>
  <ul>
   <li><b>street</b>: (String)</li>
   <li><b>zip</b>: (String)</li>
   <li><b>city</b>: (String)</li>
   <li><b>country</b>: (String)</li>
  </ul>
 </li>
 <li><b>permanentlyClosed</b>: (Boolean)</li>
 <li><b>isAlwaysOpen<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.isAlwaysOpen}}"></sup></b>:
  (Boolean)</li>
 <li><b>locationDescriptor</b>: (String)</li>
 <li><b>location</b>: (Object) <b>required</b>
  <ul>
   <li><b>lat</b>: (Number)</li>
   <li><b>lon</b>: (Number)</li>
  </ul>
 </li>
 <li><b>openHours</b>: (Object)
  <ul>
   <li><b>mon</b>: (Object)
    <ul>
     <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
      (String)</li>
     <li><b>span</b>: (Array)
      <ul>
       <li><b>open</b>: (String)</li>
       <li><b>close</b>: (String)</li>
      </ul>
     </li>
    </ul>
   </li>
   <li>...</li>
   <li><b>sun</b>: (Object)
    <ul>
     <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
      (String)</li>
     <li><b>span</b>: (Array)
      <ul>
       <li><b>open</b>: (String)</li>
       <li><b>close</b>: (String)</li>
      </ul>
     </li>
    </ul>
   </li>
  </ul>
 </li>
 <li><b>specialOpenHours<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.specialOpenHours}}"></sup></b>:
  (Array)
  <ul>
   <li><b>label</b>: (String)</li>
   <li><b>startDate</b>: (ISO Date string)</li>
   <li><b>endDate</b>: (ISO Date string)</li>
   <li><b>openTime</b>: (String)</li>
   <li><b>endTime</b>: (String)</li>
   <li><b>isClosed</b>: (Boolean)</li>
  </ul>
 </li>
 <li><b>googleName</b>: (String) - if google custom name is enabled</li>
 <li><b>facebookName</b>: (String) - if facebook custom name is enabled</li>
 <li><b>wifiSsid</b>: (String, max length 32)</li>
</ul>

##### Example of POST with token in Authorization-header

```
POST /v1/<<account_id>>/locations HTTP/1.1
Authorization: Bearer 77813e40da005550c53bd8e06fc59e8ae76e2694
Host: https://api.pinmeto.com
Content-Type: application/json

Body:
{
 "storeId": "store-id",
 "locationDescriptor": "API locationDescriptor",
 "address": {
  "street": "testgatan 4",
  "zip": "217 41",
  "city": "Malmö",
  "country": "Sweden"
 },
 "location": {
  "lat": 59.333755678571,
  "lon": 18.056143908447
 },
 "contact": {
  "phone": "+46 70 2336879",
  "email": "test@example.com",
  "homepage": "http://www.google.com"
 }
}
```

##### Example of POST with token in body

```
POST /v1/<<account_id>>/locations HTTP/1.1
Host: https://api.pinmeto.com
Content-Type: 'application/x-www-form-urlencoded'

Body:
{
 access_token: 'token'
 storeId: 'store-id',
 locationDescriptor: 'API locationDescriptor',
 address: {
  street: 'testgatan 4',
  zip: '217 41',
  city: 'Malmö',
  country: 'Sweden'
 },
 location: {
  lat: 59.333755678571,
  lon: 18.056143908447
 },
 contact: {
  phone: '+46 70 2336879',
  email: 'test@example.com',
  homepage: 'http://www.google.com'
 }
}
```

#### Curl call to create a location

```bash
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --data '{ "storeId": "0987654", "locationDescriptor": "API locationDescriptor","address": {"street": "testgatan 4","zip": "217 41","city": "Malmö","country": "Sweden"},"location": {"lat": 59.333755678571,"lon": 18.056143908447},"contact": {"phone": "+46 70 2336879","email": "test@example.com","homepage": "http://www.google.com"}}' \
  https://api.pinmeto.com/v1/<<account_id>>/locations
```
