
function calcular() {

    let sueldoInput = document.getElementById("sueldo").value.trim();
    let v1 = document.getElementById("venta1").value.trim();
    let v2 = document.getElementById("venta2").value.trim();
    let v3 = document.getElementById("venta3").value.trim();
    let resultado = document.getElementById("resultado");

    let regex = /^\d+(\.\d{1,2})?$/;

    // Validar sueldo
    if (!regex.test(sueldoInput)) {
        alert("Sueldo inválido");
        return;
    }

    let sueldo = parseFloat(sueldoInput);

    if (sueldo < 9582.47 || sueldo >= 1000000) {
        alert("El sueldo debe ser entre $9,582.47 y menor a $1,000,000");
        return;
    }

    // Validar ventas
    let ventas = [v1, v2, v3];

    for (let i = 0; i < ventas.length; i++) {
        if (!regex.test(ventas[i])) {
            alert("Las ventas deben ser números válidos");
            return;
        }

        let venta = parseFloat(ventas[i]);

        if (venta < 0 || venta > 1000000) {
            alert("Las ventas deben ser entre 0 y 1,000,000");
            return;
        }

        ventas[i] = venta;
    }

    // Cálculos
    let c1 = ventas[0] * 0.10;
    let c2 = ventas[1] * 0.10;
    let c3 = ventas[2] * 0.10;

    let totalComisiones = c1 + c2 + c3;
    let totalFinal = sueldo + totalComisiones;

    // Mostrar resultado
    resultado.classList.remove("oculto");
    resultado.innerHTML = `
        <strong>Resultados</strong><br><br>
        Comisión venta 1: $${c1.toFixed(2)}<br>
        Comisión venta 2: $${c2.toFixed(2)}<br>
        Comisión venta 3: $${c3.toFixed(2)}<br><br>
        Total comisiones: $${totalComisiones.toFixed(2)}<br>
        Total a recibir: $${totalFinal.toFixed(2)}
    `;
}

// Limpiar
function limpiar() {
    document.getElementById("sueldo").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}

