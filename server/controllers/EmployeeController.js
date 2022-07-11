var express = require("express");
var router = express.Router();
var sql = require("mssql");
const bcrypt = require("bcryptjs")
var conn = require("../connection/connect")();
const schemas = require('../validations/schemas');
const middleware = require('../validations/middleware');

const saltRounds = 10;

var routes = function () {

    // get all employees
    router.route('/')
        .get(function (req, res) {
            conn.connect().then(function () {
                var sqlQuery = "select * from employees inner join projects on employees.project_id=projects.project_id where isActiveEmployee=1"
                var req = new sql.Request(conn)
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                })
                    .catch(function (err) {
                        console.log(err)
                        conn.close()
                        res.status(400).send(err)
                    })
            })
                .catch(function (err) {
                    conn.close()
                    res.status(400).send(err)
                })
        });

    // get employee by id
    // .get(middleware(schemas.employeeUUID, 'params'), function (req, res) {
    router.route('/:employee_uuid')
        .get(middleware({'params': schemas.employeeUUID}), function (req, res) {
            var employee_uuid = req.params.employee_uuid;
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("employee_uuid", sql.UniqueIdentifier, employee_uuid)
                request.multiple = true;
                request.query("select * from employees where isActiveEmployee = 1 and employee_uuid=@employee_uuid").then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                })
                    .catch(function (err) {
                        console.log(err)
                        conn.close()
                        res.status(400).send(err)
                    })
                // }).catch(function (err) {
                //     console.log(err)
                //     conn.close();
                //     res.status(400).send(err);
                // });
            }).catch(function (err) {
                console.log(err)
                conn.close();
                res.status(400).send(err);
            });
        });

    // get employees by project
    // .get(middleware(schemas.projectID, 'params'), function (req, res) {
    router.route('/viewModal/:project_id')
        .get(middleware({'params': schemas.projectID}), function (req, res) {
            var project_id = req.params.project_id;
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("project_id", sql.Int, project_id)
                request.multiple = true;
                request.query("select * from employees where isActiveEmployee = 1 and project_id=@project_id").then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                })
                    .catch(function (err) {
                        console.log(err)
                        conn.close()
                        res.status(400).send(err)
                    })
            }).catch(function (err) {
                console.log(err)
                conn.close();
                res.status(400).send(err);
            });
        });

    // insert employee
    // .post(middleware(schemas.employeeDetails, 'body'), function (req, res) {
    router.route('/')
        .post(middleware({'body': schemas.employeeDetails}), function (req, res) {
            conn.connect().then(function () {
                var request = new sql.Request(conn);

                request.input("employee_name", sql.VarChar(200), req.body.employee_name)
                request.input("email", sql.VarChar(200), req.body.email)
                request.input("project_id", sql.Int, req.body.project_id)
                request.input("phone_number", sql.VarChar(100), req.body.phone_number)
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    if(err) {
                        throw err
                    } else {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            if(err) {
                                throw err
                            } else {
                                request.input("password", sql.VarChar(100), hash)
                            }
                        })
                    }
                })

                request.query("insert into employees (employee_name, email, project_id, isActiveEmployee, phone_number, password) values (@employee_name, @email, @project_id, 1, @phone_number, @password)").then(function (recordset) {
                    conn.close();
                    res.status(200).send(req.body)
                }).catch(function (err) {
                    console.log(err)
                    conn.close()
                    res.status(400).send(err)
                });
            }).catch(function (err) {
                console.log(err)
                conn.close()
                res.status(400).send(err)
            });
        });

    // update employee
    // .put(middleware(schemas.employeeUUID, 'params'), middleware(schemas.employeeDetails, 'body'), function (req, res) {
    router.route('/:employee_uuid')
            .put(middleware({'params': schemas.employeeUUID, 'body': schemas.employeeDetails}), function (req, res) {
            var employee_uuid = req.params.employee_uuid;
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("employee_uuid", sql.UniqueIdentifier, employee_uuid)
                request.input("employee_name", sql.VarChar(200), req.body.employee_name)
                request.input("email", sql.VarChar(200), req.body.email)
                request.input("project_id", sql.Int, req.body.project_id)

                request.query("update employees set employee_name=@employee_name, email=@email, project_id=@project_id where employee_uuid=@employee_uuid").then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                    conn.close();
                    // res.status(200).send(req.body)
                }).catch(function (err) {
                    console.log(err)
                    conn.close()
                    res.status(400).send(err)
                });
            }).catch(function (err) {
                console.log(err)
                conn.close()
                res.status(400).send(err)
            });
        });

    // delete employee
    // .delete(middleware(schemas.employeeUUID, 'params'), function (req, res) {
    router.route('/:employee_uuid')
        .delete(middleware({'params': schemas.employeeUUID}), function (req, res) {
            var employee_uuid = req.params.employee_uuid;
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("employee_uuid", sql.UniqueIdentifier, employee_uuid)
                request.multiple = true;
                request.query("update employees set isActiveEmployee = 0 where employee_uuid=@employee_uuid").then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                }).catch(function (err) {
                    console.log(err)
                    conn.close()
                    res.status(400).send(err)
                });
            }).catch(function (err) {
                console.log(err)
                conn.close();
                res.status(400).send(err);
            });
        });

    /* // employee login
    router.route('/login')
        .get(middleware({'body': schemas.employeeLogin}), function (req, res) {
            conn.connect().then(function () {
                var request = new sql.Request(conn);

                request.input("email", sql.VarChar(200), req.body.email)

                request.query("select * from employees where isActiveEmployee = 1 and email=@email").then(function (recordset) {
                    // res.json(recordset.recordset)
                    conn.close();
                    res.status(200).send(req.body)
                }).catch(function (err) {
                    console.log(err)
                    conn.close()
                    res.status(400).send(err)
                });
            }).catch(function (err) {
                console.log(err)
                conn.close()
                res.status(400).send(err)
            });
        }) */

    return router
}

module.exports = routes;