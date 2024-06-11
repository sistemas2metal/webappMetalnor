const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')


export const loginCheck = user => {
    if (user) {   // si el usuario existe 
        loggedOutLinks.forEach( link => link.style.display = 'none')  //coloca todos los enlaces que no se deverían ver en none 
        loggedInLinks.forEach( link => link.style.display = 'block')  //coloco todos los enlaces que tienen que verse 
    }else{       // si no existe el usuario 
        loggedOutLinks.forEach( link => link.style.display = 'block' ) //muestra los link que tienen que verse cuando no esta logueado
        loggedInLinks.forEach( link => link.style.display  = 'none')  // oculto todos los enlaces que no se deben ver
    }
}