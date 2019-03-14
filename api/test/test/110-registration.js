var assert = require("assert");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();

chai.use(chaiHttp);

let host = "http://127.0.0.1:5000/api/v1";
let client_email = "test.reg@init.com";
let client_password = "test123";
let client_first_name = "test-firstname";
let client_last_name = "test-lastname";
let client_id = "12to6uxur1fhzkl5rhemhmcfb6qmvmljg059e61a";
let admin_email = "tomislav@initgrupa.hr";
let admin_password = "test123";
var admin_access_token;
var id_user;

describe("USER REGISTRATION", function () {

    it("/users/registration POST should return 201 and access_token", function (done) {
        let data = {
            email: client_email,
            password: client_password,
            first_name: client_first_name,
            last_name: client_last_name,
            client_id: client_id
        }

        chai.request(host)
            .post("/users/registration")
            .send(data)
            .end(function (err, res) {
                res.status.should.be.equal(201);
                res.should.be.json;
                id_user = res.body["id_user"];
                done();
            });
    });

    it("/oauth/login POST should return 200 and correct id_user when registered email and password is sent", function (done) {
        chai.request(host)
            .post("/oauth/login")
            .field("client_id", client_id)
            .field("email", client_email)
            .field("password", client_password)
            .end(function (err, res) {
                res.status.should.be.equal(200);
                res.should.be.json;
                assert(res.body["id_user"] === id_user, "correct id_user returned")
                done();
            });
    });

    it("/users/password POST should send password reset mail", function (done) {
        let data = {
            email: client_email,
            action: "reset"
        }

        chai.request(host)
            .post("/users/password")
            .send(data)
            .end(function (err, res) {
                res.status.should.be.equal(200);
                done();
            });
    });

    it("/users/<id_user> DELETE should return 201 (admin)", function (done) {
        chai.request(host)
            .post("/oauth/login")
            .field("client_id", client_id)
            .field("email", admin_email)
            .field("password", admin_password)
            .end(function (err, res) {
                res.status.should.be.equal(200);
                admin_access_token = res.body["access_token"];

                chai.request(host)
                    .delete("/users/" + id_user)
                    .set("Authorization", "Bearer " + admin_access_token)
                    .end(function (err, res) {
                        res.status.should.be.equal(200);
                        done();
                    });
            });


    });
});