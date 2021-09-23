import { Component } from 'react';
class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '用户管理'
        };
    }

    render() {
        return (
            <div>
                <div>用户页管理</div>
            </div>
        );
    }
}

export default users;
