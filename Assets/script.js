let APIKey = '928c5ba094c06154ca53619a766d8d60';
let seachBtn = $('#searchButton');
let searchField = $('#searchInput');
let searchHistoryList = $('#search-history');
let recentSearches = [];
let maxInHistoryList = 10;

// data that will be stored on pg
const cityWeatherData = {
    cityName: "",
    cityLong: "",
    cityLat: "",
    currentDate: "",
    cityCurrentImg: "",
    imgDesc: "",
    cityCurrentTemp: "",
    cityCurrentHumidity: "",
    cityCurrentWindSpeed: "",
    cityCurrentUVIndex: "",
    fiveDayForcast: [{
        date: "",
        imgURL: "",
        temp: "",
        humidity: ""
    }, {
        date: "",
        imgURL: "",
        temp: "",
        humidity: ""
    }, {
        date: "",
        imgURL: "",
        temp: "",
        humidity: ""
    }, {
        date: "",
        imgURL: "",
        temp: "",
        humidity: ""
    }, {
        date: "",
        imgURL: "",
        temp: "",
        humidity: ""
    },
    ]
}
// Search fields
function searchWeatherData(e) {
    var search;
    if (searchField.val() === "") {
        search = $(e.target).text();
    } else {
        search = searchField.val();
    }
    if (!recentSearches.includes(search)) {
        recentSearches.unshift(search);
    } else {
        let index = recentSearches.indexOf(search);
        recentSearches.splice(index, 1);
        recentSearches.unshift(search);
    }

    // call to update, local storage
    updateSearchList();
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${APIKey}`;

    fetch(url)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            cityWeatherData.cityName = data.name;
            cityWeatherData.cityLat = data.coord.lat;
            cityWeatherData.cityLong = data.coord.lon;
            getWeather();
        }).catch(function (error) {
            return;
        });
}

function getWeather() {
    var urlCoord = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeatherData.cityLat}&lon=${cityWeatherData.cityLong}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`

    fetch(urlCoord)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            cityWeatherData.currentDate = (moment.unix(data.current.dt + (data.timezone_offset))).utc().format("M/D/YY");
            // icon
            cityWeatherData.cityCurrentImg = 'http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'
            cityWeatherData.imgDesc = data.current.weather[0].description;
            cityWeatherData.cityCurrentTemp = Math.floor(data.current.temp)
            cityWeatherData.cityCurrentHumidity = Math.floor(data.current.humidity)
            cityWeatherData.cityCurrentWindSpeed = Math.floor(data.current.wind_speed)
            cityWeatherData.cityCurrentUVIndex = data.current.uvi;

    for (var i = 0; i < 5; i++) {
            cityWeatherData.fiveDayForcast[i].date = (moment.unix(data.daily[i + 1].dt + (data.timezone_offset))).utc().format("M/D/YY");
            cityWeatherData.fiveDayForcast[i].imgURL = `http://openweathermap.org/img/wn/${data2.daily[i + 1].weather[0].icon}@2x.png`;
            cityWeatherData.fiveDayForcast[i].temp = Math.floor(data.daily[i + 1].temp.day);
            cityWeatherData.fiveDayForcast[i].humidity = Math.floor(data.daily[i + 1].humidity);

} updateCards();
});


   
}

function updateCards() {
    // background of uv index
    let uvBack = "";
    if (cityWeatherData.cityCurrentUVIndex <= 2) {
        uvBack = "bg-success text-light";
    }
    else if (cityWeatherData.cityCurrentUVIndex > 2 && cityWeatherData.cityCurrentUVIndex <= 6) {
        uvBack = "bg-warning text dark";
    } else {
        uvBack = "bg-danger text-light"
    }
    // clear card
    $('#current-weather-card').empty();
    // make card
    $('#current-weather-card').append(`<div class="card-body">` +
        `<h2 class="card-title mb-4">${cityWeatherData.cityName} (${cityWeatherData.currentDate}) <img src="${cityWeatherData.cityCurrentImg}" alt="${cityWeatherData.imgDesc}"></h2>` +

        `<p class="card-text mb-3">Temperature: ${cityWeatherData.cityCurrentTemp}&#730F</p>` +

        `<p class="card-text mb-3">Humidity: ${cityWeatherData.cityCurrentHumidity}%</p>` +

        `<p class="card-text mb-3">Wind Speed: ${cityWeatherData.cityCurrentWindSpeed} MPH</p>` +

        `<p class="card-text mb-3">UV Index: <span class="p-2 rounded ${uvBack}">${cityWeatherData.cityCurrentUVIndex}</span></p></div>`);

    // 5 day card
    $('#forcast-cards-container').empty();
    for (var j = 0; j < 5; j++) {
        $('#forcast-cards-container').append(`<div class="card text-white bg-primary mb-3" style="width: 18%">` +
            `<div class="card-body">` +
            `<h5 class="card-title mb-4">${cityWeatherData.fiveDayForcast[j].date}</h5>` +
            `<p class="card-text"><img src="${cityWeatherData.fiveDayForcast[j].imgURL}"></p>` +
            `<p class="card-text">Temp: ${cityWeatherData.fiveDayForcast[j].temp}&#730F</p>` +
            `<p class="card-text">Humidity: ${cityWeatherData.fiveDayForcast[j].humidity}%</p></div></div>`);
    }
}


// event handler for the search button click
searchBtn.on('click', function (e) {
    e.preventDefault();

    if (searchField.val() === "") {
        return;
    }
} searchWeatherData(e);
});

$('#city-search-form').on("submit", function (e) {
    e.preventDefault();
    if (searchField.val() === "") {
        return;
    }
    searchWeatherData(e);
});


function updateSearchList() {
    if (recentSearches.length > maxInHistoryList) {
        recentSearches.pop();
    }
    localStorage.setItem('searches', JSON.stringify(recentSearches));
    searchHistoryList.empty();
    for (var i = 0; i < recentSearches.length; i++) {
        searchHistoryList.append(`<button type="button" class="recent-search-btn list-group-item list-group-item-action py-3">${recentSearches[i]}</button>`);
    }
    // resets the search field to be empty
    searchField.val("");
}

//event handler for the recent search list
searchHistoryList.on('click', ".recent-search-btn", searchWeatherData);

function init() {
    recentSearches = JSON.parse(localStorage.getItem('searches')) || [];
    // remakes the recent searches
    updateSearchList();
}
// initialization call
init();