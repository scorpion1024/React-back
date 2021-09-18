const files = require.context('../views/', true, /\.js$/);
let configFiles = [];
files.keys().forEach(key => {
    configFiles.push(files(key).default)
});
let routeAll = [];
configFiles.forEach(route => {
    if (typeof route === 'function') {
        let routeClass = new route();
        let { path, name } = routeClass.state;
        routeAll.push({ path: path, name: name, component: route, auth: true });
    }
});

export default routeAll;