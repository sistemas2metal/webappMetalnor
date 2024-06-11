
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value
    console.log(email, password)
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredentials)
        // cierra el modal de signupModal
        const signupModal = document.querySelector('#signupModal')
        const modal = bootstrap.Modal.getInstance(signupModal)
        modal.hide()

        showMessage('Bienvenido!!! ' + userCredentials.user.email,'')

    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showMessage('El correo ingresado ya existe','alert')
        } else if (error.code === 'auth/invalid-email') {
            showMessage('Correo invalido','alert')
        } else if (error.code === 'auth/weak-password') {
            showMessage('contraseña demasiado débil','alert')
        } else showMessage('Algo estuvo mal codigo de error: ' + error.code,'alert')
    }

})
