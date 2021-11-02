import { useMovies } from "services/firebase";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "components/cards/MovieCard";

export const HomeView = (): JSX.Element => {
  const movies = useMovies();

  return (
    <Row className="mx-0" xs={1} md={3} lg={4}>
      {movies.map((movie) => (
        <Col key={movie.id} className={"mb-4"}>
          <MovieCard key={movie.id} movie={movie} />
        </Col>
      ))}
    </Row>
  );
};
