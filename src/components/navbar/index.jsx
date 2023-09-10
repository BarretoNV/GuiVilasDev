import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/GV.png";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="text-light">
      <Container>
        <Navbar.Brand className="text-light" href="#home">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-light">
              Gui Vilas v2.0
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#aboutMe" className="text-light">
              01. Sobre mim
            </Nav.Link>
            <Nav.Link href="#workHistory" className="text-light">
              02. Experiência
            </Nav.Link>
            <Button type="button" variant="dark">
              Currículo
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
