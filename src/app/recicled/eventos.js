
import {getUsuariosPorNombre} from '../consultas.js'
import {updateTable} from '../updates.js'


//---------------Captura input Nombre -----------------------------------------------
document.addEventListener('DOMContentLoaded', ()=>{
    const inputName= document.querySelector('#nombreUsuario')                            //selecciono el elemento al cual tengo que modificar 
                                                                                  //para agregar el resultado de la consulta
    inputName.addEventListener('input', debounce(handleInput,300))

    async function handleInput(event) {
        const query = event.target.value.trim();
        //const email = document.getElementById('emailUsuario').value
        
            const form = document.getElementById('findForm');
            const formData = new FormData(form);
        
            // Convertir FormData a un objeto plano
            const formObject = Object.fromEntries(formData.entries());
            console.log('Buscando:', formObject);
            
            /*  formArray.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            }); */
        
        
                console.log('Buscando:',formObject)
                //Buscar coincidencias
                const usuarios = await getUsuariosPorNombre(formObject);
                updateTable(usuarios);
    }

    //--esta función es para reducir la cantidad de llamadas a funciones con solicitud de red
    function debounce(func,delay) {                                                //func: La función que queremos controlar para que no se ejecute demasiado frecuentemente
                                                                                //delay: El tiempo en milisegundos que queremos esperar antes de permitir que func se ejecute nuevamente.
        let timeout;                                                               //timeout: Una variable que almacenará el identificador del temporizador devuelto por setTimeout. Inicialmente, está indefinida.    
        return function (...args){                                                 //La función debounce retorna una nueva función anónima. Esta nueva función captura los argumentos originales (...args) que se pasarán a func.         
            clearTimeout(timeout);                                                //clearTimeout(timeout): Antes de configurar un nuevo temporizador, se limpia el temporizador anterior (si existe). Esto garantiza que cualquier llamada anterior a la función func que aún esté pendiente se cancele.    
            timeout = setTimeout(()=> func.apply(this, args),delay);
        }
    }

});







// ------------Captura el click del boton buscar----------------------------
document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', async () => {
            const findForm = document.querySelector('#findForm');

            const name = findForm['nombreUsuario'].value;

            // Aquí puedes llamar a tu función para buscar en Firestore y actualizar la tabla
            try {
                const usuarios = await getUsuariosPorNombre(name);
                console.log(usuarios);
                updateTable(usuarios);
                // Lógica para actualizar la tabla con los datos obtenidos
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        });
    }
});
//-----------------------------------------------------------------
