var http = require('http')
var auth = require('basic-auth')
var compare = require('tsscmp')

var config = {
  user: 'soflex',
  password: '123',
  server: 'localhost',
  database: 'admin'
};

// Create server
var server = http.createServer(async function (req, res) {
  var credentials = auth(req)

  // Check credentials
  // The "check" function will typically be against your user store
  var tengoPermisos = await check(credentials.name, credentials.pass);

  if (tengoPermisos) {
    res.end('Access granted')
  } else {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  }
})

// Basic function to validate credentials for example
async function check(name, pass) {
  var valid = true
  var sql = require("mssql");
  let pool = await sql.connect(config)
  let result = await pool.request().query('select * from usuario where mail = \'' + name + '\' AND pass = CONVERT(VARCHAR(50), HashBytes(\'MD5\', \'' + pass + '\'), 2)')
  valid = result.rowsAffected[0] !== 0;
  sql.close();
  return valid;
}

server.listen(3000, function () {
  console.log('Server is running..');
});