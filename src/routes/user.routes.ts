import { Router } from "express";

const routes = Router();

import userCreateController from "../controllers/createUser.controller";
import deleteUserController from "../controllers/deleteUser.controller";
import getAllUsersController from "../controllers/getAllUsers.controller";
import updateUserController from "../controllers/updateUser.controller";
import userLoginController from "../controllers/userLogin.controller";
import verifyDeleteisAdmMiddleware from "../middlewares/deleteIsAdmin.middleware";
import verifyisAdmMiddleware from "../middlewares/isAdmin.middleware";
import verifyAdmUpdateMiddleware from "../middlewares/verifyAdmUpdate.middleware";
import verifyIDMiddleware from "../middlewares/verifyId.middleware";

routes.post("/users", userCreateController);
routes.post("/login", userLoginController);
routes.get("/users", verifyisAdmMiddleware, getAllUsersController);
routes.patch("/users/:id", verifyAdmUpdateMiddleware, updateUserController);
routes.delete(
  "/users/:id",
  verifyDeleteisAdmMiddleware,
  verifyisAdmMiddleware,
  verifyIDMiddleware,
  deleteUserController
);

export default routes;

//verifyisAdmMiddleware, verifyIDMiddleware
