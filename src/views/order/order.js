import { Component } from 'react';
class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '订单页面'
        };
    }

    render() {
        return (
            <div><strong>订单页面</strong></div>
        );
    }
}

export default order;
