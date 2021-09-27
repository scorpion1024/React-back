import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./component/login";
function IsLogin() {
    if (sessionStorage.getItem("token")) {
        return <App />;
    } else {
        return <Login />;
    }
}
ReactDOM.render(
    <IsLogin />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
