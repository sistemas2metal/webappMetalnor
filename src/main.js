import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import {getDocs, collection} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import {ref, uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js"
//import {getDocs, collection } from "./app/firebase.js"
//import { getStorage } from "firebase/storage";
import { auth, db,storage} from './app/firebase.js'
import { loginCheck} from './app/loginCheck.js'
//import {setupPosts} from './app/recicled/postList.js'
import './app/loginCheck.js'
import './app/signupForm.js'
import './app/logout.js'

import './app/signinForm.js'
import './app/googleLogin.js'
import './app/menuPrincipal.js'
//import './app/ventanaBuscar.js'
import './app/ventanabuscar.js'
import './app/ventanaABMCliente.js'
import './app/ventanaCanje.js'
import './app/ventanaPremios.js'
import './app/ventanaPublicidad.js'

//import './app/clientesCRUD.js'

//------------------------------------------importaciones de objetos de la ventana principal-----------------------
//import './app/eventos.js'
//import './app/selectNombre.js'
//import './app/mostrarUsuarios.js'
//-----------------------------------------------------------------------------------------------------------------
var idcliente
var idPremio
var idPublicidad
var idPunto
var barrConsola

idcliente = document.getElementById('idcliente');
idPremio = document.querySelector('#idPremio');
idPublicidad = document.getElementById('idPublicidad');
idPunto = document.getElementById('idPunto');
//barrConsola = document.getElementById('barConsola'); //Variable de barra superior


window.radioClickedPublicidad = function (radio){
        idPublicidad.value = radio.value;
        console.log(idPublicidad.value);
}

window.radioClickedHistorico = function (radio){
        idPunto.value = radio.value;
        console.log(idPunto.value);
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        //const querySnapshot = await getDocs(collection(db, 'posts'))
        //setupPosts(querySnapshot.docs)
        
    } else {
        //setupPosts([])
    }

    
    loginCheck(user)

})

// document.addEventListener('DOMContentLoaded',()=>{


// const uploadFile = async ({file})=>{
//     // 1 Referencia al espacio en el bucket donde estarà el archivo
//     const storageRef = ref(storage, '/imagenes/' + file.name);
//     // 2 Subir el archivo
//     try{
//         const image = await uploadBytes(storageRef,file)
//         const url = await getDownloadURL(image.ref)
//         return url;
//     // 3 Retornar la refernecia
//     }catch (error){
//         console.log(error);
//     }
    
// }

// let form = document.querySelector("#uploader");
// form.addEventListener("submit", async (ev)=>{
//     ev.preventDefault();

//     let fileInput = form.querySelector("#file");
//     let file = fileInput.files[0];
//     const url = await uploadFile()
// });
// });