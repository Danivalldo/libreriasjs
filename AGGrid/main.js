import { createGrid } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./style.css";

const csvContainer = document.querySelector("#csv-container");

const gridOptions = {
  suppressMovableColumns: false,
  rowSelection: "multiple",
  pagination: true,
  rowData: [],
  columnDefs: [],
};

const myGridElement = document.querySelector("#myGrid");
const gridApi = createGrid(myGridElement, gridOptions);

document.querySelector(".download-btn").addEventListener("click", () => {
  const csvData = gridApi.getDataAsCsv();
  csvContainer.classList.add("visible");
  csvContainer.innerHTML = csvData;
});

window.addEventListener("load", async () => {
  const res = await fetch("./movies.json");
  const rowDataMovies = await res.json();
  gridApi.setGridOption("columnDefs", [
    {
      headerName: "Título",
      filter: "agTextColumnFilter",
      pinned: "left",
      field: "title",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      editable: true,
    },
    {
      headerName: "Año",
      filter: "agNumberColumnFilter",
      field: "year",
      editable: true,
    },
    {
      headerName: "Género",
      field: "genre",
      editable: true,
    },
    {
      headerName: "Director",
      field: "director",
      editable: true,
    },
    {
      headerName: "Premios",
      field: "awards",
    },
    {
      headerName: "Actor principal",
      field: "lead_actor",
      editable: true,
    },
  ]);
  gridApi.setGridOption("rowData", rowDataMovies);
});
