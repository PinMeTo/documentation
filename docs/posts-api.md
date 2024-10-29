# Posts API

**Please note those API endpoints will only work in Test environment at this time of writing, and this document will keep updating.**

- Test: `https://api.test.pinmeto.com`

In order to publish a google post, you need to first prepare image and text.
And get the correct location `storeId` from the locations API.

Basic steps are:

1. Authentication
2. Get available location list and choose one or more locations (with storeId)
3. Publish post to the chosen locations
4. Edit message, images, or offerData of the published post, optional
5. Get post data, optional
6. Delete post, optional

## 1. Authentication

Firstly, please create an app with **location create** permissions in account settings.

Secondly, follow [this document](https://github.com/PinMeTo/documentation/blob/master/docs/access_token.md) to get
access token. Please be aware that this token is only valid for an hour so cache and refresh it whenever necessary

Every API call will require Bearer token in headers,
i.e. `Authorization: Bearer 4bdb85323e1a7525e0123456789abc`

## 2. Publish the post

Google Posts are divided into two different types: Update and offer.

You can add multiple locations at once, in this example we would like to publish a post to PinMeTo Bangkok and Helsinki.

- POST `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/publish`
- query parameter: `site` your site name

### Request body - Google Update
* message: maximum 1500 characters

```json
{
  "name": "test",
  "locations": [
    {
      "storeId": "66"
    },
    {
      "storeId": "67"
    }
  ],
  "googlePostData": {
    "images": [
      {
        "previewUrl": "https://example.com/1.jpg",
        "url": "https://example.com/1.jpg",
        "meta": {
          "width": 971,
          "height": 971,
          "format": "jpeg"
        },
        "fileSize": 114024
      }
    ],
    "topicType": "Standard",
    "message": "message, 1500 chars max",
    "callToAction": {
      "actionType": "None",
      "url": null
    },
    "languageCode": "sv"
  }
}
```

Call to Actions could be chosen from the following variants:

- None: no CTA
- Call Now: actionType:`Call`
- Learn more: actionType: `LearnMore` and your url
- Book: actionType `Book` and your url
- Sign up: actionType `SignUp` and your url
- Buy: actionType `Shop` and your url
- Order online: actionType `Order` and your url

### Request body - Google offer
* offer title: maximum 58 characters
* message: maximum 1500 characters
* coupoun code: maximum 56 characters
* terms: maximum 5000 characters
* **`startDate` and `endDate`**:
Google use local time corresponding to the location when publishing post. Hence when you set the startDate and endDate, please attach
`startDateOffset` and `endDateOffset`, which are `timeZoneOffset` of the user. For example, if the utc time of the user is `2023-05-08T22:00:00.000Z` in Sweden (whose timeZoneOffset is -120), send the `startDateOffset` and `endDateOffset` as `-120`. So that on Google, the date will be on `2023-05-09 00:00:00` for Swedish people.
  
```json
{
  "name": "test",
  "locations": [
    {
      "storeId": "66"
    }
  ],
  "googlePostData": {
    "offerData": {
      "title": "offer title, required, 58 chars max",
      "startDate": "2024-06-10T10:00:00.000Z",
      "startDateOffset": -120,
      "endDate": "2024-06-26T10:00:00.000Z",
      "endDateOffset": -120,
      "url": "Redeem Online URL, optional",
      "coupon": "coupon code, optional, 56 chars max",
      "terms": "Terms and Conditions, optional, 5000 chars max"
    },
    "message": "offer details, 1500 chars max",
    "topicType": "Offer",
    "images": [
      {
        "previewUrl": "https://example.com/1.jpg",
        "url": "https://example.com/1.jpg",
        "meta": {
          "width": 971,
          "height": 971,
          "format": "jpeg"
        },
        "fileSize": 114024
      }
    ],
    "languageCode": "sv"
  }
}
```

- startDate and endDate are **UTC**

### Response

Field `id` is a unique ID that will be used for future reference. This post will be published asynchronously.

```json
{
	"id": "66a758f70981f30e6e48cd8b",
	"status": "processing",
	"publishDate": "2024-07-29T08:55:19.330Z",
	"scheduledDate": null,
	"createdAt": "2024-07-29T08:55:19.376Z",
	"updatedAt": "2024-07-29T08:55:19.376Z",
	"name": "test",
	"siteName": "pinmeto",
	"locations": [
		{
			"storeId": "66",
			"name": "PinMeTo",
			"locationDescriptor": "Bangkok"
		}
	],
	"brandpages": [],
	"postsStatusSummary": [],
	"googlePostData": {
		"callToAction": {
			"actionType": "None",
			"url": null
		},
		"message": "message1x",
		"topicType": "Standard",
		"images": [
			{
				"previewUrl": "https://example.com/1.jpg",
				"name": "",
				"url": "https://example.com/1.jpg",
				"meta": {
					"width": 971,
					"height": 971,
					"format": "jpeg"
				},
				"fileSize": 114024
			}
		],
		"languageCode": "sv"
	}
}
```

## 3. Get post information

- GET `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/:id`
- query parameter: `id` the id of this post
- query parameter: `site` your site name

### Response

```json
{
	"id": "66a23f5c0c494e69199f84f8",
	"status": "published",
	"publishDate": "2024-07-25T12:04:44.128Z",
	"scheduledDate": null,
	"createdAt": "2024-07-25T12:04:44.160Z",
	"updatedAt": "2024-07-25T12:04:44.191Z",
	"name": "test",
	"siteName": "pinmeto",
	"locations": [
		{
			"storeId": "66",
			"name": "PinMeTo",
			"locationDescriptor": "Bangkok"
		}
	],
	"brandpages": [],
	"postsStatusSummary": [
		{
			"postId": "66a23f5c0c494e69199f8509",
			"postType": "location",
			"storeId": "66",
			"status": "notPublished"
		}
	],
	"googlePostData": {
		"callToAction": {
			"actionType": "None",
			"url": null
		},
		"message": "message, 1500 ch max",
		"topicType": "Standard",
		"images": [
			{
				"previewUrl": "https://example.com/1.jpg",
				"name": "",
				"url": "https://example.com/1.jpg",
				"meta": {
					"width": 971,
					"height": 971,
					"format": "jpeg"
				},
				"fileSize": 114024
			}
		],
		"languageCode": "sv"
	}
}
```

## 4. Edit Published Post 
- POST `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/:id/editPublished`
- query parameters: the `id` of the post you want to update
- query parameter: `site` your site name

Send the whole locationPost object to the API, including the fields that not to change. 
Allow to edit fields: name, `message`, `languageCode`, `images` and `offerData`. Don't change `topicType`. Changing from "Offer" to "Update" is not allowed.
And the api is only avaible after the post is published. If the post is still `processing`, wait untill it's `published`.

### Example Request body - Google offer
```json
{
  "name": "[updated] test",
  "locations": [
    {
      "storeId": "66"
    }
  ],
  "googlePostData": {
    "offerData": {
      "title": "[updated] offer title, required, 58 chars max",
      "startDate": "2024-06-10T10:00:00.000Z",
      "endDate": "2024-06-26T10:00:00.000Z",
      "url": "[updated] Redeem Online URL, optional",
      "coupon": "[updated] coupon code",
      "terms": "[updated] Terms and Conditions, optional, 5000 chars max"
    },
    "message": "[updated] offer details, 1500 chars max",
    "topicType": "Offer",
    "images": [
      {
        "previewUrl": "https://example.com/1-[updated].jpg",
        "url": "https://example.com/1-[updated].jpg",
        "meta": {
          "width": 971,
          "height": 971,
          "format": "jpeg"
        },
        "fileSize": 114024
      }
    ],
    "languageCode": "sv"
  }
}
```
### Example Response body - Google offer
```json
{
	"id": "66a758f70981f30e6e48cd8b",
	"status": "processing",
	"publishDate": "2024-07-29T08:55:19.330Z",
	"scheduledDate": null,
	"createdAt": "2024-07-29T08:55:19.376Z",
	"updatedAt": "2024-09-27T08:55:19.376Z",
	"name": "test",
	"siteName": "pinmeto",
	"locations": [
		{
			"storeId": "66",
			"name": "PinMeTo",
			"locationDescriptor": "Bangkok"
		}
	],
	"brandpages": [],
	"postsStatusSummary": [],
	"googlePostData": {
		"callToAction": {
			"actionType": "None",
			"url": null
		},
		"message": "[updated] offer details, 1500 chars max",
		"topicType": "Offer",
		"images": [
		      {
		        "previewUrl": "https://example.com/1-[updated].jpg",
		        "url": "https://example.com/1-[updated].jpg",
		        "meta": {
		          "width": 971,
		          "height": 971,
		          "format": "jpeg"
		        },
		        "fileSize": 114024
		      }
		    ],
		"offerData": {
		      "title": "[updated] offer title, required, 58 chars max",
		      "startDate": "2024-06-10T10:00:00.000Z",
		      "endDate": "2024-06-26T10:00:00.000Z",
		      "url": "[updated] Redeem Online URL, optional",
		      "coupon": "[updated] coupon code",
		      "terms": "[updated] Terms and Conditions, optional, 5000 chars max"
		    },
		"languageCode": "sv"
	}
}
```


## 5. Delete post

- DELETE `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/:id`
- query parameters: the `id` of the post you want to delete
- query parameter: `site` your site name

### Request body

if you want to delete all locations, in this example, Bangkok and Helsinki, don't set request body.

if you want to delete only one or some of it, first use get posts API to get `postsStatusSummary`, i.e.

```json
{
  "postsStatusSummary": [
    {
			"postId": "66a23f5c0c494e69199f8509",
			"postType": "location",
			"storeId": "66",
			"status": "notPublished"
		}
  ]
}
```

then, include `postId` with your delete request.

```json
{
  "postIds": ["666aa3d5b3b705ade982048b"]
}
```

### Response

```json
{
  "deleted": 1
}
```

## 6. Get Posts List
- GET `https://api.test.pinmeto.com/posts/v3/:site/locationPosts?pageSize=100&filter={"filterDefinition":[{"property":"storeIds","value":["66"]}]}`
- params: `pageSize` the size of each page, default is 100.
- params: `offset` is the size of the skipped post list.
- params: `filter` get filtered result by filterDefinition.
`filter` is a json string, it has a structure like this:

```json
{
  "filterDefinition": [
	{
 		"property":  "storeIds",    // filter the query result by this property
		"value":     ["66"]         // the value list to filter out the query result
	}
  ]
}
```


### Response

```json
{
  "data": [
    {
      "id": "6708e58d4944e1d8138f99dc",
      "status": "published",
      "publishDate": "2024-10-11T08:46:56.657Z",
      "scheduledDate": null,
      "createdAt": "2024-10-11T08:45:01.363Z",
      "updatedAt": "2024-10-11T08:46:56.657Z",
      "name": "test google offer",
      "siteName": "pinmeto",
      "locations": 1,
      "brandpages": 0,
      "postsStatusSummary": [
        {
          "postId": "6708e58d4944e1d8138f99df",
          "postType": "location",
          "storeId": "66",
          "status": "published"
        }
      ],
      "googlePostData": {
        "languageCode": "sv",
        "message": "offer details",
        "callToAction": {
          "actionType": "None"
        },
        "images": [
          {
            "url": "https://www.example.com/img/sample.png",
            "previewUrl": null,
            "name": "sample image",
            "meta": {
              "format": "png"
            }
          }
        ],
        "topicType": "Offer",
        "offerData": {
          "title": "Offer title",
          "startDate": "2025-06-10T22:00:00.000Z",
          "startDateOffset": -120,
          "endDate": "2025-06-25T22:00:00.000Z",
          "endDateOffset": -120,
          "url": "https://www.pinmeto.com/our-offer",
          "terms": "Terms and Conditions, optional, 5000 chars max",
          "coupon": "coupon-code"
        }
      }
    }
  ],
  "sortBy": "createdAt",
  "sortDesc": true,
  "pagination": {
    "total": 220,
    "size": 100,
    "nextOffset": 100
  }
}
```

## 7. Get the posts list of the locationPost
- GET `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/:id/posts`


### Response

```json
{
  "data": [
    {
      "id": "6720d21a3e08a89028a0e764",
      "locationPostId": "6720d21a3e08a89028a0e761",
      "postType": "location",
      "siteName": "pinmeto",
      "storeId": "66",
      "name": "PinMeTo",
      "locationDescriptor": "Bangkok",
      "edit": false,
      "google": {
        "error": {
          "numberOfTries": 0,
          "errorDate": null
        },
        "status": "published",
        "post": {
	      "name": "accounts/109521985373058355621/locations/12101883566920497897/localPosts/5960109214985150895",
	      "postId": "locations/12101883566920497897/localPosts/5960109214985150895",
	      "languageCode": "sv",
	      "summary": "offer details, 1500 chars max",
	      "createTime": "2024-10-28T14:31:55.603421Z",
	      "updateTime": "2024-10-28T14:31:55.603421Z",
	      "state": "LIVE",
	      "searchUrl": "https://local.google.com/place?id=9265023520374253951&use=posts&lpsid=CIHM0ogKEICAgIDX8fag8AE"
	},
        "postMessage": "offer details, 1500 chars max",
        "publishDate": "2024-10-29T12:16:26.567Z",
        "deletedDate": null
      },
      "createdAt": "2024-10-29T12:16:26.568Z",
      "updatedAt": "2024-10-29T12:16:26.615Z"
    }
  ]
}
```
If the `locationPost` is still in `processing`, the `google.post` field of the post would be en empty object. Once it's published, 
the fields in `google.post` would be filled with data from Google.   
`google.post.name`: is the unique key of the localPost on Google.  
`searchUrl`: is the link to the localPost on Google.

If the post isn't published successfully on Google, `google.post` would keep in empty. And `google.status` would be in `error` state, 
`google.error` would be the error details.

## 8. Appendix

### location selector API

This API can help you to obtain a list of locaitons which is available for posting

- GET `https://api.test.pinmeto.com/posts/v3/:site/google/locations`
- query parameter: `site` your site name

It will return two fieds: `data` which is available for posting, `unselectables` unavailable locations
```json
{
  "data": [
    {
      "storeId": "1337",
      "name": "PinMeTo",
      "locationDescriptor": "Malmö",
      "street": "Adelgatan 9",
      "zip": "211 22",
      "city": "Malmö",
      "state": "Skåne County",
      "country": "Sweden",
      "created": "2015-07-24T12:57:12.000Z"
    }
  ],
  "unselectables": [
    {
      "storeId": "1338",
      "name": "PinMeTo",
      "locationDescriptor": "Ö-kontoret.",
      "street": "Båtbyggaregatan 189",
      "zip": "216 42",
      "city": "Malmö",
      "state": "",
      "country": "Sweden",
      "created": "2015-07-24T12:57:12.000Z",
      "reason": "Location is not claimed on Google"
    }
  ]
}

```
### Image specifications

- Image format has to be JPG or PNG
- Image has to be minimum 250x250 pixels
- Image file size must be at least 10240 bytes
