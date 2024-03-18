import * as echarts from "echarts/core";
import {
  BarChart,
  RadarChart,
  SankeyChart,
  HeatmapChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PolarComponent,
  CalendarComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  BarChart,
  RadarChart,
  SankeyChart,
  HeatmapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PolarComponent,
  CalendarComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

export default echarts;
