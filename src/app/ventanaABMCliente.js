document.addEventListener('DOMContentLoaded',function (){

    const Aceptar = document.getElementById('btnVClienteAceptar');
    const VBuscar = document.getElementById('VentanaBuscar');
    const vAbmCliente= document.getElementById('abmClientes');
    
    if (Aceptar){
        Aceptar.addEventListener("click",()=>{
            console.log('click en aceptar')
            //Ocultar Ventana abmClientes
            vAbmCliente.style.display="none";
            //Mostrar ventana Buscar
            VBuscar.style.display="block";
        })
    }

})