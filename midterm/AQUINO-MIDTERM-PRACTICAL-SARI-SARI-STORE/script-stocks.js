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



document.addEventListener('DOMContentLoaded', function () {
    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.minus');
    const addToStocksButtons = document.querySelectorAll('.add-to-stocks');

    // function lang to ng add
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const inputtedStocksElement = button.parentElement.querySelector('.inputted_stocks');
            const currentStock = parseInt(inputtedStocksElement.textContent);
            const maxStock = parseInt(button.parentElement.parentElement.querySelector('.stock').dataset.stock);
            
            if (currentStock < maxStock) {
                inputtedStocksElement.textContent = currentStock + 1;
            }
        });
    });

    // function naman to ng minus
    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const inputtedStocksElement = button.parentElement.querySelector('.inputted_stocks');
            const currentStock = parseInt(inputtedStocksElement.textContent);
            
            if (currentStock > 0) {
                inputtedStocksElement.textContent = currentStock - 1;
            }
        });
    });

    // function naman to ng button ko na "add stocks"
    addToStocksButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const stockSpan = item.querySelector('.stock');
            const stockName = item.querySelector('h3').innerText;
            const inputtedStocks = parseInt(item.querySelector('.inputted_stocks').textContent);
            const newStock = parseInt(stockSpan.dataset.stock) + inputtedStocks;

            stockSpan.dataset.stock = newStock;
            stockSpan.textContent = newStock;

            localStorage.setItem(stockName + "_stockCount", newStock); // thennnn dito isasave yung updated na stock sa mismong local storage
        });
    });

    // Load stored stock values on page load
    document.querySelectorAll('.item').forEach(item => {
        const stockName = item.querySelector('h3').innerText;
        const storedStock = localStorage.getItem(stockName + "_stockCount");

        if (storedStock !== null) {
            const stockSpan = item.querySelector('.stock');
            stockSpan.dataset.stock = storedStock;
            stockSpan.textContent = storedStock;
        }
    });
});

//  localStorage.clear(); (ito ginagamit ko if want ko iclear yung localstorage ko ganern)

document.addEventListener('DOMContentLoaded', function () {
    // Load stored stock values on page load
    document.querySelectorAll('.item').forEach(item => {
        const stockName = item.querySelector('h3').innerText;
        const storedStock = localStorage.getItem(stockName + "_stockCount");

        if (storedStock !== null) {
            const stockSpan = item.querySelector('.stock');
            stockSpan.dataset.stock = storedStock;
            stockSpan.textContent = storedStock;
        }
    });

    // Listen for storage events from other tabs or windows
    window.addEventListener('storage', function (event) {
        // Check if the event is related to stock count update
        if (event.key && event.key.endsWith("_stockCount")) {
            const stockName = event.key.replace("_stockCount", "");
            const stockSpan = document.querySelector(`.item h3:contains('${stockName}')`).nextElementSibling.querySelector('.stock');
            
            if (stockSpan) {
                stockSpan.dataset.stock = event.newValue;
                stockSpan.textContent = event.newValue;
            }
        }
    });
});


// Define a Common Key Structure:  so dito dapat same sila ni homepage ko ng key structure
localStorage.setItem(stockName + "_stockCount", newStock);