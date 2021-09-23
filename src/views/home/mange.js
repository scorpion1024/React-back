import { Component } from 'react';
export default class mange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '后台管理'
        };
    }

    render() {
        return (
            <div>
                <div>后台管理</div>
            </div>
        );
    }
}

