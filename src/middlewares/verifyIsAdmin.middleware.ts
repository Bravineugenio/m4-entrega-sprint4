import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyisAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.isAdm == true) {
    next();
  }
  if (req.user.isAdm == false) {
    res.status(403).json({ message: "Unauthorized" });
  }
};

export default verifyisAdmMiddleware;
