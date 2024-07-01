import {getUsuariosPorNombre,getPuntosUsuarios,getClientesPorId,getPuntosDelUsuarios,eliminarUsuario} from './consultas.js'
import {updateTable, updateTablaHistoricoP} from './updates.js'

document.addEventListener("DOMContentLoaded", () => {
    const btnEditar = document.getElementById("btnClienteEditar");
    const VBuscar = document.getElementById("VentanaBuscar");
    const ABMClientes = document.getElementById("abmClientes");
    const vCanje = document.getElementById('ventanaCanje');
    const btnCanje = document.getElementById('btn-canje');
    const inpCanPuntos = document.getElementById('inpCanPuntos');
    const inpCanDescripcion = document.getElementById('inpCanDescripcion')
    const inputName= document.querySelector('#nombreUsuario')                            //selecciono el elemento al cual tengo que modificar 
    const inputDni= document.querySelector('#dniUsuario');
    const btnHistorico = document.querySelector('#btn-historico');
    const btnEliminar = document.querySelector('#btnClienteEliminar');
    const btnAgregar = document.querySelector('#btnClienteAgregar');
    
    //-----------------ventana ABMClientes-----------
    const abmNombre = document.getElementById ('crud-nombre');
    const abmDomicilio = document.getElementById('crud-domicilio');
    const abmDni = document.getElementById('crud-dni');
    const abmEmail = document.getElementById('crud-email');
    const abmPuntos = document.getElementById('crud-puntos');
    const abmCel = document.getElementById('crud-cel');
    //-----------------------------------------------

    window.radioClicked = function (radio){
        //const idcliente = document.getElementById('idcliente');
        idcliente.value = radio.value;
       // console.log(idcliente);
    }

    if (btnEliminar){
        btnEliminar.addEventListener('click', async() =>{
            //const idCliente = document.querySelector('#idcliente').value;
        
            if (idcliente.value !=='' ){
                const confirmacion = confirm('¿Desea eliminar el usuario con Id'+ idCliente.value + '?');       
                
                if (confirmacion){
                    const estado = await eliminarUsuario(idCliente.value);
                    if (estado){
                        console.log('El usuario se eliminó correctamente');
                    }else{
                        console.log('Hubo un error al eliminar el usuario');
                    }
                }
            }else {
                console.log('No seleccionó ningún usuario');
            }  
            
        });
    }
    if (btnAgregar){
        btnAgregar.addEventListener('click',()=>{
        console.log('Estoy en Agregar');
        // oculto la ventana Buscar
        VBuscar.style.display = "none";
        // borrar los campos de ABMClientes;
        document.getElementById('crud-nombre').value = '';
        document.getElementById('crud-domicilio').value='';
        document.getElementById('crud-dni').value = '';
        document.getElementById('crud-email').value = '';
        document.getElementById('crud-puntos').value ='';
        document.getElementById('crud-cel').value = '';
        // elimino el cliente seleccionado
        document.getElementById('idcliente').value = '';
        // mostrar ventana ABMClientes
        ABMClientes.style.display = "block";
        });
    };

    if (btnEditar) {
        btnEditar.addEventListener('click', async() => {
            if (idcliente.value !=='' ){    //Se seleccionó un usuario
                console.log('Botón Editar presionado');
                // Busco si se hizo una selección 
                // Si se hizo oculto la VentanaBuscar
                VBuscar.style.display = "none";
                //busco los datos del cliente
                const usuario = await getClientesPorId(idcliente.value); 
                abmNombre.value = usuario.nombre;
                abmDni.value=usuario.dni;
                abmEmail.value=usuario.email;
                abmDomicilio.value=usuario.domicilio;
                const puntos = await getPuntosUsuarios(idcliente.value);
                abmPuntos.value = puntos
                abmCel.value = usuario.cel;
                //cargo los datos en la ventana ABMClientes
                // Muestro la ventana ABMClientes
                ABMClientes.style.display = "block";
            } else{
                alert('Debe seleccionar un usuario!');
            }
        });
    }
        
    if (btnCanje){
            btnCanje.addEventListener('click', async ()=>{
                //Oculto la ventana Buscar
                VBuscar.style.display="none";
                //Muestro la ventana Canje
                  //vincular el label con una variable
                const LabelNombre = document.getElementById('pNombre');
                //buscar el usuario por id
                //const idcliente = document.getElementById('idcliente').value
                const usuario = await getClientesPorId(idcliente.value);
                //colocar el nombre en el Label 
                LabelNombre.textContent=usuario.nombre;
                inpCanPuntos.value = '';
                inpCanDescripcion.value = '';
                vCanje.style.display="block";
            });
        }

    if(btnHistorico){
        btnHistorico.addEventListener('click', async()=>{
            //const idcliente = document.getElementById('idcliente').value;
            const labCliente = document.getElementById('labCliente');
            const usuario = await getClientesPorId(idcliente.value); 
             //Colocar el nombre del cliente en el label
            labCliente.textContent = usuario.nombre;
            //buscar todos los puntos del cliente
            const puntos = await getPuntosDelUsuarios(idcliente.value);
            //actualizar la tabla de Historico con los datos de la busqueda
            updateTablaHistoricoP(puntos);
            
        });
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
