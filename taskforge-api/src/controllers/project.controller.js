import * as projectService from "../services/project.service.js";
import { users } from "../data/data.js";


// Get all projects

export async function getProjects(req, res){
    const projects = await projectService.getAllProjects();

    res.status(200).json(projects);
}

// Get one Project 

export async function getSingleProject(req, res){
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({ 
            message: "Invalid project ID"
        });
    }
   
    const project = await projectService.getProjectsById(id);
    
    if(!project){
        return res.status(404).json({
            message: "Project not found"
        });
    }
    res.status(200).json(project);

}


// Create a new project
export async function createProject(req, res) {
    const { name, description, ownerId, status } = req.body ?? {};

    if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        //typeof ownerId !== Number ||        
        !name.trim() ||
        !description.trim() 
        
    ) {
        return res.status(400).json({
            message: "Invalid project data"
        });
    }

    // check if user exit
    
    const userExit = users.some(user => user.id === ownerId);
    if (!userExit) {
        return res.status(400).json({
            message: "User does not exists"
        });
    }

    const project = await projectService.createProject({ 
        name: name.trim(), 
        description: description.trim(),
        ownerId: ownerId,          
        status: status 
    });

    res.status(201).json({
        message: "Project created successfully",
        project
    });
}



// delete project

export async function deleteProject(req, res) {
    const projectId = Number(req.params.id);
    const deletedProject = await projectService.toDeleteProject(projectId);

    if(!deletedProject){
        return res.status(404).json({
            message: "Project not found"
        });
    }

    return res.json({
        message: "Project deleted successfully",
        project: deletedProject
    });
    
}



// to update project

export async function updatedProject(req, res) {
    
    const id = Number (req.params.id);
    const updateData = req.body;

    const result = await projectService.projectUpdate(id, updateData);

    if(!result){
        return res.status(404).json({
            message: "Project not found"
        });
    }
    
    return res.status(200).json({
        message: "Project updated successfully",
        project: result.updatedProject
       
    })
}

// projectTasksHandler

export async function projectTasksHandler(req, res) {
    const id = Number (req.params.id);
    const tasks = await projectService.projectTasks(id);

    if(!tasks){
        return res.status(404).json({
            message: "Project not found"
        });
    }
    
    return res.status(200).json({tasks});
}


// Summary

export async function projectSummary(req, res) {
    const {id} = req.params;
    const summary = await projectService.getProjectSummary(id);

    if(!summary){
        return res.status(404).json({
            message: "Project not found"
        });
    }

    return res.status(200).json(summary);
    
}