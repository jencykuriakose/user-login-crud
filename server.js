const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const router = require("./router");
// const port=process.env.port||3002;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// load static assets
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(
  session({
    secret: "SECRET HERE",
    resave: false,
    saveUninitialized: true,
  })
);

//middleware that controls cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use("/route", router);

// home root
app.get("/", (req, res) => {

  if(!req.session.user){
   return res.render("base", { title: "login" });
  }

  res.redirect('/route/dashboard')
});

app.use("/home",(res,req)=>
  {
    res.send(hello);
  });

  


app.listen(3000, () => {
  console.log("listening to the server on http://localhost:3000");
});