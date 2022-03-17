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
    if (!recentSearches.includes(search)){recentSearches}