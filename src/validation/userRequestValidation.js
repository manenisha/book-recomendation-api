const Joi = require('joi');

module.exports = {
    // schema validation for create user
    validateUserCreation: (input) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().min(5)
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        });
        return schema.validate(input)
    },
    //schema validation for update user
    validateUserUpdation: (input) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            email: Joi.string().optional()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().min(5)
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional()
        });
        return schema.validate(input)
    }
}