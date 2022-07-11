var express = require("express");
var router = express.Router();
var sql = require("mssql");
const bcrypt = require("bcryptjs")
var conn = require("../connection/connect")();
const schemas = require('../validations/schemas');
const middleware = require('../validations/middleware');
const jwt = require("jsonwebtoken");

// const saltRounds = 10;

var routes = function () {
    // employee login
    router.route('/')
        .post(middleware({'body': schemas.employeeLogin}), function (req, res) {
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                
                request.input("email", sql.VarChar(200), req.body.email)
                request.input("password", sql.VarChar(200), req.body.password)
                var token = "";
                var status = null;
                var msg = "";
                request.query("select * from employees where isActiveEmployee = 1 and email=@email").then(function (recordset) {
                    // res.status(200)
                    // res.json(recordset.recordset)
                    // console.log(recordset.recordset[0])
                    // conn.close();
                    if (recordset.recordset.length == 0) {
                        return  res.status(401).send({
                            msg: 'Username or password is incorrect!'
                        });
                        // status = 401;
                        // msg = 'Username or password is incorrect!'
                    }
                    //  else {
                        //     res.status(200)
                        // res.json(recordset.recordset)
                        // console.log(recordset.recordset[0].password)
                        // conn.close();


                        bcrypt.compare(req.body.password, recordset.recordset[0].password, function(bErr, bResult) {
                            // wrong password
                            if (bErr) {
                                console.log(bErr)
                                return res.status(401).send({
                                    msg: 'Username or password is incorrect!'
                                });
                                // status = 401;
                                // msg = 'Username or password is incorrect!'
                                // console.log(msg)
                            }
                            if (bResult) {
                                console.log(bResult)
                                token = jwt.sign(
                                    { email: recordset.recordset[0].email },
                                    'SECRETKEY',
                                    { expiresIn: '7d' }
                                );
                                status = 200;
                                msg = 'Login successful'
                                console.log(msg)
                            } else {
                                console.log(bErr)
                                return res.status(401).send({
                                    msg: 'Username or password is incorrect!'
                                });
                            }
                            console.log(token)
                            // res.json(recordset.recordset)
                            conn.close();
                            res.status(status).send({ msg, token })
                            // res.status(200).send({ msg })

                        })
                        /* .catch(function (err) {
                            console.log(err)
                            conn.close()
                            res.status(400).send(err)
                        }) */
                    // }
                }).catch(function (err) {
                    console.log(err)
                    conn.close()
                    res.status(400).send(err)
                });
            })
        })
    return router
}
module.exports = routes;