import "./style.css";
import { setupPerformRequest } from "./performRequest";
import { setupLogin } from "./setupLogin";

setupPerformRequest(document.querySelector("#fetchBtn"));
setupLogin(document.querySelector("form"));
