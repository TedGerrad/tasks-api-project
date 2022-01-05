/*This file will contain a function to validate that the input is actually 
valid for the schema that we defined. To do that we use joi(Joi allows us to
create blueprints of Javascript objects that ensure that we process and
ultimately accept accurate data)
*/

//import joi
const Joi = require('joi');

const taskSchema = {
    name: Joi.string().min(3).required(),
    completed: Joi.boolean()
};

exports.validateTask = (task) => Joi.validate(task, taskSchema);