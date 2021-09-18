import "../static/css/global.css";
import "antd/dist/antd.css";
import MyMenu from "./menu";
import routeAll from "../route/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Button, Space } from "antd";
import { Component } from "react";
import { decode, filterRoutes } from "../utils/utils";
import { getUserToken } from "../utils/api";
const { Header, Sider, Content } = Layout;
const menuWidth = 230;
let defaultIndex = 0;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      userInfo: JSON.parse(atob(decode(sessionStorage.getItem("token")))),
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  logOut = () => {
    sessionStorage.removeItem("token");
    this.props.history.push("/login");
  };
  refreshToken = (id) => {
    getUserToken(id);
  };
  render() {
    const path = this.props.location.pathname.replace(/\s*/g, "");
    const { collapsed, userInfo } = this.state;
    const routes = filterRoutes(userInfo, routeAll);
    routes.forEach((item, key) => {
      if (item.path === path) {
        defaultIndex = key;
      }
    });
    return (
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Header
            style={{ color: "#fff", fontSize: "24px" }}
            className="site-layout-background"
          >
            天庭后台管理系统
            <div style={{ float: "right" }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "18px",
                  lineHeight: "18px",
                }}
              >
                {userInfo.name},欢迎回来！
              </div>
              <Space>
                <Button
                  type="primary"
                  onClick={this.refreshToken.bind(this, userInfo.id)}
                >
                  刷新Token
                </Button>
                <Button type="primary" onClick={this.logOut}>
                  退出
                </Button>
              </Space>
            </div>
          </Header>
          <Layout className="site-layout">
            <Sider
              width={menuWidth}
              collapsible
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            >
              <MyMenu
                menuWidth={menuWidth}
                defaultPath={routes[defaultIndex].path}
                routes={routes}
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
