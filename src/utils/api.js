import { post } from './http'

export function getUserToken(user) {
    post("/api/get_userinfo", user)
        .then((res) => {
            if (res.code === 0) {
                sessionStorage.setItem("token", res.msg);
            } else {
                sessionStorage.removeItem("token");
            }
        })
        .catch((error) => {
            sessionStorage.removeItem("token");
        });
}