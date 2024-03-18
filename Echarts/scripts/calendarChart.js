import echarts from "./initEcharts";

const calendarChart = echarts.init(document.querySelector(".calendar-chart"));

export function getVirtualData(year) {
  const date = +echarts.time.parse(year + "-01-01");
  const end = +echarts.time.parse(year + "-12-31");
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time <= end; time += dayTime) {
    data.push([
      echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
      Math.floor(Math.random() * 10000),
    ]);
  }
  return data;
}
const option = {
  visualMap: {
    show: false,
    min: 0,
    max: 10000,
  },
  calendar: {
    range: "2017",
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data: [],
  },
};

calendarChart.setOption(option);

export default calendarChart;
