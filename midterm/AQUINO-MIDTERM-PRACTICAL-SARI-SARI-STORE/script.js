document.addEventListener('DOMContentLoaded', function () {
    // Retrieve and update stock counts for each item on page load
    document.querySelectorAll('.item').forEach(item => {
        const stockName = item.querySelector('h3').innerText;
        const storedStock = localStorage.getItem(stockName + "_stockCount");

        if (storedStock !== null) {
            const stockSpan = item.querySelector('.stock');
            stockSpan.dataset.stock = storedStock;
            stockSpan.textContent = storedStock;
        }
    });

    // Quantity controls
    document.querySelectorAll('.quantity').forEach(function (quantity) {
        const input = quantity.querySelector('.inputted_quantity');
        const minusBtn = quantity.querySelector('.minus');
        const plusBtn = quantity.querySelector('.plus');

        minusBtn.addEventListener('click', function () {
            const currentValue = parseInt(input.textContent);
            if (currentValue > 1) {
                input.textContent = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', function () {
            const currentValue = parseInt(input.textContent);
            input.textContent = currentValue + 1;
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 180;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                target.classList.add('highlight');
                setTimeout(() => {
                    document.querySelectorAll('.highlight').forEach(element => {
                        element.classList.remove('highlight');
                    });
                }, 1000);
            }
        });
    });

    // Cart functionality
    let iconCart = document.querySelector('.icon-cart');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');

    let totalPriceDisplay = document.getElementById('total-price');

    iconCart.addEventListener('click', function () {
        body.classList.toggle('showCart');
        document.getElementById('main-content').classList.toggle('blur-background');

        if (body.classList.contains('showCart')) {
            updateTotalPrice();
        }
    });

    closeCart.addEventListener('click', function () {
        body.classList.remove('showCart');
        document.getElementById('main-content').classList.remove('blur-background');
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.item');
            const itemName = item.querySelector('h3').innerText;
            const itemPrice = parseFloat(item.querySelector('.price').innerText.replace('Php. ', ''));
            const itemImageSrc = item.querySelector('img').src;
            const inputted_quantity = parseInt(item.querySelector('.inputted_quantity').textContent.trim());

            addToCart(itemName, itemPrice, itemImageSrc, inputted_quantity);

            // Update stock
            const stockElement = item.querySelector('.stock');
            let stock = parseInt(stockElement.getAttribute('data-stock'));
            stock -= inputted_quantity;
            stockElement.textContent = stock;
            stockElement.setAttribute('data-stock', stock);
            localStorage.setItem(itemName + "_stockCount", stock);
        });
    });

    function addToCart(productName, price, imageSrc, inputted_quantity) {
        var listItem = document.createElement('li');
        listItem.className = "added_products";
        listItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${imageSrc}" alt="${productName}">
                <p class="productname">${productName}</p>
                <div class="quantity">
                    <button class="minus">-</button>
                    <p class="inputted_quantity">${inputted_quantity}</p>
                    <button class="plus">+</button>
                </div>
                <p class="item-price">Php. ${(price * inputted_quantity).toFixed(2)}</p>
                <button class="remove-from-cart">Remove</button>
            </div>
        `;
        document.getElementById("cart-items").appendChild(listItem);

        const quantityInput = listItem.querySelector('.inputted_quantity');

        updateTotalPrice();

        const removeButton = listItem.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => {
            listItem.remove();
            updateTotalPrice();
        });

        const plusButton = listItem.querySelector('.plus');
        const minusButton = listItem.querySelector('.minus');
        const itemPriceDisplay = listItem.querySelector('.item-price');

        plusButton.addEventListener('click', () => {
            const currentQuantity = parseInt(quantityInput.textContent);
            quantityInput.textContent = currentQuantity + 1;
            itemPriceDisplay.innerText = `Php. ${(price * parseInt(quantityInput.textContent)).toFixed(2)}`;
            updateTotalPrice();
        });

        minusButton.addEventListener('click', () => {
            const currentQuantity = parseInt(quantityInput.textContent);
            if (currentQuantity > 1) {
                quantityInput.textContent = currentQuantity - 1;
                itemPriceDisplay.innerText = `Php. ${(price * parseInt(quantityInput.textContent)).toFixed(2)}`;
                updateTotalPrice();
            }
        });
    }

    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.added_products').forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').innerText.replace('Php. ', ''));
            const quantity = parseInt(item.querySelector('.inputted_quantity').textContent);
            total += price;
        });
        totalPriceDisplay.innerText = `Total: Php. ${total.toFixed(2)}`;
    }

    // Checkout functionality
    document.getElementById("checkoutButton").addEventListener("click", function () {
        alert("Thank you for shopping!");

        document.getElementById("cart-items").innerHTML = "";
        document.getElementById("total-price").innerHTML = "Total: Php. 0.00";
    });
});

function toggleDiscountPopup() {
    const popup = document.getElementById('discount-container');
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

function applyDiscount(type, discountPercentage) {
    const priceSpan = document.getElementById('total-price');
    let totalPrice = parseFloat(priceSpan.textContent.replace('Total: Php. ', ''));
    let discountAmount = totalPrice * (discountPercentage / 100);
    priceSpan.textContent = `Total: Php. ${(totalPrice - discountAmount).toFixed(2)}`;
}


//  localStorage.clear(); (ito ginagamit ko if want ko iclear yung localstorage ko ganern)
const storedStock = localStorage.getItem(stockName + "_stockCount");

window.addEventListener('storage', function (event) {
    if (event.key && event.key.endsWith("_stockCount")) {
        // Update displayed stock counts based on the received event ito yung galing sa kabilang page which is yung sa stock page ko
    }
});
