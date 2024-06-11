const mostrarUsuarios= document.querySelector('.selectorUsuario')                     //selecciono el elemento al cual tengo que modificar 
                                                                                      //para agregar el resultado de la consulta

                                                         // esta función incorpora cada opción en el objeto selecionado con mostrarUsuarios
export const setupUsuarios = (data) => {      
    if (data.length){                                                                  //si llega algo por data 
        let html=''
        data.forEach(doc => {                                                          // para cada dato que llega en data
            const usuario = doc.data()                                                 // obtengo el primer registro
            const option = `<option value="${usuario.id}">${usuario.nombre}</option>`  //armo el tag <option></option>
            html += option                                                             //agrego uno a uno los <options>
        });
        mostrarUsuarios.innerHTML = html                      
    }else{                                                                             // o esta vacío 

    }
} 


