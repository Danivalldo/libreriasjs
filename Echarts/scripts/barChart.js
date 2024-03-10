import echarts from "./initEcharts";

const barChart = echarts.init(document.querySelector(".bar-chart"));

barChart.setOption({
  title: {
    text: "Simple bar chart",
  },
  tooltip: {},
  xAxis: {
    data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
  },
  yAxis: {},
  series: [
    {
      name: "Sales",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});

export default barChart;
