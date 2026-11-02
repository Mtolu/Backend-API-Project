import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import userRouter from "./routes/user.routes.js";
import { disabledCache, etag, reqeustLogger, respondHeader, resSend } from "./middleware/logger.middleware.js";





const app = express();
app.use(respondHeader);

// Parsing incoming JSON requests
app.use(express.json());



app.use("/api/users", userRouter);
app.use("/api/users/:id/tasks", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/projects/:id/summary", projectRouter);
app.use("/api/projects/:id/task", projectRouter);
app.use("/api/projects/:id", projectRouter);
app.use("/api/tasks", taskRouter);


app.get("/", (req, res)=>{
  res.status(200).json({
    message: "TaskForge API is running"
  })
});

app.disable("x-powered-by")
app.disable("etag")


app.use((req, res) => {
  res.status(404).json({
    message: "Resource not found"
  });

})


// error handling
app.use(errorHandler);




// Registering all routes

app.use(reqeustLogger, respondHeader);

app.get("/api/users", (req, res) => {
  res.status(200).json({
    message: "The user is available"
  });
});

app.post("/api/projects", (req, res) => {
  res.status(201).json({
    message: "Project created successfully"
  });
});

app.patch("/api/tasks/3", (req, res) => {
  res.json({
    message: "Task updated successfully"
  });
});
app.delete("/api/users/2", (req, res) => {
  res.json({
    message: "User deleted successfully"
  });
});



export default app;