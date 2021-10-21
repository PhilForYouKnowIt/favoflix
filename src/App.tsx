import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "components/views/HomeView";
import { AppLayout } from "components/layout/AppLayout";
import { SearchView } from "components/views/SearchView";

function App() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route exact path="/search">
            <SearchView />
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
}

export default App;
