const files = require.context('../views/', true, /\.js$/);
let configFiles = [];
files.keys().forEach(key => {
    configFiles.push(files(key).default)
});
let routeAll = [];
configFiles.forEach(route => {
    if (typeof route === 'function') {
        let routeClass = new route();
        let {path,name} = routeClass.state;
        routeAll.push({ path: path, name: name, component: route, auth: true });
    }
});
const userRoutes = ['order', 'home'];
const routes = routeAll.filter(item => item.path ? userRoutes.includes(item.path.slice(1)) : false);
export default routes;