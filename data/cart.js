export const cart = [];

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

