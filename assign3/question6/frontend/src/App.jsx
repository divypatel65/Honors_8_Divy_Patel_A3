import { useState } from "react";

function App() {

    const [weather, setWeather] = useState(null);

    // Call API directly from frontend
    function getWeatherFromFrontend() {

        fetch("https://api.open-meteo.com/v1/forecast?latitude=23.02&longitude=72.57&current=temperature_2m")
            .then(response => response.json())
            .then(data => {
                setWeather(data);
            });
    }

    // Call API through backend
    function getWeatherFromBackend() {

        fetch("http://localhost:3000/weather")
            .then(response => response.json())
            .then(data => {
                setWeather(data);
            });
    }

    return (
        <div>

            <h1>Weather App</h1>

            <button onClick={getWeatherFromFrontend}>
                Get Weather From Frontend
            </button>

            <button onClick={getWeatherFromBackend}>
                Get Weather From Backend
            </button>

            {weather && (
                <div>

                    <h2>Current Weather</h2>

                    <p>
                        Temperature:
                        {weather.current.temperature_2m}
                        {weather.current_units.temperature_2m}
                    </p>

                </div>
            )}

        </div>
    );
}

export default App;