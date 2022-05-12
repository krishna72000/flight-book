import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Site } from "./views/Site";
import AppBody from "./views/Layout/AppBody"
import { Main } from "./views/Main"
import { Auth } from "./drivers"
import { guestPage } from './links/pages';


function App() {
  return (
    <div className="mainContainer">
      <Router>
        <Auth>
          <AppBody>
            <Switch>
              <Route path={guestPage} component={Site} />
              <Route path="/" component={Main} />
              <Route>404 Not Fount</Route>
            </Switch>
          </AppBody>
        </Auth>
      </Router>
    </div>
  );
}

export default App;
