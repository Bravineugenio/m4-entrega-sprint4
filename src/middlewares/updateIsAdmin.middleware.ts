import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyUpdateisAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  //   if (!id) {
  //     return res.status(401).json({ message: "Invalid id" });
  //   }

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const account = users.find((user) => user.isAdm === false);

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      console.log("---------------------", decoded, id);
      let teste = jwt.decode(token);
      console.log(teste);

      if (decoded.isAdm == true) {
        next();
      }
      if (decoded.id === id) {
        next();
      }
      if (decoded.isAdm == false || decoded.id !== id) {
        res.json({ message: "Unauthorized" });
      }
    }
  );
};

export default verifyUpdateisAdmMiddleware;
