// Funcion para convertir Dolar crypto / Pesos
function convertCrypto(option, value) {
    if (option === 1) {
        let buyCrypto = value / dolarCotizacion;
        return buyCrypto.toFixed(2);
    }
    if (option === 2) {
        let sellCrypto = value * dolarCotizacion;
        return sellCrypto.toFixed(2);
    }
}

// Programa principal
const dolarCotizacion = 269;
let opcion = parseInt(prompt("Ingresar opcion 1.COMPRA - 2.VENDE dolares - 3.Salir"));

while (opcion != 3) {
    if (opcion === 1) {
        let cantidadDLS = parseFloat(prompt("Ingrese la cantidad a comprar en AR$"));
        let result = convertCrypto(opcion, cantidadDLS);
        alert(`Usted va a recibir ${result} dolares por sus pesos`);
    } else if (opcion === 2) {
        let cantidadDLS = parseFloat(prompt("Ingrese la cantidad a vender en US$"));
        let result = convertCrypto(opcion, cantidadDLS);
        alert(`usted va a recibir ${result} pesos por sus dolares`);
    } else {
        alert("ingreso una opcion incorrecta.");
    };
    opcion = parseInt(prompt("Ingresar opcion 1.COMPRA - 2.VENDE dolares - 3.Salir"));
}
alert("Cerrando App. Saludos!");
