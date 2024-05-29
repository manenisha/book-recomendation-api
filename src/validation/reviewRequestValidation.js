const Joi = require('joi');

module.exports = {
    // schema validation for add new review
    validateReviewCreation: (input) => {
        const schema = Joi.object({
            book_id: Joi.number().required(),
            user_id: Joi.number().required(),
            rating: Joi.number().integer().required(),
            comment: Joi.string().required()
        });
        return schema.validate(input)
    },
    //schema validation for update review
    validateReviewUpdation: (input) => {
        const schema = Joi.object({
            book_id: Joi.number().optional(),
            user_id: Joi.number().optional(),
            rating: Joi.number().optional(),
            comment: Joi.string().optional()
        });
        return schema.validate(input)
    }
}