document.addEventListener("DOMContentLoaded", () => {
    const btnDatos = document.getElementById("btn-datos");
    const VBuscar = document.getElementById("VentanaBuscar");
    const ABMClientes = document.getElementById("abmClientes");
    const vCanje = document.getElementById('ventanaCanje');
    const btnCanje = document.getElementById('btn-canje');

    if (btnDatos) {
        btnDatos.addEventListener('click', () => {
            console.log('Botón datos presionado');
            // Busco si se hizo una selección 
            // Si se hizo oculto la VentanaBuscar
            VBuscar.style.display = "none";
            // Muestro la ventana ABMClientes
            ABMClientes.style.display = "block";

        })
    if (btnCanje){
            btnCanje.addEventListener('click',()=>{
                //Oculto la ventana Buscar
                VBuscar.style.display="none";
                //Muestro la ventana Canje
                vCanje.style.display="block";
            })
        }
    };
});