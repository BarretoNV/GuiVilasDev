import { useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";
import { Container, Button, Form, Alert } from "react-bootstrap";

export default function WeatherAPI() {
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
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${cityName}&aqi=no`
      );

      setWeatherInfo(response.data);
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
        <h1 className="mt-4">Previs&atilde;o do Tempo</h1>
        <Button variant="outline-light" href="/funwithapis" className="mb-4">
          Voltar
        </Button>
        <Form>
          <Form.Group controlId="cityName">
            <Form.Label>Digite o nome da cidade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da cidade"
              value={cityName}
              onChange={(event) => setCityName(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-light"
            onClick={handleButtonClick}
            className="mb-3 mt-2"
          >
            Enviar
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
                  Condi&ccedil;&otilde;es clim&aacute;ticas em{" "}
                  {weatherInfo.location.name},{" "}
                  {weatherInfo.location.country}
                </h2>
                <p>Temperatura: {weatherInfo.current.temp_c}&deg;C</p>
                <p>
                  Sensa&ccedil;&atilde;o T&eacute;rmica:{" "}
                  {weatherInfo.current.feelslike_c}&deg;C
                </p>
                <p>Descri&ccedil;&atilde;o: {weatherInfo.current.condition.text}</p>
                <p>Umidade: {weatherInfo.current.humidity}%</p>
              </div>
            ) : (
              <Alert variant="danger">
                Cidade n&atilde;o encontrada. Verifique o nome e tente novamente.
              </Alert>
            )
          ) : hasSearched && !cityFound ? (
            <Alert variant="danger">
              Cidade n&atilde;o encontrada. Verifique o nome e tente novamente.
            </Alert>
          ) : (
            <Alert variant="warning">
              Informe o nome de uma cidade e clique em &quot;Enviar&quot; para
              verificar o clima.
            </Alert>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
