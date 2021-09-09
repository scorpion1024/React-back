import { Component } from 'react';
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'首页',
            path:'/home'
        };
    }

    render(){
        return (
            <div>首页123123</div>
        );
    }
}

export default home;
