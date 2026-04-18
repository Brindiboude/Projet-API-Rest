import { Router } from "express";
import * as movieController from "../controllers/movieController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/search", authenticate, movieController.searchMovies);
router.get("/", authenticate, movieController.getAllMovies);
router.get("/:id", authenticate, movieController.getMovieById);
router.post("/", authenticate, movieController.createMovie);
router.put("/:id", authenticate, movieController.updateMovie);
router.delete("/:id", authenticate, movieController.deleteMovie);

export default router;
