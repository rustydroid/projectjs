//Const definition
const exrateBuyUSD = 295;
const exrateSellUSD = 292;

// Object definition
class Crypto{
    constructor(callsign, name, exrate, stock) {
        this.callsign = callsign;
        this.name = name;
        this.exrate = exrate;
        this.stock = stock;
    }
}

// Function definition
const ARSUSD = (value, exrateUSD) => value / exrateUSD;
const USDARS = (value, exrateUSD) => value * exrateUSD;
const ARSUSDT = (value, exrateUSD) => value * exrateUSD;
const ARSADA = (value, exrateUSD) => (value * 0.45) * exrateUSD;
const ARSETH = (value, exrateUSD) => (value * 1345) * exrateUSD;

// Function Connect to Blockchain animation
function connBlockchain() {
    let timerInterval
    Swal.fire({
        title: 'Connectando a la blockchain!',
        html: 'Espere <b></b> milisegundos.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    });
}

// Function Connect to MP animation
function connMercadoPago() {
    let timerInterval
    Swal.fire({
    title: 'Connectando a la MercadoPago!',
    imageUrl: './resources/mercado-pago-logo-vector.svg',
    imageWidth: 400,
    html: 'Esperando al Servidor MP <b></b> milisegundos.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Conexion Terminada...')
    }
    })
}

// Function Crypto exchange
function convertCrypto(token, value, option) {
    const searchCrypto = cryptos.find(crypto => crypto.callsign == token);
    console.log(`Token encontrado 
    ${searchCrypto.callsign}
    ${searchCrypto.name}
    ${searchCrypto.exrate}
    ${searchCrypto.stock}`);
    switch (option) {
        case "buy":
            if (token === "USD") {
                convertion = ARSUSD(value, exrateBuyUSD);
            }
            if (token === "USDT") {
                convertion = ARSUSDT(value, exrateBuyUSD);
                return convertion;
            }
            if (token === "ADA") {
                convertion = ARSADA(value, exrateBuyUSD);
                console.log(convertion);
                return convertion;
            }
            if (token === "ETH") {
                convertion = ARSETH(value, exrateBuyUSD);
                return convertion;
            }
            if (token === "ARS") {
                convertion = ARSUSDT(value, exrateBuyUSD);
                return convertion;
            }
            break;
        case "sell":
            if (token === "USD") {
                convertion = USDARS(value, exrateSellUSD);
            }
            if (token === "USDT") {
                convertion = ARSUSDT(value, exrateSellUSD);
                return convertion;
            }
            if (token === "ADA") {
                convertion = ARSADA(value, exrateSellUSD);
                return convertion;
            }
            if (token === "ETH") {
                convertion = ARSETH(value, exrateSellUSD);
                return convertion;
            }
            if (token === "ARS") {
                convertion = ARSUSDT(value, exrateSellUSD);
                return convertion;
            }
            break;
    }
}

// Function create item
function createItem(position) {
    console.log("creating element: ", position);
    // item ids creation
    let deleteItemId = `item-${position}-delete`;
    let productItemId = `item-${position}-product`;
    let descItemId = `item-${position}-desc`;
    let priceItemId = `item-${position}-price`;
    let positionItemId = `item-${position}`;
    let callDeleteAction = `deleteItem(${position})`;
    // li creacion
    let ul = document.getElementById("cartList")
    let li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm", "items");
    li.setAttribute('id', positionItemId);
    // div containing Item product, description
    let div = document.createElement("div");
    div.classList.add("container");
    let h6 = document.createElement("h6");
    h6.setAttribute('id', productItemId);
    h6.classList.add("my-0");
    let small = document.createElement("small");
    small.setAttribute('id', descItemId);
    small.classList.add("text-muted");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-danger");
    button.setAttribute('type', 'button');
    button.setAttribute('id', deleteItemId);
    button.setAttribute('onclick', callDeleteAction);
    button.innerText = "x"
    // span containing item price
    let span = document.createElement("span");
    span.setAttribute('id', priceItemId);
    // Appending item to "ul" element
    div.appendChild(h6);
    div.appendChild(small);
    div.appendChild(button);
    li.appendChild(div);
    li.appendChild(span);
    ul.appendChild(li);
}

// Function Update item
function updateItem(position, product, description, prodPrice) {
    console.log("updating element: ", position, product, description, prodPrice);
    let productItemId = `item-${position}-product`;
    let descItemId = `item-${position}-desc`;
    let priceItemId = `item-${position}-price`;
    document.getElementById(productItemId).innerText = product;
    document.getElementById(descItemId).innerText = description;
    document.getElementById(priceItemId).innerText = `AR$ ${prodPrice}`;
}

// Function Update Cart
function updateCart(product, description, prodPrice) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let bullet = parseInt((document.getElementById("items-cart").innerText));
    let total = parseInt(document.getElementById("total").innerText);
    if (bullet < 3) {
        createItem(bullet);
        updateItem(bullet, product, description, prodPrice);
        cartItems.push({ product, description, prodPrice });
        localStorage.setItem("cart", JSON.stringify(cartItems));
        document.getElementById("items-cart").innerText = cartItems.length;
        document.getElementById("total").innerText = total + prodPrice;
        console.log("carrito actualizado", cartItems);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Transaccion agregada al carrito',
            showConfirmButton: false,
            timer: 1500
        });
    }else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Solo se permiten 3 transacciones por sesion',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

// Function Delete item from cart
function deleteItem(position) {
    console.log("posicion a borrar: ", position);
    let cartList = document.getElementById("cartList");
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(position, 1);
    console.log("carrito spliced: ", cart);
    console.log("carrito size: ", cart.length);
    localStorage.setItem("cart", JSON.stringify(cart));
    let subTotal = 0;
    if ((cart.length) !== 0) {
        console.log("elementos carrito: ", cart.length);
        while (cartList.firstChild) {
            console.log("borrando lista");
            cartList.removeChild(cartList.firstChild);
        };
        for (let i = 0; i < (cart.length); i++) {
            console.log("recreando lista");
            createItem(i);
            console.log("datos a popular: ", i, cart[i].product, cart[i].description, cart[i].prodPrice);
            updateItem(i, cart[i].product, cart[i].description, cart[i].prodPrice);
            subTotal = subTotal + Number(cart[i].prodPrice);
            console.log(`item ${i} creado`);
        };
        document.getElementById("total").innerText = subTotal;
        document.getElementById("items-cart").innerText = cart.length;
        console.log("guardando datos localStorage");

    } else {
        while (cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
        };
        document.getElementById("total").innerText = 0;
        document.getElementById("items-cart").innerText = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Function reset buy/sell form values
function resetCrypto() {
    let origin = document.getElementById("cryptoOrigin");
    let target = document.getElementById("cryptoTarget");
    let value = document.getElementById("amount");
    let action = document.getElementById("actionReq");
    origin.selectedIndex = 0;
    target.selectedIndex = 0;
    value.value = "";
    action.selectedIndex = 0;
}

// Function read values from buy/sell form
function setOption(readAction) {
    console.log("Entrando en setOption");
    let origin = document.getElementById("cryptoOrigin").value;
    let target = document.getElementById("cryptoTarget").value;
    let value = parseInt(document.getElementById("amount").value);
    convertion = convertCrypto(target, value, readAction);
    if (readAction === "buy") {
        product = `Compra ${origin} ${target}`;
        description = `Exchange rate: $${exrateBuyUSD}`;
        updateCart(product, description, convertion);

    } else if (readAction === "sell") {
        product = `Venta ${origin} ${target}`;
        description = `Exchange rate: $${exrateBuyUSD}`;
        console.log()
        updateCart(product, description, convertion);
    }
}

// Function Define list of crypto and store in sessionStorage
function defineCryptos() {
    sessionStorage.clear();
    fetch('https://raw.githubusercontent.com/rustydroid/projectjs/41d59c624cf579fc5a9fb09070bc633b8e3bfc95/resources/crypto.json')
    .then((response) => response.json())
    .then((data) => {
        sessionStorage.setItem("Cryptos", JSON.stringify(data));
        updateBinancePrices();
    })
    .catch((error) => console.log(error));
}

// Function update price of 1 crypto and save on sessionStorage
function printPrice(symbol, price) {
    let binanceData = JSON.parse(sessionStorage.getItem("Cryptos"));
    binanceData.filter(element => {
        if (element.symbol === symbol) {
        element.price = price;
        }
    })
    sessionStorage.setItem("Cryptos", JSON.stringify(binanceData));
}

// Function fetch from Binance the price for each crypto
function updateBinancePrices() {
    let binanceData = JSON.parse(sessionStorage.getItem("Cryptos"));
    for (let i = 0; i < binanceData.length; i++){
        if (binanceData[i].symbol === 'USDT') {
        printPrice(binanceData[i].symbol, 1);
        } else {
        let urlBinance = `https://api.binance.com/api/v3/ticker/price?symbol=${binanceData[i].binance}`;
        fetch(urlBinance)
            .then(response => response.json())
            .then(data => {
            let price = Number(data.price);
            let symbol = binanceData[i].symbol;
            printPrice(symbol, price);
            })
            .catch(error => console.log(error));
        }
    }
}


// Main Program
// Se crea Array de Cryptos para Cotizacion actualizado desde Binance
defineCryptos();
const cryptos = [];
const cart = [];
localStorage.clear();
localStorage.setItem('cart', JSON.stringify(cart));
// Modulo futuro para implementar una wallet
cryptos.push(new Crypto("USDT", "USD Theter", 1, 1000));
cryptos.push(new Crypto("ADA", "Cardano Token", 0.45, 2000));
cryptos.push(new Crypto("ETH", "Etherum Token", 1345, 200));
cryptos.push(new Crypto("ARS", "Peso Argentino", 0.0066, 20000));

localStorage.setItem("cryptos", JSON.stringify(cryptos));


const credentialValidate = document.getElementById("validate");
const cartAdd = document.getElementById("cartAdd");

credentialValidate.addEventListener("click", (e) => {
    e.preventDefault();
    let credentialSection = document.getElementById("credentialSection");
    let cryptoSection = document.getElementById("cryptoSection")
    let titlePage = document.getElementById("titlePage");
    let connector = document.getElementById("connector");
    connBlockchain();
    credentialSection.classList.add("hidden");
    cryptoSection.classList.remove("hidden");
    titlePage.classList.add("hidden");
    connector.classList.remove("svg-image-red");
    connector.classList.add("svg-image-green");
})

cartAdd.addEventListener("click", (e) => {
    let cart = document.getElementById("cart");
    let paymentForm = document.getElementById("form2");
    let cartList = document.getElementById("cartList");
    let totalItems = document.getElementById("total-items");
    cart.classList.remove("hidden");
    paymentForm.classList.remove("hidden");
    cartList.classList.remove("hidden");
    totalItems.classList.remove("hidden");
    let action = document.getElementById("actionReq").value;
    action === "buy" ? setOption("buy") : setOption("sell");
    resetCrypto();
})


document.getElementById("openCryptoTable").addEventListener("click", (e) => {
    updateBinancePrices();
    e.preventDefault();
    let coinsData = JSON.parse(sessionStorage.getItem("Cryptos"));
    let cryptoCoin = '';
    //For Loop Starts
    for (let i = 0; i < coinsData.length; i++) {
        cryptoCoin += "<tr>";
        cryptoCoin += `<td> ${coinsData[i].rank} </td>`;
        cryptoCoin += `<td> ${coinsData[i].name}</td>`;
        cryptoCoin += `<td> ${coinsData[i].symbol}</td>`;
        // cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
        cryptoCoin += `<td> ${coinsData[i].price}</td>`; "<tr>";
        };
    //For Loop Ends
    document.getElementById("data").innerHTML = cryptoCoin;
})

document.getElementById('checkout').addEventListener("click", (e) => {
    e.preventDefault();
    connMercadoPago();
})