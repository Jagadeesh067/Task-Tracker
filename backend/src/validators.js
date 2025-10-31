const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(300).required(),
  description: Joi.string().allow('', null),
  priority: Joi.string().valid('Low','Medium','High').required(),
  status: Joi.string().valid('Open','In Progress','Done','Blocked').default('Open'),
  due_date: Joi.date().iso().allow(null),
});

const updateTaskSchema = Joi.object({
  status: Joi.string().valid('Open','In Progress','Done','Blocked'),
  priority: Joi.string().valid('Low','Medium','High'),
}).min(1);

module.exports = { createTaskSchema, updateTaskSchema };
