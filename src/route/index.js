import { decode, filterRoutes } from "../utils/utils";
const isLogin = sessionStorage.getItem("token");
const files = require.context('../views/', true, /\.js$/);

const navNameArr = { home: { name: '后台管理', icon: 'SettingFilled' }, order: { name: '订单管理', icon: 'AccountBookFilled' }, user: { name: '用户管理', icon: 'IdcardFilled' } };
let routeItem = {};
files.keys().forEach(key => {
    let route = files(key).default;
    if (typeof route === 'function') {
        const path = key.replace('.js', '').slice(1);
        const pathArr = path.split('/');
        const routeClass = new route();
        const { name } = routeClass.state;
        pathArr.shift();
        if (!routeItem[pathArr[0]]) {
            routeItem[pathArr[0]] = { nav: pathArr[0], navName: navNameArr[pathArr[0]].name, icon: navNameArr[pathArr[0]].icon, com: [{ path: path, name: name, component: route, auth: true }] }
        } else {
            routeItem[pathArr[0]].com.push({ path: path, name: name, component: route, auth: true });
        }

    }
});
let routeAll = Object.values(routeItem);
if (isLogin) {
    const userInfo = JSON.parse(
        Buffer.from(decode(sessionStorage.getItem("token")), "base64")
    );
    routeAll = filterRoutes(userInfo, routeAll);
} else {
    routeAll = [];
}
export { routeAll }