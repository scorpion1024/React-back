import { Component } from 'react';
class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '用户管理',
            path: '/users'
        };
    }

    render() {
        return (
            <div>
                <div>默认页</div>
            </div>
        );
    }
}

export default users;
