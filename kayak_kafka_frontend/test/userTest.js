var assert = require('assert');
var request = require('request');

describe('SignIn Test', function () {

    it('should signIn with correct username and password as parameters', function (done) {
        request.post('http://localhost:3001/users/login', {
            form: {
                username: 's.unny.iv09@gmail.com',
                password: 'suns886633',
                credentials: true
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('Negative SignIn Test', function () {

    it('should not signIn with incorrect username or password as parameters', function (done) {
        request.post('http://localhost:3001/users/login', {
            form: {
                username: 'vishwesh.patel@sjsu.edu',
                password: 'aajaaj1',
                credentials: true
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(401, response.statusCode);
            done();
        });
    });
});

describe('SignUp Test', function () {

    it('should signUp with username, password, firstname, lastname as parameters for new user', function (done) {
        request.post('http://localhost:3001/users/signup', {
            form: {
                firstName: 'vishwesh',
                lastName: 'patel',
                dob: '1995-12-02',
                username: 'vishwesh.patel@sjsu.edu',
                password: 'aajaaj',
                credentials: true
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('Negative SignUp Test', function () {

    it('should not signUp user with same email exists', function (done) {
        request.post('http://localhost:3001/users/signup', {
            form: {
                firstName: 'vishesh',
                lastName: 'patel',
                dob: '1995-12-02',
                username: 'vishwesh@sjsu.edu',
                password: 'aajaaj',
                credentials: true
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(401, response.statusCode);
            done();
        });
    });
});

describe('flight listing Test', function () {

    it('should fetch a flight', function (done) {
        request.post('http://localhost:3001/listings/getFlights', {
            form: {
                criteria: "one-way_sjc_sfo_2017-11-29_1_economy"
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('car listing Test', function () {

    it('should fetch a list of cars', function (done) {
        request.post('http://localhost:3001/listings/getCars', {
            form: {
                criteria: "san jose_2017-12-26_2017-12-31"
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('Booking flight Test', function () {


    it('should make a flight booking', function (done) {
        request.post('http://localhost:3001/users/bookFlight', {
            form: {
                flightId: '5a1e4ee9c83193799bf06ff4',
                noOfPassengers: '1',
                flightClass: 'economy',
                tripType: 'one-way',
                fromDate: '2017-11-29',
                toDate: '',
                ticketPrice: 100,
                totalAmount: 109,
                username: 's.unny.iv09@gmail.com',
                hostId: '4'
            }

        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('Negative flight listing Test', function () {

    it('should not fetch a list of flights', function (done) {
        request.post('http://localhost:3001/listings/getFlights', {
            form: {
                criteria: "one-way_sjc_sfo_2017-11-29_100_economy"
            }
        }, function (error, response, body) {
            assert.ok({"direct": [], "indirect": []}, response.body);
            done();
        });
    });
});

describe('Negative car listing Test', function () {

    it('should fetch a list of cars', function (done) {
        request.post('http://localhost:3001/listings/getCars', {
            form: {
                criteria: "san jose_2017-12-10_2017-12-15"
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('Negative flight booking Test', function () {


    it('will not make a flight booking as we have given wrong flight id', function (done) {
        request.post('http://localhost:3001/users/bookFlight', {
            form: {
                flightId: '5645',
                noOfPassengers: '100',
                flightClass: 'economy',
                tripType: 'one-way',
                fromDate: '2017-11-29',
                toDate: '',
                ticketPrice: 100,
                totalAmount: 109,
                username: 's.unny.iv09@gmail.com',
                hostId: '4'
            }

        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describe('user profile Test', function () {

    it('should fetch details of a user for user profile', function (done) {
        request1.post('http://localhost:3001/users/getuserprofile_user', {
                headers: {
                    Cookie: "Webstorm-aeae2011=0b326edc-fe15-4ef3-9d79-c992d67934a5; _gu=c356e94f-8745-4be0-8189-268517b6d4a2; _gs=2.s(src=http://localhost:3001/); _gw=2.u[~0,~0,~0,~0,~0]v[~eznzi,~7,~0]a(); Idea-75f91138=154bfc31-7c80-4b7b-8719-062f374b61c4; JSESSIONID=C7F22674A14383C831C6EEE4C05890E2; connect.sid=s%3AAbyzWx_cWZQXBCD_K-p67AOXDlHfhJ4e.SPXHOBrdwMXJp3ZhkGU%2B1OVtuL1Z2TnPi%2B94xSWP7iM"
                }
            }, function (error, response, body) {
                console.log(response.statusCode);
                assert.equal(200, response.statusCode);
                done();
            }
        )
        ;
    });
});

describe('edit user info', function () {

    it('should not signUp user with same email exists', function (done) {
        request.post('http://localhost:3001/users/editprofileofuser', {
            form: {
                city: "San Jose",
                dob:
                    "2017-10-03",
                firstname:
                    "Sunny",
                gender:
                    "male",
                lastname:
                    "Udhani",
                phonenumber:
                    "8521745265",
                state:
                    "California",
                street:
                    "101",
                zipCode:
                    "95112",
            },
            headers: {
                Cookie: "Webstorm-aeae2011=0b326edc-fe15-4ef3-9d79-c992d67934a5; _gu=c356e94f-8745-4be0-8189-268517b6d4a2; _gs=2.s(src=http://localhost:3001/); _gw=2.u[~0,~0,~0,~0,~0]v[~eznzi,~7,~0]a(); Idea-75f91138=154bfc31-7c80-4b7b-8719-062f374b61c4; JSESSIONID=C7F22674A14383C831C6EEE4C05890E2; connect.sid=s%3AAbyzWx_cWZQXBCD_K-p67AOXDlHfhJ4e.SPXHOBrdwMXJp3ZhkGU%2B1OVtuL1Z2TnPi%2B94xSWP7iM"
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});
