const Joi = require('joi');

/* const middleware = (schema, property) => {
    // console.log(schema)
    // console.log(property)
    return (req, res, next) => {
        console.log(property)
        // console.log(req[property])
        const {error} = Joi.validate(req[property], schema);

        const valid = error == null;

        if(valid) {
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            console.log("error: ", message);

            res.status(422).json({
                error: message
            })
        }
    }
} */

const middleware = (obj) => {
    /* console.log("length => " + Object.keys(obj).length)
    console.log("obj")
    console.log(obj['employee_uuid'])
    let keys = Object.keys(obj);
    console.log(keys) */

    let message = '';
    let valid = null;
    return (req, res, next) => {

        /* console.log(Object.keys(req['params']).length)
        console.log(req['params'])
        console.log(Object.values(req))
        for (let index = 0; index < Object.keys(obj).length; index++) {
            console.log("INDEX ====> "+index)
            console.log("KEYNAME:\n")
            console.log(Object.keys(obj)[index])
            console.log("\nVALUE:\n")
            console.log(Object.values(obj)[index])
            console.log("---------------------------------------------------\n")
        } */

        for (let index = 0; index < Object.keys(obj).length; index++) {
            let property = Object.keys(obj)[index]
            let schema = Object.values(obj)[index]
            console.log(obj);
            // console.log(schema);
            const { error } = Joi.validate(req[property], schema);
            valid = error == null;

            if (!valid) {
                const { details } = error;
                message = details.map(i => i.message).join(',');
                console.log("error: ", message);
                break;
            }
        }
        if (valid) {
            next()
        } else {
            res.status(422).json({
                error: message
            })
        }
    }
}

module.exports = middleware;