
console.log('ini test!');

const inputEl = $("#search-input");
const searchBtnEl = $('#search');

const apiKey = "c836c427c2ca2f420ea0eaec7e0726da";

const maxRecentCities = 5; //work on showing recent
const recentCitiesEl = $('#recentCities');

(searchBtnEl).on('click', function(e) {
    e.preventDefault();    
    const text = inputEl.val();
    localStorage.setItem('savedInput', text);
    console.log('Saved to localStorage:', text);

    getWeather();
});

function getWeather(){
    const city = localStorage.getItem('savedInput');
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('5-day forecast for', city, ':', data);
      // Process the weather data as needed
    })
    .catch(function(error) {
      console.log('Error fetching weather data:', error);
    });
};

