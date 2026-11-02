import * as userService from "../services/user.service.js";

// Get all users
export async function getUsers(req, res){
    const users = await userService.getAllUsers();

    if(!users){
        return res.status(404).json({
            message: "Invalid users"
        })
    }
 
    res.status(200).json({
        users
    });
}



// Get one user

export async function getSingleUser(req, res){
    
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({ 
            message: "Invalid user ID"
        });
    }
   
    const user = await userService.getUserById(id);
    
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.status(200).json({
        user
    });
}



// Create a new user
export async function createUser(req, res) {
    const { name, email, role, active } = req.body ?? {};

    if(
        typeof name !== "string" || 
        typeof email !== "string" ||         
        typeof role !== "string" ||
        !email.includes("@") ||
        !name.trim() ||
        !email.trim() ||
        !role.trim()  ||        
        (active !== undefined && typeof active !== "boolean")
    ) {
        return res.status(400).json({
            message: "Invalid user data"
        });
    }

// checking if email exisist

    const users = await userService.getAllUsers();
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    const user = await userService.createUser({ 
        name: name.trim(), 
        email: email.trim(), 
        role: role.trim(), 
        active: active ?? true
    });
    res.status(201).json({
        message: "User created successfully",
        user
    });   
}


// delete

export async function deleteUser(req, res) {
    const userId = Number(req.params.id);
    const deletedUser = await userService.ToDeleteUser(userId);

    if(!deletedUser){
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.json({
        message: "User deleted successfully",
        user: deletedUser
    });
    
}



// to update user

export async function updatedUser(req, res) {
    
    const {id} = req.params;
    const updateData = req.body;

    const result = await userService.userUpdate(id, updateData);

    if(!result){
        return res.status(404).json({
            message: "User not found"
        });
    }
    
    return res.status(200).json({
        message: "User updated successfully",
        user: result.updatedUser
       
    })
}


// UserFilterHandler


export async function userFilterHandler(req, res) {

    const users = await userService.filteredUser(req.query);
    return res.status(200).json(users)
    
}


// UserTask

export async function userTasksHandler(req, res) {

    const id = Number (req.params.id)
    const tasks = await userService.userTasks(id)

    if(!tasks){
        return res.status(404).json({
            message: "User not found"
        });
    }
    
    return res.status(200).json(
        tasks
    );
}