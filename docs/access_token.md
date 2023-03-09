# Access tokens
**The access_token expires after 1 hour**

## Obtain a token

To obtain a token you POST to `https://api.pinmeto.com/oauth/token` (`https://api.test.pinmeto.com/oauth/token` for **test** environment). You need to include your
credentials in the Authorization header (`"Basic " + '<<app id>>:<<app secret>>'`), make sure to concatenate and then base64 encode the app_id:app_secret. Pass
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

