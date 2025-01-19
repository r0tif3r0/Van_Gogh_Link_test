import { renderGrid } from "./functions/render.js";
import { activateHamburger } from "./functions/activateHamburger.js";

import './components/productCard.js'

renderGrid();
activateHamburger();
window.onload = function () {
  document.body.classList.add('loaded');
}