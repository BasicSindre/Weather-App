window.onload = function() {
    // Function to format date and time
    function formatDateTime(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return date.toLocaleDateString(undefined, options);
    }

    // Function to update date and time on the webpage
    function updateDateTime() {
        const dateTimeElement = document.getElementById('date-time');
        const currentDate = new Date();
        const formattedDateTime = formatDateTime(currentDate);
        dateTimeElement.textContent = `Current date and time: ${formattedDateTime}`;
    }

    // Function to fetch weather for today and the next six days
    function getWeatherForDays() {
        const apiKey = 'c71ff8a37ce64d37961201627232212'; // Replace with your WeatherAPI.com API key
        const location = 'Oslo'; // Replace with the desired location
        const apiUrlBase = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;

        fetch(apiUrlBase)
            .then(response => response.json())
            .then(data => {
                const weatherContainer = document.getElementById('weather-info');
                for (let i = 0; i < 7; i++) {
                    const date = new Date(data.forecast.forecastday[i].date);
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const weatherText = data.forecast.forecastday[i].day.condition.text; // Get the weather text
                    const weatherIcon = data.forecast.forecastday[i].day.condition.icon; // Get the weather icon URL

                    const weatherElement = document.createElement('div');
                    weatherElement.className = 'weather-day';
                    const dayElement = document.createElement('h2');
                    dayElement.textContent = `${dayOfWeek}`;

                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'weather';

                    const textElement = document.createElement('p');
                    textElement.textContent = `${weatherText}`;
                    const iconElement = document.createElement('img');
                    iconElement.alt = `${dayOfWeek} Weather Icon`;
                    iconElement.src = `https:${weatherIcon}`;

                    infoDiv.appendChild(textElement);
                    infoDiv.appendChild(iconElement);

                    weatherElement.appendChild(dayElement);
                    weatherElement.appendChild(infoDiv);
                    weatherContainer.appendChild(weatherElement);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    // Update date and time immediately on page load and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Fetch and display weather for today and the next six days
    getWeatherForDays();
};
