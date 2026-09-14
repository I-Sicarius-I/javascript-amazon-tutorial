export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
    cart = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }]
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            cartItem.quantity += 1
            matchingItem = cartItem
        }
    })
    
    if(typeof matchingItem === 'undefined')
    {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage(cart)
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function removeFromCart(productID){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productID){
            newCart.push(cartItem)
        }
    });

    cart = newCart;

    saveToStorage(cart)
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage()
}