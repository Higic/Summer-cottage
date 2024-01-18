//Tekijät: Onni Alasaari ja Elias Viro
//Viimeisin muutos 5.5.2022
//Ohjelma hakee ja tulostaa reitin karttasivun hakukenttään kirjoitetun tiedon perusteella
//sekä hakee ja tulostaa määränpään sään seuraavalle viidelle päivälle 

'use strict'
let lahto = document.getElementById("mapsOrigin");
let kohde = document.getElementById("mapsDestination");

let latitude;
let longitude;

const haku = document.getElementById("mapsSearch")

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    var suomi = new google.maps.LatLng(64.562144, 26.5850797);
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: suomi,
    });

    directionsRenderer.setMap(map);

    const onClickSearch = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        doCoordinateQuery(kohde.value);

    };

    haku.addEventListener('click', onClickSearch)
}
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: {
          query: lahto.value,
        },
        destination: {
          query: kohde.value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed, unknown route" ));
}

// Get lat long from request
function doCoordinateQuery(address) {
    const coordinateurl= `https://maps.googleapis.com/maps/api/geocode/json?address=${kohde.value}&key=AIzaSyA8GeHtBjJQPy-TssWCvqd0cM_KhWfYb_M`;
    coordinateQuery(coordinateurl);
}

function coordinateQuery(apiURL) {
    fetch(apiURL).then(function(response) {
        return response.json();
    }).then(function(json) {
        latitude = json.results[0].geometry.location.lat;
        longitude = json.results[0].geometry.location.lng;
        makeQueries(latitude, longitude);
    }).catch(function(error){
        console.log(error);
    });
}
//Weather things
const weatherSec = document.getElementById("weatherSection");


// parse and insert lat long from maps API here
function makeQueries(lat, lon) {
    const apiURL_forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=deac90c0e11ae26869bf50eafaf5f0d1`;
    forecastQuery(apiURL_forecast);
}


function forecastQuery(apiURL)  {
    fetch(apiURL).then(function(response) {
        return response.json();
    }).then(function(json) {
        displayForecast(json);	
    }).catch(function(error){
        console.log(error);
    });
}


function displayForecast(jsonData) {
	weatherSec.innerHTML = ``;
    let weekDay = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"];
    let htmlKoodi = `<h3 id="weatherHeader">Sää kohteessa:</h3>`;
    for (let i = 0; i < 5; i++) {
        let today = new Date().getDay() + i;
        if (today > 6) {
            today = today - 7;
        }
        let dayOfWeek = weekDay[today];
        htmlKoodi += 
            `<p id="weatherDay">`;
                htmlKoodi += `${dayOfWeek}<br>`;
                htmlKoodi += `<img src="https://openweathermap.org/img/wn/${jsonData.daily[i].weather[0].icon}@2x.png" alt="Sääikoni"><br>`;
                htmlKoodi += `${Math.round(jsonData.daily[i].temp.day)} \xB0C<br>`;
                htmlKoodi += `${Math.round(jsonData.daily[i].wind_speed)} m/s
            </p>`;
    }
    weatherSec.innerHTML = htmlKoodi;
}