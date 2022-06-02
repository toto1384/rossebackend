//VALIDATION
const Joi = require('joi');


const actionValidation = {
    id:  Joi.number().required(),
    lc: Joi.string(),
}

const userValidation = {
    id : Joi.string().min(6).required(),
    email : Joi.string().email().required(),
    hide : Joi.array().items(Joi.number()).default([]),
    remind: Joi.array().items(Joi.number()).default([]),
    actions: Joi.array().items(actionValidation).default([]),
    interests : Joi.array().items(Joi.number()).default([]),
    difficulty : Joi.number().default(2),
    effort: Joi.number().default(100),
}





module.exports.userValidation = userValidation;
module.exports.actionValidation = actionValidation;