var assert = require("assert");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();

chai.use(chaiHttp);

let host = "http://127.0.0.1:5000/api/v1";
let admin_email = "tomislav@initgrupa.hr";
let admin_password = "test123";
let client_id = "12to6uxur1fhzkl5rhemhmcfb6qmvmljg059e61a";
let auth_response_fields = ["access_token", "id_user", "first_name", "last_name", "id_user_role", "email"];

  describe("USER LOGIN", function() {
    var access_token = "";

    it("/oauth/login POST should return 400 when invalid request is sent", function(done) {
        chai.request(host)
        .post("/oauth/login")
        .end(function(err, res){                   
          res.status.should.be.equal(400);
          done();
        });
    });

    it("/oauth/login POST should return 401 when invalid username and password is sent", function(done) {
        chai.request(host)
        .post("/oauth/login")
        .field("client_id", client_id)
        .field("email", "xxx@yyy.com")
        .field("password", "zzz")        
        .end(function(err, res){          
          res.status.should.be.equal(401);
          done();
        });
    });

    it("/oauth/login POST should return 401 when invalid password is sent", function(done) {
        chai.request(host)
        .post("/oauth/login")
        .field("client_id", client_id)
        .field("email", admin_email)
        .field("password", "zzz")        
        .end(function(err, res){          
          res.status.should.be.equal(401);
          done();
        });
    });

    it("/oauth/login POST should return 200 and access_token when correct email and password is sent", function(done) {
        chai.request(host)
        .post("/oauth/login")
        .field("client_id", client_id)
        .field("email", admin_email)
        .field("password", admin_password)        
        .end(function(err, res){          
          res.status.should.be.equal(200);
          res.should.be.json;          
          res.body.should.contain.all.keys(auth_response_fields);
          access_token = res.body["access_token"];
          done();
        });
    });

    it("/oauth/login POST should return 401 when invalid access_token is sent", function(done) {
        chai.request(host)
        .post("/oauth/login")
        .field("client_id", client_id)
        .field("access_token", "xxx")              
        .end(function(err, res){          
          res.status.should.be.equal(401);
          done();
        });
    });

    it("/oauth/login POST should return 200 when valid access_token is sent", function(done) {
        chai.request(host)
        .post("/oauth/login")
        .field("client_id", client_id)
        .field("access_token", access_token)        
        .end(function(err, res){          
          res.status.should.be.equal(200);
          res.should.be.json;          
          res.body.should.contain.all.keys(auth_response_fields);
          done();
        })
    });    
  });
