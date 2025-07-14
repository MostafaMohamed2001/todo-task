const jwt = require("jsonwebtoken");
const setRefreshTokenCookie = require("./set-refresh-token-cookie");

const generateTokens = ({ res, userId }) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    }
  );

  setRefreshTokenCookie({ res, refreshToken });

  return { accessToken };
};

module.exports = generateTokens;