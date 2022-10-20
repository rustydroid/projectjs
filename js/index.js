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

function updateCart(option, product, description, prodPrice) {
    let bullet = parseInt((document.getElementById("items-cart").innerText));
    let total = parseInt(document.getElementById("total").innerText);
    let item1 = `item-${bullet}-product`;
    let item2 = `item-${bullet}-desc`;
    let item3 = `item-${bullet}-price`;
    if (bullet < 3) {
            prod = document.getElementById(item1);
            desc = document.getElementById(item2);
            price = document.getElementById(item3);
            prod.innerText = product;
            desc.innerText = description;
            price.innerText = `AR$ ${prodPrice}`;
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


// Main Program
const cryptos = [];
localStorage.clear();
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
});

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

const buttonOpenTable = document.getElementById('openCryptoTable');
buttonOpenTable.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("./resources/crypto.json")
    .then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          // console.log(json.data);
          let coinsData = json.data.coins;

          if (coinsData.length > 0) {
            var cryptoCoin = "";
          }
          let counter = 0;
          //For Loop Starts
          // subscribeBinance();
          for (const coin of coinsData) {
            if (counter >= 10) {
              break;
            }
            cryptoCoin += "<tr>";
            cryptoCoin += `<td> ${coin.price} </td>`;
            cryptoCoin += `<td> ${coin.rank}</td>`;
            cryptoCoin += `<td> ${coin.name}</td>`;
            // cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
            cryptoCoin += `<td> ${coin.symbol}</td>`; "<tr>";
            counter++;
          };

          //For Loop Ends
          document.getElementById("data").innerHTML = cryptoCoin;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});



