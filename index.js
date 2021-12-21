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

/*Code Logic 
line 33: GET Request with the routes requiring an id and using the 
request/response parameters for an arrow function.

line 34: a variable(taskId) is assigned the value of the id property of the
GET request parameter.

line 35: since "taskId" is assigned the value of "request.params.id", line 35 
uses the "!" operator to state that if the value of "taskId" is NOT EQUAL to 
the value of "request.params.id" the response "The provided identifier is not valid"
should be returned along with the 404 error status code.

line 36: a variable(task) is created *and assigned the value of the id 
provided in the request that corresponds to the array* but first we need to find the particular 
task for the id provided in the request within the array. For that we use
the "find" method(tasks.find) which is an arrow function with the variable
"task" as its input and its output being the id property of the task variable
being "strictly equal(===)" to "taskId" which as we stated earlier is equal
to id property of the request parameter. Since the taskId is originally
parsed into the request as a String value, we use "parseInt(taskId)" which 
is the parseInt global function to convert it to an integer value to ensure
that they are of the same data type as required by the "===" operator.

line 37: This line executes in the event that line 36 fails and the value
of the id property of "task" is NOT EQUAL to that of parsed integer value 
of "taskId" from the request parameter, the response  
"The task with the provided ID does not exist" should be returned along with
the 404 error status code.

line 38: Returns the variable "task" as a response.

The creation of line 36 negates the need for line 35 because line 36 covers the 
scenario for line 35(i.e what happens when the value of the request
parameter doesnt match any of those in the tasks array.) For that reason, 
we can delete line 35 and it wouldn't make a difference. The only other 
possible test scenario is what will happen if an empty/null value 
is parsed in the request parameter and that scenario is already covered by
our original GET request which will return the task array in its entirety.
*/


//POST

//PUT

//PATCH

//DELETE


//Before running the program, we need to start the server on a dedicated port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}...'));
process.exit();