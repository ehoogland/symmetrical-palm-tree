

async function getACat() {
    try {
    // Fetch a random cat image from The Cat API     
    const url = "https://api.thecatapi.com/v1/images/search";
    const response = await fetch(url);
    const data = await response.json();
    document.querySelector(".img").src = data[0].url;
  } catch (error) {
    console.log(error);
  }
}

//getACat(); // Uncomment to fetch a cat image on page load


document.querySelector(".btn").addEventListener('click', () => {
    let loaded = document.querySelector(".img").complete;
    if (loaded) {
        getACat();
    }
});