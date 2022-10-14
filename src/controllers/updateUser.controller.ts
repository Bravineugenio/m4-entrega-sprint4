import { Request, Response } from "express";
import updateUserService from "../services/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedData: any = req.body;

    const user = await updateUserService(id, updatedData);

    return res.status(200).json({ message: "Data updated!" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default updateUserController;
