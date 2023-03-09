function authenticate()
{
  $appID="APPID";
  $appSecret="APPSECRET";

  $headers = array(
    'Content-Type: application/x-www-form-urlencoded',
    'Authorization: Basic '.base64_encode($appID.':'.$appSecret)
  );

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://api.pinmeto.com/oauth/token");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch, CURLOPT_POST, 1); 
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
  curl_setopt($ch, CURLOPT_TIMEOUT, 20);

  $result=curl_exec($ch);
  curl_close($ch);

  return $result;
}
