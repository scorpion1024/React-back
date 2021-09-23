import { post } from './http'

function getUserToken(user) {
    return post("/api/get_userinfo", user);
}
export { getUserToken };