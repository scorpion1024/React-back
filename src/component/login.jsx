import React from "react";
import "../static/css/login.css";
function login() {
  return (
    <div className="loginBox">
		<h2>后台管理系统</h2>
		<form action="">
			<div className="item">
				<input type="text" required/>
				<label htmlFor="">用户名</label>
			</div>
			<div className="item">
				<input type="password" required/>
				<label htmlFor="">密码</label>
			</div>
			<button className="btn">提交
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</form>
	</div>
  );
}

export default login;
