const routeHelper = require("../routes/routeHelper.js");

const Cats = require("../models/Cats");

exports.catList = async function (req, res) {
    try{
    let catsList = await Cats.find().sort("age").exec();
    res.render("catsList.ejs", {catsList: catsList});
    } catch (err) {
        next(err);
    }
};

exports.catListByName = async function (req, res) {
    try{
    let namePatternToMatch = new RegExp(req.params.name, "i");
    let catsList = await Cats.find()
        .where("name")
        .regex(namePatternToMatch)
        .sort("name")
        .exec();
    res.render("catsList.ejs", {catsList: catsList});
    } catch (err) {
        next(err);
    }
};

exports.catById = async function (req, res) {
    try{
    let cat = await Cats.findById(req.params.id).populate("siblings").exec();
    res.render("catSingle.ejs", {cat:cat});
    } catch (err) {
        next(err);
    }
};

exports.create = async function (req, res, next) {
    try {
      let cat = new Cats({});
      let cats = await Cats.find().select("name").exec();
  
      res.render("catForm.ejs", {title: "Create Cat", cat: cat, cats: cats});
    } catch (err) {
      next(err);
    }
  };

exports.update_get = async function (req, res, next) {
  try {
    let cat = await Cats.findById(req.params.id).populate("siblings").exec();
    let cats = await Cats.find().select("name").exec();

    res.render("catForm.ejs", { title: "Update cat", cat: cat, cats: cats});
  } catch (err) {
    var err = new Error("Cat not found");
    err.status = 404;
    return next(err);
  }
};

exports.update_post = [

    async function (req, res, next) {
    let cat = await Cats.findById(req.params.id).populate("siblings").exec();
    let cats = await Cats.find().select("name").exec();
    if (cat === null){
        cat = new Cats({ _id: req.body.id });
    }
    let nicknamesList = req.body.nicknames.split("\n");
    for (let i = 0; i < nicknamesList.length; i++) {
        nicknamesList[i] = nicknamesList[i].trim();
      if (nicknamesList[i] === "") {
        nicknamesList.splice(i, 1);
        i--;
      }
    }

    console.log(req.body);

    cat.name = req.body.name;
    cat.age = req.body.age;
    cat.nicknames = nicknamesList;
    cat.siblings = req.body.siblings !== "" ? req.body.siblings : undefined;
    cat.fur_color = req.body.fur_color;
    cat.fur_length = req.body.fur_length;

    console.log(cat);

    cat
        .save()
        .then((cat) => {
        res.redirect(cat.url);
        })
        .catch((err) => {
        console.log(err.message);
        res.render("catForm.ejs", {
            title: "Update Cat",
            cat: cat,
            cats: cats,
            errors: routeHelper.errorParser(err.message),
        });
        });
}
];
