import {getUsuariosPorNombre,getPuntosUsuarios} from './consultas.js'
import {updateTable} from './updates.js'

document.addEventListener("DOMContentLoaded", () => {
    const btnDatos = document.getElementById("btn-datos");
    const VBuscar = document.getElementById("VentanaBuscar");
    const ABMClientes = document.getElementById("abmClientes");
    const vCanje = document.getElementById('ventanaCanje');
    const btnCanje = document.getElementById('btn-canje');
    const inpCanPuntos = document.getElementById('inpCanPuntos');
    const inpCanDescripcion = document.getElementById('inpCanDescripcion')
    const inputName= document.querySelector('#nombreUsuario')                            //selecciono el elemento al cual tengo que modificar 
    const inputDni= document.querySelector('#dniUsuario')

    window.radioClicked = function (radio){
        window.idCliente =radio.value;
        console.log(window.idCliente);
    }

    if (btnDatos) {
        btnDatos.addEventListener('click', () => {
            console.log('Botón datos presionado');
            // Busco si se hizo una selección 
            // Si se hizo oculto la VentanaBuscar
            VBuscar.style.display = "none";
            // Muestro la ventana ABMClientes
            ABMClientes.style.display = "block";

        })
    if (btnCanje){
            btnCanje.addEventListener('click',()=>{
                //Oculto la ventana Buscar
                VBuscar.style.display="none";
                //Muestro la ventana Canje
                console.log('ESTOY AQUI');
                inpCanPuntos.value = '';
                inpCanDescripcion.value = '';
                vCanje.style.display="block";
            })
        }
    }

    if (btnBuscar){
        btnBuscar.addEventListener('click', async ()=>{            
            const usuarios = await getUsuariosPorNombre(inputName.value,inputDni.value)
            
            // Crear un array de promesas para obtener los puntos de cada usuario
            
            
            usuarios.forEach(async element => {
                const puntos = await getPuntosUsuarios(element.id);
                element.puntos = puntos;
            });
            updateTable(usuarios);
        });
    }

//-------------------------------------------------------------------------------------

});
