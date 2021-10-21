



var userFormEl = document.getElementById("user-form");
var cityInputEl = document.getElementById("city");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var citySearched = cityInputEl.value.trim();

    if(citySearched) {
        getLatLong(citySearched);
        cityInputEl.textContent = "";
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
            console.log(response);
        }
    })
}



















var getCityWeather = function(city) {
    
    // might pass in lat and lon bases on variables from getCitySearched function, also remember exclue exists
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=f41131e2a68abf0f2b5d80a0cda7823f"
}





userFormEl.addEventListener("submit", formSubmitHandler);