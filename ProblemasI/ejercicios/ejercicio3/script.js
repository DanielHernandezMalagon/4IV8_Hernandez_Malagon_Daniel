
function calcular() {

    let montoInput = document.getElementById("monto").value.trim();
    let resultado = document.getElementById("resultado");

    let regex = /^\d+(\.\d{1,2})?$/;

    // Validar vacío
    if (montoInput === "") {
        alert("Ingresa el monto de la compra");
        return;
    }

    // Validar formato
    if (!regex.test(montoInput)) {
        alert("Solo se permiten números válidos");
        return;
    }

    let monto = parseFloat(montoInput);

    // Validar rango
    if (monto < 0 || monto > 1000000) {
        alert("Ingresa una cantidad válida entre 0 y 1,000,000");
        return;
    }

    // Cálculos
    let descuento = monto * 0.15;
    let total = monto - descuento;

    // Mostrar resultado
    resultado.classList.remove("oculto");
    resultado.innerHTML = `
        <strong>Resultado</strong><br><br>
        Monto original: $${monto.toFixed(2)}<br>
        Descuento (15%): $${descuento.toFixed(2)}<br>
        Total a pagar: $${total.toFixed(2)}
    `;
}

// Limpiar
function limpiar() {
    document.getElementById("monto").value = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}
