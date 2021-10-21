



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
                getCityWeather(data, city);
            });
        } else {
            alert("Error: City Not Found.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to weather service.")
    })
}



var getCityWeather = function(data, city) {
    
    console.log(data); // see objects and properties to get lat and lon to pass into OpenWeather
    console.log(data.results[0].geometry.location.lat); // logs the lat of searched city
    console.log(data.results[0].geometry.location.lng); // logs the lat of searched city

    var cityLat = data.results[0].geometry.location.lat;
    
    var cityLon = data.results[0].geometry.location.lng;  

    // might pass in lat and lon bases on variables from getLatLong function, also remember exclue exists
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude={part}&units=imperial&appid=f41131e2a68abf0f2b5d80a0cda7823f";

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayCityWeather(data, city);
            })
        }
    })
}

var displayCityWeather = function(data, city) {
    var cityName = city;
    var cityNameEl = document.getElementById("city-name");
    
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    


    const DATE = moment().format("(MM/D/YYYY)");
    cityNameEl.textContent += cityName + " " + DATE + " " + iconUrl; 



    var cityTemp = data.current.temp;
    var dayTempEl = document.getElementById("day-temp");
    dayTempEl.textContent += cityTemp + " F";

    var cityWind = data.current.wind_speed;
    var dayWindEl = document.getElementById("day-wind");
    dayWindEl.textContent += cityWind + " MPH";

    var cityHumidity = data.current.humidity;
    var dayHumidityEl = document.getElementById("day-humidity");
    dayHumidityEl.textContent += cityHumidity + " percent";

    var cityUv = data.current.uvi;
    var dayUvEl = document.getElementById("day-uv");
    dayUvEl.textContent += cityUv; 

    
    var dayOneEl = document.getElementById("day-one");
    var dayFromNow = moment().add(1, 'days').format("MM/D/YYYY");
    dayOneEl.textContent = dayFromNow;

    var dayTwoEl = document.getElementById("day-two");
    var twoDaysFromNow = moment().add(2, 'days').format("MM/D/YYYY");
    dayTwoEl.textContent = twoDaysFromNow;

    var dayThreeEl = document.getElementById("day-three");
    var threeDaysFromNow = moment().add(3, 'days').format("MM/D/YYYY");
    dayThreeEl.textContent = threeDaysFromNow;

    var dayFourEl = document.getElementById("day-four");
    var fourDaysFromNow = moment().add(4, 'days').format("MM/D/YYYY");
    dayFourEl.textContent = fourDaysFromNow;

    var dayFiveEl = document.getElementById("day-five");
    var fiveDaysFromNow = moment().add(5, 'days').format("MM/D/YYYY");
    dayFiveEl.textContent = fiveDaysFromNow;


    var fiveDayApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=f41131e2a68abf0f2b5d80a0cda7823f"
    fetch(fiveDayApiUrl)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
            });
        }
    })
}



userFormEl.addEventListener("submit", formSubmitHandler);