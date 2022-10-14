import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyIDMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

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
  if (account?.id !== id) {
    res.status(404).json({ message: "Unauthorized" });
  }
  if (account?.id === id) {
    next();
  }
};

export default verifyIDMiddleware;
