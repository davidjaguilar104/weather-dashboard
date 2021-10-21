



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
            console.log(response); // to see properties of the object and index of array
            response.json().then(function(data) {
                console.log(data); // to see data in JSON format
                // displayCityWeather(data, city); use this later for the OpenWeather function
            });
        } else {
            alert("Error: City Not Found.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to weather service.")
    })
}



















var getCityWeather = function(city) {
    
    
    
    // might pass in lat and lon bases on variables from getLatLong function, also remember exclue exists
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=f41131e2a68abf0f2b5d80a0cda7823f"
}





userFormEl.addEventListener("submit", formSubmitHandler);