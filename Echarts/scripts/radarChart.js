import echarts from "./initEcharts";

const radarChart = echarts.init(document.querySelector(".radar-chart"));

radarChart.setOption({
  title: {
    text: "Basic Radar Chart",
  },
  legend: {
    data: ["Allocated Budget", "Actual Spending"],
  },
  radar: {
    shape: "circle",
    indicator: [
      { name: "Agilidad", max: 100 },
      { name: "Fuerza", max: 100 },
      { name: "Resistencia", max: 100 },
      { name: "Técnica", max: 100 },
      { name: "Carisma", max: 100 },
    ],
  },
  tooltip: {},
  series: [],
});

export default radarChart;
