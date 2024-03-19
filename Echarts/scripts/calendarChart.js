import echarts from "./initEcharts";

const calendarChart = echarts.init(document.querySelector(".calendar-chart"));

calendarChart.setOption({
  visualMap: {
    show: false,
    min: 0,
    max: 1,
    inRange: {
      color: ["#2eb675", "#fcc950"],
    },
  },
  calendar: {
    range: "2024-01",
    cellSize: [40, 40],
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data: [],
  },
});

export default calendarChart;
