//import express framework
const express = require('express');

//Create a "variable" app to instatiate the express framework
const app = express() ;

//import the task-schema to our app
const utils = require('./utils/task-schema.js')
const {taskSchema} = require('./utils/task-schema');

//This allows us to create POST, PUT AND PATCH requests with json
app.use(express.json());

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
/*To create new tasks, we need to include json support because 
we need to send data in the body including the different attributes 
of our task object. For that we use line 8. 
By sending a POST request, we are creating new data/payload. For this 
reaason, there is a need to validate the json payload that we are receiving
to ensure that it is valid.
*/
app.post("/api/tasks", (request, response) => {
    const {error, value} = taskSchema.validate(request.body);

    if(error) return response.status(400).send("The name should be at least 3 chars long!")

// Create new object that we will pass to the tasks array

    const task = {
        id: tasks.length + 1,
        name: request.body.name,
        completed: request.body.completed
    };

    tasks.push(task);
    response.send(task);
});



/*line 96 has a variable created to hold an error should the request return 
an error. This variable is equal to utils variable which is responsible 
for validating the data with "validateTask".
line 98 is an if statement that sends an error message if the request returns
an error.
line 100 begins the process of creating the task we want to send in the POST
request.
line 101 increases the length of the tasks array by 1 programmatically(rather
than hardcoding the value) because by creating a new POST item, 
the array size/length increases by 1. 
line 102 will contain the "name" attribute of the task and will derive
such attribute from the name property of the request body when the request 
is created in POSTMAN.
line 103 will contain the "completed" attribute of the task and will derive
such attribute from the "completed" attribute of the request body when the
request is created in POSTMAN.
line 106 pushes the newly created task into the tasks array.
line 107 returns a response from the previous push action and should tell us
if the task we created was validated by the schema or not.

*/

/*PUT: update task by receiving task identifier and json that includes the 
attributes of the task that we want to change
*/  
app.put('/api/tasks/:id', (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId)); 
    if(!task) return response.status(404).send("The task with the provided ID does not exist");

    const { error } = taskSchema.validate(request.body);

    if(error) return response.status(400).send('The name should be at least 3 chars long')
    
    task.name = request.body.name;
    task.completed = request.body.completed;

    response.send(task);
});

//PATCH

//DELETE


//Before running the program, we need to start the server on a dedicated port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}...'));
process.exit();