import { Component } from 'react';
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '首页'
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

export default home;
