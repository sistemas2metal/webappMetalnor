import {getUsuariosPorNombre,getPuntosUsuarios,getClientesPorId} from './consultas.js'
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
    //-----------------ventana ABMClientes-----------
    const abmNombre = document.getElementById ('crud-nombre');
    const abmDomicilio = document.getElementById('crud-domicilio');
    const abmDni = document.getElementById('crud-dni');
    const abmEmail = document.getElementById('crud-email');
    const abmPuntos = document.getElementById('crud-puntos');
    //-----------------------------------------------
    window.radioClicked = function (radio){
        const idcliente = document.getElementById('idcliente');
        idcliente.value =radio.value;
    }

    if (btnDatos) {
        btnDatos.addEventListener('click', async() => {
            console.log('Botón datos presionado');
            // Busco si se hizo una selección 
            // Si se hizo oculto la VentanaBuscar
            VBuscar.style.display = "none";
            //busco los datos del cliente
            const idcliente = document.getElementById('idcliente').value;
            const usuario = await getClientesPorId(idcliente); 
            abmNombre.value = usuario.nombre;
            abmDni.value=usuario.dni;
            abmEmail.value=usuario.email;
            abmDomicilio.value=usuario.domicilio;
            const puntos = await getPuntosUsuarios(idcliente);
            abmPuntos.value = puntos
            //cargo los datos en la ventana ABMClientes
            // Muestro la ventana ABMClientes
            ABMClientes.style.display = "block";

        })
    if (btnCanje){
            btnCanje.addEventListener('click', async ()=>{
                //Oculto la ventana Buscar
                VBuscar.style.display="none";
                //Muestro la ventana Canje
                  //vincular el label con una variable
                const LabelNombre = document.getElementById('pNombre');
                //buscar el usuario por id
                const idcliente = document.getElementById('idcliente').value
                const usuario = await getClientesPorId(idcliente);
                //colocar el nombre en el Label 
                LabelNombre.textContent=usuario.nombre;
                inpCanPuntos.value = '';
                inpCanDescripcion.value = '';
                vCanje.style.display="block";
            })
        }
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', async () => {
            // Obtener usuarios por nombre y DNI de manera asíncrona
            const usuarios = await getUsuariosPorNombre(inputName.value, inputDni.value);
    
            // Crear un array de promesas para obtener los puntos de cada usuario
            const usuariosConPuntos = await Promise.all(usuarios.map(async (element) => {
                // Obtener los puntos del usuario actual de manera asíncrona
                const puntos = await getPuntosUsuarios(element.id);
                // Agregar la propiedad 'puntos' al objeto usuario
                element.puntos = puntos;
                return element; // Devolver el usuario con los puntos actualizados
            }));
    
            // Actualizar la tabla con los usuarios que ahora incluyen los puntos
            updateTable(usuariosConPuntos);
        });
    }

//-------------------------------------------------------------------------------------

});
