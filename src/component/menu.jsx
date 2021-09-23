import { Menu } from "antd";
import * as Icon from "@ant-design/icons";
import React, { Component } from "react";
import { Link, Prompt } from "react-router-dom";
import { getUserToken } from "../utils/api";
const { SubMenu } = Menu;

class MyMenu extends Component {
  iconBC = (name) => {
    return React.createElement(Icon[name]);
  };
  routeConfirm = (location) => {
    getUserToken(this.props.userInfo)
      .then((res) => {
        if (res.code === 0) {
          sessionStorage.setItem("token", res.msg);
          return true;
        } else {
          sessionStorage.removeItem("token");
          window.location.href = "/";
          return false;
        }
      })
      .catch((error) => {
        sessionStorage.removeItem("token");
        window.location.href = "/";
        return false;
      });
  };
  render() {
    const { routes, defaultPath, defaultKey } = this.props;
    return (
      <div>
        <Prompt when={true} message={this.routeConfirm} />
        <Menu
          style={{ height: "100%" }}
          defaultSelectedKeys={[defaultPath]}
          defaultOpenKeys={[defaultKey]}
          mode="inline"
          theme="dark"
        >
          {routes.map((route) => {
            return (
              <SubMenu
                key={route.nav}
                icon={this.iconBC(route.icon)}
                title={route.navName}
              >
                {route.com.map((item) => {
                  return (
                    <Menu.Item key={item.path}>
                      <Link to={item.path}>{item.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    );
  }
}
export default MyMenu;
