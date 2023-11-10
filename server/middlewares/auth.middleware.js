const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (encodedToken) => {
  try {
    const decodedToken = jwt.verify(encodedToken, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

const extractUserId = (token) => {
  if (token && token.userId) {
    return token.userId;
  } else {
    throw new Error("Invalid or missing user id in token");
  }
};

const authVerify = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = verifyToken(token);
    const userId = extractUserId(decodedToken);
    req.user = { userId };
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorised access, please add the token" });
  }
};

module.exports = { authVerify };
