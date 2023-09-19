import { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import ImagesObject from "../../assets/images";
import "./style.css";

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Ativar loading

    emailjs
      .sendForm(
        "service_35owk0r",
        "template_krxm158",
        form.current,
        "Ycq5-IiWAbEwYYJ5-"
      )
      .then(
        (result) => {
          setSuccessMessage("E-mail enviado com sucesso.");
          setErrorMessage(""); // Limpar mensagem de erro, se houver.
          console.log(result.text);
        },
        (error) => {
          setErrorMessage("Erro ao enviar o e-mail.");
          setSuccessMessage(""); // Limpar mensagem de sucesso, se houver.
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false); // Desativar loading após o envio
      });
  };

  useEffect(() => {
    // Limpar as mensagens após 5 segundos (5000 milissegundos)
    const messageTimer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 5000);

    // Limpar o timer quando o componente for desmontado
    return () => clearTimeout(messageTimer);
  }, [successMessage, errorMessage]);

  return (
    <Form className="form-container w-100" ref={form} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName" className="form-group">
        <Form.Label className="form-label">Nome</Form.Label>
        <input
          type="text"
          name="from_name"
          id="from_name"
          placeholder="Nome"
          required
          className="form-control"
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className="form-group">
        <Form.Label className="form-label">Email</Form.Label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          required
          className="form-control"
        />
      </Form.Group>

      <Form.Group controlId="formBasicMessage" className="form-group">
        <Form.Label className="form-label">Mensagem</Form.Label>
        <textarea
          rows={4}
          type="text"
          name="message"
          id="message"
          placeholder="Mensagem"
          required
          className="form-control"
        />
      </Form.Group>
      <Row className="align-items-center">
        <Col>
          <Button
            variant="primary"
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </Col>
        <Col className="text-center d-flex align-items-center justify-content-end">
          <img
            src={ImagesObject.emailJsLogo}
            style={{ height: "50px" }}
            className="mb-0 ml-2 p-1"
            alt="EmailJS"
          />
          <p className="mb-0 ml-2">EmailJS</p>
        </Col>
      </Row>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </Form>
  );
};

export default ContactForm;
