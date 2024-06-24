import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

document.addEventListener('DOMContentLoaded',function(){
    const googleButton = document.querySelector('#googleLogin')
    if (googleButton){
        googleButton.addEventListener('click', async () => {

            const provider = new GoogleAuthProvider()

            try {
                const credentials = await signInWithPopup(auth, provider)
                console.log(credentials)
                const modal = bootstrap.Modal.getInstance(document.querySelector('#signinModal'))
                modal.hide()

                showMessage('Bienvenido!!!' + credentials.user.displayName, '')

            } catch (error) {
                console.log(error.code)
            }
        
        })
    }
})