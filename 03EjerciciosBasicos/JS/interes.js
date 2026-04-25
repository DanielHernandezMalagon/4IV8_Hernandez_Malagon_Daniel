function validarn(e){
    var teclado = (document.all)?e.KeyCode:e.which;
    if(teclado == 8) returntrue;
    //creo mi expresion regular
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);

    }

    function interes(){
        var valor= document.getElementById('cantidadi').value;

        var interes = parseFloat(valor);
        //10% anual
        var subtotal = interes * .10;

        var total = subtotal + interes;

        document.getElementById('sueldoi').value = "$ " + total;

    }

    function borrar(){

        document.getElementById('saldoi').value="";
        document.getElementById('cantidadi').value="";
    }