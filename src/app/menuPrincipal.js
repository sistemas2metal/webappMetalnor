document.addEventListener("DOMContentLoaded", () => {

    const btnPrinClientes = document.getElementById('btnPrinClientes');
    const btnPrinPremios = document.getElementById('btnPrinPremios');
    const btnPrinPublicidad = document.getElementById('btnPrinPublicidad');
    const btnPrinMetricas = document.getElementById('btnPrinMetricas');
    const btnInicio = document.getElementById('btn-inicio'); 
    const vCanje = document.getElementById('ventanaCanje');
    const VBuscar = document.getElementById('VentanaBuscar');
    const ABMClientes = document.getElementById("abmClientes");
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento
    const vPremios = document.getElementById('ventanaPremios');
    const vPublicidad = document.getElementById('ventanaPublicidad');


    if (btnPrinClientes) {
        btnPrinClientes.addEventListener('click', () => {
            //console.log('Botón cliente presionado');
            VPrincipal.style.display = "none";
            VBuscar.style.display = "block";
        });
    } else {
        console.log('El botón btnPrinClientes no se encontró');
    }

    if (btnPrinPremios) {
        btnPrinPremios.addEventListener('click', () => {
            console.log('Botón Premios presionado');
             // Ocultar el Menú Principal
            VPrincipal.style.display="none";
            // Mostrar el div de Premios
            vPremios.style.display="block";

        });
    } else {
        console.log('El botón btnPrinPremios no se encontró');
    }
    
    if (btnPrinPublicidad) {
        btnPrinPublicidad.addEventListener('click', () => {
            console.log('Botón Publicidad presionado');
            // Ocultar el Menú Principal
            VPrincipal.style.display="none";
            // Mostrar el div de Publicidad
            vPublicidad.style.display="block";
        });
    } else {
        console.log('El botón btnPrinPublicidad no se encontró');
    }

    if (btnPrinMetricas) {
        btnPrinMetricas.addEventListener('click', () => {
            console.log('Botón Metricas presionado');
            //Aqui agregar el código para la funcionalidad de los botones
        });
    } else {
        console.log('El botón btnPrinMetricas no se encontró');
    }

    if (btnInicio){
        btnInicio.addEventListener('click',()=>{
            vCanje.style.display="none";
            VBuscar.style.display="none";
            ABMClientes.style.display="none";
            vPremios.style.display="none";
            vPublicidad.style.display="none";
            VPrincipal.style.display="block";
        })
    }
});

