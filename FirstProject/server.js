var http = require("http");
var PORT = 8080;

const server = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
};

const htmlResponse = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello World</h1>");
};

http.createServer(htmlResponse).listen(3000, () => {
    console.log("Server running on port 3000");
})

http.createServer(server).listen(PORT, () => {
  console.log("Server running at http://127.0.0.1:8080/");
});
