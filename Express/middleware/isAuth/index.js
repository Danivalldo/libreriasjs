import jwt from "jsonwebtoken";

export const isAuthMiddleware = async (req, res, next) => {
  req.isAuth = false;
  const token = req.get("Authorization");
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
  next();
};

export const login = async (req, res, next) => {
  const { username, pass } = req.body;
  if (username !== "user" || pass !== "1234") {
    return next(new Error("Invalid user"));
  }

  const token = jwt.sign({ username }, process.env.SECRET_TOKEN, {
  });

  debugger;

  res.json({
    token,
  });
};
