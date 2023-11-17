# Locations API v2 reference

PinMeTo Locations API v2 is a JSON API that allows you to integrate with PinMeTo to access and manage your location data through your own systems and services. Typically, customers integrate with PinMeTo Locations API to have a single place for managing location data and to use that information for keeping websites, store locators, etc. up-to-date. Please read our [API Help Article](https://help.pinmeto.com/en/article/introducing-the-pinmeto-api-kl3pwj/) for more information.

## Endpoints

- Test: https://api.test.pinmeto.com
- Production: https://api.pinmeto.com
  
## First step: Get an Access Token

Follow [these instructions](access_token.md) to get the access token, using the proper keys shown in [Account Settings > API](https://places.pinmeto.com/account-settings/pinmeto/api/v3):

- Account Id, `<<account_id>>`
- App Id, `<<app_id>>`
- App Secret, `<<app_secret>>`

## Recommendations

- An access token is valid for 1 hour so *do* cache it
- When using this api to build a storelocator *do* cache the result on your webserver and avoid calling `/locations` for every search

## Rate limit

You are allowed to do 3600 request/hour. In the header from each response you get information about your
ratelimit.

### Example of ratelimit in header

```
HEADER
 x-ratelimit-limit: '3600'
 x-ratelimit-reset: '1452787466'
 x-ratelimit-remaining: '3599'
 content-type: 'application/json; charset=utf-8'
 content-length: '2564'
 date: 'Thu, 14 Jan 2016 15:04:25 GMT'
```

## Field encoding notes

- OpeningDate, temporarilyClosedUntil: formatted YYYY-MM-DD, to unset send '' or null
- SpecialOpenHours: use [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatting of date strings
  ie. *YYYY-MM-DD*
  - When setting closed dates (`isClosed: true`) an entry is needed for each day that is closed.
  - Cannot last longer than 24 hours, must end at latest 1159.

## Custom Data

If the account have custom data enabled you can get, set and update that data.

# Methods

## Fetch all locations

If you have your access token you can get information about all your locations.

#### Endpoint GET: `/v2/<<account_id>>/locations`

`https://api.pinmeto.com/v2/<<account_id>>/locations`

And add http header `Authorization: Bearer YOUR_ACCESS_TOKEN`

#### Parameters

- **pagesize** = (Number) Number of locations that the request returns, default 100, max 250 | optional
- **next** = (String) Id of starting point to next page
- **before** = (String) Id of starting point to previous page
  

#### Curl call to get all locations

`curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -X GET https://api.pinmeto.com/v2/<<account_id>>/locations`

<details>
<summary><b>Result structure</b></summary>
<br>

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
   <li><b>storeId</b>: (String)</li>
   <li><b>description</b>: (Object)
    <ul>
     <li><b>short</b>: (String, max length 240)</li>
     <li><b>long</b>: (String, max length 750)</li>
    </ul>
   </li>
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
   <li><b>temporarilyClosedUntil</b>: (ISO Date string, YYYY-MM-DD)</li>
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
     <li><b>start</b>: (ISO Date string, YYYY-MM-DD)</li>
     <li><b>end</b>: (ISO Date string, YYYY-MM-DD)</li>
     <li><b>openTime</b>: (String, HHMM)</li>
     <li><b>closeTime</b>: (String, HHMM)</li>
     <li><b>isClosed</b>: (Boolean)</li>
    </ul>
   </li>
   <li><b>network</b>: (Object)
    <ul>
     <li><b>facebook</b>: (Object)
      <ul>
       <li><b>pageId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
       <li><b>profileImage</b>: (String)</li>
       <li><b>coverImage</b>: (String)</li>
      </ul>
     </li>
     <li><b>google</b>: (Object)
      <ul>
       <li><b>placeId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
       <li><b>newReviewUrl</b>: (String)</li>
       <li><b>profileImage</b>: (String)</li>
       <li><b>coverImage</b>: (String)</li>
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
   <li>
    <b>pendingChanges</b>: (Object)
    <ul>
    <li><b>address</b>: (Object)
     <ul>
     <li><b>street</b>: (String)</li>
     <li><b>zip</b>: (String)</li>
     <li><b>city</b>: (String)</li>
     <li><b>country</b>: (String)</li>
     </ul>
    </li>
    <li><b>location</b> : (Object)
     <ul>
     <li><b>lat</b>: (Number)</li>
     <li><b>lon</b>: (Number)</li>
     </ul>
    </li>
    </ul>
   </li>
   <li><b>customData</b>: (Object, depends on your custom data definition)</li>
  </ul>
 </li>
</ul>
</details>

<details>
<summary><b>Result example</b></summary>
<br>

```Javascript
{
  "data": [
    {
      "name": "Name of location",
      "storeId": "api-location",
      "description": {
        "short": "The location marketing platform for chain businesses.",
        "long": "The location marketing platform for chain businesses."
      },
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
          "start": "2017-05-28",
          "end": "2017-05-28",
          "openTime": "1000",
          "closeTime": "2000",
          "isClosed": false,
          "label": "Mothers day"
        },
        {
          "start": "2017-07-04",
          "end": "2017-07-04",
          "openTime": "0000",
          "closeTime": "0000",
          "isClosed": true,
          "label": "Independence day"
        },
        {
          "start": "2017-11-24",
          "end": "2017-11-24",
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
          "profileImage": "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p720x720/78063569_2439243212994541_4444163125444345856_o.jpg?_nc_cat=103&_nc_sid=0c64ff&_nc_ohc=empRK1Pb1KoAX900cWE&_nc_ht=scontent-arn2-1.xx&tp=6&oh=76e3097e2e0b63b528bc355b9ea07083&oe=5F9BB09B",
          "coverImage": "https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/s720x720/103323620_2607531456165715_1759303419147657987_o.jpg?_nc_cat=100&_nc_sid=dd9801&_nc_ohc=ZfPnPPzbMUEAX-sbjis&_nc_ht=scontent-arn2-2.xx&tp=7&oh=0b2ae55c8118bf0ecdd4839677e1528b&oe=5F9A4ADA"
        },
        "google": {
          "placeId": "ChIJpbpzuV6hU0YRG49xL3Bp8m8",
          "link": "https://maps.google.com/?cid=8066625813127204635",
          "newReviewUrl": "https://search.google.com/local/writereview?placeid=ChIJF9eIJ12dX0YRogcSnTh1G6s",
          "profileImage": "https://lh3.googleusercontent.com/lCki9MaIOKvhpvwBh_AExUE3_liYXv-8vyr2RH4EPrkSt90__vZImAKkzllwq85JV3PZtUxl8dWivdc7=s0",
          "coverImage": "https://lh3.googleusercontent.com/FrmkuiTtzLt8LbiPHHcoJlJtK1Ab21YahnQKRjs-5Nd7cv_yRwigjodcWy59xNE_frU-9dqT90e5WuWd=s0"
        },
    "wifiSsid": "pinmeto",
        "pendingChanges": {
          "address": {
            "street": "Adelgatan 11"
          },
        "location": {
          "lon": 13.00093,
          "lat": 55.60736
         }
        }
      },
        ...
      {
        "name": "Name of location",
        "storeId": "store-id",
        "description": {
          "short": "The location marketing platform for chain businesses.",
          "long": "The location marketing platform for chain businesses."
        },
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
            "start": "2017-05-28",
            "end": "2017-05-28",
            "openTime": "1000",
            "closeTime": "2000",
            "isClosed": false,
            "label": "Mothers day"
          },
          {
            "start": "2017-07-04",
            "end": "2017-07-04",
            "openTime": "0000",
            "closeTime": "0000",
            "isClosed": true,
            "label": "Independence day"
          },
          {
            "start": "2017-11-24",
            "end": "2017-11-24",
            "openTime": "0000",
            "closeTime": "2400",
            "isClosed": false,
            "label": "Black friday"
          }
        ],
        "network": {
          "facebook": {
            "pageId": "1605390276379843",
            "link": "https://www.facebook.com/Pinmeto.Malmo/",
            "profileImage": "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p720x720/78063569_2439243212994541_4444163125444345856_o.jpg?_nc_cat=103&_nc_sid=0c64ff&_nc_ohc=empRK1Pb1KoAX900cWE&_nc_ht=scontent-arn2-1.xx&tp=6&oh=76e3097e2e0b63b528bc355b9ea07083&oe=5F9BB09B",
            "coverImage": "https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/s720x720/103323620_2607531456165715_1759303419147657987_o.jpg?_nc_cat=100&_nc_sid=dd9801&_nc_ohc=ZfPnPPzbMUEAX-sbjis&_nc_ht=scontent-arn2-2.xx&tp=7&oh=0b2ae55c8118bf0ecdd4839677e1528b&oe=5F9A4ADA"
          },
          "google": {
            "placeId": "ChIJpbpzuV6hU0YRG49xL3Bp8m8",
            "link": "https://maps.google.com/?cid=8066625813127204635",
            "newReviewUrl": "https://search.google.com/local/writereview?placeid=ChIJF9eIJ12dX0YRogcSnTh1G6s",
            "profileImage": "https://lh3.googleusercontent.com/lCki9MaIOKvhpvwBh_AExUE3_liYXv-8vyr2RH4EPrkSt90__vZImAKkzllwq85JV3PZtUxl8dWivdc7=s0",
            "coverImage": "https://lh3.googleusercontent.com/FrmkuiTtzLt8LbiPHHcoJlJtK1Ab21YahnQKRjs-5Nd7cv_yRwigjodcWy59xNE_frU-9dqT90e5WuWd=s0"
          },
        "googleName": "custom google name",
        "facebookName": "custom fb name",
        "wifiSsid": "pinmeto"
      }
    ],
    "paging": {
        before: "https://api.pinmeto.com/v2/pinmeto/locations?before=569649b49c5ec8685e11175e"
        next: "https://api.pinmeto.com/v2/pinmeto/locations?next=569652a91151474860f5e173"
    }
  }
```
</details>

## Fetch one location

If you have your access token, you can get information about one location

#### Endpoint GET: `/v2/<<account_id>>/locations/YOUR_STORE_ID`

`https://api.pinmeto.com/v2/<<account_id>>/locations/YOUR_STORE_ID`

And add http header `Authorization: Bearer YOUR_ACCESS_TOKEN`


#### Curl call to get a location

`curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -X GET https://api.pinmeto.com/v2/<<account_id>>/locations/YOUR_STORE_ID`

<details>
<summary><b>Result structure</b></summary>
<br>

<ul>
 <li>
  <b>data</b>: (Object)
  <ul>
   <li><b>name</b>: (String)</li>
   <li><b>storeId</b>: (String)</li>
      <li><b>description</b>: (Object)
        <ul>
       <li><b>short</b>: (String, max length 240)</li>
       <li><b>long</b>: (String, max length 750)</li>
        </ul>
      </li>
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
      <li><b>temporarilyClosedUntil</b>: (ISO Date string, YYYY-MM-DD)</li>
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
     <li><b>start</b>: (ISO Date string, YYYY-MM-DD)</li>
     <li><b>end</b>: (ISO Date string, YYYY-MM-DD)</li>
     <li><b>openTime</b>: (String)</li>
     <li><b>closeTime</b>: (String)</li>
     <li><b>isClosed</b>: (Boolean)</li>
    </ul>
   </li>
   <li><b>network</b>: (Object)
    <ul>
     <li><b>facebook</b>: (Object)
      <ul>
       <li><b>pageId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
       <li><b>profileImage</b>: (String)</li>
       <li><b>coverImage</b>: (String)</li>
      </ul>
     </li>
     <li><b>google</b>: (Object)
      <ul>
       <li><b>placeId</b>: (String)</li>
       <li><b>link</b>: (String)</li>
       <li><b>newReviewUrl</b>: (String)</li>
       <li><b>profileImage</b>: (String)</li>
       <li><b>coverImage</b>: (String)</li>
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
   <li>
    <b>pendingChanges</b>: (Object)
    <ul>
    <li><b>address</b>: (Object)
     <ul>
     <li><b>street</b>: (String)</li>
     <li><b>zip</b>: (String)</li>
     <li><b>city</b>: (String)</li>
     <li><b>country</b>: (String)</li>
     </ul>
    </li>
    <li><b>location</b> : (Object)
     <ul>
     <li><b>lat</b>: (Number)</li>
     <li><b>lon</b>: (Number)</li>
     </ul>
    </li>
    <li><b>customData</b>: (Object, depends on your custom data definition)</li>
    </ul>
   </li>
  </ul>
 </li>
</ul>
</details>

<details>
<summary><b>Result example</b></summary>
<br>

```Javascript
{
  "data": {
    "name": "Name of location",
    "storeId": "1337",
    "description": {
      "short": "The location marketing platform for chain businesses.",
      "long": "The location marketing platform for chain businesses.",
    },
    "contact": {
      "phone": "+46 739 60 61 40",
      "email": "hello@pinmeto.com",
      "homepage": "http://www.pinmeto.com/"
    },
    "permanentlyClosed": false,
    "temporarilyClosedUntil": "2020-10-30",
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
        "start": "2017-05-28",
        "end": "2017-05-28",
        "openTime": "1000",
        "closeTime": "2000",
        "isClosed": false,
        "label": "Mothers day"
      },
      {
        "start": "2017-07-04",
        "end": "2017-07-04",
        "openTime": "0000",
        "closeTime": "0000",
        "isClosed": true,
        "label": "Independence day"
      },
      {
        "start": "2017-11-24",
        "end": "2017-11-24",
        "openTime": "0000",
        "closeTime": "2400",
        "isClosed": false,
        "label": "Black friday"
      }
    ],
    "network": {
      "facebook": {
        "pageId": "1605390276379843",
        "link": "https://www.facebook.com/Pinmeto.Malmo/",
  "profileImage": "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p720x720/78063569_2439243212994541_4444163125444345856_o.jpg?_nc_cat=103&_nc_sid=0c64ff&_nc_ohc=empRK1Pb1KoAX900cWE&_nc_ht=scontent-arn2-1.xx&tp=6&oh=76e3097e2e0b63b528bc355b9ea07083&oe=5F9BB09B",
  "coverImage": "https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/s720x720/103323620_2607531456165715_1759303419147657987_o.jpg?_nc_cat=100&_nc_sid=dd9801&_nc_ohc=ZfPnPPzbMUEAX-sbjis&_nc_ht=scontent-arn2-2.xx&tp=7&oh=0b2ae55c8118bf0ecdd4839677e1528b&oe=5F9A4ADA"
      },
      "google": {
        "placeId": "ChIJpbpzuV6hU0YRG49xL3Bp8m8",
        "link": "https://maps.google.com/?cid=8066625813127204635",
  "newReviewUrl": "https://search.google.com/local/writereview?placeid=ChIJF9eIJ12dX0YRogcSnTh1G6s",
  "profileImage": "https://lh3.googleusercontent.com/lCki9MaIOKvhpvwBh_AExUE3_liYXv-8vyr2RH4EPrkSt90__vZImAKkzllwq85JV3PZtUxl8dWivdc7=s0",
  "coverImage": "https://lh3.googleusercontent.com/FrmkuiTtzLt8LbiPHHcoJlJtK1Ab21YahnQKRjs-5Nd7cv_yRwigjodcWy59xNE_frU-9dqT90e5WuWd=s0"
      },
    },
    "googleName": "custom google name",
    "facebookName": "custom fb name",
    "wifiSsid": "pinmeto",
    "pendingChanges": {
        "address": {
            "street": "Adelgatan 11"
        },
        "location": {
            "lon": 13.00093,
            "lat": 55.60736
        }
    }
  }
}
```
</details>

## Update a location

#### Endpoint PUT: `/v2/<<account_id>>/locations/YOUR_STORE_ID`

`https://api.pinmeto.com/v2/<<account_id>>/locations/YOUR_STORE_ID`


<details>
<summary><b>List of properties to update</b></summary>
<br> 
<ul>
 <!--li ng-show="customGoogleName"><b>googleName</b>: (String)</li>
	<li ng-show="customFacebookName"><b>facebookName</b>: (String)</li-->
 <li><b>description</b>: (Object)
  <ul>
   <li><b>short</b>: (String, max length 240)</li>
   <li><b>long</b>: (String, max length 750)</li>
  </ul>
 </li>
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
   <li><b>state</b>: (String)</li>
   <li><b>country</b>: (String)</li>
  </ul>
 </li>
 <li><b>permanentlyClosed</b>: (Boolean)</li>
  <li><b>temporarilyClosedUntil</b>: (ISO Date string, YYYY-MM-DD)</li>
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
   <li><b>start</b>: (ISO Date string, YYYY-MM-DD)</li>
   <li><b>end</b>: (ISO Date string, YYYY-MM-DD)</li>
   <li><b>openTime</b>: (String)</li>
   <li><b>closeTime</b>: (String)</li>
   <li><b>isClosed</b>: (Boolean)</li>
  </ul>
 </li>
 <li><b>googleName</b>: (String) - if google custom name is enabled</li>
 <li><b>facebookName</b>: (String) - if facebook custom name is enabled</li>
 <li><b>wifiSsid</b>: (String, max length 32)</li>
 <li><b>customData</b>: (Object, depends on your custom data definition)</li>
</ul>
</details>



<details>
<summary><b>Example of PUT request with access_token in Authorization-header</b></summary>
<br> 


```
PUT /v2/<<account_id>>/locations/YOUR_STORE_ID HTTP/1.1
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
</details>

#### Curl call to update a location

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d 'locationDescriptor'='Malmoe' -d 'specialOpenHours'='[{"start": "2018-12-31","end":"2018-12-31","openTime":"1100", "closeTime": "1500", "isClosed": false, "label":"New Years Eve"}]' \
  https://api.pinmeto.com/v2/<<account_id>>/locations/YOUR_STORE_ID
```

## Create a location

#### Endpoint POST: `/v2/<<account_id>>/locations`

`https://api.pinmeto.com/v2/<<account_id>>/locations`

#### Properties

All properties are optional unless stated otherwise. If an optional property contains <b>required</b> fields, those fields must be included if you wish to include the optional property.

<details>
<summary><b>List of properties</b></summary>
<ul>
 <!--li ng-show="customGoogleName"><b>googleName</b>: (String) <b>required</b></li>
<li ng-show="customFacebookName"><b>facebookName</b>: (String) <b>required</b></li-->
 <li><b>name</b>: (String) <b>required</b></li>
 <li><b>storeId</b>: (String) <b>required</b></li>
 <li><b>description</b>: (Object)
  <ul>
   <li><b>short</b>: (String, max length 240)</li>
   <li><b>long</b>: (String, max length 750)</li>
  </ul>
 </li>
 <li><b style="text-decoration: line-through;">text</b> (deprecated, use shortDescription) : (String)</li>
 <li><b>contact</b>: (Object)
  <ul>
   <li><b>phone</b>: (String)</li>
   <li><b>homepage</b>: (String)</li>
   <li><b>email</b>: (String)</li>
  </ul>
 </li>
 <li><b>address</b>: (Object) <b>required</b>
  <ul>
   <li><b>street</b>: (String) <b>required</b></li>
   <li><b>zip</b>: (String) <b>required</b></li>
   <li><b>city</b>: (String) <b>required</b></li>
   <li><b>state</b>: (String)</li>
   <li><b>country</b>: (String) <b>required</b></li>
  </ul>
 </li>
 <li><b>location</b>: (Object) <b>required</b>
  <ul>
   <li><b>lat</b>: (Number) <b>required</b></li>
   <li><b>lon</b>: (Number) <b>required</b></li>
  </ul>
 </li>
 <li><b>permanentlyClosed</b>: (Boolean)</li>
  <li><b>temporarilyClosedUntil</b>: (ISO Date string, YYYY-MM-DD)</li>
 <li><b>isAlwaysOpen<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.isAlwaysOpen}}"></sup></b>:
  (Boolean)</li>
 <li><b>locationDescriptor</b>: (String)</li>
 <li><b>openHours</b>: (Object)
  <ul>
   <li><b>mon</b>: (Object) <b>required</b>
    <ul>
     <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
      (String) <b>required</b></li>
     <li><b>span</b>: (Array) <b>required</b>
      <ul>
       <li><b>open</b>: (String) <b>required</b></li>
       <li><b>close</b>: (String) <b>required</b></li>
      </ul>
     </li>
    </ul>
   </li>
   <li>...</li>
   <li><b>sun</b>: (Object) <b>required</b>
    <ul>
     <li><b>state<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.openHours}}"></sup></b>:
      (String) <b>required</b></li>
     <li><b>span</b>: (Array) <b>required</b>
      <ul>
       <li><b>open</b>: (String) <b>required</b></li>
       <li><b>close</b>: (String) <b>required</b></li>
      </ul>
     </li>
    </ul>
   </li>
  </ul>
 </li>
 <li><b>specialOpenHours<sup class="fa fa-info-circle fa-info-circle__small" pmt-popover="" popover-body="{{description.specialOpenHours}}"></sup></b>:
  (Array)
  <ul>
   <li><b>label</b>: (String) <b>required</b></li>
   <li><b>start</b>: (ISO Date string, YYYY-MM-DD) <b>required</b></li>
   <li><b>end</b>: (ISO Date string, YYYY-MM-DD) <b>required</b></li>
   <li><b>openTime</b>: (String) <b>required</b></li>
   <li><b>closeTime</b>: (String) <b>required</b></li>
   <li><b>isClosed</b>: (Boolean) <b>required</b></li>
  </ul>
 </li>
 <li><b>googleName</b>: (String) - if google custom name is enabled</li>
 <li><b>facebookName</b>: (String) - if facebook custom name is enabled</li>
 <li><b>wifiSsid</b>: (String, max length 32)</li>
 <li><b>customData</b>: (Object, depends on your custom data definition)</li>
</ul>
</details>


<details>
<summary><b>Example of POST with token in Authorization-header</b></summary>
<br>
	
```
POST /v2/<<account_id>>/locations HTTP/1.1
Authorization: Bearer 77813e40da005550c53bd8e06fc59e8ae76e2694
Host: https://api.pinmeto.com
Content-Type: application/json

Body:
{
 "name": "storeName",
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
</details>

#### Curl call to create a location

```bash
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --data '{ "name": "storeName", "storeId": "0987654", "locationDescriptor": "API locationDescriptor","address": {"street": "testgatan 4","zip": "217 41","city": "Malmö","country": "Sweden"},"location": {"lat": 59.333755678571,"lon": 18.056143908447},"contact": {"phone": "+46 70 2336879","email": "test@pinmeto.com","homepage": "http://www.pinmeto.com"}}' \
  https://api.pinmeto.com/v2/&lt;&lt;account_id&gt;&gt;/locations
```

## "Upsert" a location

If a querystring parameter `upsert=true` is passed to [Create location](#create-a-location) it will check if a location with the storeId in the request body already exists, if it does it will do an update. If the location doesn't exist it will be created.

#### Endpoint POST: `/v2/<<account_id>>/locations?upsert=true`

`https://api.pinmeto.com/v2/<<account_id>>/locations?upsert=true`

## Error Codes

**Create location:**

400: StoreId must be unique

400: (If validation fails there is a number of validation errors that can be returned)

422: Missing required property, expected "${required}" to be present.

500: Location already exists


**Update location:**

400: No properties to update, wrong content-type?

400: (If validation fails there is a number of validation errors that can be returned)

404: No location found


**Get locations:**

404: Site not found


**Get location:**

404: Location with storeId ${storeId} not found


## Changes from v1

<details>
<summary><b>List of changes</b></summary>

<h3>Description</h3>

`shortDescription` and `longDescription` has been moved to a `description` node and renamed to `short` and `long`.

<h3>Pending Changes</h3>

When a location is updated changes to address and location (lat/lon) are put in a pending change state and needs to be reviewed in Listings.

The data returned under `address` and `location` is the values that are presented on the location details in listings, values yet to be applied are returned under the `pendingChanges` node. A change can either be applied or ignored in listings depending on the quality of the data sent.

<h3>Special Open Hours</h3>

`startDate` and `endDate` are now named `start` and `end`, the format has changed to be *YYYY-MM-DD*

<h3>Images</h3>

Links to cover and profile images on facebook & google.

<h3>Foursquare</h3>

Foursquare and Factual have merged. `Foursquare` is removed from `network` since Foursquare no longer has a 2-way API.


If an error not covered by these messages occurs, a status code of 500 will be returned with the message “An error occurred.”

</details>
