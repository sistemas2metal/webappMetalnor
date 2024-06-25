import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import {getDocs, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
//import {getDocs, collection } from "./app/firebase.js"

import { auth, db } from './app/firebase.js'
import { loginCheck} from './app/loginCheck.js'
//import {setupPosts} from './app/recicled/postList.js'
import './app/loginCheck.js'
import './app/signupForm.js'
import './app/logout.js'

import './app/signinForm.js'
import './app/googleLogin.js'
import './app/menuPrincipal.js'
import './app/ventanaBuscar.js'
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
window.idcliente = '';   // variable en donde guardo el cliente seleccionado

onAuthStateChanged(auth, async (user) => {
    if (user) {
        //const querySnapshot = await getDocs(collection(db, 'posts'))
        //setupPosts(querySnapshot.docs)
        
    } else {
        //setupPosts([])
    }

    
    loginCheck(user)

})


