import "./SCSS/index.scss";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";
import GUI from "lil-gui";

const tileLayerOSM = new Tile({
  source: new OSM(),
});

const tileLayerTopoCat = new Tile({
  source: new TileWMS({
    projection: "EPSG:25831",
    url: "https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?",
    params: {
      LAYERS: "topo",
    },
  }),
});

const tileLayerSummer2019Cat = new Tile({
  source: new TileWMS({
    projection: "EPSG:25831",
    url: "https://geoserveis.icgc.cat/icgc_sentinel2/wms/service?",
    params: {
      LAYERS: "sen2rgb_mosaic_estiu_2019",
    },
  }),
});

const tileLayerFire2019Cat = new Tile({
  source: new TileWMS({
    projection: "EPSG:25831",
    url: "https://geoserveis.icgc.cat/servei/catalunya/incendis/wms/service?",
    params: {
      LAYERS: "20190701-RiberaEbre-orto15cm-rgb",
    },
  }),
});

const map = new Map({
  target: "map",
  layers: [
    tileLayerOSM,
    tileLayerTopoCat,
    tileLayerSummer2019Cat,
    tileLayerFire2019Cat,
  ],
  view: new View({
    center: fromLonLat([0.600712, 41.280345]),
    zoom: 12,
  }),
});

const lilGuiBox = new GUI();

const guiActions = {
  showTileLayerOSM: true,
  showTileLayerTopoCat: true,
  showTileLayerSummer2019Cat: true,
  showTileLayerFire2019Cat: true,
  fireLayerOpacity: 1,
  goToPlace: () => {
    map.getView().animate({
      center: fromLonLat([0.600712, 41.280345]),
      zoom: 12,
    });
  },
};

const fireFolder = lilGuiBox.addFolder("Incendio 2019");

fireFolder
  .add(guiActions, "showTileLayerFire2019Cat")
  .name("Capa incendio 2019")
  .onChange((visible) => {
    tileLayerFire2019Cat.setVisible(visible);
  });
fireFolder
  .add(guiActions, "fireLayerOpacity")
  .name("Opacidad de la capa")
  .min(0)
  .max(1)
  .onChange((opacity) => {
    tileLayerFire2019Cat.setOpacity(opacity);
  });
fireFolder.add(guiActions, "goToPlace").name("Ir a la zona afectada");
lilGuiBox
  .add(guiActions, "showTileLayerSummer2019Cat")
  .name("Capa vegetación 2019")
  .onChange((visible) => {
    tileLayerSummer2019Cat.setVisible(visible);
  });
lilGuiBox
  .add(guiActions, "showTileLayerTopoCat")
  .name("Capa toponímia Catalunya")
  .onChange((visible) => {
    tileLayerTopoCat.setVisible(visible);
  });

lilGuiBox
  .add(guiActions, "showTileLayerOSM")
  .name("Capa Open Street Map")
  .onChange((visible) => {
    tileLayerOSM.setVisible(visible);
  });
