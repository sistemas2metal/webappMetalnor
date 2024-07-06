import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMessage } from "./showMessage.js"

const logout = document.querySelector('#logout')
const VPrincipal= document.getElementById('ventanaPrincipal'); 
const vPremios = document.getElementById('ventanaPremios');
const vCanje = document.getElementById('ventanaCanje');
const VBuscar = document.getElementById('VentanaBuscar');
const ABMClientes = document.getElementById("abmClientes");
const VHistoricoP = document.getElementById("ventanaHistoricoP");


const vPublicidad = document.getElementById('ventanaPublicidad');
logout.addEventListener('click',async ()=>{
    await signOut(auth)
    showMessage('Adios!!!','');
    
    VPrincipal.style.display="block";  //llevo a la ventana principal
    vPremios.style.display="none";  // Oculto la ventana Premios
    vCanje.style.display="none";  //Oculta la ventana Canje
    VBuscar.style.display="none";  //Oculta la ventana Buscar
    ABMClientes.style.display="none";  //Oculta la ventana Clientes
    VHistoricoP.style.display="none";  //Oculta la ventana Historico
    vPublicidad.style.display="none";  //Oculta la ventana Publicidad

    btnPrinClientes.disabled = true;  //desactivo todos los botones
    btnPrinPremios.disabled = true;
    btnPrinPublicidad.disabled = true;

})