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

export const login = async (req, res, next) => {
  const { username, pass } = req.body;
  if (!username || !pass) {
    return res.sendStatus(400);
  }
  if (username !== "user" || pass !== "1234") {
    return res.sendStatus(400);
  }

  const token = jwt.sign({ username }, process.env.SECRET_TOKEN);

  sessions.push({
    username,
    token,
  });

  debugger;

  res.json({
    token,
  });
};
