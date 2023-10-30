import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const isAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.userId = false;
  const token = req.get("Authorization");
  try {
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decodedToken) {
      if (typeof decodedToken === "string") {
        throw new Error();
      }
      req.userId = decodedToken.userId;
    }
  } catch (err) {
  } finally {
    next();
  }
};
