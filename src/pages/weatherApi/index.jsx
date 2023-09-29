import { useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import { Container, Button, Form, Alert } from "react-bootstrap";

export default function WeatherAPI() {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityFound, setCityFound] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=73b87b7b27954146b35173937232909&q=${cityName}&aqi=no`
      );
      console.log(response.data);
      setWeatherInfo(response.data);
      setCityFound(true); // Defina como true se a chamada for bem-sucedida
    } catch (error) {
      console.error(error);
      setCityFound(false); // Defina como false em caso de erro (cidade não encontrada)
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    fetchData();
  };

  return (
    <>
      <NavBar />
      <Container className="text-light">
        <h1 className="mt-4">Previsão do Tempo</h1>
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
            cityFound == true ? (
              <div>
                <img src={weatherInfo.current.condition.icon} />
                <h2 className="mb-3">
                  Condições climáticas em {weatherInfo.location.name},{" "}
                  {weatherInfo.location.country}
                </h2>
                <p>Temperatura: {weatherInfo.current.temp_c}°C</p>
                <p>Sensação Térmica: {weatherInfo.current.feelslike_c}°C</p>
                <p>Descrição: {weatherInfo.current.condition.text}</p>
                <p>Umidade: {weatherInfo.current.humidity}%</p>
              </div>
            ) : (
              <Alert variant="danger">
                Cidade não encontrada. Verifique o nome e tente novamente.
              </Alert>
            )
          ) : (
            <Alert variant="warning">
              Informe o nome de uma cidade e clique em "Enviar" para verificar o
              clima.
            </Alert>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
