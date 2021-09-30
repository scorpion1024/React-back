import { Menu } from "antd";
import * as Icon from "@ant-design/icons";
import React from "react";
import { Link, Prompt } from "react-router-dom";
import { getUserToken } from "@/utils/api";
const iconBC = (name) => {
  return React.createElement(Icon[name]);
};
const routeConfirm = (userInfo) => {
  getUserToken(userInfo)
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
const { SubMenu } = Menu;
const MyMenu = (props) => {
  const { routes, defaultPath, defaultKey, userInfo } = props;
  return (
    <div>
      <Prompt when={true} message={routeConfirm.bind(this, userInfo)} />
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
              icon={iconBC(route.icon)}
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
};
export default MyMenu;
