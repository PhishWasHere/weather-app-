
console.log('ini test!');

const inputEl = $("#search-input");
const searchBtnEl = $('#search');

const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

const searchError = JSON.parse(localStorage.getItem('searchError')) || [];

const apiKey = "c836c427c2ca2f420ea0eaec7e0726da";

const recentCitiesEl = $('#recentCities');



(searchBtnEl).on('click', function(e) {
  e.preventDefault();    
  const text = inputEl.val();
  if (text.trim() === '') {  //checks to see if search box is empty
    inputEl.addClass('--bs-danger'); //why doesnt this work? who knows
    inputEl.attr('placeholder', 'Please enter a valid city')
    apiError2();
    return;
  }

  if (!searchHistory.includes(text)){ //makes sure you dont save copies
    searchHistory.unshift(text); 
    if (searchHistory.length > 6) { //makes sure you dont save more than 6 items
      searchHistory.pop();
  }}
  localStorage.setItem('searchError', JSON.stringify(searchHistory));
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  console.log('Saved to localStorage:', text);

  getWeather();
});


function getWeather(){ //fetch request
    const city = searchHistory[0];
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function(response) {
      if (!response.ok) { //checks if the response is valid
        console.log(response);
        searchHistory.shift();
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        apiError();
        throw new Error('Network error');
      } else {
      return response.json();
      }
    })

    .then(function(data) {
      console.log('5-day forecast for', city, ':', data);

      localStorage.setItem('localFoercast', JSON.stringify(data));
      location.replace('./forecast.html')
    })
    .catch(function(error) {
      console.log('Error fetching weather data:', error);
    });
}; 

const errorEl = $('.api-error');

function apiError() { //gives an error if the api fetch comes back with a invalid response

  let searchErrorEl = searchError[0]; //this comes back as "Undefined" the second time its run, even tho its updating properly in local storage
  console.log(searchError[0]);// after troubleshooting for an hour, i decided its a feature and decided to move on

  $(errorEl).empty();
  $(errorEl).append(`
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    There was an error trying to find data for <strong>${searchErrorEl}</strong>.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `);
  
  searchError.pop(); 
};

function apiError2() {  //gives an error if you try to search with an empty search box
  $(errorEl).empty();
  $(errorEl).append(`
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    Please enter a valid city
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `);
};

//i spent way too long on "bug catches", its not even a requirement. why am i like this?