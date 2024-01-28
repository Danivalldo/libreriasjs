import { createGrid } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./style.css";

const gridOptions = {
  // Row Data: The data to be displayed.
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ],
  // Column Definitions: Defines & controls grid columns.
  columnDefs: [
    {
      field: "make",
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ],
  rowSelection: "multiple",
};

const myGridElement = document.querySelector("#myGrid");
const gridApi = createGrid(myGridElement, gridOptions);

document.querySelector(".get-data-btn").addEventListener("click", () => {
  fetch("https://www.ag-grid.com/example-assets/space-mission-data.json")
    .then((response) => response.json())
    .then((data) => {
      gridApi.setGridOption("columnDefs", [
        { field: "mission" },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        { field: "time" },
        { field: "rocket" },
        { field: "price" },
        { field: "successful" },
      ]);
      gridApi.setGridOption("rowData", data);
    });
});
