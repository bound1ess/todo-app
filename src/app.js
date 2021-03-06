// Require Express.js, create a new Express application.
var express = require("express"), app = express();

// Require File System (fs) and the bodyParser middleware.
var fs = require("fs"), bodyParser = require("body-parser");

// Store path to the tasks.json file in a variable.
var tasksFile = __dirname + "/../public/data/tasks.json";

// Instruct Express to serve static files stored in public/.
app.use("/public", express.static(__dirname + "/../public"));

// Instruct Express to use the bodyParser middleware.
app.use(bodyParser.json({extended: false}));

// GET /
app.get("/", function(request, response) {
    // We just return the index.html file as a response.
    // Do not worry: Express will take care of setting up proper response headers.
    // Relative paths are considered suspicious, so we need to resolve() them first.
    response.sendFile(require("path").resolve(__dirname + "/../public/index.html"));
});

// POST /tasks/add
app.post("/tasks/add", function(request, response) {
    var tasks;

    // Not much to say here, see http://nodejs.org/api/fs.html.
    tasks = JSON.parse(fs.readFileSync(tasksFile, "utf8")).tasks
    tasks.push(request.body);

    // See the link above.
    // + stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    fs.writeFile(tasksFile, JSON.stringify({tasks: tasks}, null, 4), "utf8");

    // No matter what is going to happen, we send "OK" anyway.
    response.send("OK");
});

// POST /tasks/update
app.post("/tasks/update", function(request, response) {
    // The first element of an array has the index of 0, not 1, right?
    var taskId = parseInt(request.body.id) - 1, tasks;

    // Not much to say here, see http://nodejs.org/api/fs.html.
    tasks = JSON.parse(fs.readFileSync(tasksFile, "utf8")).tasks;

    // Perform a quick check just to ensure everything is OK.
    if (tasks[taskId] !== undefined) {
        tasks[taskId].isCompleted = !tasks[taskId].isCompleted;
    }

    // See the link above.
    // + stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    fs.writeFile(tasksFile, JSON.stringify({tasks: tasks}, null, 4), "utf8");

    // No matter what is going to happen, we send "OK" anyway.
    response.send("OK");
});

// Expose the app variable.
module.exports = function() {
    return app;
};
