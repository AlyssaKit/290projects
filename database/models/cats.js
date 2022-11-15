const {ObjectId} = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CatsSchema = new Schema({
  name: {type: String, 
          required: [true, "Please provide a name"],
        },
  age: {type: Number,     
        required: [true, "Please provide an age"],
        min: [0, "Minimum Age is 0"],
        max: [50, "Maximum Age is 50"],
        },
  nicknames: {
          type: [{ type: String }],
          validate: [
            function (value) {
              console.log(value.length);
              return ((value.length >= 1)&&(value.length <= 5));
            },
            "please enter at least one nickname.",
          ],
        },
  siblings:  [{type: Schema.Types.ObjectId, ref:"Cats"}],
  fur_color: {type: String,
              required: [true, "Please provide a fur color"]},
  fur_length: {type: String,
              required: [true, "Please provide a fur length"]}
});

CatsSchema.virtual("url").get(function () {
  return "/Cats/id/" + this._id;
});

CatsSchema.virtual("getFullName").get(function () {
  return this.name + " Kittle";
});

module.exports = mongoose.model("Cats", CatsSchema);