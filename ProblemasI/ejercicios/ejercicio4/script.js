
function calcular() {

    let p1 = document.getElementById("p1").value.trim();
    let p2 = document.getElementById("p2").value.trim();
    let p3 = document.getElementById("p3").value.trim();
    let examen = document.getElementById("examen").value.trim();
    let trabajo = document.getElementById("trabajo").value.trim();
    let resultado = document.getElementById("resultado");

    // Regex: números con máximo 1 decimal
    let regex = /^\d+(\.\d{1})?$/;

    let notas = [p1, p2, p3, examen, trabajo];

    // Validación general
    for (let i = 0; i < notas.length; i++) {

        if (!regex.test(notas[i])) {
            alert("Solo números con máximo un decimal (ej: 7 o 7.5)");
            return;
        }

        let valor = parseFloat(notas[i]);

        if (valor < 0 || valor > 10) {
            alert("Las calificaciones deben estar entre 0 y 10");
            return;
        }

        notas[i] = valor;
    }

    // Promedio parciales
    let promedio = (notas[0] + notas[1] + notas[2]) / 3;

    // Aplicar porcentajes
    let parciales = promedio * 0.55;
    let exam = notas[3] * 0.30;
    let trab = notas[4] * 0.15;

    let final = parciales + exam + trab;

    // Redondeo personalizado
    let redondeado = Math.floor(final);
    if (final - redondeado >= 0.5) {
        redondeado += 1;
    }

    // Mostrar resultado
    resultado.classList.remove("oculto");
    resultado.innerHTML = `
        <strong>Resultados</strong><br><br>
        Promedio parciales: ${promedio.toFixed(2)}<br>
        Aporte parciales (55%): ${parciales.toFixed(2)}<br>
        Examen (30%): ${exam.toFixed(2)}<br>
        Trabajo (15%): ${trab.toFixed(2)}<br><br>
        Calificación final: ${final.toFixed(2)}<br>
        Calificación redondeada: ${redondeado}
    `;
}

// Limpiar
function limpiar() {
    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";
    document.getElementById("p3").value = "";
    document.getElementById("examen").value = "";
    document.getElementById("trabajo").value = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}