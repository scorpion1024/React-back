import { post, get } from './http'

export const getUserToken = (user) => {
    return post("/api/get_userinfo", user);
}

export const getUserList = (param) => {
    return post("/api/get_list", param);
}

export const changeAdmin = (param) => {
    return post("/api/change_admin", param);
}
export const doChange = (param) => {
    return post("/api/do_change", param);
}
export const doDelete = (param) => {
    return post("/api/do_delete", param);
}
export const getWeaherData = (param) => {
    return get("/api/get_weather_data", param);
}