import * as taskService from "../services/task.service.js";
import {users, projects} from "../data/data.js"
// Get all tasks
export async function getTasks(req, res) {
    const tasks = await taskService.getAllTasks();

    res.status(200).json(tasks);
}

// Get one task
export async function getSingleTask(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const task = await taskService.getTaskById(id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task)
}

// Create a new task
export async function createTask(req, res) {
    const { title, description, projectId, assignedTo, priority, status } = req.body ?? {};

    if(
        typeof title !== "string" ||
        typeof description !== "string" ||
        //typeof projectId !== Number ||
        //typeof assignedTo !== ("optional") ||
        typeof priority !== "string" 
        //typeof status !== "string"
    ) {
        return res.status(400).json({
            message: "Invalid task data"
        });
    }

    //projectId and assigned User exist
      const id = Number(projectId)
      const projectidExit = projects.some(project => project.id === id);

        if (!projectidExit) {
            return res.status(400).json({
                message: "Project does not exists"
            });
        }

        let userId = null;
        if(assignedTo !== undefined && assignedTo !== null){
            userId = Number(assignedTo);
        
          const userExit = users.some(user => user.id === userId);
            if (!userExit) {
                return res.status(400).json({
                    message: "This User does not exists"
                });
            }
        }

    const task = await taskService.createTask({
        title: title.trim(),
        description: description.trim(),    
        projectId: projectId,
        assignedTo: assignedTo,
        priority: priority.trim(),
        status: status
    });

    res.status(201).json({
        message: "Task created successfully",
        task
    });
}



// delete

export async function deleteTask(req, res) {
    const taskId = Number(req.params.id);
    const deletedTask = await taskService.toDeleteTask(taskId);

    if(!deletedTask){
        return res.status(404).json({
            message: "Task not found"
        });
    }

    return res.json({
        message: "Task deleted successfully",
        task: deletedTask
    });
    
}



// to update user

export async function updatedTask(req, res) {
    
    const {id} = req.params;
    const updateData = req.body;

    const result = await userService.userUpdate(id, updateData);

    if(!result){
        return res.status(404).json({
            message: "Task not found"
        });
    }
    
    return res.status(200).json({
        message: "Task updated successfully",
        Task: result.updatedTask
       
    })
}


// fillter and search

export async function TasksHanler(req, res) {
    const tasks = await taskService.filterTasks(req.query);

    return res.status(200).json(tasks);
    
}
