const mostrarUsuarios= document.getElementById('imputPrueba')                     //selecciono el elemento al cual tengo que modificar 
                                                                                      //para agregar el resultado de la consulta
mostrarUsuarios.addEventListener('input', debounce(handleInput,300));


function handleInput(event){
    const query = event.target.value.trim();
    console.log('Buscando:',query)
}

function debounce(func,delay){
    let timeout;
    return function (...args){
        clearTimeout(timeout);
        timeout = setTimeout( () => func.apply(this,args), delay );
    };
}