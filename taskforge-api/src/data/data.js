export const users = [
  {
    "id": 1,
    "name": "Amos",
    "email": "amos@example.com",
    "role": "admin",
    "active": true
  },
  {
    "id": 2,
    "name": "John",
    "email": "john@example.com",
    "role": "developer",
    "active": true
  },
  {
    "id": 3,
    "name": "Mary",
    "email": "mary@example.com",
    "role": "designer",
    "active": false
  },
  {
    "id": 4,
    "name": "David",
    "email": "david@example.com",
    "role": "developer",
    "active": true
  }
];
    export const projects = [
  {
    "id": 1,
    "name": "TaskForge API",
    "description": "Backend training project.",
    "ownerId": 1,
    "status": "active"
  },
  {
    "id": 2,
    "name": "School Management System",
    "description": "Application for managing schools",
    "ownerId": 1,
    "status": "active"
  },
  {
    "id": 3,
    "name": "Farm Eco-System",
    "description": "Application for managing farm products",
    "ownerId": 4,
    "status": "active"
  }
];
    export const tasks =  [
  {
    "id": 1,
    "title": "Create project routes",
    "description": "Build all project endpoints",
    "projectId": 1,
    "assignedTo": 2,
    "priority": "high",
    "status": "todo"
  },
  {
    "id": 2,
    "title": "Create task controller",
    "description": "Implement task CRUD operations",
    "projectId": 1,
    "assignedTo": 2,
    "priority": "medium",
    "status": "inprogress"
  },
  {
    "id": 3,
    "title": "Implement login endpoint",
    "description": "Build user login functionality",
    "projectId": 2,
    "assignedTo": 1,
    "priority": "high",
    "status": "todo"
  }
];
    