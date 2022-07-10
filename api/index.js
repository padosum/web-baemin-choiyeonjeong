const URLS = {
  RegisterUser: "/auth/register_process",
  LoginUser: "/auth/login_check",
};

const request = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(response.status, response.statusText);
    }

    return response.json();
  } catch (err) {
    console.error(err);
    return false;
  }
};

const Api = {
  loginUser(userInfo) {
    return request(URLS.LoginUser, userInfo);
  },
  registerUser(userInfo) {
    return request(URLS.RegisterUser, userInfo);
  },
};

export default Api;
