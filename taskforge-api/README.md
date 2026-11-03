About this Project (TASKFORGE API)

This project is a backend API for managing a simple application, like small version of Trello, linear or Jira. It manages users, projects and tasks. The Database is built with NodeJS, array of JSON object, meaning will did not have external Database and you can create, update and delete from the database, because it is CRUD functionallity backend engineering.


KEY FEATURES
It is an open source project for learning backend, that allows contribution.
it is also an Internet browser app that does not depende on Internet to work, where you can set your personal PORT and APP Name.
It will helps backend software developer to understand how database is connected to server and how GET, POST, PATCH and Delete really work from backend side.
It has alot for backend learner.

THE STACK ARE:
Node.js, 
Express.js and 
JavaScript.

PROJECT ROADMAP
taskforge-api/
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   ├── data/
│   │   └── data.js
│   │   └── filepath.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   ├── middleware/
│   │   ├── logger.middleware.js
│   │   └── error.middleware.js│  
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
└── package.json

THE END POINTS

Method              Endpoint                            Purpose
GET                 /                                   Confirm that the API is running
GET                 /api/users                          List users; support filtering
GET                 /api/users/:id                      Get one user
GET                 /api/users/:id/tasks                Get tasks assigned to one user
POST                /api/users                          Create a user
PATCH               /api/users/:id                      Update a user
DELETE              /api/users/:id                      Delete a user
GET                 /api/projects                       List projects
GET                 /api/projects/:id                   Get one project
GET                 /api/projects/:id/tasks             Get tasks in a project
GET                 /api/projects/:id/summary           Return project task statistics
POST                /api/projects                       Create a project
PATCH               /api/projects/:id                   Update a project
DELETE              /api/projects/:id                   Delete a project and its tasks
GET                 /api/tasks                          List tasks; support filtering/search


GETTING STARTED.
There are certain instructions to follow to get a copy of the project and run it on your local machine for test purpose, learning and contributions.

Prerequisites
You must have following software install on your system:

Vscode or any other code editor.
Node.js latestet version prefered
npm

INSTALLATION
Clone the repositry on github

1   git clone Mtolu/Backend-API-Project: TASKFORGE API

2   Navigate to the project directory (clone copy)

    cd taskforge-api

3   Install dependencies


    npm init -y

    npm install express

4   Set up enviroment variables
    Meaning you will create .env file in the root directory and add your own configuration:

    APP_NAME=xxxxxxxxxx
    PORT=xxxx

    Use ES Modules by adding "type": "module" to package.json. Add development and production scripts so the application can be started with npm run dev and npm start.
    "scripts": { 
        "dev": "node --env-file=.env --watch src/server.js", 
        "start": "node --env-file=.env src/server.js"
        }

5   Run the application

    npm run dev


CONTRIBUTION
You could contribute by helping out with Query aspect of the code it is not working as expected.

Filtering
GET /api/users must support role and active query parameters. Examples:

GET /api/users?role=developer
GET /api/users?active=true
GET /api/users?role=developer&active=true

GET /api/tasks must support the following query parameters: status, priority, projectId, assignedTo and search.
GET /api/tasks?status=todo
GET /api/tasks?priority=high
GET /api/tasks?projectId=1
GET /api/tasks?assignedTo=2
GET /api/tasks?status=todo&priority=high
GET /api/tasks?search=login

License
The project is licensed under DIGIHUB TECHNOLOGY AND SOLUTION for educational purposes, therefore any form transfer for malicious use is high prohibited under the
LAW, if you are caught using this piece App for malicious work you will be liable and legally responsible under the punishiment of the criminal LAW

Contact
oluvan206@gmail.com
