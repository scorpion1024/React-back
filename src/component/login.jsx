import { Component } from "react";
import "../static/css/login.css";
import http from "../utils/http";
import Loading from "./loading";
import { message } from "antd";
import md5 from "js-md5";
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      showElem: "none",
      md5Word: "",
    };
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "passWord") {
      this.setState({
        md5Word: md5(value),
      });
    }
    this.setState({
      [name]: value,
    });
  };
  doLogin = (event) => {
    event.preventDefault();
    if (this.state.userName === "") {
      message.error("请输入用户名");
      return false;
    }
    if (this.state.passWord === "") {
      message.error("请输入密码");
      return false;
    }
    this.setState({
      showElem: "block",
    });
    http
      .post("/api/do_login", {
        userName: this.state.userName,
        passWord: this.state.md5Word,
      })
      .then((res) => {
        this.setState({
          showElem: "none",
        });
        if (res.code === 0) {
          sessionStorage.setItem("token", res.msg.account);
		  this.props.history.push('/');
        } else {
          message.error(res.msg);
        }
      })
      .catch((error) => {
        this.setState({
          showElem: "none",
        });
        message.error(error);
      });
  };
  render() {
    return (
      <div className="contain">
        <div className="loginBox">
          <div style={{ display: this.state.showElem }}>
            <Loading />
          </div>

          <h2>后台管理系统</h2>
          <form>
            <div className="item">
              <input
                type="text"
                name="userName"
                required
                defaultValue={this.state.userName}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <label htmlFor="">用户名</label>
            </div>
            <div className="item">
              <input
                type="password"
                name="passWord"
                required
                defaultValue={this.state.passWord}
                onChange={this.handleChange}
              />
              <label htmlFor="">密码</label>
            </div>
            <button className="btn" onClick={this.doLogin}>
              提交
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default login;
