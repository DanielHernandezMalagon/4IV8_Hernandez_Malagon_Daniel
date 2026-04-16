
function calcularGanancia() {
    const capitalInput = document.getElementById("capital").value.trim();
    const meses = document.getElementById("meses").value;
    const resultado = document.getElementById("resultado");

    // Expresión regular: solo números positivos (enteros o decimales)
    const regexCapital = /^\d+(\.\d{1,2})?$/;

    // Validar campo vacío
    if (capitalInput === "") {
        alert("Ingresa el capital que deseas invertir.");
        return;
    }

    // Validar formato numérico
    if (!regexCapital.test(capitalInput)) {
        alert("El capital solo puede contener números positivos.");
        return;
    }

    const capital = parseFloat(capitalInput);

    // Validar rango permitido
    if (capital < 1000 || capital > 100000) {
        alert("El capital debe estar entre $1,000 y $100,000.");
        return;
    }

    // Validar meses permitidos
    const mesesPermitidos = ["1", "3", "6", "9", "12", "18", "24"];

    if (!mesesPermitidos.includes(meses)) {
        alert("Selecciona una cantidad válida de meses.");
        return;
    }

    // Cálculo
    const ganancia = capital * 0.02 * parseInt(meses);
    const total = capital + ganancia;

    // Mostrar resultado
    resultado.classList.remove("oculto");
    resultado.innerHTML = `
        <strong>Resultado de la inversión</strong><br><br>
        Capital invertido: $${capital.toLocaleString('es-MX', {minimumFractionDigits: 2})}<br>
        Meses seleccionados: ${meses}<br>
        Ganancia obtenida: $${ganancia.toLocaleString('es-MX', {minimumFractionDigits: 2})}<br>
        Total acumulado: $${total.toLocaleString('es-MX', {minimumFractionDigits: 2})}
    `;
}

// Función para limpiar datos
function limpiarFormulario() {
    document.getElementById("capital").value = "";
    document.getElementById("meses").value = "";

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}
