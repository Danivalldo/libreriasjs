import "./SCSS/index.scss";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";

const map = new Map({
  target: "map",
  layers: [
    new Tile({
      source: new OSM(),
    }),
    new Tile({
      source: new TileWMS({
        projection: "EPSG:25831",
        url: "https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?",
        params: {
          LAYERS: "topo",
        },
      }),
    }),
    // https://www.icgc.cat/Administracio-i-empresa/Serveis/Geoinformacio-en-linia-Geoserveis/WMS-Vegetacio/WMS-Incendi-Ribera-d-Ebre-2019
    new Tile({
      source: new TileWMS({
        projection: "EPSG:25831",
        url: "https://geoserveis.icgc.cat/servei/catalunya/incendis/wms/service?",
        params: {
          LAYERS: "20190701-RiberaEbre-orto15cm-rgb",
        },
      }),
    }),
  ],
  view: new View({
    center: fromLonLat([2.174288, 41.403287]),
    zoom: 20,
  }),
});
