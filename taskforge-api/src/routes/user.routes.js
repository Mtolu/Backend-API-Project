import { Router } from "express";
import { createUser, getUsers, getSingleUser, deleteUser, updatedUser, userTasksHandler, userFilterHandler } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/", userFilterHandler);
router.post("/", createUser);
router.get("/:id", getSingleUser);
router.get("/:id/tasks", userTasksHandler);
router.patch("/:id", updatedUser);
router.delete("/:id", deleteUser);

export default router;