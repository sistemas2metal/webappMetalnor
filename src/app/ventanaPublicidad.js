document.addEventListener('DOMContentLoaded',()=>{

    const vPublicidad = document.getElementById('ventanaPublicidad');
    const btnVPubEliminar = document.getElementById('btnVPubEliminar');
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento


    if (btnVPubEliminar){
        btnVPubEliminar.addEventListener('click',()=>{
            //Muestro la ventana Buscar
            VPrincipal.style.display="block";
            //Oculto la ventana Canje
            vPublicidad.style.display="none";
        })
    }
    
})