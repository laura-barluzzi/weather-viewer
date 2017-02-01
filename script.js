function displayInformation(city, state) {
  $("#location").text(city + ", " + state);
}

function kelvinToFahrenheit(temperature) {
  return (temperature * 9/5) - 459.67;
}

function kelvinToCelsius(temperature) {
  return temperature-273.15;
}

function displayTemperature(temperature, min, max) {
  var convert;
  var symbol = "";
  
  if ($("#temperatureSelect").val() === "Celsius") {
    convert = kelvinToCelsius;
    symbol = "°C";
  } else {
    convert = kelvinToFahrenheit;
    symbol = "°F";
  }  
  temperature = convert(temperature);
  min = convert(min);
  max = convert(max);
  
  $("#current_temp").text(Math.round(temperature) + " " + symbol);
  $("#temp_min").text("min: " + Math.round(min));
  $("#temp_max").text("max: " + Math.round(max));
}

function displayWeatherCondition(condition, icon) {
  console.log(icon);
  var weatherConditions = {
    "Clouds": "http://www.publicdomainpictures.net/pictures/40000/velka/fluffy-clouds.jpg", 
    "Rain": "http://www.publicdomainpictures.net/pictures/70000/velka/background-with-rain.jpg", 
    "Clear": "https://static.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg",
    "Thunderstorm": "http://www.publicdomainpictures.net/pictures/100000/velka/desert-lightning-1408110525Yi1.jpg",
    "Drizzle": "http://www.publicdomainpictures.net/pictures/70000/velka/background-with-rain.jpg",
    "Snow": "http://www.publicdomainpictures.net/pictures/20000/velka/trees-in-the-snow-1321633816Vfq.jpg", 
    "Atmosphere": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Dense_Seattle_Fog.jpg", 
    "Extreme": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pahoeoe_fountain_edit2.jpg", 
    "Additional": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Katrina-noaaGOES12.jpg" 
  };
  
  
  $("#background").css("background-image", "url(" + weatherConditions[condition] + ")");
  $("#main_condition").text(condition);
  $("#icon_condition").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
  
}

function updatePage(weatherJsonData) {
  console.log(weatherJsonData);
  var data = weatherJsonData;
  displayInformation(data.name, data.sys.country);
  displayTemperature(data.main.temp, data.main.temp_min, data.main.temp_max);
  displayWeatherCondition(data.weather[0].main, data.weather[0].icon);
}

function ajaxError(error) {
  cosole.log("error ajax");
  alert(error);
}

function getWeather(latitude, longitude) {
  console.log(latitude +" "+longitude);
  
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=493d4ef79364d1fd1fff7de8ee150ad2",
    error: ajaxError,
    success: updatePage,    
  });
  
}

function runWhenCoordsReady(position) {
  console.log("in runWhenCoordsReady");
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  getWeather(lat, lon);
}

function displayWeather() {
  console.log("in displayWeather");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(runWhenCoordsReady);
  } else {
    $("html").css("background-color", "#f45942");
    $("html").text("Sorry, your browser does not support geolocation.");
  }
}

function main() {
  $('#fullpage').fullpage({
    anchors:['home-page'],
  });
  console.log("in main");
  
  displayWeather();
  
  $("#temperatureSelect").on("change", displayWeather);
}

$(document).ready(main);