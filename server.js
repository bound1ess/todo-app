// The actual server code is stored in the source directory.
var app = require("./src/server")();

// Display a user-friendly message.
console.log("Listening on localhost:8000...");

// Tell Express to listen for requests on port 8000.
// Feel free to change this value if you need to (e.g. the port is already in use).
app.listen(8000);
