const axios = require("axios");

const getToken = () => {
  const url = `https://api.test.pinmeto.com/oauth/token`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic <your_base64_encoded_appid_and_appsecret>",
    },
  };

  const data = {
    "grant_type": "client_credentials",
  };

  return axios.post(url, data, options).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(JSON.stringify(response.body)));
    }
    return response.data.access_token;
  });
};
