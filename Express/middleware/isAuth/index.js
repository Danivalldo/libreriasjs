import jwt from "jsonwebtoken";

export const isAuthMiddleware = async (req, res, next) => {
  req.isAuth = false;
  const token = req.get("Authorization");
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decodedToken) {
      req.isAuth = true;
      req.username = decodedToken.username;
    }
  } catch (err) {
  } finally {
    next();
  }
};
