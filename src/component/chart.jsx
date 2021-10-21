import ReactEcharts from "echarts-for-react";
function Echart(props) {
  const chartData = props.options;
  let seriesData = [];
  let legendData = { left: "20px", orient: "horizontal", data: [] };
  chartData.forEach((item) => {
    let data = {
      name: item.name,
      type: "line",
      smooth: false,
      data: [],
    };
    legendData.data.push(item.name);
    item.data.forEach((value) => {
      data.data.push([new Date(value[0]), value[1]]);
    });
    seriesData.push(data);
  });
  let option = {
    title: {
      text: "城市降雨量",
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: legendData,
    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };
  return (
    <div>
      <ReactEcharts option={option} style={{ height: "500px" }} />
    </div>
  );
}

export default Echart;
