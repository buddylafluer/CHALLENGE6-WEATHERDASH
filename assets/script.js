var APIkey = "ecbd2037f18f13182413d4ce7e0e5d9e";
var citySearchInput = $("#citySearchInput")
var citySearchButton = $("#citySearchButton")
var cityName = "";

var currentDate = moment().format("M/D/YYYY")
var tomorrow = moment().add(1,'days')
var twodays = moment().add(2,'days')
var threedays = moment().add(3,'days')
var fourdays = moment().add(4,'days')
var fivedays = moment().add(5,'days')

var savedCities = JSON.parse (localStorage.getItem("savedCities")) || [];
for (var i = 0; i < savedCities.length; i ++) {
    var city = savedCities[i];
    var cityNameEl = $("<li>");//making line
    cityNameEl.addClass("button");
    cityNameEl.text(city);
    $("#city-list").append(cityNameEl);//creating city list
}

citySearchButton.on("click", function() {
    var City = citySearchInput.val().trim();
    citySearchInput.val("");

    var previouslySavedCities = JSON.parse(localStorage.getItem("savedCities")) || []
    previouslySavedCities.push(City)//new city searched to push to array then push to local storage
    localStorage.setItem("savedCities", JSON.stringify(previouslySavedCities)) //can only save a string to local storage

    getLocation(City);
    console.log(City)
})

function getLocation(City) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + City + "&units=imperial&appid=" + APIkey;

    fetch(queryURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
                var latitude = data.city.coord.lat
                var longitude = data.city.coord.lon
                cityName = data.city.name
                console.log(cityName)
                var latString = latitude.toString()
                var lonString = longitude.toString()
                fiveDayWeather(latString, lonString)
            })
        }
    })

    

}

var apiKey2 = "d899707429dae12637678613a5874634";

function fiveDayWeather(lon, lat) {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey2;

    fetch(queryURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
                var todayCity = $("#todayDiv")
                todayCity.text(cityName + " " + currentDate) 
                var todayTemp = $("#todayT")
                todayTemp.text("Temp: " + data.current.temp)
                var todayWind = $("#todayW")
                todayWind.text("Wind: " + data.current.wind_speed)
                var todayHum = $("#todayH")
                todayHum.text("Humidity: " + data.current.humidity)
                var tomorrowDate = $("#tomorrow")
                tomorrowDate.text(tomorrow)
                var twodaysDate = $("#twodays")
                twodaysDate.text(twodays)
                var threedaysDate = $("#threedays")
                threedaysDate.text(threedays)
                var fourdaysDate = $("#fourdays")
                fourdaysDate.text(fourdays)
                var fivedaysDate = $("#fivedays")
                fivedaysDate.text(fivedays)
                var day1Temp = $("#temp1")
                day1Temp.text("Temp: " + data.daily[0].temp.day)
                var day1Wind = $("#wind1")
                day1Wind.text("Wind: " + data.daily[0].wind_speed)
                var day1Hum = $("#humi1")
                day1Hum.text("Humidity: " + data.daily[0].humidity)
                var day2Temp = $("#temp2")
                day2Temp.text("Temp: " + data.daily[1].temp.day)
                var day2Wind = $("#wind2")
                day2Wind.text("Wind: " + data.daily[1].wind_speed)
                var day2Hum = $("#humi2")
                day2Hum.text("Humidity: " + data.daily[1].humidity)
                var day3Temp = $("#temp3")
                day3Temp.text("Temp: " + data.daily[2].temp.day)
                var day3Wind = $("#wind3")
                day3Wind.text("Wind: " + data.daily[2].wind_speed)
                var day3Hum = $("#humi3")
                day3Hum.text("Humidity: " + data.daily[2].humidity)
                var day4Temp = $("#temp4")
                day4Temp.text("Temp: " + data.daily[3].temp.day)
                var day4Wind = $("#wind4")
                day4Wind.text("Wind: " + data.daily[3].wind_speed)
                var day4Hum = $("#humi4")
                day4Hum.text("Humidity: " + data.daily[3].humidity)
                var day5Temp = $("#temp5")
                day5Temp.text("Temp: " + data.daily[4].temp.day)
                var day5Wind = $("#wind5")
                day5Wind.text("Wind: " + data.daily[4].wind_speed)
                var day5Hum = $("#humi5")
                day5Hum.text("Humidity: " + data.daily[4].humidity)
            })
        }
    })
}

