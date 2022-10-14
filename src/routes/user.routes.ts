import { Router } from "express";

const routes = Router();

import userCreateController from "../controllers/createUser.controller";
import deleteUserController from "../controllers/deleteUser.controller";
import getAllUsersController from "../controllers/getAllUsers.controller";
import updateUserController from "../controllers/updateUser.controller";
import userLoginController from "../controllers/userLogin.controller";

import verifyisActiveMiddleware from "../middlewares/verifyIsActive.middleware";
import verifyisAdmMiddleware from "../middlewares/verifyIsAdmin.middleware";
import verifyAdmUpdateMiddleware from "../middlewares/verifyAdmUpdate.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

routes.post("/users", userCreateController);
routes.post("/login", userLoginController);
routes.get(
  "/users",
  ensureAuthMiddleware,
  verifyisAdmMiddleware,
  getAllUsersController
);
routes.patch(
  "/users/:id",
  ensureAuthMiddleware,
  verifyAdmUpdateMiddleware,
  updateUserController
);
routes.delete(
  "/users/:id",
  ensureAuthMiddleware,
  verifyisAdmMiddleware,
  verifyisActiveMiddleware,
  deleteUserController
);

export default routes;

//verifyisAdmMiddleware, verifyIDMiddleware
