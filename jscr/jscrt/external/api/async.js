//promises

fetch("https://zenquotes.io/api/random") //when this works go to the next line (then)
.then(response => response.json())  //"then" do this, response is a random var
.then(data => {
    console.log(data); 
    return data;
  }) // "if res works then", data is a random var
.then(dataauth => console.log("The author is: ", dataauth[0].a))

//asynchronous 

async function fetchArts() {
  const response = await fetch("https://api.artic.edu/api/v1/artworks")
  const data = await response.json();
  console.log("Fetched Artworks: ",data);
}
fetchArts();


