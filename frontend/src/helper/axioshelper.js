import axios from "axios";

function axiosLogin(userObj, user, navigate) {
  axios
    .post("https://betterbank.herokuapp.com/login", userObj)
    .then((response) => {
      console.log("axios response", response);
      console.log("axios response", response.data.accessToken);

      // Reset context if user already created bc don't want id bug
      user = {};
      user = { ...userObj };

      // Reset localStorage token in case not empty, then add new token
      localStorage.removeItem("token");
      localStorage.removeItem("refresh token");
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refresh token", response.data.refreshToken);
    })
    .then(() => {
      console.log("Successful Login! Navigate to Deposit...");
      navigate(`/deposit/${userObj.id}`, { replace: true });
    })
    .catch((err) => console.error("axios ERROR", err.message));
}

export async function axiosAuthUserTokens({ user = "", token }) {
  console.log("222 axiosAuthUserTokens FUNCTION 222");

  try {
    const response = await axios.post(
      "https://betterbank.herokuapp.com/login",
      { name: "hey" },
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    console.log("axios response", response);
    // setJwt(token);
    return response.json();
    //
  } catch (err) {
    console.error("axios ERROR", err.message);
    return err.message;
  }
}

async function axiosAuthorizeUserTokens({
  user,
  token,
  setJwt,
  setServerDown,
  setShowModal,
  logout,
}) {
  console.log("axiosAuthorizeUserTokens FUNCTION");

  try {
    const response = await axios.post(
      "https://betterbank.herokuapp.com/authorize",
      user,
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    console.log("axios response", response);
    // setJwt(token);
    //
  } catch (err) {
    console.error("axios ERROR", err.message);

    switch (err.message) {
      case "Network Error":
        setServerDown(true);
        break;
      case "Request failed with status code 401":
        const refreshToken = localStorage.getItem("refresh token");
        // If No refresh token either --> Log user out
        if (refreshToken == null || !refreshToken) logout();
        // Else --> Get New Access Token
        _getNewAccessToken(refreshToken, setJwt, setShowModal, logout);
        break;
      case "Request failed with status code 403":
        logout();
        break;
      default:
        // Show NotAuthorized
        setShowModal(true);
    }
  }
}

function _getNewAccessToken(refreshToken, setJwt, setShowModal, logout) {
  axios
    .post("https://betterbank.herokuapp.com/newaccesstoken", {
      token: refreshToken,
    })
    .then((response) => {
      console.log("new accesstoken response", response);
      localStorage.setItem("token", response.data.accessToken);
      setJwt(response.data.accessToken);
    })
    .catch((err) => {
      console.error("new accesstoken Error", err.message);
      if (err.message === "Request failed with status code 403") logout();
      else setShowModal(true);
    });
}

export { axiosLogin, axiosAuthorizeUserTokens };
