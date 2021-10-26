import { useParams } from "react-router-dom";
import { useMovie } from "services/firebase";

interface MovieViewParams {
  id: string;
}
export const MovieView = (): JSX.Element => {
  const { id } = useParams<MovieViewParams>();
  const movie = useMovie(id);

  if (!movie) return <>loading</>;

  return <pre>{JSON.stringify(movie, null, 2)}</pre>;
};
