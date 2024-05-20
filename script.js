const cartButton = document.getElementById('cartButton')
const closeCartButton = document.getElementById('closeCartButton')
const cart = document.getElementById('cart')
const productsContainer = document.querySelector('.products-container')
const contentContainer = document.querySelector('.content-container')

// Add Product
const openAddProductButton = document.getElementById('addProduct')
const closeAddProductButton = document.getElementById('closeAddProductForm')
const formAddProduct = document.getElementById('addProductForm')

// Products
let products = []
// CartProducts
let cartProducts = []

// Add products and display
const addProductButton = document.getElementById("addProductSubmit")
const productContainer = document.querySelector(".products-container")

// Function to open the cart and adjust product layout
function openCart() {
    cart.classList.add('open')
    productsContainer.classList.add('two-columns')
    contentContainer.classList.add('shrink')
}

// Function to close the cart and adjust product layout
function closeCart() {
    cart.classList.remove('open')
    productsContainer.classList.remove('two-columns')
    contentContainer.classList.remove('shrink')
}

// Event listener to open the cart when clicking the button
cartButton.addEventListener('click', openCart)

// Event listener to close the cart when clicking the close button
closeCartButton.addEventListener('click', closeCart)

// Event listener for opening addProductForm
openAddProductButton.addEventListener('click', openAddProduct)
closeAddProductButton.addEventListener('click', closeAddProduct)

function openAddProduct() {
    formAddProduct.parentElement.style.display = 'block'
    formAddProduct.style.display = 'block'
}

function closeAddProduct(e) {
    e.preventDefault()
    formAddProduct.parentElement.style.display = 'none'
    formAddProduct.style.display = 'none'
}

// Display products
function displayProducts() {
    let p = "";
    if (!products.length) {
        p = `<p>No Products Yet!</p>`;
    } else {
        products.forEach((product, index) => {
            p += `
            <div class="product">
                <div class="product-image">
                    <img src="${product.productImage}" alt="">
                </div>
                <div class="product-details">
                    <div>
                        <h4>${product.productTitle}</h4>
                    </div>
                    <div>
                        <p>Price: ${product.productPrice} Ksh</p>
                        <p>Quantity: ${product.productQuantity} pieces</p>
                        <button onclick="addProductToCart(${index})">Add to cart</button>
                    </div>
                </div>
            </div>
            
            `
        })
    }
    productContainer.innerHTML = p
}

addProductButton.addEventListener('click', addProduct)

// Inputs for new product
const inputTitle = document.getElementById('product-title')
const inputPrice = document.getElementById('product-price')
const inputQuantity = document.getElementById('product-quantity')
const inputImage = document.getElementById('image-url')

function addProduct(e) {
    e.preventDefault()
    if (inputImage.value === '' || inputPrice.value === '' || inputQuantity.value === '' || inputTitle.value === '') {
        products = products
        displayProducts()
    }
    else {
        let newProduct = {
            id: Math.ceil(Math.random() * 1000),
            productTitle: inputTitle.value,
            productPrice: inputPrice.value,
            productQuantity: inputQuantity.value,
            productImage: inputImage.value
        }
        products.push(newProduct)
        displayProducts()


        // inputImage.value = '';
        // inputPrice.value = '';
        // inputQuantity.value = '';
        // inputTitle.value = '';
    }

}

// Cart
const cartContentDiv = document.querySelector('.cart-content');

function displayCartProducts() {
    let cp = ""
    if (!cartProducts.length) {
        cp = `<p>No products in cart</p>`;
    } else {
        cartProducts.forEach((cartProduct, index) => {
            cp += `
            <div class="cart-product">
                <div class="cart-product-image">
                    <img src="${cartProduct.cartProductImage}" alt="">
                </div>
                <div class="cart-product-details">
                    <div>
                        <h4>${cartProduct.cartProductTitle}</h4>
                    </div>
                    <div>
                        <p>Price: ${cartProduct.cartProductPrice} Ksh</p>
                        <div class="quantity-div">
                            <input type="number" class="quantity" oninput="calculateSubtotal(${index}, this.value)">
                        </div>
                        <p class="subTotal" id="subtotal-${index}">Total: </p>
                        <button onclick="removeCartProduct(${index})">Remove</button>
    
                    </div>
                </div>
            </div>
            
            `
        })
    }
    cartContentDiv.innerHTML = cp
}

function addProductToCart(index) {
    let product = products[index]
    let newCartProduct = {
        cartProductTitle: product.productTitle,
        cartProductPrice: product.productPrice,
        cartProductImage: product.productImage
    };
    cartProducts.push(newCartProduct)
    displayCartProducts()
}

function calculateSubtotal(index, quantity) {
    let product = cartProducts[index];
    let price = parseInt(product.cartProductPrice.replace(/,/g, ''));
    let subtotal = price * quantity;
    document.getElementById(`subtotal-${index}`).innerText = `Total: ${subtotal} Ksh`;
}



// Remove Product from cart
function removeCartProduct(index) {
    cartProducts.splice(index, 1)
    displayCartProducts()
}


//calculate grand total



displayProducts()
displayCartProducts()
