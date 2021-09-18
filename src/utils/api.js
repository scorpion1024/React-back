import http from './http'

export function getUserToken(id) {
    http
        .post("/api/get_userinfo", {
            id: id
        })
        .then((res) => {
            if (res.code === 0) {
                sessionStorage.setItem("token", res.msg);
                window.location.reload();
            } else {
                sessionStorage.removeItem("token");
            }
        })
        .catch((error) => {
            sessionStorage.removeItem("token");
        });
}