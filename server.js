var express = require("express"), app = express();
var fs = require("fs"), bodyParser = require("body-parser");

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});

app.post("/tasks/add", function(request, response) {
    var tasksFile = __dirname + "/public/data/tasks.json", tasks;

    fs.readFile(tasksFile, "utf8", function(error, data) {
        if (error === null) {
            tasks = JSON.parse(data).tasks;
        }

        tasks.push({body: request.param("body"), isCompleted: false});
        console.log(request);
        //fs.writeFile(tasksFile, JSON.stringify(tasks), "utf8");
    });

    response.send("OK");
});

app.listen(8000);
