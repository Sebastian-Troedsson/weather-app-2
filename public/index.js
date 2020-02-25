const weatherData = document.querySelector('#weather-data');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

/* Get current location of user at start */
(function getLocationOfUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(`http://localhost:5000/api/current/${lat}/${lon}`)
        .then(res => res.json())
        .then(res => appendData(res));
    });
  }
})();

function appendData(data) {
  console.log(data);
  weatherData.innerHTML = `
    <div class="weather-data fade-in">
      <div class="main-data full-width-border-bottom">
        <h2 class="location light-font-weight text-color">${data.name}, ${data.sys.country}</h2>
        <p class="degrees light-font-weight text-color">${data.main.temp}&#176</p>
      </div>
      <div class="additional-data">
        <div class="row full-width-border-bottom">
          <div class="row-title text-color light-font-weight">
            <p>Min temp</p>
            <p>${data.main.temp_min}&#176</p>
          </div>
          <div class="row-data text-color light-font-weight">
            <p>Max temp</p>
            <p>${data.main.temp_max}&#176</p>
          </div>
        </div>
        <div class="row full-width-border-bottom">
          <div class="row-title text-color light-font-weight">
            <p>Feels like</p>
            <p>${data.main.feels_like}&#176</p>
          </div>
          <div class="row-data text-color light-font-weight">
            <p>Wind</p>
            <p>${data.wind.speed}m/s</p>
          </div>
        </div>
        <div class="row full-width-border-bottom">
          <div class="row-title text-color light-font-weight">
            <p>Humidity</p>
            <p>${data.main.humidity}%</p>
          </div>
          <div class="row-data text-color light-font-weight">
            <p>Pressure</p>
            <p>${data.main.pressure}hPa</p>
          </div>
        </div>
        <div class="row full-width-border-bottom">
          <div class="row-title text-color light-font-weight">
            <p>TODO</p>
            <p>TODO</p>
          </div>
          <div class="row-data text-color light-font-weight">
            <p>TODO</p>
            <p>TODO</p>
          </div>
        </div>
        <div class="row full-width-border-bottom">
          <div class="row-title text-color light-font-weight">
            <p>TODO</p>
            <p>TODO</p>
          </div>
          <div class="row-data text-color light-font-weight ">
            <p>TODO</p>
            <p>TODO</p>
          </div>
        </div>
      </div> 
      <div class="full-width-border-bottom"></div>
  </div>
  `;
}

function getData() {
  const value = searchInput.value;
  fetch(`http://localhost:5000/api/${value}`)
    .then(res => res.json())
    .then(res => appendData(res));
}

searchButton.addEventListener('click', getData);
