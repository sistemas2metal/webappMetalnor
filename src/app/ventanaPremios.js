document.addEventListener('DOMContentLoaded',()=>{

    const vPremios = document.getElementById('ventanaPremios');
    const btnVPremEliminar = document.getElementById('btnVPremEliminar');
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento


    if (btnVPremEliminar){
        btnVPremEliminar.addEventListener('click',()=>{
            //Muestro la ventana Buscar
            VPrincipal.style.display="block";
            //Oculto la ventana Canje
            vPremios.style.display="none";
        })
    }
    
})