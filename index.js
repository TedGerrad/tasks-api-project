//import express framework
const express = require('express');

//Create a "variable" app to instatiate the express framework
const app = express() ;


//Create an array locally that will serve as our "database"
const tasks = [
    {
        id: 1,
        name: "Task 1",
        completed: false
    },
    {
        id: 2,
        name: "Task 2",
        completed: false
    },
    {
        id: 3,
        name: "Task 3",
        completed: false
    }
]

//GET 
app.get("/api/tasks", (request, response) => {
    response.send(tasks);
}); 

//GET (BY ID)
app.get("/api/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    if(!taskId) return response.status(404).send("The provided identifier is not valid");
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) return response.status(404).send("The task with the provided ID does not exist");
    response.send(task);
}); 



//POST

//PUT

//PATCH

//DELETE


//Before running the program, we need to start the server on a dedicated port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}...'));