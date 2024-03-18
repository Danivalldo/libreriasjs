import echarts from "./initEcharts";

const sankeyChart = echarts.init(document.querySelector(".sankey-chart"));

sankeyChart.setOption({
  series: {
    type: "sankey",
    layout: "none",
    emphasis: {
      focus: "adjacency",
    },
    links: [],
    data: [],
  },
});

export default sankeyChart;
