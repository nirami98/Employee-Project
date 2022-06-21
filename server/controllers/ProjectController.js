var express = require("express");
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

var routes = function () {

    // get all projects
    router.route('/')
        .get(function (req, res) {
            conn.connect().then(function () {
                var sqlQuery = "select * from projects"
                var req = new sql.Request(conn)
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                })
                    .catch(function (err) {
                        conn.close()
                        res.status(400).send(err)
                    })
            })
                .catch(function (err) {
                    conn.close()
                    res.status(400).send(err)
                })
        });

    // get project by id
    router.route('/:project_id')
        .get(function (req, res) {
            var project_id = req.params.project_id;
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("project_id", sql.Int, project_id)
                request.multiple = true;
                request.query("select * from projects where project_id=@project_id").then(function (recordset) {
                    res.json(recordset.recordset)
                    conn.close()
                }).catch(function (err) {
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

    // procedure for inserting a product
    /* CREATE procedure[dbo].[InsertProject]
    (  
        @project_name varchar(50),  
        @technology varchar(50)
    )
    AS
    BEGIN  
    insert into projects(project_name, technology) values(@project_name, @technology)
    END */

    // insert a project
    /* router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("project_name", sql.VarChar(50), req.body.project_name)
                    request.input("technology", sql.VarChar(50), req.body.technology)
                    request.execute("InsertProject").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            console.log(err)
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        console.log(err)
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    console.log(err)
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                console.log(err)
                conn.close();
                res.status(400).send(err);
            });
        }); */

    router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var request = new sql.Request(conn);
                request.input("project_name", sql.VarChar(50), req.body.project_name);
                request.input("technology", sql.VarChar(50), req.body.technology);

                request.query("insert into projects (project_name, technology) values (@project_name, @technology)").then(function (recordset) {
                    conn.close();
                    res.status(200).send(req.body);
                }).catch(function (err) {
                    console.log(err)
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                console.log(err)
                conn.close();
                res.status(400).send(err);
            });
        })
    return router
}

module.exports = routes;