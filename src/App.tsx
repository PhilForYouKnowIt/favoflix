import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "components/views/HomeView";
import { AppLayout } from "components/layout/AppLayout";
import { SuggestView } from "components/views/SuggestView";
import { MovieView } from "components/views/MovieView";

function App() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/suggest" component={SuggestView} />
          <Route exact path="/movie/:id" component={MovieView} />
        </Switch>
      </AppLayout>
    </Router>
  );
}

export default App;
