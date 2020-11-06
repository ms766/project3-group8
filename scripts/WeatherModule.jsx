import React, { useState } from 'react';
import WidgetTitle from './WidgetTitle';
import WeatherHourly from './WeatherHourly';
import { Socket } from './Socket';

function handleSubmit(event) {
  const currCity = document.getElementById('inputCity');
  const currCityValue = currCity.value;
  Socket.emit('weather request', {
    city_name: currCityValue,
  });

  currCity.value = '';
  event.preventDefault();
}

export default function WeatherModule() {
  const [currWeather, setCurrWeather] = useState(() => []);
  const [currCity, setCurrCity] = useState("Hourly");

  function recieveWeather() {
    React.useEffect(() => {
      Socket.on('send weather', (data) => {
        setCurrCity(data.city_name);
        setCurrWeather([]);
        for (let i = 0; i < data.hourly.length; i += 1) {
          const iterWeather = (
            <WeatherHourly
              key={i}
              time={data.hourly[i].time}
              icon={data.hourly[i].icon}
              description={data.hourly[i].description}
              temp={`${Math.round(data.hourly[i].temp)} °F`}
            />
          );
          // eslint-disable-next-line no-shadow
          setCurrWeather(currWeather => [...currWeather, iterWeather]);
        }
      });

      return () => {
        Socket.off('send weather');
      };
    });
  }

  recieveWeather();

  return (
    <div className="widget weather_widget">
      <WidgetTitle title={`${currCity} Forecast`} />
      <form onSubmit={handleSubmit}>
        <input id="inputCity" placeholder="Input your city name here..." type="text" />
      </form>
      <hr />
      {currWeather}
    </div>
  );
}