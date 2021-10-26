let api_key = "21e90fff0e3a4567a31111147212610";

let geoLon = "";
let geoLat = "";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    geoLon = String(pos.coords.longitude.toFixed(5));
    geoLat = String(pos.coords.latitude.toFixed(5));

    let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${geoLat},${geoLon}&aqi=no`;

    fetch(url)
      .then((resp) => resp.json())
      .then((val) => {
        console.log(val);
      });
  });
}
