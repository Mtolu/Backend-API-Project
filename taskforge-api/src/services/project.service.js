
import { saveAllData } from "../data/filepath.js";
import { projects, users, tasks } from "../data/data.js";
import { title } from "node:process";


// Read users (json) from the array object

async function readProjects() {
    return projects;
};

async function readTasks() {
    return tasks
}
async function saveProjects(projects) {
    await saveAllData(users, projects, tasks);
}

export async function getAllProjects() {
    return await readProjects();
}

export async function getProjectsById(id) {
    const projects = await readProjects();
    return projects.find(project => project.id === id);
}

// To create a new project, we will read the existing projects, add the new project to the array, and then save the updated array back to the file.
export async function createProject(projectData) {
    const projects = await readProjects();

    const newProject = {
        id: Math.max(...projects.map(project => project.id)) + 1,
        name: projectData.name,
        description: projectData.description,
        ownerId: projectData.ownerId, // search for id in users array if it doesn´t exit give null instead of undefined        
        //ownerId: users.find(user => user.id === projectData.ownerId) ?? null, // search for id in users array if it doesn´t exit give null instead of undefined        
        status: projectData.status || 'active'
    }

    projects.push(newProject);
    await saveProjects(projects);
    return newProject;
}

// to delete project

export async function toDeleteProject(projectId) {

    const projects = await readProjects();
    const tasks = await readTasks();
    //const id = Number(projectId)
    const projectIndex = projects.findIndex(project => project.id === projectId);

    if (projectIndex === -1) {
        return null;
    }

    const deletedProject = projects.splice(projectIndex, 1);

    //const remainingTasks = tasks.filter(task=>task.projectId !== id);

    for(let i = tasks.length -1; i >= 0; i--){
        if(tasks[i].projectId === projectId){
            tasks.splice(i, 1);
        }
    }

    //
    await saveAllData(users, projects, tasks);
    return deletedProject[0]
}

// To update a user

export async function projectUpdate(id, updateData) {

    const projectId = Number(id);
    const projectIndex = projects.findIndex(project => project.id === projectId);

    if (projectIndex === -1) {
        return null;
    }

    const { id: _, ...safeUpdateData } = updateData

    const updatedProject = {
        ...projects[projectIndex],
        ...safeUpdateData,
        id: projectId
    };

    projects[projectIndex] = updatedProject;

    await saveAllData(users, projects, tasks);

    return {
        updatedProject,
        projects
    };
}

//projectTasks

export async function projectTasks(projectId) {
    const projects = await readProjects();
    const tasks = await readTasks();

    const id = Number(projectId);
    const project = projects.find(project => project.id === id);

    if(!project){
        return null;
    }

    return tasks.filter(task=>task.projectId === id)
    
}


// Summary

export async function getProjectSummary(projectId) {
    const projects = await readProjects();
    const tasks = await readTasks();

    const id = Number(projectId);
    const project = projects.find(project => project.id === id)

    if (!project) {
        return null; //project not found
    }

    const projectTasks = tasks.filter(task => task.projectId === id);

    const statistics = projectTasks.reduce((acc, task) => {
        acc.totalTasks += 1;

        if (task.status === "todo") {
            acc.todo += 1;

        } else if (task.status === "inprogress") {
            acc.inProgress += 1;

        } else if (task.status === "done") {
            acc.done += 1;
        }
        return acc;
    }, {
        totalTasks: 0,
        todo: 0,
        inProgress: 0,
        done: 0
    });

    return {
        project: {
            id: projectId,
            name: project.name
        },
        statistics
    };
}