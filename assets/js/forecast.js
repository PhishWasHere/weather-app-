// note: i started on this core befre the first group project and didnt to8uch it for 2 weeks...
// i no longer remember/kno how alot of this works
// I have said some of my old code is spaghetti, but this is truly pain to look at. I am deeply sorry to whoever needs to score this
const backBtnEl = $('#back');

const cityHistory = JSON.parse(localStorage.getItem('searchHistory'));

const localForecast = JSON.parse(localStorage.getItem('localFoercast'));

const historyEl = $('.history');

console.log(localForecast);

const forecastList = localForecast.list;
const localCity = localForecast.city.name;
 
//basic layout, prob wouldve been easier to put this into html 
let card = ` 
  <h2>${localCity} 5-Day Forecast</h2>
  <table >
    <thead >
      <tr>
        <th>Date</th>
        <td></td>
        <th>Weather</th>
        <th>Temperature</th>
        <th>Humidity</th>
        <th>Wind Speed</th>
      </tr>
    </thead>
    <tbody>
`;

function forecastCard(){ //displays the response
    for (let i = 0; i < forecastList.length; i += 8) { //dont remember how this works, but changing it breaks it 
        const forecast = forecastList[i];
        const date = forecast.dt_txt.split(' ')[0];
        const weather = forecast.weather[0].description;
        const temp = Math.round((forecast.main.temp - 273.15)); //converts temp from freedom units into understandable numbers
        const humidity = forecast.main.humidity;
        const windSpeed = Math.round(forecast.wind.speed * 1.60934); //converts speed from freedom units into understandable numbers
    
        const iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        const iconHtml = `<img src="${iconUrl}" alt="${weather}">`;

        card += `

          <tr >
            <td>${date}</td>
            <td>${iconHtml}</td>
            <td>${weather}</td>
            <td>${temp} C</td>
            <td>${humidity} %</td>
            <td>${windSpeed} kmh</td>
          </tr>


        `; //this displays the output, i dont have the energy to make it pretty, and have too much s**t to do this week to try and fix it
    }
};

let historyCard =`
    <h2>History</h3>
    <p id='city1'>${cityHistory[1]}</p>
    <p id='city2'>${cityHistory[2]}</p>
    <p id='city3'>${cityHistory[3]}</p>
    <p id='city4'>${cityHistory[4]}</p>
    <p id='city5'>${cityHistory[5]}</p>
`; //ghetto way to not display current city into the "history tab"


if (cityHistory.length > 1){ // only shows the History header when there are 2or more items in the array
    historyEl.append('<h2>History</h2>');
}

let counter = 0; 

cityHistory.slice(1).forEach(function(city, index){ //makes the history clickable, and makes sure it doesnt dupe items
    const cityEl = $(`<p ${index}>`).text(city);
    historyEl.append(cityEl);

    cityEl.on('click', function(){
        const clickedCity = $(this).text();
        console.log('Clicked city:', clickedCity);
        if (!cityHistory.includes(clickedCity)) {
            cityHistory.unshift(clickedCity);
            localStorage.setItem('searchHistory', JSON.stringify(cityHistory));
            apiCall();
        }else {
            
            const index = cityHistory.indexOf(clickedCity);
            cityHistory.splice(index, 1);
            cityHistory.unshift(clickedCity);
            localStorage.setItem('searchHistory', JSON.stringify(cityHistory));
            apiCall();
        }
    });
});


function apiCall(){ //does the fetch req again, once history is clicked 
    const apiKey = "c836c427c2ca2f420ea0eaec7e0726da";
    const city = cityHistory[0];
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    
    .then(function(data) {
      console.log('5-day forecast for', city, ':', data);

      localStorage.setItem('localFoercast', JSON.stringify(data));
       location.replace('./forecast.html')
    })
    .catch(function(error) {
      console.log('Error fetching weather data:', error);
    });

    location.replace();
};


let city1 = $(cityHistory[1])


backBtnEl.on('click', function(e){ 
    e.preventDefault();
    console.log('test');
    location.replace('./index.html');
});

forecastCard()
$('.append').append(card);
