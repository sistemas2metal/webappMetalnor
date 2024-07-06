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
    vPremios.style.display="none";  //llevo a la ventana principal
    vCanje.style.display="none";  //llevo a la ventana principal
    VBuscar.style.display="none";  //llevo a la ventana principal
    ABMClientes.style.display="none";  //llevo a la ventana principal
    VHistoricoP.style.display="none";  //llevo a la ventana principal
    vPublicidad.style.display="none";  //llevo a la ventana principal

    btnPrinClientes.disabled = true;  //desactivo todos los botones
    btnPrinPremios.disabled = true;
    btnPrinPublicidad.disabled = true;

})