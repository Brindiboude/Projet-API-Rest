import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.post("/", authenticate, userController.createUser);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
