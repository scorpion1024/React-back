import "../static/css/global.css";
import "antd/dist/antd.css";
import MyMenu from "./menu";
import routes from "../route/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { Component } from "react";

const { Header, Sider, Content } = Layout;
const menuWidth = 230;
let defaultIndex = 0;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const path = this.props.location.pathname.replace(/\s*/g, "");
    routes.forEach((item, key) => {
      if (item.path === path) {
        defaultIndex = key;
      }
    });
    return (
      <Router>
        <Layout>
          <Header style={{ color: "#fff", fontSize: "24px" }}>
            天庭后台管理系统
          </Header>
          <Layout>
            <Sider width={menuWidth}>
              <MyMenu
                menuWidth={menuWidth}
                defaultPath={routes[defaultIndex].path}
              />
            </Sider>
            <Content>
              <Switch>
                <Route
                  key="/"
                  exact
                  path="/"
                  component={routes[defaultIndex].component}
                />
                {routes.map((item) => {
                  const { path, component } = item;
                  return (
                    <Route key={path} exact path={path} component={component} />
                  );
                })}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default index;
