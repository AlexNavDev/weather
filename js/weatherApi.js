import { localTime, weekday } from "./time.js";
import tableHistory from "./historial.js";

const $loader = document.querySelector(".loader"),
  $error = document.querySelector(".error"),
  $temperature = document.querySelector(".container__card"),
  $form = document.getElementById("form__search"),
  $search = document.getElementById("search"),
  $key = "fd39247e3eb2499f5fe3d4bc5d004f07";

let $weatherTemplate = "",
  history = [];

export async function weatherCityMexico() {
  try {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=naucalpan&units=metric&appid=${$key}`;
    let res = await fetch(api),
      weatherData = await res.json();

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };
    $loader.classList.add("hidden");

    templaWeather(weatherData);
    $search.value = "";
    $search.focus();
  } catch (error) {
    let message = error.statusText || "Ocurrio un error";
    $error.insertAdjacentHTML(
      "afterend",
      `<p> <b> Error: ${error.status}: ${message} </b> </p>`
    );
  }
}

export async function searchCity() {
  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      let city = e.target.search.value;

      const apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${$key}`;

      let res = await fetch(apiSearch),
        weatherSearch = await res.json();
      console.log(weatherSearch);

      if (weatherSearch.message === "city not found") {
        $weatherTemplate = `<h2 class="error"> No se encontro ${city}  </h2>`;
        $temperature.innerHTML = $weatherTemplate;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      $loader.classList.add("hidden");

      templaWeather(weatherSearch);

      storage(weatherSearch);
      tableHistory();
      $search.value = "";
      $search.focus();
    } catch (error) { }
  });
}

function storage(data) {
  const timeRecord = {
    Nombre: `${data.name}`,
    Tem: `${data.main.temp}`,
    TemMax: `${data.main.temp_max}`,
    TemMin: `${data.main.temp_min}`,
  };

  const add = getLocal();
  add.push(timeRecord);
  localS(add);
}

function getLocal() {
  let dataLocal = localStorage.getItem("TimeRecord");
  dataLocal === null ? (history = []) : (history = JSON.parse(dataLocal));
  return history;
}

const localS = (weather) =>
  localStorage.setItem("TimeRecord", JSON.stringify(weather));

function templaWeather(weatherData = weatherCityMexico) {
  let { clock, hiddenClock } = localTime();

  $weatherTemplate = `
            <div class="card">   
                <div class="hidden">
                    ${weatherData.sys.country === "MX"
      ? `${weekday()}` && `${clock()}`
      : `${hiddenClock()}`
    }
                </div> 
                            
                <div class="card__header">
                    <h1> ${weatherData.name} </h1>               
                    <h2> ${Math.round(
      weatherData.main.temp
    )}°C</h2>                
                </div>
                
                <div class="card__body">
                   <div class="icon">
                    <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon
    }@2x.png"
                    alt="icon_weather">
                   </div>
                       
                    <p>Descripción: ${weatherData.weather[0].description
    }</p>             
                    <p class="card__body-tmax"> ${weatherData.main.temp_max
    }°</p> / <p class="card__body-tmin">${weatherData.main.temp_min
    }°</p>  
                </div>   

                <div class="card__footer">            
                    <p>Humedad: ${weatherData.main.humidity
    }</p>                  
                    <p>Latitud: ${weatherData.coord.lat}</p>
                    <p>Longitud: ${weatherData.coord.lon}</p>                   

                </div>
          </div>        
        `;
  $temperature.innerHTML = $weatherTemplate;
}
