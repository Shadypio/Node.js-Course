const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
	console.log("in users middleware!");
	res.send("<h1>users from Express!</h1>");
});

app.use("/", (req, res, next) => {
	console.log("in nothing middleware!");
	res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
