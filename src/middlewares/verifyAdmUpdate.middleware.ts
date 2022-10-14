import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAdmUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const token = req.headers.authorization?.split(' ')[1]

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
    
      if (decoded!.isAdm === true && decoded!.id === id) {
        next();
      }
      if (decoded!.isAdm === true && decoded!.id !== id) {
        next();
      }
      if (decoded!.isAdm === false && decoded!.id === id) {
        next();
      }
      if (decoded!.isAdm === false && decoded!.id !== id) {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  );
};

export default verifyAdmUpdateMiddleware;
