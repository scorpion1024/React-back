const files = require.context('../views/', true, /\.js$/);
let routes = [];
files.keys().forEach(key => {
    let route = files(key).default;
    if (typeof route === 'function') {
        const path = key.replace('.js', '').slice(1);
        const routeClass = new route();
        const { name } = routeClass.state;
        routes.push({ path: path, name: name, component: route, auth: true });
    }
});
const navNameArr = { home: '后台管理', order: '订单管理', user: '用户管理' };
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
            routeItem[pathArr[0]] = { nav: pathArr[0], navName: navNameArr[pathArr[0]], com: [{ path: path, name: name, component: route, auth: true }] }
        } else {
            routeItem[pathArr[0]].com.push({ path: path, name: name, component: route, auth: true });
        }

    }
});
const routeAll = Object.values(routeItem);

export { routeAll, routes }