import { Donut, Bar, Scatter, Pie } from "rough-viz/dist/roughviz.min.js";
import tinyColor from "tinycolor2";
import "./SCSS/index.scss";

const fetchData = async (quantity = 3) => {
  try {
    const response = await fetch(
      `https://fakerapi.it/api/v1/products?_quantity=${quantity}&_price_min=10&_price_max=100`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getRandomColor = () => {
  const color = new tinyColor(tinyColor.random());
  return color.saturate(100).toHexString();
};

const createBar = (data) => {
  return new Bar({
    element: "#viz-bar-container",
    data: {
      labels: data.map((product) => {
        return product.name;
      }),
      values: data.map((product) => {
        return product.net_price;
      }),
    },
    title: "Barras",
    roughness: 2,
    color: getRandomColor(),
    stroke: "black",
    strokeWidth: 1,
    fillStyle: "zigzag",
    fillWeight: 0.5,
  });
};

const createDonut = (data) => {
  return new Donut({
    element: "#viz-donut-container",
    data: {
      labels: data.map((product) => {
        return product.name;
      }),
      values: data.map((product) => {
        return product.net_price;
      }),
    },
    title: "Donut",
    roughness: 4,
    colors: [getRandomColor(), getRandomColor(), getRandomColor()],
    stroke: "black",
    strokeWidth: 1,
    fillStyle: "cross-hatch",
    fillWeight: 0.5,
  });
};

const createScatter = (data) => {
  return new Scatter({
    element: "#viz-scatter-container",
    data: {
      x: data.map((product, i) => {
        return i;
      }),
      y: data.map((product) => {
        return product.net_price;
      }),
    },
    title: "Scatter",
    roughness: 2,
    radius: 30,
    stroke: "black",
    strokeWidth: 1,
    fillStyle: "solid",
    fillWeight: 0.5,
  });
};

const createPie = (data) => {
  return new Pie({
    element: "#viz-pie-container",
    data: {
      labels: data.map((product) => {
        return product.name;
      }),
      values: data.map((product) => {
        return product.net_price;
      }),
    },
    title: "Queso",
    roughness: 4,
    colors: [
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
    ],
    stroke: "black",
    strokeWidth: 3,
    fillStyle: "zigzag-line",
    fillWeight: 0.5,
  });
};

window.addEventListener("load", async () => {
  let data = await fetchData(5);
  createBar(data.data);
  data = await fetchData(3);
  createDonut(data.data);
  data = await fetchData(10);
  createScatter(data.data);
  data = await fetchData(4);
  createPie(data.data);
});
