import "./style.css";
// import barChart from "./scripts/barChart";
import radarChart from "./scripts/radarChart";
import { getVirtualData } from "./scripts/calendarChart";
// import circularBarchart from "./scripts/circularBarChart";
import calendarChart from "./scripts/calendarChart";
import sankeyChart from "./scripts/sankeyChart";

window.addEventListener("resize", () => {
  // barChart.resize();
  radarChart.resize();
  calendarChart.resize();
  // circularBarchart.resize();
  sankeyChart.resize();
});

window.addEventListener("load", () => {
  window.setTimeout(async () => {
    try {
      const request = await fetch("./data.json");
      const data = await request.json();

      radarChart.setOption({
        title: {
          text: "Basic Radar Chart",
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending", "Actual Spending"],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: Object.values(data.wrestlers[0].radar_chart),
              },
              {
                value: Object.values(data.wrestlers[1].radar_chart),
              },
              {
                value: Object.values(data.wrestlers[2].radar_chart),
              },
            ],
          },
        ],
      });

      let uniqueSankeyData = [];
      for (let i = 0, j = data.wrestlers.length; i < j; i++) {
        const wrestler = data.wrestlers[i];
        const sources = wrestler.sankey_data.map((data) => data.source);
        const targets = wrestler.sankey_data.map((data) => data.target);
        uniqueSankeyData = uniqueSankeyData.concat(sources);
        uniqueSankeyData = uniqueSankeyData.concat(targets);
      }
      uniqueSankeyData = [...new Set(uniqueSankeyData)];
      sankeyChart.setOption({
        series: {
          data: uniqueSankeyData.map((data) => ({ name: data })),
          links: data.wrestlers[2].sankey_data,
        },
      });

      calendarChart.setOption({
        calendar: {
          range: "2024",
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: getVirtualData("2024"),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, 1000);
});
