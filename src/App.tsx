import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Navbar,
  FormControl,
  Form,
  Button,
  Col,
} from "react-bootstrap";
import { useMovies } from "./services/firebase";
import { MovieCard } from "./components/cards/MovieCard";

function App() {
  const movies = useMovies();

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">FavoFlix</Navbar.Brand>
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
      <Container className={"mt-4"}>
        <Row className="mx-0 row-cols-4">
          {movies.map((movie) => (
            <Col key={movie.id} className={"pb-4"}>
              <MovieCard key={movie.id} movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
