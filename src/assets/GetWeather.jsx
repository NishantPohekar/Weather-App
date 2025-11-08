import React, { useState } from "react";
import { FaCloud, FaSearch, FaTemperatureHigh } from "react-icons/fa";
import dateFormat from "dateformat";
import { FaLocationDot } from "react-icons/fa6";
import { HiH3 } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";

function GetWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  let API = "798cd9c567a8806da7f0c2c9b6ebed14";

  function getinfo() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
    ).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        setWeather(res2);
      });
    });
  }
  function getdate() {
    const now = new Date();
    return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  }
  return (
    <div>
      <div className="c">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => getinfo()}>
          <FaSearch />
        </button>
      </div>
      {weather && weather.weather ? (
        <div className="w">
          <div className="loc">
            <h5>
              <FaLocationDot /> {weather.name},{weather.sys?.country}
            </h5>
          </div>
          <div className="d">
            <h5>
              <MdOutlineDateRange />
              {getdate()}
            </h5>
          </div>
          <div className="temp">
            <h5>
              <h3 style={{ fontWeight: "bold" }}>Temperature</h3>
              <h5>
                <FaTemperatureHigh />
                {(weather.main?.temp - 273).toFixed(2)}&deg;C
              </h5>
              <h5>
                Feels like :{(weather.main?.feels_like - 273).toFixed(2)} &deg;C
              </h5>
            </h5>
          </div>
          <div className="clouds">
            <h5>
              <h3 style={{ fontWeight: "bold" }}>Clouds</h3>
              <h5>
                <FaCloud />
                {weather.weather[0]?.description}
              </h5>
            </h5>
          </div>
          <div className="wind">
            <h5>
              <h3 style={{ fontWeight: "bold" }}>Wind</h3>
              <h5>Speed : {weather.wind?.speed}</h5>
              <h5>Degree : {weather.wind?.deg}&deg;</h5>
            </h5>
          </div>
        </div>
      ) : (
        <h3>Please enter city</h3>
      )}
    </div>
  );
}

export default GetWeather;
