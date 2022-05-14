const express = require("express");

const router = require("./routes/sessionRoute");
const checkoutRouter = require("./routes/checkoutRoute");
const mainPageRoute = require("./routes/mainpageRoute");
const userRoute = require("./routes/userRoute");
const errorRoute = require("./routes/errorRoute");

const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const app = express();



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("express-art-template"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/node_modules/", express.static("./node_modules/"));
app.use("/public/", express.static("./public/"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(router);
app.use("/checkout", checkoutRouter);
app.use(mainPageRoute);
app.use(userRoute);
app.use(errorRoute);

app.listen(3000, function () {
  console.log("app is running at port 3000");
});

module.exports = app;
