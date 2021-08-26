import background from "./background.js";
import tableHistory from "./historial.js";
import { validationSearch } from "./validation.js";
import { weatherCityMexico, searchCity } from "./weatherApi.js";

document.addEventListener("DOMContentLoaded", () => {
  validationSearch();
  weatherCityMexico();
  searchCity();
  background();
  tableHistory();
});
