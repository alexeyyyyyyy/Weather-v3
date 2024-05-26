import React from 'react';
import { useState } from 'react';
import Form from "./Form.jsx";
import Weather from "./Weather.jsx";
import { API_KEY, BASE_URL } from "../utils/constants.js";

const Data = () => {
    const [weatherInfo, setWeatherInfo] = useState({});
    const [message, setMessage] = useState(null);

    const getWeather = (city) => {
        fetch(`${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    setWeatherInfo({
                        country: data.sys.country,
                        city: data.name,
                        temp: data.main.temp,
                        pressure: data.main.pressure,
                        weather1: data.weather[0].main
                    });
                    setMessage(null);
                } else {
                    setWeatherInfo({});
                    setMessage("City not found try again please");
                }
            })
            .catch(error => {
                console.error('Error Try again please:', error);
                setWeatherInfo({});
                setMessage("Error Try again please");
            });
    }

    return (
        <div>
            <Form getWeather={getWeather} />
            <Weather message={message} weatherInfo={weatherInfo} />
        </div>
    );
}

export default Data;
