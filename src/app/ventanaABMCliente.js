import {agregarCliente,actualizarCliente,getClientesPorId} from './consultas.js';
import {updateTable} from './updates.js'
document.addEventListener('DOMContentLoaded',function (){

    const Aceptar = document.getElementById('btnVClienteAceptar');
    const Cancelar = document.getElementById('btnVClienteCancelar');
    const Editar = document.getElementById('btnVClienteEditar');
    const Actualiza = document.getElementById('btnVClienteActualiza');
    const vAbmCliente= document.getElementById('abmClientes');
    const VBuscar = document.getElementById('VentanaBuscar');
    const idcliente = document.getElementById('idcliente').value;
    
    if (idcliente.value === '') {
        console.log(idcliente.value);
        Actualiza.style.display="block";
        Aceptar.style.display="none";
    }else{
        console.log(idcliente.value);
        Aceptar.style.display="block";
        Actualiza.style.display="none";
    }

    if (Aceptar) {
        Aceptar.addEventListener('click', async () => {
            const nombre = document.getElementById('crud-nombre').value;
            const domicilio = document.getElementById('crud-domicilio').value;
            const dni = document.getElementById('crud-dni').value;
            const email = document.getElementById('crud-email').value;
            const puntos = document.getElementById('crud-puntos').value;
            const cel = document.getElementById('crud-cel').value;

            if (nombre && domicilio && dni && email) {
                const cliente = {
                    nombre: nombre,
                    domicilio: domicilio,
                    dni: dni,
                    cel: parseInt(cel,10),
                    email: email,
                    puntos: parseInt(puntos, 10)  // Asegúrate de convertir puntos a número
                };

                const estado = await agregarCliente(cliente);
                if (estado) {
                    console.log('Cliente agregado correctamente');
                    //Oculto la ventana ABMClientes
                    vAbmCliente.style.display='none';
                    //Muestro la venta Buscar
                    VBuscar.style.display='block';
                    
                } else {
                    console.log('Hubo un error al agregar el cliente');
                }
            } else {
                console.log('Por favor, completa todos los campos');
            }
        });
        
    }

    const barrConsola = document.getElementById('barConsola');
    
    if (Aceptar){
        Aceptar.addEventListener("click",()=>{
            console.log('click en aceptar')
            //Ocultar Ventana abmClientes
            vAbmCliente.style.display="none";
            //Mostrar ventana Buscar
            VBuscar.style.display="block";
            //Cambio titulo de barra superior
            barrConsola.innerHTML = "Módulo Clientes";
        })
    }
    if (Cancelar){
        Cancelar.addEventListener("click",()=>{
            console.log('click en cancelar')
            //Ocultar Ventana abmClientes
            vAbmCliente.style.display="none";
            //Mostrar ventana Buscar
            VBuscar.style.display="block";
        })
    }

    if (Actualiza){
        Actualiza.addEventListener('click', async () => {
            const idCliente = document.getElementById('idcliente').value;
            const nombre = document.getElementById('crud-nombre').value;
            const domicilio = document.getElementById('crud-domicilio').value;
            const dni = document.getElementById('crud-dni').value;
            const email = document.getElementById('crud-email').value;
            const puntos = document.getElementById('crud-puntos').value;
            const cel = document.getElementById('crud-cel').value;

            if (idCliente && nombre && domicilio && dni && email) {
                const clienteActualizado = {
                    nombre: nombre,
                    domicilio: domicilio,
                    cel: parseInt(cel,10),
                    dni: dni,
                    email: email,
                    puntos: parseInt(puntos, 10) 
                };

                const estado = await actualizarCliente(idCliente, clienteActualizado);
                if (estado) {
                    console.log('Cliente actualizado correctamente');
                    //Oculto la ventana ABMClientes
                    vAbmCliente.style.display='none';
                    //Actualizo la tabla de Buscar
                    const user = await  getClientesPorId(idCliente)
                    console.log(user);
                    updateTable(user)
                    //borro los campos de busqueda
                    document.getElementById('nombreUsuario').value =''; 
                    document.getElementById('dniUsuario').value = '';
                    //Muestro la venta Buscar
                    VBuscar.style.display='block';
                } else {
                    console.log('Hubo un error al actualizar el cliente');
                }
            } else {
                console.log('Por favor, completa todos los campos');
            }
        });
    }


    if (Editar){
        //Habilitar todos los controles
    }
})