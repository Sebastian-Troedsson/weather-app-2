const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/:location', async (req, res) => {
  const result = await fetch(`https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODER_KEY}&q=${req.params.location}&format=json`);
  const geoCoderData = await result.json();
  const weatherData = await getWeather({ lat: geoCoderData[0].lat, lng: geoCoderData[0].lon });
  res.json(weatherData);
});

router.get('/current/:lat/:lng', async (req, res) => {
  const result = await getWeather({ lat: req.params.lat, lng: req.params.lng});
  res.json(result);
});

const getWeather = async ({ lat, lng }) => {
  const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${process.env.WEATHER_KEY}`)
  return await result.json();
}

module.exports = router;