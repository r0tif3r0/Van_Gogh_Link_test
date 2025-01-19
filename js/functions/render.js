import { mapProduct } from "./mapProduct.js";

import { lampsDB } from "../db/lampsDB.js";

const productsContainer = document.querySelector('.products__container');

const renderProduct = (productData) => {
  const product = document.createElement('product-card');

  product.title = productData.title;
  product.price = productData.price;
  product.price_promo = productData.promoPrice;
  product.poster = productData.poster;

  return product;
};

const renderCategoryGrid = (data) => {
  const fragment = document.createDocumentFragment();
  const products = data.map(res => renderProduct(mapProduct(res)));
  
  products.forEach(product => {
    fragment.appendChild(product);
  });
  return fragment;
};

export const renderGrid = () => {
  productsContainer.appendChild(renderCategoryGrid(lampsDB))
}