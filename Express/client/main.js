import "./style.css";
import { setupPerformRequest, setupPerformDelete } from "./performRequest";
import { setupLogin } from "./setupLogin";

setupPerformRequest(document.querySelector("#fetchBtn"));
setupPerformDelete(document.querySelector("#deleteMovieBtn"));
setupLogin(document.querySelector("form"));
