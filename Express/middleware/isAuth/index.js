import jwt from "jsonwebtoken";

export const isAuthMiddleware = async (req, res, next) => {
  req.userId = false;
  const token = req.get("Authorization");
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decodedToken) {
      req.userId = decodedToken.userId;
    }
  } catch (err) {
  } finally {
    next();
  }
};
