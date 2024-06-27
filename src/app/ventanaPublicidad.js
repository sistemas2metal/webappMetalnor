import {eliminarPublicidad} from './consultas.js'
import { updateTablaPublicidad} from './updates.js';

document.addEventListener('DOMContentLoaded',()=>{

    const vPublicidad = document.getElementById('ventanaPublicidad');
    const btnEliminarPublicidad = document.getElementById('btnVPubEliminar');
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento

    if (btnEliminarPublicidad) {
        btnEliminarPublicidad.addEventListener('click', async () => {
            const idPublicidad = document.querySelector('#idPublicidad').value;

            if (idPublicidad !== '') {
                const confirmacion = confirm('¿Desea eliminar la publicidad con Id ' + idPublicidad + '?');

                if (confirmacion) {
                    const estado = await eliminarPublicidad(idPublicidad);
                    if (estado) {
                        console.log('La publicidad se eliminó correctamente');
                        updateTablaPublicidad();
                    } else {
                        console.log('Hubo un error al eliminar la publicidad');
                    }
                }
            } else {
                console.log('No seleccionó ninguna publicidad');
            }
        });
    }
    
})