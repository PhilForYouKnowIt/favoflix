import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FavoFlix</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/suggest">
                <Nav.Link>Suggest</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <Container className={"mt-4"}>{children}</Container>
    </div>
  );
};
