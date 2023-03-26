
const backBtnEl = $('#back');

const cityHistory = JSON.parse(localStorage.getItem('searchHistory'));

const localForecast = JSON.parse(localStorage.getItem('localFoercast'));

const historyEl = $('.history');

console.log(localForecast);

const forecastList = localForecast.list;
const localCity = localForecast.city.name;
 

let card = `
  <h2>${localCity} 5-Day Forecast</h2>
  <table>
    <thead>
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

function forecastCard(){
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = forecast.dt_txt.split(' ')[0];
        const weather = forecast.weather[0].description;
        const temp = Math.round((forecast.main.temp - 273.15)); 
        const humidity = forecast.main.humidity;
        const windSpeed = Math.round(forecast.wind.speed * 1.60934);
    
        const iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        const iconHtml = `<img src="${iconUrl}" alt="${weather}">`;

        card += `
        <tr>
            <td>${date}</td>
            <td>${iconHtml}</td>
            <td>${weather}</td>
            <td>${temp} C</td>
            <td>${humidity} %</td>
            <td>${windSpeed} kmh</td>
        </tr>
        `;
    }
    
    card += `
        </tbody>
        </table>
    `;
};

let historyCard =`
    <h2>History</h3>
    <p id='city1'>${cityHistory[1]}</p>
    <p id='city2'>${cityHistory[2]}</p>
    <p id='city3'>${cityHistory[3]}</p>
    <p id='city4'>${cityHistory[4]}</p>
    <p id='city5'>${cityHistory[5]}</p>
`; 


if (cityHistory.length === 0){ //fix this
    historyEl.append('<h2>History</h2>')
}

cityHistory.slice(1).forEach(function(city){

    const cityEl = $('<p>').text(city);
    historyEl.append(cityEl);

    cityEl.on('click', function(){
        console.log('click')
        
    })
});

let city1 = $(cityHistory[1])


// function displayHistory(){
//     console.log(cityHistory);
//     (historyEl).append(historyCard);
// };


backBtnEl.on('click', function(e){
    e.preventDefault();
    console.log('test');
    location.replace('./index.html');
});

forecastCard()
// displayHistory()
$('.append').append(card);
