import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

class MyMenu extends Component {
  handleClick = (e) => {
    console.log(e);
  };

  render() {
    const { routes, defaultPath, defaultKey } = this.props;
    return (
      <Menu
        style={{ height: "100%" }}
        defaultSelectedKeys={[defaultPath]}
        defaultOpenKeys={[defaultKey]}
        mode="inline"
        theme="dark"
        onClick={this.handleClick}
      >
        {routes.map((route) => {
          return (
            <SubMenu
              key={route.nav}
              icon={<MailOutlined />}
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
    );
  }
}
export default MyMenu;
