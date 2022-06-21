const Joi = require("joi");
const {PASSWORD_REGEX, EMAIL_REGEX} = require("../configs/constants");

const userSubScheme = {
    name: Joi.string().alphanum().min(2).max(100).required(),
    age: Joi.number().integer().min(1).max(130)
}

module.exports = {
    newUserValidator: Joi.object({
        ...userSubScheme,
        email: Joi.string().regex(EMAIL_REGEX).lowercase().required(),
        password: Joi.string().regex(PASSWORD_REGEX).required()
    }),

    updateUserValidator: Joi.object(userSubScheme)
}