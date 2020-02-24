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
  weatherData.innerHTML = `
    <div class="fade-in weather-data">
      <div class="main-data">
        <h2>${data.name}, ${data.sys.country}</h2>
        <h2>${data.main.temp}&#176C</h2>
      </div>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
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
