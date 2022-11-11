import { defineCustomElements } from "@papyrs/stylo/dist/loader";
defineCustomElements();
import "@papyrs/stylo";

// Your editable element
const article = document.querySelector('article[contenteditable="true"]');

// Stylo
const stylo = document.querySelector('stylo-editor');

// Set the `containerRef` property
stylo.containerRef = article;