
// Bloquear copiar
document.addEventListener("copy", function(e){
    e.preventDefault();
    alert("No se permite copiar texto");
});

// Bloquear pegar
document.addEventListener("paste", function(e){
    e.preventDefault();
    alert("No se permite pegar texto");
});


function problema1(){
    //tarea

    let input = document.querySelector('#p1-input').value.trim();
    let output = document.querySelector('#p1-output');

    // Regex: solo letras y espacios
    let regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    // Validar vacío
    if(input === ""){
        output.textContent = "Ingresa al menos una palabra";
        return;
    }

    // Validar formato
    if(!regex.test(input)){
        output.textContent = "Solo se permiten letras y espacios";
        return;
    }

    // Separar palabras (quitando espacios extras)
    let palabras = input.split(/\s+/);

    // Invertir
    let invertidas = palabras.reverse();

    // Mostrar resultado
    output.textContent = invertidas.join(" ");
}


function problema2(){

    //vectores
    var p2_x1 = document.querySelector("#p2-x1").value;
    var p2_x2 = document.querySelector("#p2-x2").value;
    var p2_x3 = document.querySelector('#p2-x3').value;
    var p2_x4 = document.querySelector('#p2-x4').value;
    var p2_x5 = document.querySelector('#p2-x5').value;

    var p2_y1 = document.querySelector('#p2-y1').value;
    var p2_y2 = document.querySelector('#p2-y2').value;
    var p2_y3 = document.querySelector('#p2-y3').value;
    var p2_y4 = document.querySelector('#p2-y4').value;
    var p2_y5 = document.querySelector('#p2-y5').value;

    p2_x1 = parseFloat(p2_x1);
    p2_x2 = parseFloat(p2_x2);
    p2_x3 = parseFloat(p2_x3);
    p2_x4 = parseFloat(p2_x4);
    p2_x5 = parseFloat(p2_x5);

    p2_y1 = parseFloat(p2_y1);
    p2_y2 = parseFloat(p2_y2);
    p2_y3 = parseFloat(p2_y3);
    p2_y4 = parseFloat(p2_y4);
    p2_y5 = parseFloat(p2_y5);
    
    let valores = [p2_x1,p2_x2,p2_x3,p2_x4,p2_x5,p2_y1,p2_y2,p2_y3,p2_y4,p2_y5];

    // Validar que sean números
    for(let v of valores){
        if(isNaN(v)){
            alert("Todos los campos deben ser números");
            return;
        }

        if(v < -1000 || v > 1000){
            alert("Los valores deben estar entre -1000 y 1000");
            return;
        }
    }
    //creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    //primero vamos a ordenar los elemntos para permutarlos
    v1 = v1.sort(function(a,b){return b-a});
    v2 = v2.sort(function(a,b){return b-a});

    //para hacer la permutacion
    v2 = v2.reverse();

    //para multiplicar necesitamos un for
    var p2_producto = 0;
    for(var i = 0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }
    document.querySelector('#p2-output').textContent = "El producto escalar minimo es de: " + p2_producto;
}

function problema3(){
    //tarea

    let input = document.querySelector('#p3-input').value.trim();
    let output = document.querySelector('#p3-output');

    // Regex: palabras en mayúsculas separadas por coma, sin espacios
    let regex = /^[A-Z]+(,[A-Z]+)*$/;

    // Validar vacío
    if(input === ""){
        output.textContent = "Ingresa palabras separadas por coma";
        return;
    }

    // Validar formato
    if(!regex.test(input)){
        output.textContent = "Formato inválido. Usa solo MAYÚSCULAS sin espacios (ej: CASA,PERRO)";
        return;
    }

    // Separar palabras
    let palabras = input.split(",");

    let maxPalabra = "";
    let maxUnicos = 0;
    let caracteresUnicos = [];

    for(let palabra of palabras){

        let unicos = new Set(palabra);
    
        if(unicos.size > maxUnicos){
            maxUnicos = unicos.size;
            maxPalabra = palabra;
            caracteresUnicos = [...unicos]; // guardamos las letras
        }
    }

    // Mostrar resultado
    output.textContent = `${maxPalabra} tiene ${maxUnicos} caracteres únicos: ${caracteresUnicos.join(", ")}`;

}