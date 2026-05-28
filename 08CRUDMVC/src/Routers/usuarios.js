//aqui necesitamos crear el orden para que el controlador obtenga la peticion, sepa la ruta para poderla atender y de ahi se conecte a la bd y realice la acción correspondiente

//ahora que ya hizo la acción poder generar la respuesta a partir del controlador a la vista

const express = require('express');
const router = express.Router();
//este Router() es el que se encarga de organizar a cada ruta de forma interna

const bd = require('../DB/database');

//por cada acción debo de programar los elementos correspondiente sdel usuario

//funcion para validar user y pass

function validarUsuario(datos){

    const errores = [];

    if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2){
        errores.push('El nombre es obligatorio y debe de tener al menos 2 caracteres');
    }
    if(!datos.email || typeof datos.email !== 'string'){
        errores.push('El email es obligatorio, verificalo');
    }else{
        //expresion regular para validar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(datos.email)){
            errores.push('El formato del email no es valido');
        }
    }
    return errores;
}


//vamos a mostrar todos los usuarios
router.get('/', async (req, res) => {
    try{

        const [usuarios] = await bd.execute(
            //necesitamos primero querry
            'Select id, nombre, email, created_at, updated_at FROM usuarios order by id ASC'
        );

        //debo convertirlo en json
        res.json({
            status : 'success',
            data : usuarios,
            count : usuarios.length
        });
    }catch(error){
        console.log('Error al listar los usuarios: ', error.message);
        res.status(500).json({
            status : 'error',
            message : 'Error interno del servidor'
        });
    }
});


module.exports = router;