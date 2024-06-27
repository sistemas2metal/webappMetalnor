document.addEventListener('DOMContentLoaded',function (){

    const Aceptar = document.getElementById('btnVClienteAceptar');
    const Cancelar = document.getElementById('btnVClienteCancelar');
    const Editar = document.getElementById('btnVClienteEditar');
    
    const vAbmCliente= document.getElementById('abmClientes');
    const VBuscar = document.getElementById('VentanaBuscar');
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
            console.log('click en aceptar')
            //Ocultar Ventana abmClientes
            vAbmCliente.style.display="none";
            //Mostrar ventana Buscar
            VBuscar.style.display="block";
        })
    }
    if (Editar){
        //Habilitar todos los controles
    }
})