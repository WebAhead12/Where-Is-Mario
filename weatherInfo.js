let api_key = "21e90fff0e3a4567a31111147212610";

let geoLon = "";
let geoLat = "";

let C = 0;
let F = 0;

const container = document.querySelector(".weatherContainer")
const locationText = document.querySelector(".weatherLocation");
const image = document.querySelector(".weatherImage");
const temperatureText = document.querySelector(".weatherTemperature");
const descriptionText = document.querySelector(".weatherDescription");

let fahrenheitPreference = window.localStorage.getItem("weatherPreference")=="true" || false;

function updateWeather(){
  if (navigator.geolocation) {
  
    navigator.geolocation.getCurrentPosition(function (pos) {
      geoLon = String(pos.coords.longitude.toFixed(5));
      geoLat = String(pos.coords.latitude.toFixed(5));
  
      let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${geoLat},${geoLon}&aqi=no`;
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((weatherData) => {
          C = weatherData.current.temp_c;
          F = weatherData.current.temp_f;
          if(fahrenheitPreference)
          temperatureText.innerHTML = F + "<sup>&#176;</sup>F";
          else
          temperatureText.innerHTML = C + "<sup>&#176;</sup>C";
          image.src = weatherData.current.condition.icon;
          locationText.textContent = weatherData.location.name;
          descriptionText.textContent = weatherData.current.condition.text;
        });
    });
  }
}
updateWeather()
container.addEventListener("click", (event)=>{
  fahrenheitPreference = !fahrenheitPreference;
  window.localStorage.setItem("weatherPreference", fahrenheitPreference);
  if(fahrenheitPreference)
    temperatureText.innerHTML = F + "<sup>&#176;</sup>F";
  else
    temperatureText.innerHTML = C + "<sup>&#176;</sup>C";
})
if(navigator.geolocation){
  setInterval(()=>updateWeather(), 60000)
}
