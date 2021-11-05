import { Container, Nav, Navbar } from "react-bootstrap";
import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Autocomplete } from "components/search/Autocomplete";
import { LoginModalView } from "components/views/LoginModalView";
import { UserContext } from "App";
import { LogoutButton } from "components/forms/LogoutButton";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  const userContext = useContext(UserContext);

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark" className={"fixed-top"}>
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
              <LinkContainer to="/upload">
                <Nav.Link>Upload</Nav.Link>
              </LinkContainer>
              {userContext.user ? <LogoutButton /> : <LoginModalView />}
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex">
            <Autocomplete openOnFocus={true} />
          </div>
        </Container>
      </Navbar>
      <Container className={"mt-4 pt-5"}>{children}</Container>
    </>
  );
};
