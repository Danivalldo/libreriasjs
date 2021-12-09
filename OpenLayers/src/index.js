import "./SCSS/index.scss";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";

const map = new Map({
  target: "map",
  layers: [
    new Tile({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([37.41, 8.82]),
    zoom: 4,
  }),
});
