var instrucciones = [
    "Utiliza las felchas de navegacion para mover las piezas",
    "Para ordenar las piezas guiate on la imagen objetivo"
];

//para guardar los movimientos necesitamos un arreglo

var movimientos = [];

//tengo que saber las posiciones del rompecabezas original

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//necesito otra variable para saber que el orden del rompecabezas es el correcto

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//necesito conocer la posicion de la ficha o pieza vacia

var filaVacia = 2;
var columnaVacia = 2;

//necesito una funcion que se encargue de mostrar la lista de instrucciones

function mostrarInstrucciones(instrucciones){
    for(var i = 0; 1 < instrucciones.length; i++){
        mostarInstruccionesLista(instrucciones[i],"lista-instrucciones")
    }
}

function mostrarInstruccionesLista(instruccion,idlista){
    var ul = document.getElementById(idlista)
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}