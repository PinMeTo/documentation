# Posts API

**Please note those API endpoints will only work in Test environment at this time of writing, and this document will keep updating.**

* Test: `https://api.test.pinmeto.com`
 
In order to use this API, you need to first prepare image and text.
Then get the correct location information from listing API, three fields are
mandatory: `locationId`, `name`, `locationDescriptor`

Basic steps are:

1. Authentication
2. Publish post
3. Get post data, optional
4. Delete post, optional

## 1. Authentication

Firstly, please create an app with **location create** permissions in account settings.

Secondly, follow [this document](https://github.com/PinMeTo/documentation/blob/master/docs/access_token.md) to get
access token. Please be aware that this token is only valid for an hour so cache and refresh it whenever necessary

Every API call will require Bearer token in headers,
i.e. `Authorization: Bearer 4bdb85323e1a7525e0123456789abc`

## 2. Publish the post

Google Posts are divided into two different types: Update and offer.

You can add multiple locations at once, in this example we would like to publish a post to PinMeTo Bangkok and Helsinki.

* POST `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/publish`
* query parameter: `site` your site name

### Request body - Google Update

```json
{
    "name": "test",
    "locations": [
        {
            "locationId": "5bd2f55c6d85d227e53121f4",
            "name": "PinMeTo",
            "locationDescriptor": "Bangkok"
        },
        {
            "locationId": "5e2721ef0f67ee1803feccaa",
            "name": "PinMeTo",
            "locationDescriptor": "Helsinki"
        }
    ],
    "source": "pinmeto",
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
        "message": "Hey there!",
        "callToAction": {
            "actionType": "None",
            "url": null
        },
        "languageCode": "sv"
    }
}
```

Call to Actions could be chosen from the following variants:

* None: no CTA
* Call Now: actionType:`Call`
* Learn more: actionType: `LearnMore` and your url
* Book: actionType `Book` and your url
* Sign up: actionType `SignUp` and your url
* Buy: actionType `Shop` and your url
* Order online: actionType `Order` and your url

### Request body - Google offer

```json
{
    "name": "test",
    "locations": [
        {
            "locationId": "5bd2f55c6d85d227e53121f4",
            "name": "PinMeTo",
            "locationDescriptor": "Bangkok"
        },
        {
            "locationId": "5e2721ef0f67ee1803feccaa",
            "name": "PinMeTo",
            "locationDescriptor": "Helsinki"
        }
    ],
    "source": "pinmeto",
    "googlePostData": {
        "offerData": {
            "title": "offer title",
            "startDate": "2024-06-10T10:00:00.000Z",
            "endDate": "2024-06-26T10:00:00.000Z",
            "url": "Redeem Online URL optional",
            "coupon": "coupon code - optional",
            "terms": "Terms and Conditions optional"
        },
        "message": "offer details",
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

* startDate and endDate are **UTC**

### Response

Field `_id` is a unique ID that will be used for future reference. This post will be published asynchronously.

```json
{
    "success": true,
    "data": {
        "createdBy": {
            "name": "SpiderAds ",
            "email": "api@pinmeto.com",
            "userId": "666c03f24c478a0492aab9db"
        },
        "publishedBy": {
            "name": "SpiderAds ",
            "email": "api@pinmeto.com",
            "userId": "666c03f24c478a0492aab9db"
        },
        "deletedBy": {
            "name": "",
            "email": ""
        },
        "status": "published",
        "publishDate": "2024-06-17T12:01:56.006Z",
        "scheduledDate": null,
        "source": "pinmeto",
        "copyFrom": null,
        "sentEmails": [],
        "_id": "667025b48629a192fc976ae3",
        "name": "direct test",
        "locations": [
            {
                "locationId": "5bd2f55c6d85d227e53121f4",
                "name": "PinMeTo",
                "locationDescriptor": "Bangkok"
            }
        ],
        "googlePostData": {
            "callToAction": {
                "actionType": "None",
                "url": null
            },
            "message": "Hey there!",
            "topicType": "Standard",
            "images": [
                {
                    "previewUrl": "https://example.com/.png",
                    "name": "",
                    "url": "https://example.com/.png",
                    "meta": {
                        "width": 971,
                        "height": 971,
                        "format": "jpeg"
                    },
                    "fileSize": 114024
                }
            ],
            "languageCode": "sv"
        },
        "siteName": "pinmeto",
        "postsStatusSummary": [],
        "brandpages": [],
        "createdAt": "2024-06-17T12:01:56.020Z",
        "updatedAt": "2024-06-17T12:01:56.020Z",
        "__v": 0,
        "id": "667025b48629a192fc976ae3"
    }
}
```

## 3. Get post information

* GET `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/:id`
* query parameter: `id` the id of this post
* query parameter: `site` your site name

### Response

```json
{
    "success": true,
    "data": {
        "_id": "667025b48629a192fc976ae3",
        "createdBy": {
            "name": "SpiderAds ",
            "email": "api@pinmeto.com",
            "userId": "666c03f24c478a0492aab9db"
        },
        "publishedBy": {
            "name": "SpiderAds ",
            "email": "api@pinmeto.com",
            "userId": "666c03f24c478a0492aab9db"
        },
        "deletedBy": {
            "name": "Benny Liu",
            "email": "benny.liu@pinmeto.com"
        },
        "status": "published",
        "publishDate": null,
        "scheduledDate": null,
        "source": "pinmeto",
        "copyFrom": null,
        "sentEmails": [],
        "name": "test",
        "locations": [
            {
                "locationId": "5bd2f55c6d85d227e53121f4",
                "name": "PinMeTo",
                "locationDescriptor": "Bangkok"
            },
            {
                "locationId": "5e2721ef0f67ee1803feccaa",
                "name": "PinMeTo",
                "locationDescriptor": "Helsinki"
            }
        ],
        "googlePostData": {
            "callToAction": {
                "actionType": "None",
                "url": null
            },
            "message": "Hey there!",
            "topicType": "Standard",
            "images": [
                {
                    "previewUrl": "https://example.com/1.png",
                    "name": "",
                    "url": "https://example.com/1.png",
                    "meta": {
                        "width": 971,
                        "height": 971,
                        "format": "jpeg"
                    },
                    "fileSize": 114024
                }
            ],
            "languageCode": "sv"
        },
        "siteName": "pinmeto",
        "postsStatusSummary": [
            {
                "postId": "667025b48629a192fc976af4",
                "postType": "location",
                "locationId": "5bd2f55c6d85d227e53121f4",
                "status": "published"
            }
        ],
        "brandpages": [],
        "createdAt": "2024-06-17T12:01:56.020Z",
        "updatedAt": "2024-06-17T12:02:39.491Z",
        "__v": 0,
        "canEdit": false
    }
}
```

## 4. Delete post

* DELETE `https://api.test.pinmeto.com/posts/v3/:site/locationPosts/:id`
* query parameters: the `id` of the post you want to delete
* query parameter: `site` your site name

### Request body

if you want to delete all locations, in this example, Bangkok and Helsinki, don't set request body.

if you want to delete only one or some of it, first use get posts API to get `postsStatusSummary`, i.e.

```json
{
    "postsStatusSummary": [
        {
            "postId": "666aa3d5b3b705ade982048b",
            "postType": "location",
            "locationId": "5bd2f55c6d85d227e53121f4",
            "status": "published"
        }
    ]
}
```

then, include  `postId`(**not** `locationId`) with your delete request.

```json
{
    "postIds": [
        "666aa3d5b3b705ade982048b"
    ]
}
```

### Response

```json
{
    "success": true,
    "data": {
        "deleted": 1
    }
}
```

## 5. Appendix
### location selector API
This API can help you to obtain a list of locaitons which is available for posting
* GET `https://api.test.pinmeto.com/posts/v3/:site/google/locationselector`
* query parameter: `site` your site name

It will return two fieds: `data` which is available for posting, `unselectables` unavailable locations

### Image specifications

* Image format has to be JPG or PNG
* Image has to be minimum 250x250 pixels
* Image file size must be at least 10240 bytes
