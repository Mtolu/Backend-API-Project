
import { saveAllData } from "../data/filepath.js";
//import {title} from "node:process";
import { users, projects, tasks } from "../data/data.js";




// Read users (json) from the array object

async function readUsers() {
    return users;

}

async function readTasks() {
    return tasks;
    
}

async function saveUsers(users) {
    await saveAllData(users, projects, tasks);
}



export async function getAllUsers() {
    return await readUsers();
}

export async function getUserById(id) {
    const users = await readUsers();
    return users.find(user => user.id === id);
}

// To create a new user, we will read the existing users, add the new user to the array, and then save the updated array back to the file.
export async function createUser(userData) {
    const users = await readUsers();

    const newUser = {
        id: Math.max(...users.map(user => user.id)) + 1,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        active: userData.active ?? true
    }

    users.push(newUser);
    await saveUsers(users);
    return newUser;

}


//delete we will also read the user, delete the specify user by id and save the rest into array

export async function ToDeleteUser(userId) {

    const users = await readUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return null;
    }

    const deletedUser = users.splice(userIndex, 1);
    await saveAllData(users, projects, tasks);
    return deletedUser[0]
}



// To update a user

export async function userUpdate(id, updateData) {

    const userId = Number(id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return null;
    }

    const {id: _, ...safeUpdateData} =updateData // to denied user from changing id

    const updatedUser = {
        ...users[userIndex],
        ...safeUpdateData,
        id: userId
    };

    users[userIndex] = updatedUser;

    await saveAllData(users, projects, tasks);

    return {
        updatedUser,
        users
    };
}


// Userfillter

export async function filteredUser(query) {
    const users = await readUsers();
    const {role, active} = query;

    return users.filter(user=>{

        if(role && user.role !== role){
            return false;
        }

        if(active !== undefined){

            const isActiveQuery = active === "true";
            if(user.active !== isActiveQuery){
                return false;
            }            
        }

        return true;
    })
    
}


// UserTasks

export async function userTasks(userId) {
    const users = await readUsers();
    const tasks = await readTasks();

    const id = Number(userId);
    const user = users.find(user=>user.id === id);
    
    if(!user){
        return null;
    }

    return tasks.filter(task=>task.assignedTo === id);
}

