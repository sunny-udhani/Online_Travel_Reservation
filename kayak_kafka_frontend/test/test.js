var assert = require('assert');
var request = require('request');
var http = require("http");

describe('SignIn Test', function() {

    it('should signIn with correct username and password as parameters', function (done) {
        request.post('http://localhost:3001/SignIn', {
            form: {
                username: 'X@Y.com',
                password: 'X54321',
                credentials: true
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(201, response.statusCode);
            done();
        });
    });
});


// describe('Negative SignIn Test', function() {
//
//     it('should not signIn with incorrect username or password as parameters', function (done) {
//         request.post('http://localhost:3004/SignIn', {
//             form: {
//                 username: 'X@Y.com',
//                 password: 'X543',
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(401, response.statusCode);
//             done();
//         });
//     });
// });
//
describe('SignUp Test', function() {

    it('should signUp with username, password, firstname, lastname as parameters for new user', function (done) {
        request.post('http://localhost:3001/SignUp', {
            form: {
                firstName: 'C',
                lastName: 'D',
                email: 'C@D.com',
                password: 'C54321',
                credentials: true
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(201, response.statusCode);
            done();
        });
    });
});

// describe('Negative SignUp Test', function() {
//
//     it('should not signUp with username, password, firstname, lastname as parameters for existing user', function (done) {
//         request.post('http://localhost:3004/SignUp', {
//             form: {
//                 firstName: 'X',
//                 lastName: 'Y',
//                 email: 'X@Y.com',
//                 password: 'X54321',
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(201, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Positive Get Activity Test', function() {
//
//     it('should retrun recent activities of user', function (done) {
//         request.post('http://localhost:3004/activity', {
//             form: {
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Negative Get Activity Test', function() {
//
//     it('should retrun recent activities of user', function (done) {
//         request.post('http://localhost:3004/activity', {
//             form: {
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(401, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Delete File Test', function() {
//
//     it('should delete file with given parameters', function (done) {
//         request.post('http://localhost:3004/fileActions/deleteFile', {
//             form: {
//                 DocName : "Height of tree.py",
//                 DocPath : "./public/upload/X@Y.com/",
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Create Folder Test', function() {
//
//     it('should create folder with given parameters', function (done) {
//         request.post('http://localhost:3004/folderActions/createFolder', {
//             form: {
//                 currentPath: "./public/upload/X@Y.com/",
//                 foldername: "TestFolder2",
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(201, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Remove Folder Test', function() {
//
//     it('should remove folder with given parameters', function (done) {
//         request.post('http://localhost:3004/folderActions/removeFolder', {
//             form: {
//                 currentPath: "./public/upload/X@Y.com/",
//                 foldername: "TestFolder",
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Get Documents Test', function() {
//
//     it('should get documents with given parameters', function (done) {
//         request.post('http://localhost:3004/getDocs', {
//             form: {
//                 currentPath: "./public/upload/X@Y.com/",
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Negative IsSignedIn Test', function() {
//
//     it('should check if user is signedIn or not', function (done) {
//         request.post('http://localhost:3004/IsSignedIn', {
//             form: {
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(401, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Star Folder Test', function() {
//
//     it('should star folder with given parameters', function (done) {
//         request.post('http://localhost:3004/starUnstarDoc', {
//             form: {
//                 DocPath: "./public/upload/X@Y.com/",
//                 DocName: "TestFolder2",
//                 Star: 0,
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('UnStar Folder Test', function() {
//
//     it('should unstar folder with given parameters', function (done) {
//         request.post('http://localhost:3004/starUnstarDoc', {
//             form: {
//                 DocPath: "./public/upload/X@Y.com/",
//                 DocName: "TestFolder2",
//                 Star: 1,
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('Star File Test', function() {
//
//     it('should star file with given parameters', function (done) {
//         request.post('http://localhost:3004/starUnstarDoc', {
//             form: {
//                 DocPath: "./public/upload/X@Y.com/",
//                 DocName: "Lab 1 _ Problem 2.txt",
//                 Star: 0,
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });
//
// describe('', function() {
//
//     it('should unstar folder with given parameters', function (done) {
//         request.post('http://localhost:3004/starUnstarDoc', {
//             form: {
//                 DocPath: "./public/upload/X@Y.com/",
//                 DocName: "Grid Problem.py",
//                 Star: 1,
//                 credentials: true
//             }
//         }, function (error, response, body) {
//             console.log(response.statusCode);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });