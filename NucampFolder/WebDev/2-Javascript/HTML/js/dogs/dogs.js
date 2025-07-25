const url = 'https://dog.ceo/api/breeds/image/random';

async function fetchDog() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayDog(data.message);


        document.getElementById('dog').textContent = `<img src="${data.message}" alt="Random Dog" />`;
    } catch (error) {
        console.error('There was an error fetching the dog image:', error);
    }
}

function displayDog(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Random Dog photo';
    img.width = 500;
    document.querySelector('#dog').appendChild(img);
}
// DOMContentLoaded in JavaScript is an event that fires on the document object 
// when the initial HTML document has been completely loaded and parsed, and 
// the Document Object Model (DOM) is fully constructed. This event occurs 
// without waiting for external resources like stylesheets, images, and 
// subframes to finish loading. 

document.addEventListener('DOMContentLoaded', fetchDog);
document.querySelector('#fetchDogButton').addEventListener('click', fetchDog);
document.querySelector('#fetchDogButton').disabled = false;