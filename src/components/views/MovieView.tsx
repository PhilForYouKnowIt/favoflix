import { useParams } from "react-router-dom";
import { useMovie } from "services/firebase";
import { Spinner } from "react-bootstrap";

interface MovieViewParams {
  id: string;
}
export const MovieView = (): JSX.Element => {
  const { id } = useParams<MovieViewParams>();
  const [movie, loading] = useMovie(id);

  if (loading) return <Spinner animation="border" />;
  if (!movie) return <>not found</>;

  return <pre>{JSON.stringify(movie, null, 2)}</pre>;
};
