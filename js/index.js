-0//Const definition
const exrateBuyUSD = 278;
const exrateSellUSD = 272;

// Object definition
class Crypto{
    constructor(callname, name, exrate, stock) {
        this.callname = callname;
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


function convertCrypto(token, value, option) {
    const searchCrypto = cryptos.find(crypto => crypto.callname == token);
    console.log(`Token encontrado 
    ${searchCrypto.callname}
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
                return convertion;
            }
            if (token === "ETH") {
                convertion = ARSETH(value, exrateBuyUSD);
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
            break;
    }
}

function updateCart(option, product, description, prodPrice) {
    let bullet = parseInt((document.getElementById("items-cart").innerText));
    let total = parseInt(document.getElementById("total").innerText);
    console.log(bullet);
    switch (bullet) {
        case 0:
            prod = document.getElementById("item-0-product");
            desc = document.getElementById("item-0-desc");
            price = document.getElementById("item-0-price");
            prod.innerText = product;
            desc.innerText = description;
            price.innerText = `AR$ ${prodPrice}`;
            document.getElementById("items-cart").innerText = 1;
            document.getElementById("total").innerText = total + prodPrice;

            break;
        case 1:
            prod = document.getElementById("item-1-product");
            desc = document.getElementById("item-1-desc");
            price = document.getElementById("item-1-price");
            prod.innerText = product;
            desc.innerText = description;
            price.innerText = `AR$ ${prodPrice}`;
            document.getElementById("items-cart").innerText = 2;
            document.getElementById("total").innerText = total + prodPrice;
            break;
        case 2:
            prod = document.getElementById("item-2-product");
            desc = document.getElementById("item-2-desc");
            price = document.getElementById("item-2-price");
            prod.innerText = product;
            desc.innerText = description;
            price.innerText = `AR$ ${prodPrice}`;
            document.getElementById("items-cart").innerText = 3;
            document.getElementById("total").innerText = total + prodPrice;
            break;
        default:
            alert(`Solo se permiten 3 transacciones por sesion`);
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

// Programa principal
const cryptos = [];
cryptos.push(new Crypto("USDT", "USD Theter", 1, 1000));
cryptos.push(new Crypto("ADA", "Cardano Token", 0.45, 2000));
cryptos.push(new Crypto("ETH", "Etherum Token", 1345, 200));


const formCrypto = document.getElementById("form1");

formCrypto.addEventListener("submit", (e) => {
    e.preventDefault();
    let origin = document.getElementById("cryptoOrigin").value;
    let target = document.getElementById("cryptoTarget").value;
    let value = parseInt(document.getElementById("amount").value);
    let action = document.getElementById("actionReq").value;
    convertion = convertCrypto(target, value, action);
    if (action === "buy") {
        console.log("updating Cart buy");
        product = `Compra ${target}`;
        description = `Exchange rate: $${exrateBuyUSD}`;
        updateCart(action, product, description, convertion);
    } else if (action === "sell") {
        product = `Venta ${target}`;
        description = `Exchange rate: $${exrateBuyUSD}`;
        updateCart(action, product, description, convertion);
    }
    resetCrypto();
    
});

// updateCart("buy", "compra USDT", "compra USDT", 25);



// let option = parseInt(prompt("Ingresar opcion 1.COMPRA - 2.VENTA - 3.Salir"));





// while (option != 3) {
//     switch (option) {
//         case 1:
//             token = prompt("Ingrese el token que desea comprar - USDT,ADA,ETH");
//             value = prompt(`Ingrese cantidad de ${token} a comprar`);
//             convertion = convertCrypto(token, value, option);
//             alert(`La compra de ${token} $${value} equivalen a $${convertion}ARS`);
//             product = `Compra ${token}`;
//             description = `Exchange rate: $${exrateBuyUSD}`;
//             updateCart(option, product, description, convertion);
//             break;
//         case 2:
//             token = prompt("Ingrese el token que desea vender - USDT,ADA,ETH");
//             value = prompt(`Ingrese cantidad de ${token} a vender`);
//             convertion = convertCrypto(token, value, option);
//             alert(`La venta de ${token} $${value} equivalen a $${convertion}ARS`);
//             product = `Venta ${token}`;
//             description = `Exchange rate: $${exrateBuyUSD}`;
//             updateCart(option, product, description, convertion);
//             break;
//         default:
//             alert("ingreso una opcion incorrecta.");
//             break;
//     }
//     option = parseInt(prompt("Ingresar opcion 1.COMPRA - 2.VENTA - 3.Salir"));
// }



// console.log("Cerrando App. Saludos!");

