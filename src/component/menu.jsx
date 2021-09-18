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
    console.log("click ", e);
  };

  render() {
    const { routes, defaultPath } = this.props;
    return (
      <Menu
        onClick={this.handleClick}
        style={{ height: "100%" }}
        defaultSelectedKeys={[defaultPath]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          {routes.map((item) => {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            );
          })}

          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default MyMenu;
