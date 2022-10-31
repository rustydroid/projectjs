//Const definition
const exrateBuyUSD = 278;
const exrateSellUSD = 272;
let cartItems = [];

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

// Function Update Cart
function updateCart(option, product, description, prodPrice) {
    let bullet = parseInt((document.getElementById("items-cart").innerText));
    let total = parseInt(document.getElementById("total").innerText);
    let item0 = `item-${bullet}-delete`;
    let item1 = `item-${bullet}-product`;
    let item2 = `item-${bullet}-desc`;
    let item3 = `item-${bullet}-price`;
    if (bullet < 3) {
        buttonDelete = document.getElementById(item0);
        prod = document.getElementById(item1);
        desc = document.getElementById(item2);
        price = document.getElementById(item3);
        prod.innerText = product;
        desc.innerText = description;
        price.innerText = `AR$ ${prodPrice}`;
        buttonDelete.classList.remove("hidden");
        document.getElementById("items-cart").innerText = bullet +1;
        document.getElementById("total").innerText = total + prodPrice;
        cartItems.push({ product, description, prodPrice });
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
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
    let bullet = parseInt((document.getElementById("items-cart").innerText));
    let total = parseInt(document.getElementById("total").innerText);
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    let item0 = `item-${position}-delete`;
    let item1 = `item-${position}-product`;
    let item2 = `item-${position}-desc`;
    let item3 = `item-${position}-price`;
    console.log("carrito: ", cart);
    console.log("array lenght: ", cart.length);
    let index = parseInt(position);
    console.log("Index", index);
    if (index > -1) {
        buttonDelete = document.getElementById(item0);
        prod = document.getElementById(item1);
        desc = document.getElementById(item2);
        price = document.getElementById(item3);
        buttonDelete.classList.add("hidden");
        document.getElementById("items-cart").innerText = bullet - 1;
        document.getElementById("total").innerText = total + parseInt(cart[position].price);
        prod.innerText = '';
        desc.innerText = '';
        price.innerText = '';
        cart.splice(index, 1);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log("Item borrado: ", cart);
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
    let origin = document.getElementById("cryptoOrigin").value;
    let target = document.getElementById("cryptoTarget").value;
    let value = parseInt(document.getElementById("amount").value);
    convertion = convertCrypto(target, value, readAction);
    if (readAction === "buy") {
        product = `Compra ${origin} ${target}`;
        description = `Exchange rate: $${exrateBuyUSD}`;
        updateCart(readAction, product, description, convertion);

    } else if (readAction === "sell") {
        product = `Venta ${origin} ${target}`;
        description = `Exchange rate: $${exrateBuyUSD}`;
        console.log()
        updateCart(readAction, product, description, convertion);
    }
}

// Function Define list of crypto and store in sessionStorage
function defineCryptos() {
    sessionStorage.clear();
    const cryptoList = [
      { "name": "Bitcoin", "symbol": "BTC", "price": 0, "binance": "BTCUSDT", "rank": 1 },
      { "name": "Ethereum", "symbol": "ETH", "price": 0, "binance": "ETHUSDT", "rank": 2 },
      { "name": "Tether USD", "symbol": "USDT", "price": 1, "binance": "USDT", "rank": 3 },
      { "name": "USDC", "symbol": "USDC", "price": 0, "binance": "USDCUSDT", "rank": 4 },
      { "name": "Binance Coin", "symbol": "BNB", "price": 0, "binance": "BNBUSDT", "rank": 5 },
      { "name": "XRP  ", "symbol": "XRP", "price": 0, "binance": "XRPUSDT", "rank": 6 },
      { "name": "Binance USD", "symbol": "BUSD", "price": 0, "binance": "BUSDUSDT", "rank": 7 },
      { "name": "Cardano   ", "symbol": "ADA", "price": 0, "binance": "ADAUSDT", "rank": 8 },
      { "name": "Solana", "symbol": "SOL", "price": 0, "binance": "SOLUSDT", "rank": 9 },
      { "name": "Dogecoin", "symbol": "DOGE", "price": 0, "binance": "DOGEUSDT", "rank": 10 }
    ];
    // fetch('../resources/crypto.json')
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.log(error));
    sessionStorage.setItem("Cryptos", JSON.stringify(cryptoList));
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
    console.log(binanceData);
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
updateBinancePrices();

const cryptos = [];
localStorage.clear();
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
    cart.classList.remove("hidden");
    paymentForm.classList.remove("hidden");
    cartList.classList.remove("hidden");
    let action = document.getElementById("actionReq").value;
    action === "buy" ? setOption("buy") : setOption("sell");
    resetCrypto();
})

document.getElementById('item-0-delete').addEventListener("click", (e) => {
    deleteItem("0");
})

document.getElementById('item-1-delete').addEventListener("click", (e) => {
    deleteItem("1");
})

document.getElementById('item-2-delete').addEventListener("click", (e) => {
    deleteItem("2");
})


document.getElementById("openCryptoTable").addEventListener("click", (e) => {
  e.preventDefault();
  let coinsData = JSON.parse(sessionStorage.getItem("Cryptos"));
  console.log(coinsData);
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