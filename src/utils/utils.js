export function decode(token) {
    const key = 4;
    let decodeStr = token.slice(0, key + 1);
    const strLen = parseInt(new Date().getDate());
    const tokenArray = token.slice(key + 1);
    for (let index = strLen; index < tokenArray.length; index += (strLen + key)) {
        decodeStr += tokenArray.slice(index, index + key);
    }
    return decodeStr;
}

export function filterRoutes(userInfo, routeAll) {
    let routes = [
        {
            nav: routeAll[0].nav,
            navName: routeAll[0].navName,
            icon: routeAll[0].icon,
            com: [routeAll[0].com[0]]
        }
    ];
    if (userInfo.is_admin !== '1') {
        if (userInfo.paths) {
            let pathArr = userInfo.paths.split(',');
            routeAll.forEach((element, key) => {
                element.com.forEach(item => {
                    if (pathArr.includes(item.path.slice(1))) {
                        if (!routes[key]) {
                            routes[key] = {
                                nav: routeAll[key].nav,
                                navName: routeAll[key].navName,
                                icon: routeAll[key].icon,
                                com: [item]
                            };
                        } else if (key !== 0) {
                            routes[key].com.push(item);
                        }
                    }
                })
            });
        }
    }
    if (userInfo.is_admin === '1') {
        routes = routeAll;
    }
    return routes;
}