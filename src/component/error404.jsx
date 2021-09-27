import img404 from "../static/img/404.png";
import "../static/css/404.css";
const Error404 = () => {
  return (
    <div className="tcy_404 container">
      <img src={img404} alt="" />
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <a href="/" className="btn_404 btn-primary btn_blue">
        返回主页
      </a>
    </div>
  );
};

export default Error404;
