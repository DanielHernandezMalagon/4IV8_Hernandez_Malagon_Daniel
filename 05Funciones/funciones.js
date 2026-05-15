// vamos a hacer un viaje en el tiempo  ahora vamos a programar todo bajo el esquema ES6

/*
Para java script ya conocemos el concepto de variable

var

se sustituye por las nuevas variuables:

let --> es una variable de tipo "protegidas", ya que solo funciona denytro de un fragmento de codigo

const --> si es constante


if(true){
    var x = "x";
    //console.log(x);

var x = "y";
console.log(x);
}



//para declarar en js las funciones hay una forma mas efectiva para declaralas y es a partir de una funciona

//una funcion felcha en js a diferencia de una normal no genera su propio contexto (this), necesita ser declarada antes de ser usada y no necesita un return

//function cosa(String hola) { Sting cosa; this.cosa = hola}

//vamos hacer una funcion que sume dos numeros
function sumarnumeros(n1, n2){
    return n1+n2;
}

const sumarDosNumeros = (n1, n2) => n1+n2;

console.log(`la suma de la funcion es: (2,3): ${sumarnumeros(2,3)} `);

console.log(`la suma de la funcion es: (4,3): ${sumarDosNumeros(5,3)} `);

//para armar una funcion frelcha debemos de entender su estructura:
// "cadena" (el tipo de variable, nombre de la funcion y los argumentos)  => operacion

*/

const razaDePerros = [
    "Gran Danes",
    "Doverman",
    "Chihuahua",
    "Pastor Aleman", 
    "Pitbul",
    "San Bernardo",
    "Xoloscuincle"
];


/*
for(let i = 0; i < razaDePerros.length; i++){
    console.log(razaDePerros[i]);
}

for(const raza of razaDePerros){
    console.log(raza);
}
    


for(const indice in razaDePerros){
    console.log(razaDePerros[indice]);
}
    forEach
    Iterar sobre elementos de arreglo que devuelven nada

razaDePerros.forEach(raza => console.log(raza));


Por ejemlo necestiamos una funcion para buscar la raza chihuahua y sino existe agregarla


//funcion map estafuncion itera sobre los elementos delarreglo y regresa un arreglo diferenbte con el podemos hacer lo que queramos sin necesidd de modificar el arreglo original

const razasDePerrosEnMayusculas = razaDePerros.map((raza, indice, arregloOriginal) => console.log(raza.toUpperCase()));
*/

if(razaDePerros.find(raza => raza === "Chihuahua")){
    console.log("La razxa si se encontro y e Chihuahua")
    console.log(razaDePerros);
}else{
    razaDePerros.push("Chihuahua");
    console.log("Se agrego Chihuahua al arreglo");
    console.log(razaDePerros);
}