import {eliminarPremio} from './consultas.js'
document.addEventListener('DOMContentLoaded',()=>{

    const vPremios = document.getElementById('ventanaPremios');
    const btnEliminarPremio = document.getElementById("btnPremioEliminar");
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento

    if (btnEliminarPremio) {
        btnEliminarPremio.addEventListener('click', async () => {
            const idPremio = document.querySelector('#idPremio').value;

            if (idPremio !== '') {
                const confirmacion = confirm('¿Desea eliminar el premio con Id ' + idPremio + '?');
                if (confirmacion) {
                    const estado = await eliminarPremio(idPremio);
                    if (estado) {
                        console.log('El premio se eliminó correctamente');
                        updateTablaPremios(premios)
                    } else {
                        console.log('Hubo un error al eliminar el premio');
                    }
                }
            } else {
                console.log('No seleccionó ningún premio');
            }
        });
    }
    
})