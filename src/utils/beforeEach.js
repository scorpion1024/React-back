import  { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "../route/index";
class FrontendAuth extends Component {
    render() {
        const { routerConfig, location } = this.props;
        const { pathname } = location;
        const isLogin = sessionStorage.getItem("token");
        const targetRouterConfig = routerConfig.find(
            (item) => {
                return item.path.replace(/\s*/g, "") === pathname
            }
        );
        const userRouterConfig = routes.find(
            (item) => {
                return item.path.replace(/\s*/g, "") === pathname
            }
        );
        if (userRouterConfig && !userRouterConfig.auth && !isLogin) {
            return <Route exact path={routerConfig[0].pathname} component={routerConfig[0].component} />
        }
        if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
            const { component } = targetRouterConfig;
            return <Route exact path={pathname} component={component} />
        }
        if (isLogin) {
            // 如果是登陆状态，想要跳转到登陆，重定向到主页
            if (pathname === "/login") {
                return <Redirect to="/" />;
            } else {
                // 如果路由合法，就跳转到相应的路由
                if (targetRouterConfig) {
                    return (<Route path={pathname} component={targetRouterConfig.component} />);
                } else {
                    // 如果路由不合法，重定向到 404 页面
                    return <Redirect to="/404" />;
                }
            }
        } else {
            // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
            if (targetRouterConfig && targetRouterConfig.auth) {
                return <Redirect to="/login" />;
            } else if (userRouterConfig && userRouterConfig.auth) {
                return <Redirect to="/login" />;
            }else{
                // 非登陆状态下，路由不合法时，重定向至 404
                return <Redirect to="/404" />;
            }
        }
    }
}
export default FrontendAuth