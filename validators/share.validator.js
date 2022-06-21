const Joi = require("joi");
const {EMAIL_REGEX} = require("../configs/constants");

module.exports = {
    eValidator: Joi.string().regex(EMAIL_REGEX).lowercase()
}