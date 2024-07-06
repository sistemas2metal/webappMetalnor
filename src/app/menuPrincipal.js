import { getPremios, getPublicidad,canjearPuntos} from './consultas.js';
import {updateTablaPremios,updateTablaPublicidad} from './updates.js';
document.addEventListener("DOMContentLoaded", () => {

    const btnPrinClientes = document.getElementById('btnPrinClientes');
    const btnPrinPremios = document.getElementById('btnPrinPremios');
    const btnPrinPublicidad = document.getElementById('btnPrinPublicidad');
    const btnPrinMetricas = document.getElementById('btnPrinMetricas');
    const btnInicio = document.getElementById('btn-inicio'); 
    const vCanje = document.getElementById('ventanaCanje');
    const VBuscar = document.getElementById('VentanaBuscar');
    const ABMClientes = document.getElementById("abmClientes");
    const VHistoricoP = document.getElementById("ventanaHistoricoP");
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento
    const vPremios = document.getElementById('ventanaPremios');
    const vPublicidad = document.getElementById('ventanaPublicidad');
    const barrConsola = document.getElementById('barConsola');


    if (btnPrinClientes) {
        btnPrinClientes.addEventListener('click', () => {
            //console.log('Botón cliente presionado');
            VPrincipal.style.display = "none";
            VBuscar.style.display = "block";
            //Cambio titulo de barra superior
            barrConsola.innerHTML = "Módulo Clientes";
        });
    } else {
        //console.log('El botón btnPrinClientes no se encontró');
        showMessage('El botón de Clientes no se encontro!','alert');
    }

    if (btnPrinPremios) {
        btnPrinPremios.addEventListener('click', async () => {
            console.log('Botón Premios presionado');
             // Ocultar el Menú Principal
            VPrincipal.style.display="none";
            // actualizar la tabla
            updateTablaPremios();
            // Mostrar el div de Premios
            vPremios.style.display="block";
            barrConsola.innerHTML = "Módulo Premios";
        });
    } else {
        //console.log('El botón btnPrinPremios no se encontró');
        showMessage('El botón de Premios no se encontro!','alert')
    }
    
    if (btnPrinPublicidad) {
        btnPrinPublicidad.addEventListener('click', async () => {
             //console.log('Botón Publicidad presionado');
            // Ocultar el Menú Principal
            VPrincipal.style.display="none";
            //Buscar la publicidades
            
            //Actualizar la tabla
            updateTablaPublicidad();
            // Mostrar el div de Publicidad
            vPublicidad.style.display="block";
            barrConsola.innerHTML = "Módulo Publicidad";
        });
    } else {
        //console.log('El botón btnPrinPublicidad no se encontró');
        showMessage('El botón de Publicidad no se encontro!','alert')
    }

    if (btnPrinMetricas) {
        btnPrinMetricas.addEventListener('click', () => {
            //console.log('Botón Metricas presionado');
            //Aqui agregar el código para la funcionalidad de los botones
        });
    } else {
        console.log('El botón btnPrinMetricas no se encontró');
        showMessage('El botón de Metricas no se encontro!','alert')
    }

    if (btnInicio){
        btnInicio.addEventListener('click',()=>{
            vCanje.style.display="none";
            VBuscar.style.display="none";
            ABMClientes.style.display="none";
            vPremios.style.display="none";
            vPublicidad.style.display="none";
            VHistoricoP.style.display="none";
            VPrincipal.style.display="block";
            barrConsola.innerHTML = "Panel de Control";
        })
    }
    
});


