const baseURL = ''
function http(url,data={},type='get'){
  let obj = {
    method:type,
    headers:{
      'Content-Type':'application/json'
    },
    body:''
  }
  url=baseURL+url;
  if(/post/i.test(obj.method)){
      obj.body=JSON.stringify(data);
  }else{
    let str = '';
    Object.keys(data).forEach(item=>{
      str +=`${item}=${data[item]}&`
    })
    str = str.replace(/&$/,'')
    url += '?'+str
  }
  return fetch(url,obj).then(res=>res.json())
}
http.get = function(url,data){
  return http(url,data,'get')
}
http.post = function(url,data){
  return http(url,data,'post')
}
export default http