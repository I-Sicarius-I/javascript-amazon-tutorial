export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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
                quantity: 1
            });
        }
}

export function removeFromCart(productID){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productID){
            newCart.push(cartItem)
        }
    });

    cart = newCart;
}