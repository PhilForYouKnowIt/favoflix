import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeView } from "components/views/HomeView";
import { AppLayout } from "components/layout/AppLayout";
import { SuggestView } from "components/views/SuggestView";
import { MovieView } from "components/views/MovieView";
import { UploadView } from "components/views/UploadView";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "services/firebase";

interface User {
  uid: string;
  email: string | null;
}

export interface UserContextValue {
  user: User | null;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
});
const UserProvider = UserContext.Provider;

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ uid: user.uid, email: user.email });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <UserProvider value={{ user }}>
        <AppLayout>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/suggest" component={SuggestView} />
            <Route exact path="/movie/:id" component={MovieView} />
            <Route exact path="/upload" component={UploadView} />
          </Switch>
        </AppLayout>
      </UserProvider>
    </Router>
  );
}

export default App;
