import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherAPI() {
    const [weatherInfo, setWeatherInfo] = useState([]);
    const apiKey = process.env.REACT_APP_WEATHER_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Italva&aqi=no`
                );
                console.log(response.data);
                setWeatherInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [apiKey]);

    console.log(weatherInfo);

    return (
        <>
            <h1>Teste</h1>
        </>
    );
}
