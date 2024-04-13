const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const rootDir = require("./util/path");

const usersRoutes = require("./routes/users");
const homeRoutes = require("./routes/home");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(usersRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(rootDir, "views", "not-found.html"));
});

app.listen(3000);
