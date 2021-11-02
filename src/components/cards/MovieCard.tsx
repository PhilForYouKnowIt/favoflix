import { Card } from "react-bootstrap";
import { Movie } from "services/firebase";
import { LinkContainer } from "react-router-bootstrap";

type MovieCardProps = {
  movie: Movie;
};
export const MovieCard = (props: MovieCardProps) => {
  return (
    <LinkContainer to={`/movie/${props.movie.id}`}>
      <Card className="h-100 shadow">
        <Card.Img variant="top" className="fit-img" src={props.movie.poster} />
        <Card.Body>
          <Card.Title>{props.movie.title}</Card.Title>
          <Card.Text>{props.movie.plot}</Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};
