import { Request, Response } from "express";
import getAllUsersService from "../services/getAllUsers.service";

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();

    return res.send(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default getAllUsersController;
