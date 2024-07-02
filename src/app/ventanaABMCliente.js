import {agregarCliente,actualizarCliente,getClientesPorId} from './consultas.js';
import {updateTable} from './updates.js'
document.addEventListener('DOMContentLoaded',function (){

    const Aceptar = document.getElementById('btnVClienteAceptar');
    const Cancelar = document.getElementById('btnVClienteCancelar');
    const vAbmCliente= document.getElementById('abmClientes');
    const VBuscar = document.getElementById('VentanaBuscar');
    
    if (Aceptar) {
        Aceptar.addEventListener('click', async () => {
            console.log('idcliente: '+idcliente.value);
            if (idcliente.value !=='' ){    //Se seleccionó un usuario
                console.log('Metodo Editar');//Metodo Editar Cliente
                //const idCliente = document.getElementById('idcliente').value;
                const nombre = document.getElementById('crud-nombre').value;
                const domicilio = document.getElementById('crud-domicilio').value;
                const dni = document.getElementById('crud-dni').value;
                const email = document.getElementById('crud-email').value;
                const puntos = document.getElementById('crud-puntos').value;
                const cel = document.getElementById('crud-cel').value;
                if (idcliente && nombre && domicilio && dni && email) {
                    const clienteActualizado = { 
                        nombre: nombre,
                        domicilio: domicilio,
                        cel: parseInt(cel,10),
                        dni: dni,
                        email: email,
                        puntos: parseInt(puntos, 10) 
                    };
                console.log(clienteActualizado);
                    const estado = await actualizarCliente(idcliente.value, clienteActualizado);
                    if (estado) {
                        console.log('Cliente actualizado correctamente');
                        //Oculto la ventana ABMClientes
                        vAbmCliente.style.display='none';
                        //Actualizo la tabla de Buscar
                        const user = await  getClientesPorId(idcliente.value)
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
            }else{  
                console.log('Metodo Agregar');    // Metodo Agregar Cliente
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
            }
        });
    }

    //const barrConsola = document.getElementById('barConsola');    
    if (Cancelar){
        Cancelar.addEventListener("click",()=>{
            console.log('click en cancelar')
            //Ocultar Ventana abmClientes
            vAbmCliente.style.display="none";
            //Mostrar ventana Buscar
            VBuscar.style.display="block";
        })
    }


});