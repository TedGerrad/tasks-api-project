/*This file will contain a function to validate that the input is actually 
valid for the schema that we defined. To do that we use joi(Joi allows us to
create blueprints of Javascript objects that ensure that we process and
ultimately accept accurate data)
*/

//import joi
const res = require('express/lib/response');
const { isSchema } = require('joi');
const Joi = require('joi');

//create the joi object
const taskSchema = Joi.object({
    name: Joi.string().min(3).required(),
    completed: Joi.boolean()
});

//export joi object
module.exports.taskSchema = taskSchema;

/*const taskSchema = Joi.object({
    name: Joi.string().min(3).required(),
    completed: Joi.boolean() 
    
});*/

//const validation = taskSchema.validate(request.body);
//res.send(validation);
//isSchema.validate({ username:})
/*router.post("/api/tasks", (request, response) => {
const validation = taskSchema.validate(request.body);
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    };
})*/

//exports.validateTask = (task) => Joi.validate(task, taskSchema);