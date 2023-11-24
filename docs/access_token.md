# Authentication API reference

## Recommendations

- An **access token is valid for 1 hour** so *do* cache it

## Obtain a token

Use your credentials shown in Account Settings > API:

- App Id, <<app_id>>
- App Secret, <<app_secret>>

To obtain a token, make a POST request to `https://api.pinmeto.com/oauth/token` (`https://api.test.pinmeto.com/oauth/token` for **test** environment). You need to include your
credentials in the Authorization header (`"Basic " + '<<app id>>:<<app secret>>'`). Make sure to concatenate `app_id:app_secret` and then **base64 encode** it, before concatenating it to `"Basic "`. Pass
`grant_type="client_credentials"` in the request body, for example:

```
POST /oauth/token HTTP/1.1
Host: https://api.pinmeto.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```
These tokens are unique and should be stored securely.

##### Example result

```Javascript
{
  token_type: 'bearer',
  access_token: '3feb95961a4dfbe3277f0c55a8c73eabd29cee7e',
  expires_in: 3600
}
```

### Curl call to get access_token
To quickly validate that your app credentials work, run this curl row in your terminal.
The app_id/app_secret part for a curl call should **not** be concatenated and base64 encoded, just paste them in separated by a colon.

`curl -d "grant_type=client_credentials" --user <<app_id>>:<<app_secret>> https://api.pinmeto.com/oauth/token`

