



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
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    
    iconEl = document.getElementById("weather-icon");
    iconEl.setAttribute("src", iconUrl);

    const DATE = moment().format("(MM/D/YYYY)");
    cityNameEl.textContent += cityName + " " + DATE;
    



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


    // day one forecast card
    var dayOneEl = document.getElementById("day-one");
    var dayFromNow = moment().add(1, 'days').format("MM/D/YYYY");
    dayOneEl.textContent = dayFromNow;

    var iconForEl = document.getElementById("icon-forecast");
    iconCodeOne = data.daily[0].weather[0].icon;
    var iconOneUrl = "http://openweathermap.org/img/wn/" + iconCodeOne + "@2x.png";
    iconForEl.setAttribute("src", iconOneUrl);

    var tempForEl = document.getElementById("temp-for");
    tempOne = data.daily[0].temp.day;
    tempForEl.textContent += " " + tempOne + " F";

    var windForEl = document.getElementById("wind-for");
    windOne = data.daily[0].wind_speed;
    windForEl.textContent += " " + windOne + " MPH";

    var humForEl = document.getElementById("hum-for");
    humOne = data.daily[0].humidity;
    humForEl.textContent += " " + humOne + " percent";

    
    // day two forecast card
    var dayTwoEl = document.getElementById("day-two");
    var twoDaysFromNow = moment().add(2, 'days').format("MM/D/YYYY");
    dayTwoEl.textContent = twoDaysFromNow;

    var iconForTwoEl = document.getElementById("icon-forecast-two");
    iconCodeTwo = data.daily[1].weather[0].icon;
    var iconTwoUrl = "http://openweathermap.org/img/wn/" + iconCodeTwo + "@2x.png";
    iconForTwoEl.setAttribute("src", iconTwoUrl);

    var tempForTwoEl = document.getElementById("temp-for-two");
    tempTwo = data.daily[1].temp.day;
    tempForTwoEl.textContent += " " + tempTwo + " F";

    var windForTwoEl = document.getElementById("wind-for-two");
    windTwo = data.daily[1].wind_speed;
    windForTwoEl.textContent += " " + windTwo + " MPH";

    var humForTwoEl = document.getElementById("hum-for-two");
    humTwo = data.daily[1].humidity;
    humForTwoEl.textContent += " " + humTwo + " percent";


    // day three forecast card
    var dayThreeEl = document.getElementById("day-three");
    var threeDaysFromNow = moment().add(3, 'days').format("MM/D/YYYY");
    dayThreeEl.textContent = threeDaysFromNow;

    var iconForThreeEl = document.getElementById("icon-forecast-three");
    iconCodeThree = data.daily[2].weather[0].icon;
    var iconThreeUrl = "http://openweathermap.org/img/wn/" + iconCodeThree + "@2x.png";
    iconForThreeEl.setAttribute("src", iconThreeUrl);

    var tempForThreeEl = document.getElementById("temp-for-three");
    tempThree = data.daily[2].temp.day;
    tempForThreeEl.textContent += " " + tempThree + " F";

    var windForThreeEl = document.getElementById("wind-for-three");
    windThree = data.daily[2].wind_speed;
    windForThreeEl.textContent += " " + windThree + " MPH";

    var humForThreeEl = document.getElementById("hum-for-three");
    humThree = data.daily[2].humidity;
    humForThreeEl.textContent += " " + humThree + " percent";

    // day four forecast card
    var dayFourEl = document.getElementById("day-four");
    var fourDaysFromNow = moment().add(4, 'days').format("MM/D/YYYY");
    dayFourEl.textContent = fourDaysFromNow;

    var iconForFourEl = document.getElementById("icon-forecast-four");
    iconCodeFour = data.daily[3].weather[0].icon;
    var iconFourUrl = "http://openweathermap.org/img/wn/" + iconCodeFour + "@2x.png";
    iconForFourEl.setAttribute("src", iconFourUrl);

    var tempForFourEl = document.getElementById("temp-for-four");
    tempFour = data.daily[3].temp.day;
    tempForFourEl.textContent += " " + tempFour + " F";

    var windForFourEl = document.getElementById("wind-for-four");
    windFour = data.daily[3].wind_speed;
    windForFourEl.textContent += " " + windFour + " MPH";

    var humForFourEl = document.getElementById("hum-for-four");
    humFour = data.daily[3].humidity;
    humForFourEl.textContent += " " + humFour + " percent";


    // day five forecast card
    var dayFiveEl = document.getElementById("day-five");
    var fiveDaysFromNow = moment().add(5, 'days').format("MM/D/YYYY");
    dayFiveEl.textContent = fiveDaysFromNow;

    var iconForFiveEl = document.getElementById("icon-forecast-five");
    iconCodeFive = data.daily[4].weather[0].icon;
    var iconFiveUrl = "http://openweathermap.org/img/wn/" + iconCodeFive + "@2x.png";
    iconForFiveEl.setAttribute("src", iconFiveUrl);

    var tempForFiveEl = document.getElementById("temp-for-five");
    tempFive = data.daily[4].temp.day;
    tempForFiveEl.textContent += " " + tempFive + " F";

    var windForFiveEl = document.getElementById("wind-for-five");
    windFive = data.daily[4].wind_speed;
    windForFiveEl.textContent += " " + windFive + " MPH";

    var humForFiveEl = document.getElementById("hum-for-five");
    humFive = data.daily[4].humidity;
    humForFiveEl.textContent += " " + humFive + " percent";
    
}



userFormEl.addEventListener("submit", formSubmitHandler);