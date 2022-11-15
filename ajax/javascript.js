const movies = document.querySelector("#movies");

const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", loadMovies);

async function loadMovies(httpsInput, num){
    const directorNametext = document.querySelector("#inputField1");
    let DirName = directorNametext.value;
    if (num == 1){
        DirName = "";
    }
    movies.replaceChildren([]);
    fetch("https://ghibliapi.herokuapp.com/films?director=" + DirName)
    .then(function(response) {
        if(response.status == 200){
        return response.json();
        }else throw console.error("Issue with request:", response);
    })
    .then(function(data){
        console.log(data);
        let newHTML = "";
        for (const individualMovie of data) {
            let movieHTML = createIndivMov(individualMovie);
            newHTML += movieHTML;
        }
    movies.innerHTML += newHTML;
    })    
    .catch(function(err){
        console.log("Problem: " + err.message);
    })
}

function createIndivMov(individualMovie) {
    let resultString = "<div><div class='single-movie border border-3 border-info rounded-2'>\n";
    resultString += "  <div>\n";
    resultString += `    <h2 class='movie-title border border-3 border-primary'>${individualMovie.title}</h2>\n`;
    resultString += "  </div>\n";
    resultString += "  <div>\n";
    resultString += "    <h3>Movie Image </h3>";
    resultString += `     <img src="${individualMovie.image}" alt="${individualMovie.title} movie image" width="200">\n`;
    resultString += "    <h3>Description: </h3>";
    resultString += `      <p>${individualMovie.description}</p>\n`;
    resultString += "    <h3>Director: </h3>";
    resultString += `      <p>${individualMovie.director}</p>\n`;
    resultString += "    <h3>Original Title: </h3>";
    resultString += `      <p>${individualMovie.original_title}</p>\n`;
    resultString += "    <h3>Producers: </h3>";
    const producerName = individualMovie.producer.split(",");
    for(let i = 0; i < producerName.length; i++){
        resultString += `      <li>${producerName[i]}</li>\n`;
    }
    resultString += "    <br>";
    resultString += "    <h3>Running Time: </h3>";
    resultString += `      <p>${individualMovie.running_time} minutes</p>\n`;
    resultString += "  </div>\n";
    resultString += "</div></div>\n";
    resultString += "<br>\n";
    return resultString;
}
