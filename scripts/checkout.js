import {cart, removeFromCart as deleteItem} from '../data/cart.js'
import {products} from '../data/products.js'
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import deliveryOptions from '../data/deliveryOption.js';

let cartHTML = "";

cart.forEach((cartItem) => {
    const cartID = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === cartID){
            matchingProduct = product
        }
    })

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId){
            deliveryOption = option
        }
    })

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');


    cartHTML += `<div class="cart-item-container js-cart-item-container-${cartID}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}           
              </div>
            </div>
          </div>`
});


function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCents)} -`

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `                
        <div class="delivery-option">
            <input 
                ${isChecked ? 'checked' : ''}
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
            >
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                $${priceString} Shipping
            </div>
            </div>
        </div>`
    })
    return html;
}


document.querySelector('.js-order-summary').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        deleteItem(productId)

        document.querySelector(`.js-cart-item-container-${productId}`).remove()
    })
});