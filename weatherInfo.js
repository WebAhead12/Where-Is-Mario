<<<<<<< Updated upstream
let api_key = "21e90fff0e3a4567a31111147212610";

let geoLon = "";
let geoLat = "";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    geoLon = String(pos.coords.longitude.toFixed(5));
    geoLat = String(pos.coords.latitude.toFixed(5));

    let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${geoLat},${geoLon}&aqi=no`;

    fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then(weatherData => {
      console.log(weatherData);
       const temperature=document.querySelector(".temperature");
       temperature.innerHTML=weatherData.current.temp_c+ "<sup>&#176;</sup>"

       const image = document.querySelector(".img");
       image.src = weatherData.current.condition.icon;
       image.alt = "";
       const location=document.querySelector(".location");
       location.textContent=weatherData.location.name;

       const description=document.querySelector(".description");
       description.textContent=weatherData.current.condition.text;


    })

    

  });
}

=======
let apiToken = "a8ykGO2CJeFtE5WIC9CSqpYqb";
let secretToken = "xTa6ncj2Xl7v58EZGCa0ARnLRHUvpJMOtnbY2TNJziDup44mC2";
let bearerToken = "AAAAAAAAAAAAAAAAAAAAAD6PVAEAAAAAZZ0WC4mnKJtJ3tST%2BUDLYRXKcfI%3DwICB9BMtPHIgXGgKvPrBwU7AEpLOknsdDhhWsU2CCYB57jhdIA";

// fetch("URL", {headers: {`Bearer ${bearerToken}`}})

fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by/username/Cristiano`,
{headers: {"Authorization":`Bearer ${bearerToken}`}})
          .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          })
          .then(console.log)
>>>>>>> Stashed changes
