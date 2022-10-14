import { Request, Response } from "express";
import userCreateService from "../services/createUser.service";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm, createdAt, updatedAt } = req.body;

    const newUser = await userCreateService({
      name,
      email,
      password,
      isAdm,
      createdAt,
      updatedAt,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userCreateController;
