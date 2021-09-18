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
    let routes = routeAll;
    if (userInfo.is_admin !== '1') {
        if (userInfo.paths) {
            const pathArr = userInfo.paths.split(',');
            routes = routeAll.filter(item => pathArr.includes(item.path.slice(1)) ? item : false);
        } else {
            routes = [routeAll[0]]
        }
    }
    return routes;
}