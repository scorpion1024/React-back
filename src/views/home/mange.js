import { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Empty, Card } from 'antd';
import { getWeaherData } from '@/utils/api'
import Echart from '@/component/chart'
export default class mange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '后台管理',
            emptyStyle: { display: 'none' },
            chartStyle: { display: 'block' },
            echartOptions: [],
            highchartOptions: {
                title: { text: '城市降雨量' },
                series: [],
                yAxis: {
                    title: { text: '毫米' }
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%Y-%m-%d', this.value);
                        }
                    },
                },
                credits: {
                    enabled: false
                }
            }
        };
    }

    getData = () => {
        getWeaherData()
            .then((res) => {
                if (res.highchart.length === 0) {
                    this.setState({
                        emptyStyle: { display: 'block' },
                        chartStyle: { display: 'none' }
                    });
                } else {
                    this.setState({
                        emptyStyle: { display: 'none' },
                        chartStyle: { display: 'block' },
                        highchartOptions: { series: res.highchart },
                        echartOptions: res.echart,
                    });
                }
            })
            .catch((res) => {
                console.log(res);
            });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { highchartOptions, emptyStyle, chartStyle, echartOptions } = this.state;
        const conStyle = {
            margin: '10px'
        }
        return (
            <div>
                <Card title="折线图表之一" style={conStyle}>
                    <span style={chartStyle}>
                        <HighchartsReact highcharts={Highcharts} options={highchartOptions} />
                    </span>
                    <span style={emptyStyle}><Empty /></span>
                </Card>
                <Card title="折线图表之二" style={conStyle}>
                    <span style={chartStyle}>
                        <Echart options={echartOptions} />
                    </span>
                    <span style={emptyStyle}><Empty /></span>
                </Card>
            </div>
        );
    }
}

