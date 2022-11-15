var express = require("express");
var router = express.Router();
 
router.get("/", function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    if (!req.cookies || !req.cookies["counter"]) res.cookie("counter", 1);
    console.log("Cookies: ", req.cookies);
    res.render("index.ejs", {counter: req.cookies["counter"] ? req.cookies["counter"] : 1});
});
 
// router.post("/", function(req, res, next){
//   res.render("index.ejs", {
//     counter: req.cookies['counter'] ? req.cookies['counter'] : 1,
//   });
// })
 
module.exports = router;