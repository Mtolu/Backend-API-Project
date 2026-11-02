import { saveAllData } from "../data/filepath.js";
import {tasks, users, projects} from "../data/data.js";


// Read users (json) from the array object

async function readTasks(){
    return tasks;
}


// Save tasks (json) to array object in NodeJS file

async function saveTasks(tasks) {
      await saveAllData(users, projects, tasks);
}


export async function getAllTasks(){
    return await readTasks();
}

export async function getTaskById(id){
    const tasks = await readTasks();
    return tasks.find(task => task.id === id);
}

// To create a new task, we will read the existing tasks, add the new task to the array, and then save the updated array back to the file.
export async function createTask(taskData){
    const tasks = await readTasks();


    
    const newTask = {
        id: Math.max(...tasks.map(task => task.id)) + 1,
        title: taskData.title,
        description: taskData.description,        
        projectId: taskData.projectId,
        //projectId: projects.find(project => project.id === taskData.projectId ) ?? null,
        assignedTo: taskData.assignedTo,
        //assignedTo: users.find(user => user.id === taskData.assignedTo) ?? null,
        priority: taskData.priority,        
        status: taskData.status ?? 'todo'
    };

    tasks.push(newTask);
    await saveTasks(tasks);
    return newTask;
}




//to delete we will also read the tasks, delete the specify task by id and save the rest into array

export async function toDeleteTask(taskId) {

    const tasks = await readTasks();

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return null;
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    await saveAllData(users, projects, tasks);

    return deletedTask[0]
}



// To update a task

export async function taskUpdate(id, updateData) {

    const taskId = Number(id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return null;
    }

    const updatedTask = {
        ...tasks[taskIndex],
        ...updateData,
        id: taskId
    };

    tasks[taskIndex] = updatedTask;

    await saveAllData(users, projects, tasks);

    return {
        updatedTask,
        tasks
    };
}



// Task filtering and search


export async function filterTasks(query) {
    
    const tasks = await readTasks();

    const {status, priority, projectId, assignedTo, search} = query;

    return tasks.filter(task =>{

        if(status && task.status !== status){
            return false;
        }

        if(priority && task.priority !== priority){
            return false;
        }

        if(projectId && task.projectId !== Number(projectId)){
            return false;
        }

        if(assignedTo){
            const assignedId = Number(assignedTo);
            const taskAssigned = task.assignedTo;
            if (taskAssigned !== assignedId){
                return false;
            }

        }

        if(search){
            const searchTerm = search.toLowerCase();
            const titleMatch = task.title && task.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = task.description && task.description.toLowerCase().includes(searchTerm);

            if(!titleMatch && !descriptionMatch){
                return false;
            }

        }

        return true;
    });
    
};