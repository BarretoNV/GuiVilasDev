import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";
import useLocale from "../../hooks/useLocale";
import { localizePath } from "../../utils/i18nRouting";
import { Container, Button, Form, Alert } from "react-bootstrap";

export default function WeatherAPI() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityFound, setCityFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const shouldShowLoader = useMinimumLoadingTime(loading);
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchData = async () => {
    setHasSearched(true);
    setLoading(true);

    try {
      const url = new URL("https://api.weatherapi.com/v1/current.json");
      url.search = new URLSearchParams({
        key: weatherApiKey,
        q: cityName,
        aqi: "no",
      }).toString();

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API request failed: ${response.status}`);
      }

      const data = await response.json();
      setWeatherInfo(data);
      setCityFound(true);
    } catch (error) {
      console.error(error);
      setWeatherInfo([]);
      setCityFound(false);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    fetchData();
  };

  if (shouldShowLoader) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <Container className="text-light">
        <h1 className="mt-4">{t("weather.title")}</h1>
        <Button
          variant="outline-light"
          href={localizePath("/funwithapis", locale)}
          className="mb-4"
        >
          {t("weather.back")}
        </Button>
        <Form>
          <Form.Group controlId="cityName">
            <Form.Label>{t("weather.cityLabel")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("weather.cityPlaceholder")}
              value={cityName}
              onChange={(event) => setCityName(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-light"
            onClick={handleButtonClick}
            className="mb-3 mt-2"
          >
            {t("weather.submit")}
          </Button>
        </Form>
        <div>
          {weatherInfo.location ? (
            cityFound === true ? (
              <div>
                <img
                  src={weatherInfo.current.condition.icon}
                  alt={weatherInfo.current.condition.text}
                />
                <h2 className="mb-3">
                  {t("weather.conditions", {
                    city: weatherInfo.location.name,
                    country: weatherInfo.location.country,
                  })}
                </h2>
                <p>
                  {t("weather.temperature")}: {weatherInfo.current.temp_c}°C
                </p>
                <p>
                  {t("weather.feelsLike")}: {weatherInfo.current.feelslike_c}°C
                </p>
                <p>
                  {t("weather.description")}: {weatherInfo.current.condition.text}
                </p>
                <p>
                  {t("weather.humidity")}: {weatherInfo.current.humidity}%
                </p>
              </div>
            ) : (
              <Alert variant="danger">{t("weather.notFound")}</Alert>
            )
          ) : hasSearched && !cityFound ? (
            <Alert variant="danger">{t("weather.notFound")}</Alert>
          ) : (
            <Alert variant="warning">{t("weather.initial")}</Alert>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
