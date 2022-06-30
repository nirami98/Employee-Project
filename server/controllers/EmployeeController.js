var express = require("express");
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();
const schemas = require('../validations/schemas');
const middleware = require('../validations/middleware');

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
    router.route('/:employee_uuid')
        .get(middleware(schemas.employeeUUID, 'params'), function (req, res) {
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
    router.route('/viewModal/:project_id')
        .get(middleware(schemas.projectID, 'params'), function (req, res) {
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
    router.route('/')
        .post(middleware(schemas.employeeDetails, 'body'), function (req, res) {
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("employee_name", sql.VarChar(200), req.body.employee_name)
                request.input("email", sql.VarChar(200), req.body.email)
                request.input("project_id", sql.Int, req.body.project_id)

                request.query("insert into employees (employee_name, email, project_id, isActiveEmployee) values (@employee_name, @email, @project_id, 1)").then(function (recordset) {
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
    router.route('/:employee_uuid')
        .put(middleware(schemas.employeeUUID, 'params'), middleware(schemas.employeeDetails, 'body'), function (req, res) {
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
    router.route('/:employee_uuid')
        .delete(middleware(schemas.employeeUUID, 'params'), function (req, res) {
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

    return router
}

module.exports = routes;