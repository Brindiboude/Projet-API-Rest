import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

export default router;