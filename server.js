var express = require("express"), app = express();
var fs = require("fs"), bodyParser = require("body-parser");

var tasksFile = __dirname + "/public/data/tasks.json";

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.json({extended: false}));

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});

app.post("/tasks/add", function(request, response) {
    var tasks;

    fs.readFile(tasksFile, "utf8", function(error, data) {
        if (error !== null) {
            return false;
        }

        tasks = JSON.parse(data).tasks;
        tasks.push(request.body);

        fs.writeFile(tasksFile, JSON.stringify({tasks: tasks}, null, 4), "utf8");
    });

    response.send("OK");
});

app.post("/tasks/update", function(request, response) {
    var taskId = parseInt(request.body.id) - 1, tasks;
    
    fs.readFile(tasksFile, "utf8", function(error, data) {
        if (error !== null) {
            return false;
        }

        tasks = JSON.parse(data).tasks;

        if (tasks[taskId] !== undefined) {
            tasks[taskId].isCompleted = !tasks[taskId].isCompleted;
        }
        
        fs.writeFile(tasksFile, JSON.stringify({tasks: tasks}, null, 4), "utf8");
    });

    response.send("OK");
});

console.log("Listening on localhost:8000...");
app.listen(8000);
