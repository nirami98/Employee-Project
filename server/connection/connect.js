var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: 'Nirami1975',
        server: 'localhost',
        database: 'employee_project',
        options: {
            trustServerCertificate: true,
        }
    });
 
    return conn;
};

module.exports = connect;