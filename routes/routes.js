const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/:location', async (req, res) => {
  const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${req.params.location}&key=${process.env.GEOCODER_KEY}`)
  const geoCoderData = await result.json();
  const weatherData = await getWeather(geoCoderData.results[0].geometry);
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