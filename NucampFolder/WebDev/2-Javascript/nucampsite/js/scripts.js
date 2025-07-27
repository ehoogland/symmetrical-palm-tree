


console.log('javascript connected!'); // testing
/** 
 * Instantiate a new Bootstrap carousel object with ID matching that in the
 * HTML files, with properties of interval and pause. 
 * The interval cycle property is in milliseconds. 
 * Carousel cycles automatically on load because pause property is set to false
 */   
const carousel = new bootstrap.Carousel('#homeCarousel', {
    // may want to change to 2000 when testing
    interval: 5000,
    pause: false
})
// Carousel play/pause button logic
const carouselPauseBtn = document.getElementById('carouselPause');
const carouselPlayBtn = document.getElementById('carouselPlay');

if (carouselPauseBtn) {
    carouselPauseBtn.addEventListener('click', function () {
        carousel.pause();
    });
}
if (carouselPlayBtn) {
    carouselPlayBtn.addEventListener('click', function () {
        carousel.cycle();
    });
}

// Fetch the weather data from the OpenWeather API
// and log it to the console
async function fetchWeather() {
    try {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const city = 'Indianapolis'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // data is the JSON object returned from my fetch request
        let data = await response.json();
        console.log(data);
        // Display the weather data
        displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        }
        // Display the weather data in the weather div
        function kelvinToCelsius(k) {
            return (k - 273.15).toFixed(2);
        }
        function kelvinToFahrenheit(k) {
            return ((k - 273.15) * 9/5 + 32).toFixed(2);
        }

        function displayWeather(data){
            const weatherDiv = document.getElementById('weather');
            // Clear previous content
            weatherDiv.textContent = '';
            if (data && data.weather && data.weather.length > 0) {
                const temperatureCelsius = kelvinToCelsius(data.main.temp);
                const temperatureFahrenheit = kelvinToFahrenheit(data.main.temp);
                const feelsLikeCelsius = kelvinToCelsius(data.main.feels_like);
                const feelsLikeFahrenheit = kelvinToFahrenheit(data.main.feels_like);
                const humidity = data.main.humidity;
                const weatherDescription = data.weather[0].description;
                const weatherIcon = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

                // All weather elements are now created and attached to the DOM together using a document fragment,
                // ensuring nothing is missed. The weather info and image will always appear in the correct order.
                const fragment = document.createDocumentFragment();
                // Add city name
                const citySpan = document.createElement('span');
                citySpan.textContent = `Weather in ${data.name}: `;
                fragment.appendChild(citySpan);
                // Add description
                const descSpan = document.createElement('span');
                descSpan.textContent = weatherDescription + ', ';
                fragment.appendChild(descSpan);
                // Create and append image
                const img = document.createElement('img');
                img.src = iconUrl;
                img.alt = weatherDescription;
                img.style.verticalAlign = 'middle';
                fragment.appendChild(img);
                // Add humidity and feels like on a single second line
                const secondLine = document.createElement('div');
                secondLine.style.fontSize = '0.9em';
                secondLine.style.width = '100%';
                secondLine.style.color = '#e0e0e0';
                secondLine.style.marginTop = '2px';
                secondLine.textContent = `Humidity: ${humidity}% | Temp: ${temperatureCelsius}\u00B0C, ${temperatureFahrenheit}\u00B0F | Feels like: ${feelsLikeCelsius}\u00B0C, ${feelsLikeFahrenheit}\u00B0F`;
                fragment.appendChild(secondLine);
                // Append all at once
                weatherDiv.appendChild(fragment);
            } else {
                weatherDiv.textContent = 'Weather data not available';
            }
        }
       
        fetchWeather(); // Call the fetchWeather function to get the weather data

