import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

async function loadPage() {
    console.log('load page')

    await loadProductsFetch();
    await new Promise((resolve) => {
        loadCart(() => resolve())
    })

    renderPaymentSummary()
    renderOrderSummary()

    return 'value2';
}
loadPage().then((value) => {
    console.log('next step ' + value)
})
// Promise.all([
//     // new Promise((resolve) => {
//     //     loadProducts(() => resolve('value1'))

//     // }),
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => resolve())
//     })
// ]).then(() => {
//     renderPaymentSummary()
//     renderOrderSummary()
// })

// new Promise((resolve) => {
//     loadProducts(() => resolve('value1'))

// }).then((value) => {
//     console.log(value)

//     return new Promise((resolve) => {
//         loadCart(() => resolve())
//     })

// }).then(() => {
//     renderPaymentSummary()
//     renderOrderSummary()
// })


// loadProducts(()=>{
//     renderPaymentSummary()
//     renderOrderSummary()
// })

