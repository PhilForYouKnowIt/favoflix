import { Card } from "react-bootstrap";
import { Movie } from "../../services/firebase";

type MovieCardProps = {
  movie: Movie;
};
export const MovieCard = (props: MovieCardProps) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" className="fit-img" src={props.movie.poster} />
      <Card.Body>
        <Card.Title>{props.movie.title}</Card.Title>
        <Card.Text>{props.movie.plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};
