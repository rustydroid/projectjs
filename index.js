let dolarCotizacion = 269;
let opcion = parseInt(prompt("Ingresar opcion 1.COMPRA - 2.VENDE dolares - 3.Salir"));

while (opcion != 3) {
    if (opcion === 1) {
        let cantidadDLS = parseFloat(prompt("Ingrese la cantidad a comprar en AR$"));
        let compraDLS = cantidadDLS / dolarCotizacion;
        let result = compraDLS.toFixed(2);
        alert(`Usted va a recibir ${result} dolares por sus pesos`);
    } else if (opcion === 2) {
        let cantidadDLS = parseFloat(prompt("Ingrese la cantidad a vender en US$"));
        let ventaDLS = cantidadDLS * dolarCotizacion;
        let result = ventaDLS.toFixed(2);
        alert(`usted va a recibir ${result} pesos por sus dolares`);
    } else {
        alert("ingreso una opcion incorrecta.");
    };
    opcion = parseInt(prompt("Ingresar opcion 1.COMPRA - 2.VENDE dolares - 3.Salir"));
}
alert("Cerrando App. Saludos!");
