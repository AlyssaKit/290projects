const catsList = [{
    name: "Uki",
    age: 11,
    nicknames: ["Uki Puki", "Ukelele", "Old Man"],
    siblings: [],
    fur_color: "Orange",
    fur_length: "Short"
  },
  {
    name: "Nico",
    age: 4,
    nicknames: ["Princess", "Nico Pico"],
    siblings: [],
    fur_color: "Black",
    fur_length: "Short"
  },
  {
    name:"Nova",
    age: 16,
    nicknames:["NoNo","Novie","Old Lady No"],
    siblings:[],
    fur_color:"Tortoiseshell",
    fur_length:"Long"
  },
  {
    name:"Austin",
    age:5,
    nicknames:["Ausie","Fatboy","Binky"],
    siblings:[],
    fur_color:"Lynx Point",
    fur_length:"Short"
  },
  {
    name:"Luna",
    age:4,
    nicknames:["Gooey Girl","Oooey Gooey","Lu"],
    siblings:[],
    fur_color:"Brown Tabby",
    fur_length:"Short"
  },
  {
    name:"Artemis",
    age: 3,
    nicknames:["Fartie","Arkel Farkel","Artie"],
    siblings:[],
    fur_color:"Dilute Tortoiseshell",
    fur_length:"Short"
  },
  {
    name:"Mochi",
    age: 3,
    nicknames:["Lady M","Mochal Cheese","Mocheesy"],
    siblings:[],
    fur_color:"Brown Tabby",
    fur_length:"Long"
  },
  {
    name:"Thalia",
    age: 3,
    nicknames:["Tilly","Willus","Baby Bear"],
    siblings:[],
    fur_color:"Brown Tabby, split face",
    fur_length:"Medium"
  }
  ];
console.log("connecting");
const credentials = require("./dbCredentials.js");
console.log("connecting");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Cat = require("./models/Cats.js");

async function loadAllRecords() {
  await Cat.deleteMany();
  const allCats= [];
  for (let i = 0; i < catsList.length; i++) {
    const aCat = new Cat(catsList[i]);
    allCats[i] = aCat;
    await aCat.save();
  }
  for(let i = 0; i < catsList.length; i++){
    const aCat = allCats[i];
    let trueCounter = 0;
    for(let j = 0; j < catsList.length; j++){
      if(j != i ){
        aCat.siblings[trueCounter] = allCats[j];
        trueCounter++;
      }
    }
    await aCat.save();
  }
  console.log(allCats);
  console.log("done with cats");

  mongoose.connection.close();
}

loadAllRecords();