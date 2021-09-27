import Index from './component/index';
import Error404 from "./component/error404";
import "./static/css/loading.css";
import FrontendAuth from "./utils/beforeEach";
import { BrowserRouter as Router, Switch } from "react-router-dom";
const routes = [
  { path: "/", name: "index", component: Index, auth: true },
  { path: "/404", name: "404", component: Error404 }
]
const App = () => {
  return (
    <Router>
      <Switch>
        <FrontendAuth routerConfig={routes} />
      </Switch>
    </Router>
  );
}

export default App;