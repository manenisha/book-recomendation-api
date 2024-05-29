const Joi = require('joi');

module.exports = {
    // schema validation for add new book
    validateBookCreation: (input) => {
        const schema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            isbn: Joi.string().required(),
            summary: Joi.string().required(),
            user_id: Joi.number().required(),
        });
        return schema.validate(input)
    },
    //schema validation for update book
    validateBookUpdation: (input) => {
        const schema = Joi.object({
            title: Joi.string().optional(),
            author: Joi.string().optional(),
            isbn: Joi.string().optional(),
            summary: Joi.string().optional(),
            user_id: Joi.number().optional(),
        });
        return schema.validate(input)
    }
}