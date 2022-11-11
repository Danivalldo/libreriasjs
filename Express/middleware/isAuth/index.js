import jwt from "jsonwebtoken";

export const isAuthMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  req.isAuth = false;
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next();
  }
  let decodedToken = undefined;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  } catch (err) {
    return next();
  }
  if (!decodedToken) {
    return next();
  }
  req.isAuth = true;
};
