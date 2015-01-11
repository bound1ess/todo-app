var assert = require("assert"), request = require("supertest"), app = require("../src/app")();

describe("ToDo application", function() {
    describe("GET /", function() {
        it("should return an HTML page with 200 OK code", function(done) {
            request(app).get("/").expect("Content-Type", /html/).expect(200, done);
        });
    });
});
