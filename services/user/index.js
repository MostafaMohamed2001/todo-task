module.exports = {
  registerUser: require("./register.service"),
  loginUser: require("./login.service"),
  logoutUser: require("./logout.service"),
  refreshAccessToken: require("./refresh.service"),
  profile: require("./profile.service"),
  protect: require("./protect.service"),
};
