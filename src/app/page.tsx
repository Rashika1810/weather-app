"use client";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function getCurrentDate() {
  const currentdate = new Date();
  const options = { month: "long" };
  const monthName = currentdate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + monthName;
  return date;
}

export default function Home() {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [nextWeatherData, setNextWeatherData] = useState(null);

  async function fetchData(city: string) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + city
      );
      const resp = (await response.json()).data;
      setWeatherData(resp);
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  }

  async function forecast(city: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=30&appid=46b029641470d0a59f6545a6d0cc16a4`
      );
      const resp = await response.json();
      setNextWeatherData(resp);
      console.log(resp.list);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData("Ranchi");
    forecast("ranchi");
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-blue-300">
        <div className="flex items-center mt-10 ">
          <form
            className="mb-4 flex flex-row items-center w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              fetchData(city);
              forecast(city);
            }}
          >
            <div className="flex bg-white  items-center rounded-xl">
              <FontAwesomeIcon icon={faSearch} className="ml-2 " />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="p-2  rounded-lg focus-within:outline-none text-center font-medium "
              />

              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-xl flex items-center"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className=" flex  justify-center min-w-full">
          {weatherData && weatherData.weather && weatherData.weather[0] ? (
            <WeatherCard
              city={weatherData.name}
              temperature={weatherData.main.temp}
              description={weatherData.weather[0].description}
              icon={weatherData.weather[0].icon}
              date={date}
            />
          ) : weatherData && weatherData.cod && weatherData.cod === "404" ? (
            <div>
              <h1 className="text-center text-red-600 text-3xl font-bold">
                City Not Found
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="text-center text-3xl font-bold">Loading...</h1>
            </div>
          )}
        </div>
        {nextWeatherData && nextWeatherData.list ? (
          <div className="overflow-x-auto no-scrollbar mt-8 max-w-screen-lg mx-auto scrollbar-hide">
            <div className="flex flex-no-wrap p-4 -mx-2 space-x-4">
              {nextWeatherData.list
                .filter((forecast: any, index: number) => {
                  const forecastDate = new Date(forecast.dt_txt).toDateString();
                  const todayDate = new Date().toDateString();
                  return forecastDate !== todayDate && index % 7 === 0;
                })
                .map((forecast: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4 m-2 flex-shrink-0 shadow-lg bg-white"
                    style={{ minWidth: "300px", maxWidth: "300px" }}
                  >
                    <h2 className="text-xl font-bold text-center mb-2">
                      {nextWeatherData.city.name}
                    </h2>
                    <div className="flex flex-col">
                      <p className="text-lg">
                        Temperature: {(forecast.main.temp - 273.15).toFixed(0)}
                        °C
                      </p>
                      <p className="text-lg">
                        Description: {forecast.weather[0].description}
                      </p>
                      <img
                        src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].description}
                        className="mx-auto my-2"
                      />
                      <p className="text-lg">
                        Date: {forecast.dt_txt.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center mt-8"></div>
        )}
      </main>
    </>
  );
}
