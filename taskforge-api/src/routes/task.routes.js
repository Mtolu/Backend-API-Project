import {Router} from "express";
import {createTask, getTasks, getSingleTask, deleteTask, updatedTask, TasksHanler} from "../controllers/task.controller.js";


const router = Router();

router.get("/", getTasks, TasksHanler);
router.get("/", TasksHanler);
router.get("/tasks", TasksHanler);
router.get("/", TasksHanler);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updatedTask);
router.delete("/:id", deleteTask);

export default router;