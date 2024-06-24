


const clientesModal = document.querySelector("#ClientesCRUDModal")   //esta es la ventana
const formClientes = document.querySelector("#btn-editar")        //constante para capturar el evento click de edit

formClientes.addEventListener("click", e =>{                              //capturo el evento click del boton edit
    e.preventDefault()
    //const nombre= formClientes['crud-nombre'].value ;
    //const email = formClientes['crud-email'].value;
try {
        console.log('estoy aqui')
        const clientesModal = document.querySelector('#ClientesCRUDModal');
        const modal = bootstrap.Modal.getInstance(clientesModal);
        modal.hide();
} catch (error) {
    
}
}); 