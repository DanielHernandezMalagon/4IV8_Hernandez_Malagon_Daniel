
function calcular() {

    let hombresInput = document.getElementById("hombres").value.trim();
    let mujeresInput = document.getElementById("mujeres").value.trim();
    let resultado = document.getElementById("resultado");

    // Solo números enteros
    let regex = /^\d+$/;

    // Validar formato
    if (!regex.test(hombresInput) || !regex.test(mujeresInput)) {
        alert("Solo se permiten números enteros positivos");
        return;
    }

    let hombres = parseInt(hombresInput);
    let mujeres = parseInt(mujeresInput);

    // Validar negativos (extra seguridad)
    if (hombres < 0 || mujeres < 0) {
        alert("No se permiten números negativos");
        return;
    }

    let total = hombres + mujeres;

    // Validar división entre 0
    if (total === 0) {
        alert("Debe haber al menos un estudiante");
        return;
    }

    if (total > 100) {
        alert("El número total de alumnos no puede superar 100");
        return;
    }

    // Cálculos
    let porcHombres = (hombres / total) * 100;
    let porcMujeres = (mujeres / total) * 100;

    // Mostrar resultado
    resultado.classList.remove("oculto");
    resultado.innerHTML = `
        <strong>Resultados</strong><br><br>
        Total de estudiantes: ${total}<br><br>
        Hombres: ${porcHombres.toFixed(2)}%<br>
        Mujeres: ${porcMujeres.toFixed(2)}%
    `;
}

// Limpiar
function limpiar() {
    document.getElementById("hombres").value = "";
    document.getElementById("mujeres").value = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}