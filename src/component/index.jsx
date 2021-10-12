import "antd/dist/antd.css";
import MyMenu from "./menu";
import { routeAll as routes } from "@/route/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Button, Space } from "antd";
import { Component } from "react";
import { decode } from "@/utils/utils";
const { Header, Sider, Content } = Layout;
const menuWidth = 230;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      userInfo: JSON.parse(
        Buffer.from(decode(sessionStorage.getItem("token")), "base64")
      ),
    };
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  logOut = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };
  render() {
    const { collapsed, userInfo } = this.state;
    let path = this.props.location.pathname.replace(/\s*/g, "");
    if (path === "/") {
      path = "/home/home";
    }
    const key = path.split("/")[1];
    const headerStyle = { color: "#fff", fontSize: "24px" };
    const layoutStyle = { height: "100vh" };
    return (
      <Router>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            知名后台管理系统
            <Space style={{ float: "right" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "18px",
                  lineHeight: "18px",
                }}
              >
                {userInfo.name},欢迎回来！
              </span>
              <Button type="primary" onClick={this.logOut}>
                退出
              </Button>
            </Space>
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
