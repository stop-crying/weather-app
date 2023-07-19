import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forcast from "./components/Forcast";
import getFormattedWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Lagos" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={` bg-gradient-to-bl h-screen flex items-center justify-center  sm:w-full sm:h-screen sm:flex sm:items-center sm:justify-center sm:font-bai xl:h-screen xl:bg-gradient-to-bl xl:flex xl:items-center xl:justify-center lg:h-screen lg:bg-gradient-to-bl lg:flex lg:items-center lg:justify-center  ${formatBackground()}`}
    >
      <div
        className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-2xl rounded-xl sm:h-screen sm:w-full sm:py-3 sm:px-4 ring-transparent xl:ring-0 xl:mx-auto xl:max-w-screen-md xl:mt-4 xl:py-5 xl:px-32 xl:bg-gradient-to-br xl:h-fit xl:shadow-2xl xl:rounded-xl lg:ring-0 lg:mx-auto lg:max-w-screen-md lg:mt-4 lg:py-5 lg:px-32 lg:bg-gradient-to-br lg:h-fit lg:shadow-2xl lg:rounded-xl    ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />

            <Forcast title="hourly forecast" items={weather.hours} />
            <Forcast title="daily forecast" items={weather.days} />
          </div>
        )}

        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
        <footer className="flex items-center justify-center text-white pt-20 font-extralight">
          Geoweather &copy; 2023
        </footer>
      </div>
    </div>
  );
}

export default App;
