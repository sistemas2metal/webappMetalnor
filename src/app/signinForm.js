import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import {showMessage} from "./showMessage.js"
import { auth } from "./firebase.js";
document.addEventListener("DOMContentLoaded",function(){    
    const signInForm = document.querySelector('#login-form');
    if (signInForm){
        signInForm.addEventListener('submit', async e => {
            e.preventDefault()

            const email= signInForm['login-email'].value;
            const password = signInForm['login-password'].value;

            try{
                const Credentials = await signInWithEmailAndPassword(auth,email,password)
                console.log(Credentials)
                const modal= bootstrap.Modal.getInstance(document.querySelector('#signinModal'))
                modal.hide()
                showMessage('Bienvenido!!! '+ Credentials.user.email,'')
            }catch (error){
                if (error.code === 'auth/wrong-password'){
                    showMessage('Password incorrecto','alert')
                }else if (error.code === 'auth/user-not-found'){
                    showMessage('Usuario no esta registrado','alert')
                } else if (error.code === 'auth/invalid-credential'){
                    showMessage('Credenciales inválidas!','alert')
                } else showMessage('Algo estuvo mal codigo de error: ' + error.code,'alert')
            }
        })
    }
})