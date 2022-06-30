const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.port || 8080;


var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const employeeController = require('./controllers/EmployeeController')();
const projectController = require('./controllers/ProjectController')();

app.use("/api/employees", employeeController)
app.use("/api/projects", projectController)

// app.get("/product",function(request,response)
// {
//     response.json({"Message":"Welcome to Node js"});
// });

app.listen(port, function () {
    const datetime = new Date();
    const message = "Server running on Port:- " + port + "\nStarted at :- " + datetime;
    console.log(message);
});

// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//     origin: "http:localhost:1433"
// }

// app.use(cors(corsOptions))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to Employees and Project Management System!" })
// })

// require("./app/routes/routes.js")(app)

// const PORT = process.env.PORT || 1433;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })