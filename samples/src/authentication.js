const getToken = () => {
  const url = `https://api.test.pinmeto.com/oauth/token`;
  const options = {
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    auth: {
      username: "<your_appId>",
      password: "<your_appSecret>",
    },
  };

  return axios.post(url, null, options).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(JSON.stringify(response.body)));
    }
    return response.data.access_token;
  });
};
```
