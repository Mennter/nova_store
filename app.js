var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();

var config = {
    user: 'soflex',
    password: '123',
    server: 'localhost', 
    database: 'admin' 
};

var respuesta = {
    error: true,
    mensaje: "",
}

var sql = require("mssql");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', function (req, res) {
   
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from usuario', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordset);

            sql.close();
            
        });
    });

});



app.get('/empleados/pendientes', function (req, res) {

    
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from usuario where empleado = 1 AND bloqueado = 1', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordset);

            sql.close();
            
        });
    });

});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});