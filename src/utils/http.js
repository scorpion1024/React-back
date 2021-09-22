const baseURL = '';
async function http(url, data = {}, type = 'get') {
  let obj = {
    method: type,
    headers: {
      'Content-Type': 'application/json'
    },
    body: ''
  }
  url = baseURL + url;
  if (/post/i.test(obj.method)) {
    obj.body = JSON.stringify(data);
  } else {
    let str = '';
    Object.keys(data).forEach(item => {
      str += `${item}=${data[item]}&`
    })
    str = str.replace(/&$/, '')
    url += '?' + str
  }
  const res = await fetch(url, obj);
  return await res.json();
}
let get = http.get = function (url, data) {
  return http(url, data, 'get')
}
let post = http.post = function (url, data) {
  return http(url, data, 'post')
}
export { http, post, get }