function validar(formulario){

    //vamos a crear una funcion para validar un numero minimo de caracteres en el nombre
    if(formulario.nombre.value.length < 3 ){
        alert("por favor ingrese un nombre mayor de 3 caracteres");
        formulario.nombre.focus();
        return false;
    }

    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm"

    var checkString = formulario.nombre.value;

    var allValid = true;

    //tenemos que ir comparando y recorriendo la cadena caracter por caracter
    for(var i = 0; i < checkString.length; i++){
        //necesito la cadena pasarla a caracter
        var caracteres = checkString.charAt(i);
        for(var j = 0; j < abcOK.length; j++){
            if(caracteres == abcOK.charAt(j)){
                break;
            }
        }
        if(j == abcOK.length){
            allValid = false;
            break;
        }
    }
    if(!allValid){
        alert("Por favor escriba solo letras en el formulario nombre");
        formulario.nombre.focus();
        return false;
    }

     //vamos a crear una funcion para validar un numero minimo de caracteres en la edad
     var edad = formulario.edad.value;

     if(edad <= 0 || edad > 100){
         alert("La edad debe estar entre 1 y 100 años");
         formulario.edad.focus();
         return false;
     }

    var abcOK = "1234567890"

    var checkString = formulario.edad.value;

    var allValid = true;

    //tenemos que ir comparando y recorriendo la cadena caracter por caracter
    for(var i = 0; i < checkString.length; i++){
        //necesito la cadena pasarla a caracter
        var caracteres = checkString.charAt(i);
        for(var j = 0; j < abcOK.length; j++){
            if(caracteres == abcOK.charAt(j)){
                break;
            }
        }
        if(j == abcOK.length){
            allValid = false;
            break;
        }
    }
    if(!allValid){
        alert("Por favor escriba solo numeros en el campo edad");
        formulario.edad.focus();
        return false;
    }

    var correoelectronico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var text = formulario.email.value;

    var text = formulario.email.value;

    if(!correoelectronico.test(text)){
        alert("Correo electrónico no válido");
        formulario.email.focus();
        return false;
    }

    return true;
}