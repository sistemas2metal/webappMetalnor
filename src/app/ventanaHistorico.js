import {eliminarPunto,agregarPuntos, getPuntosDelUsuarios} from './consultas.js';
import { showMessage } from './showMessage.js';
import { updateTablaHistoricoP } from './updates.js';

document.addEventListener('DOMContentLoaded',()=>{
    const btnHistoricoEliminar = document.getElementById('btnHistoricoEliminar');
    const btnHistoricoAgregar  = document.getElementById('btnHistoricoAgregar');
    const modalElement3 = document.getElementById('abmPuntos');
    const modalPuntos = new bootstrap.Modal(modalElement3);
    const btnagregarPuntos = document.getElementById('agregarPuntos');

    function formatearFecha(fechaActual){
        let year = fechaActual.getFullYear();
        let month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
        let day = String(fechaActual.getDate()).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
        let fechaFormateada = `${year}-${month}-${day}`;
        return fechaFormateada;
    }

    if (btnHistoricoEliminar){
        btnHistoricoEliminar.addEventListener('click', async ()=>{
            if(idPunto.value !==''){
                const estado = await eliminarPunto(idPunto.value);
                if (estado){
                    showMessage('Puntos eliminados correctamente','');
                }else{
                    showMessage('Error al eliminar los puntos','alert');
                }
            }
        })
    }
    if (btnHistoricoAgregar){
        btnHistoricoAgregar.addEventListener('click', ()=>{
            modalPuntos.show();
        })
    }

    if (btnagregarPuntos){
        btnagregarPuntos.addEventListener('click', async ()=>{
            const iabmPuntos= document.getElementById('iabmPuntos').value;
            const fechaActual = new Date();
            const fecha = formatearFecha(fechaActual);

            // Sumo un mes
            let nuevoMes = fechaActual.getMonth() + 1;
            fechaActual.setMonth(nuevoMes);

            // Verifico si el mes cambió, si no, ajusto el día
            if (fechaActual.getMonth() !== nuevoMes % 12) {
                fechaActual.setDate(0); // Ajusto al último día del mes anterior
            }
            const fechaVencimiento = formatearFecha(fechaActual);
            
            const punto = {
                cantidad: parseInt(iabmPuntos,10),
                fecha: fecha,
                fechaVen:fechaVencimiento,
                idcliente: idcliente.value
            }
            const estado = agregarPuntos(punto);
            if (estado){
                showMessage('Puntos agregados correctamente','');
                const puntos = await getPuntosDelUsuarios(idcliente.value);
                updateTablaHistoricoP(puntos);
                modalPuntos.hide();
            }else{
                showMessage('Error al agregar los puntos!','alert');
            }
        })
    }

})