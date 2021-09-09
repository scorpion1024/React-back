import home from '../views/home';
import order from '../views/order';

const routeAll = [
    { path: '/home',name:'首页', component: home },
    { path: '/order',name:'订单管理', component: order }
];

const userRoutes = ['order','home'];
const routes = routeAll.filter(item=>userRoutes.includes(item.path.slice(1)));

export default routes;