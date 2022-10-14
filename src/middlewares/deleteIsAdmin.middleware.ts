import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyDeleteisAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository
    .createQueryBuilder("user")
    .select([
      "user.name",
      "user.email",
      "user.isAdm",
      "user.isActive",
      "user.id",
      "user.createdAt",
      "user.updatedAt",
    ])
    .withDeleted()
    .getMany();
  const account = users.find((user) => user.id === id);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (decoded.isActive === true) {
        next();
      }
      if (decoded.isActive === false) {
        res.status(404).json({ message: "Unauthorized" });
      }
      if (account?.isActive === false) {
        res.status(400).json({ message: "Unauthorized" });
      }
    }
  );
};

export default verifyDeleteisAdmMiddleware;
