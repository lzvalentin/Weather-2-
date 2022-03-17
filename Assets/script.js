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
function searchWeatherData(e){
    let search;
    if (searchField.val() === ""){
        search = $(e.target).text();
    }else {
        search= searchField.val();
    }
    if (!recentSearches.includes(search)){
        recentSearches.unshift(search);
    } else {
        let index= recentSearches.indexOf(search);
        recentSearches.splice(index, 1);
        recentSearches.unshift(search);
    }
    
    // call to update, local storage
    updateSearchList();
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${APIKey}`;

    fetch(url)
    .then(function (res){
        return res.json();
    }).then (function(data){
        cityWeatherData.cityName=data.name;
        cityWeatherData.cityLat = data.coord.lat;
        cityWeatherData.cityLong = data.coord.lon;
        getWeather();
    }).catch(function(err){
        return;
    });
}

function getWeather(){
    const urlCord = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeatherData.cityLat}&lon=${cityWeatherData.cityLong}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}` 

fetch(urlCord)
    .then(function (res){
        return res.json();
    }).then (function (data){
        
    })
}
