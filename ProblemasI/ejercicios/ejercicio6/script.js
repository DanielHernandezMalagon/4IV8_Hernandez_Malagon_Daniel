
function calcular() {

    let fechaInput = document.getElementById("fecha").value;
    let resultado = document.getElementById("resultado");

    // Validar vacío
    if (fechaInput === "") {
        alert("Selecciona tu fecha de nacimiento");
        return;
    }

    let fechaNacimiento = new Date(fechaInput);
    let hoy = new Date();

    // Validar fecha futura
    if (fechaNacimiento > hoy) {
        alert("No puedes ingresar una fecha futura");
        return;
    }

    // Calcular edad correctamente
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    // Validación de edad máxima
    if (edad > 120) {
        alert("La edad no puede ser mayor a 120 años");
        return;
    }

    // Mostrar resultado
    resultado.classList.remove("oculto");
    resultado.innerHTML = `
        <strong>Resultado</strong><br><br>
        Fecha de nacimiento: ${fechaInput}<br>
        Edad: ${edad} años
    `;
}

// Limpiar
function limpiar() {
    document.getElementById("fecha").value = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}
