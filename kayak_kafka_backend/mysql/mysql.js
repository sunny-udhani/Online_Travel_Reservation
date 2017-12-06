let fs = require('fs');
let mysql = require('mysql');
let connection;

//Put your mysql configuration settings - user, password, database and port
function getConnection() {
    connection = mysql.createConnection({
        host: '35.188.193.23',
        user: 'root',
        password: 'kayak',
        database: 'kayak',
        port: 3306,
        debug: false,
        ssl: {
            ca   : fs.readFileSync('C:\\Users\\admin\\Desktop\\kayak-1\\server-ca.pem'), // should be enough for AWS
            key  : fs.readFileSync('C:\\Users\\admin\\Desktop\\kayak-1\\client-key.pem'), // required for google mysql cloud db
            cert : fs.readFileSync('C:\\Users\\admin\\Desktop\\kayak-1\\client-cert.pem'), // required for google mysql cloud db
        }
    });
    return connection;
}

let pool = mysql.createPool({
    connectionLimit: 10,
    host: '35.188.193.23',
    user: 'root',
    password: 'kayak',
    database: 'kayak',
    port: 3306,
    debug: false,
    ssl: {
        ca: fs.readFileSync('C:\\Users\\admin\\Desktop\\kayak-1\\server-ca.pem'), // should be enough for AWS
        key: fs.readFileSync('C:\\Users\\admin\\Desktop\\kayak-1\\client-key.pem'), // required for google mysql cloud db
        cert: fs.readFileSync('C:\\Users\\admin\\Desktop\\kayak-1\\client-cert.pem'), // required for google mysql cloud db
        // required for google mysql cloud db
    }
});

function insertData(callback, sqlQuery) {

    console.log("\nSQL Query:: " + sqlQuery);

    connection = getConnection();

    // pool.getConnection(function (err, connection){
    connection.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {	// return err or result
            console.log("DB Results:" + result.affectedRows);
            callback(err, result);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
    // connection.release();
    // });
}

function fetchData(callback, sqlQuery) {

    console.log("\nSQL Query::" + sqlQuery);
    connection = getConnection();

    // pool.getConnection(function (err, connection) {
    connection.query(sqlQuery, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {	// return err or result
            console.log("DB Results:" );
            console.log(rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
    // connection.release()
    // });
}

function updateData(callback, sqlQuery) {

    console.log("\nSQL Query:: " + sqlQuery);

    connection = getConnection();

    // pool.getConnection(function (err, connection) {
    connection.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {	// return err or result
            console.log("DB Results:" + result.affectedRows);
            callback(err, result);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
    // connection.release()
    // });
}

function deleteData(callback, sqlQuery) {

    console.log("\nSQL Query:: " + sqlQuery);

    connection = getConnection();
    //
    // pool.getConnection(function (err, connection) {
    connection.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {	// return err or result
            console.log("DB Results:" + result.affectedRows);
            callback(err, result);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
    // connection.release()
    // });
}


// function procedure (callback, sqlQuery){
//
//     console.log("\nSQL Query:: " + sqlQuery);
//
//     let connection = getConnection();
//
//     connection.query(sqlQuery, function(err, result) {
//         if(err){
//             console.log("ERROR: " + err.message);
//         }
//         else
//         {	// return err or result
//             console.log("DB Results:"+result.affectedRows);
//             callback(err, result);
//         }
//     });
//     console.log("\nConnection closed..");
//     connection.end();
// }

exports.fetchData = fetchData;
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;