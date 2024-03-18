import echarts from "./initEcharts";

const circularBarchart = echarts.init(
  document.querySelector(".circular-bar-chart")
);

circularBarchart.setOption({
  title: [
    {
      text: "Tangential Polar Bar Label Position (middle)",
    },
  ],
  polar: {
    radius: [30, "80%"],
  },
  angleAxis: {
    max: 4,
    startAngle: 75,
  },
  radiusAxis: {
    type: "category",
    data: ["a", "b", "c", "d"],
  },
  tooltip: {},
  series: {
    type: "bar",
    data: [2, 1.2, 2.4, 3.6],
    coordinateSystem: "polar",
    label: {
      show: true,
      position: "middle",
      formatter: "{b}: {c}",
    },
  },
});

export default circularBarchart;
