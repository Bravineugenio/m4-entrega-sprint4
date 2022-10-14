import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyisAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (decoded.isAdm == true) {
        next();
      }
      if (decoded.isAdm == false) {
        res.status(403).json({ message: "Unauthorized" });
      }
    }
  );
};

export default verifyisAdmMiddleware;
