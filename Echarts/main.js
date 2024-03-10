import "./style.css";
import barChart from "./scripts/barChart";
import radarChart from "./scripts/radarChart";

window.addEventListener("resize", () => {
  barChart.resize();
  radarChart.resize();
});
