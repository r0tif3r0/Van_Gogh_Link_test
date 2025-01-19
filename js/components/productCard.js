import { getPrice } from "../functions/getPrice.js";

const productCardTmp = document.createElement('div');
productCardTmp.className = 'product_card';

const promoLabel = document.createElement('p');
promoLabel.className = 'promo_label';
promoLabel.textContent = 'Акция';

const posterContainer = document.createElement('div');
posterContainer.className = 'poster__container';

const poster = document.createElement('img');
poster.className = 'product_img';

const productInfo = document.createElement('div');
productInfo.className = 'product_info';

const title = document.createElement('p');
title.className = 'product_name';

const priceContainer = document.createElement('div');
priceContainer.className = 'product_price__container'

const price = document.createElement('p');
price.className = 'product_price';

const promoPrice = document.createElement('p');
promoPrice.className = 'promo_price';

const box = document.createElement('div');
box.className = 'detail_button__container';

const button = document.createElement('button');
button.className = 'detail_button';
button.textContent = 'Подробнее';

priceContainer.appendChild(promoPrice);
priceContainer.appendChild(price);

productInfo.appendChild(title);
productInfo.appendChild(priceContainer);

box.appendChild(button);

posterContainer.appendChild(poster)
posterContainer.appendChild(promoLabel)
posterContainer.appendChild(box);

productCardTmp.appendChild(posterContainer);
productCardTmp.appendChild(productInfo);
//productCardTmp.appendChild(promoLabel);

const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', 'css/productCard.css');

const reflect = (params, obj) => {
  params.forEach(param => {
    Object.defineProperty(obj, param, {
      get() {
        return this.getAttribute(param);
      },
      set(value) {
        this.setAttribute(param, value);
      }
    });
  });
};

const params = ['title', 'price', 'price_promo', 'poster'];

class ProductCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const temp = productCardTmp.cloneNode(true);
    const styleTmp = style.cloneNode(true);
    
    shadow.appendChild(styleTmp);
    shadow.appendChild(temp);

    reflect(params, this);
  }

  static get observedAttributes() {
    return params;
  }

  attributeChangedCallback(param, oldValue, newValue) {
    switch (param) {
      case 'title':
        return this.shadowRoot.querySelector('.product_name').textContent = newValue;
      
      case 'price':
        return this.shadowRoot.querySelector('.product_price').textContent = getPrice(newValue);
      
      case 'price_promo':
        if (newValue !== '') {
          this.shadowRoot.querySelector('.product_card').classList.add('promo')
          return this.shadowRoot.querySelector('.promo_price').textContent = getPrice(newValue);
        }
  
      case 'poster':
        return  this.shadowRoot.querySelector('.product_img').src = newValue;
    }
  }
}

customElements.define('product-card', ProductCard);