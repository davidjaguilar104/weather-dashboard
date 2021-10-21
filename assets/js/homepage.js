



var userFormEl = document.getElementById("user-form");
var cityInputEl = document.getElementById("city");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var citySearched = cityInputEl.value.trim();

    if(citySearched) {
        getLatLong(citySearched);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city!");
    }
}



var getLatLong = function(city) {
    console.log(city)

    var geocodingApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyDYEKHzP-co-gS0nRRcHFgcuLug8_L8WQ4";

    fetch(geocodingApiUrl)
    .then(function(response) {
        if(response.ok) {
            console.log(response); // to see properties of the object and index of array
            response.json().then(function(data) {
                getCityWeather(data);
            });
        } else {
            alert("Error: City Not Found.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to weather service.")
    })
}



var getCityWeather = function(data) {
    
    console.log(data); // see objects and properties to get lat and lon to pass into OpenWeather
    console.log(data.results[0].geometry.location.lat); // logs the lat of searched city
    console.log(data.results[0].geometry.location.lng); // logs the lat of searched city

    var cityLat = data.results[0].geometry.location.lat;
    
    var cityLon = data.results[0].geometry.location.lng;  

    // might pass in lat and lon bases on variables from getLatLong function, also remember exclue exists
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude={part}&appid=f41131e2a68abf0f2b5d80a0cda7823f";

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayCityWeather(data);
            })
        }
    })
}

var displayCityWeather = function(data) {
    var cityTemp = data.current.temp;
    var dayTempEl = document.getElementById("day-temp");
    dayTempEl.textContent += cityTemp;
}



userFormEl.addEventListener("submit", formSubmitHandler);