const express = require("express");
var router = express.Router();

// login user
const user = {
  email: "admin@gmail.com",
  password: "admin123",
};

router.post("/login", (req, res) => {
  if (req.body.email === user.email && req.body.password === user.password) {
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
  } else {
    res.end("invalid username");
  }
});
// route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.send("unauthorized user");
  }
});

// route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      if (req.session?.user) req.session.user = null;
      res.render("base", { title: "Express", logout: "logout successfully" });
    }
  });
});

module.exports = router;
