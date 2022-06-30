const Joi = require('joi');

const schemas = {
    employeeDetails: Joi.object().keys({
        employee_name: Joi.string().required(),
        email: Joi.string().email().required(),
        project_id: Joi.number().required()
    }),

    employeeUUID: {
        employee_uuid: Joi.string().guid({
            version: [
                'uuidv4',
                'uuidv5'
            ]
        }).required()
    },

    projectID: {
        project_id: Joi.number().min(1).required()
    },

    projectDetails: Joi.object().keys({
        project_name: Joi.string().required(),
        technology: Joi.string().required(),
    }),
};

module.exports = schemas;