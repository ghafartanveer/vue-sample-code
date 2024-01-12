class TokenService {
  // Update these values as per the Response, "refreshToken" & "accessToken"
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    // return user?.refreshToken;
    return user?.token;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    // return user?.accessToken;
    return user?.token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    // user.accessToken = token;
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
