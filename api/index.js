const URLS = {
  RegisterUser: "/auth/register_process",
  LoginUser: "/auth/login_check",
};

const request = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const { status, ok } = response;

  let result;
  if (ok) {
    result = await response.json();
  }

  return {
    status,
    data: result,
  };
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
