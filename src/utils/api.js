import { post } from './http'

export const getUserToken = (user) => {
    return post("/api/get_userinfo", user);
}

export const getUserList = (param) => {
    return post("/api/get_list", param);
}

export const changeAdmin = (param) => {
    return post("/api/change_admin", param);
}