var assert = require("assert"), request = require("supertest"), app = require("../src/app")();

var fs = require("fs"), getTasks = function() {
    var tasksFile = __dirname + "/../public/data/tasks.json";

    // Checking for possible errors would not be a bad idea, but this will do (for now).
    return JSON.parse(fs.readFileSync(tasksFile, "utf8")).tasks;
};

describe("ToDo application", function() {
    describe("GET /", function() {
        it("should return an HTML page with 200 OK code", function(done) {
            request(app).get("/").expect("Content-Type", /html/).expect(200, done);
        });
    });

    describe("POST /tasks/add", function() {
        it("should receive a POST request and update the tasks file", function(done) {
            var task = {
                id: 5,
                body: "Sample task",
                isCompleted: false
            };

            request(app)
                .post("/tasks/add")
                .send(task)
                .expect("OK")
                .expect(200)
                .end(function(error) {
                    if (error) {
                        return done(error);
                    }

                    var lastTask = getTasks().pop();

                    assert.equal(task.id, lastTask.id);
                    assert.equal(task.body, lastTask.body);
                    assert.equal(task.isCompleted, lastTask.isCompleted);

                    done();
                });
        });
    });

    describe("POST /tasks/update", function() {
        it("should receive a POST request and update the tasks file", function(done) {
            var taskId = 0, currentState = getTasks()[taskId].isCompleted;

            request(app)
                .post("/tasks/update")
                .send({id: taskId + 1})
                .expect("OK")
                .expect(200)
                .end(function(error) {
                    if (error) {
                        return done(error);
                    }

                    assert.notEqual(currentState, getTasks()[taskId].isCompleted);

                    done();
                });
        });
    });
});
