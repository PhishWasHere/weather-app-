
console.log('ini test!');

const inputEl = $("#search-input");
const searchBtnEl = $('#search');

const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

const apiKey = "c836c427c2ca2f420ea0eaec7e0726da";

const recentCitiesEl = $('#recentCities');

(searchBtnEl).on('click', function(e) {
  e.preventDefault();    
  const text = inputEl.val();
  searchHistory.unshift(text);

  if (searchHistory.length > 6) {
      searchHistory.pop();
  }

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); //stop array from saving dupes
  console.log('Saved to localStorage:', text);

  getWeather(); 

});

const output = $('.output');

function getWeather(){
    const city = searchHistory[0];
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    if (inputEl.val() === '') {
      inputEl.attr('placeholder', 'Please enter a valid city')
      this.css('color', 'red'); //figureout why this doesnt work later
      return;
    };
    
    fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    
    .then(function(data) {
      console.log('5-day forecast for', city, ':', data);

      localStorage.setItem('localFoercast', JSON.stringify(data));
      // location.replace('./forecast.html')
    })
    .catch(function(error) {
      console.log('Error fetching weather data:', error);
    });
};



