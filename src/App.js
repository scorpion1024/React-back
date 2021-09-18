import Index from './component/index';
import Error404 from "./component/error404";
import Login from "./component/login";
import "./static/css/loading.css";
import FrontendAuth from "./utils/beforeEach";
import { BrowserRouter as Router, Switch } from "react-router-dom";
var routes = [
  { path: "/", name: "index", component: Index, auth: true },
  { path: "/404", name: "404", component: Error404 },
  { path: "/login", name: "login", component: Login }
]
function App() {
  return (
    <Router>
      <Switch>
        <FrontendAuth routerConfig={routes} />
      </Switch>
    </Router>
  );
}

export default App;