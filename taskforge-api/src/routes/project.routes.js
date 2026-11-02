import {Router} from "express";
import {createProject, getProjects, getSingleProject, deleteProject, updatedProject, projectSummary, projectTasksHandler} from "../controllers/project.controller.js";


export const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.get("/:id", getSingleProject);
router.get("/:id/summary", projectSummary);
router.patch("/:id", updatedProject);
router.get("/:id/tasks", projectTasksHandler);
router.delete("/:id", deleteProject);

export default router;