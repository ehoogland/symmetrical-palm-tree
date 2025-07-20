async function fetchHero() {
  /* This line below is fetching data from a website API. You haven't learned how to do this just yet, so here's a short explanation of what it does:
  - 'fetch' is the function that sends a query to the website url, in this case this website https://www.superheroapi.com.
  - 'await' tells JavaScript that the answer won't come back immediately and it needs to wait for it.
  - 'then' tells JavaScript what to do with the website answer when it comes back
  - 'response' is what the website sends back. We then use the text() function to get the text result.
  
  */
  const hero = await fetch('https://www.superheroapi.com/api.php/1079471338910705/731')
    .then((response) => response.text())
  
  /**** Step 1: print in the console the value of 'hero'. 
  Check that it is a JSON in a string format. ****/
  console.log(hero);// Add your code here

  /**** Step 2: transform this string into a JavaScript Object 
  and console.log it ****/
  
  let jsobject = JSON.parse(hero);
  console.log(jsobject);
  
  /**** Step 3: using the function alert, display the name and the eye color of the Hero ****/
  
  alert(`Name of Hero: ${jsobject.name}, Color of Eyes: ${jsobject.appearance["eye-color"]}`);
  
  /**** Step 4: create a new constant named 'myHero' following the same format. Same fields can be set as 'null' ****/
  // Add your code here
  const myHero = {
    "appearance": {
            "eye-color": "Green",
            "gender": "Male",
            "hair-color": "No Hair",
            "height": [
                    "6'8",
                    "203 cm"
            ],
            "race": "Human / Radiation",
            "weight": [
                    "980 lb",
                    "441 kg"
            ]
    },
    "biography": {
            "aliases": [
                    "Agent R-7",
                    "Ravager of Worlds"
            ],
            "alignment": "bad",
            "alter-egos": "No alter egos found.",
            "first-appearance": "Tales to Astonish #90",
            "full-name": "Emil Blonsky",
            "place-of-birth": "Zagreb, Yugoslavia",
            "publisher": "Marvel Comics"
    },
    "connections": {
            "group-affiliation": "former member of the crew of the Andromeda Starship, ally of the Abominations and Forgotten",
            "relatives": "Nadia Dornova Blonsky (wife, separated)"
    },
    "id": "4",
    "image": {
            "url": "https://www.superherodb.com/pictures2/portraits/10/100/1.jpg"
    },
    "name": "Abomination",
    "powerstats": {
            "combat": "95",
            "durability": "90",
            "intelligence": "63",
            "power": "62",
            "speed": "53",
            "strength": "80"
    },
    "response": "success",
    "work": {
            "base": "Mobile",
            "occupation": "Ex-Spy"
    },
};
 
  alert(`Name of Action Hero: ${myHero.name}`);
  alert(`Color of ${myHero["name"]}'s eyes: ${myHero.appearance["eye-color"]}`);
 
  
  /**** Step 5: create a new 'heroes' array and add both 'hero' and 'myHero' to it. Then create a stringified version of the array it   using the JSON.stringify function, and console.log() it. ****/
  const heroes = [];
  heroes.push(heroObject);
  heroes.push(myHero);
  console.log(JSON.stringify(heroes));
}

fetchHero();
