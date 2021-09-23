import "../static/css/global.css";
import "antd/dist/antd.css";
import MyMenu from "./menu";
import { routeAll as routes } from "../route/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Button, Space } from "antd";
import { Component } from "react";
import { decode } from "../utils/utils";
const { Header, Sider, Content } = Layout;
const menuWidth = 230;

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
  render() {
    const { collapsed, userInfo } = this.state;
    let path = this.props.location.pathname.replace(/\s*/g, "");
    if (path === "/") {
      path = "/home/home";
    }
    const key = path.split("/")[1];
    return (
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Header
            style={{ color: "#fff", fontSize: "24px" }}
            className="site-layout-background"
          >
            知名后台管理系统
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
                defaultPath={path}
                defaultKey={key}
                routes={routes}
                userInfo={userInfo}
              />
            </Sider>
            <Content>
              <Switch>
                <Route
                  key="/"
                  exact
                  path="/"
                  component={routes[0].com[0].component}
                />
                {routes.map((route) => {
                  return route.com.map((item) => {
                    return (
                      <Route
                        key={item.path}
                        path={item.path}
                        component={item.component}
                      />
                    );
                  });
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
