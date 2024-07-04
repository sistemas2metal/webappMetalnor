import { getPremios, getPremioId, getPuntosUsuarios,canjearPuntos } from './consultas.js'

document.addEventListener('DOMContentLoaded', () => {

    const btnCanje = document.getElementById('btnVCanjear');
    const btnCancelar = document.getElementById('btnVCancelar');
    const vCanje = document.getElementById('ventanaCanje');
    const VBuscar = document.getElementById('VentanaBuscar');
    const inpCanDescripcion = document.getElementById('inpCanDescripcion');
    const barrConsola = document.getElementById('barConsola');

    let modal; 

    if (btnCanje) {
        btnCanje.addEventListener('click', async () => {
            const puntosCanje = document.getElementById('inpCanPuntos'); 
            const puntos = await getPuntosUsuarios(idcliente.value);
            if  (puntosCanje.value < puntos){
                console.log(puntosCanje.value < puntos);
                canjearPuntos(puntosCanje.value,idcliente.value);
                vCanje.style.display = "none"; //Oculto la ventana 
                VBuscar.style.display = "block";
                barrConsola.innerHTML = "Módulo Clientes";
            }else{
                alert('No alcanzan los puntos!');
            }
            vCanje.style.display = "none";
            //Muestro la ventana Buscar
            VBuscar.style.display = "block";
            barrConsola.innerHTML = "Módulo Clientes";
            //!!!!!!!!!!!!!!!!Actualizar puntos Falta hacer 
            
            //vCanje.style.display = "none";
        });
    };

    if (btnCancelar) {
        btnCancelar.addEventListener('click', async () => {
            vCanje.style.display = "none";
            //Muestro la ventana Buscar
            VBuscar.style.display = "block";
            barrConsola.innerHTML = "Módulo Clientes";
        });
    }

    if (inpCanDescripcion) {
        inpCanDescripcion.addEventListener('click', () => {
            const modalElement = document.getElementById('selectorPremios');  //selecciono el objeto modal por su id
            modal = new bootstrap.Modal(modalElement);  // Crea una instancia del modal de Bootstrap  
            modal.show();    // Muestra el modal
        });
    };
// --------Función para seleccionar una tarjeta
window.seleccionar = async function (id){    
    //buscar en la base de datos de acuerdo al id 
    try{
        const puntosCanje = document.getElementById('inpCanPuntos'); 
        const descripcionCanje= document.getElementById('inpCanDescripcion');
        const datos = await getPremioId(id);
        //const ventana = document.getElementById('selectorPremios')
        //cargar los datos en los correspondientes campos puntos y descripciòn
        datos.forEach((premio) => {
        puntosCanje.value = premio.puntos;
        descripcionCanje.value = premio.nombre;
        });
        modal.hide();
    }catch (error) {
        console.error("Error al obtener premios:")
    }
}

// -----------Función que muestra todas las tarjetas con premios --------------------------    
async function displayPremios() {
    const premios = await getPremios();
    const cardsContainer = document.getElementById('cardsContainer');
    

    premios.forEach(premio => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <div class="tarjetaPremios">
            <div class="card" style="max-width: 18rem;">
                <div class="card-imagen">   
                    <img src="${premio.imagen}" alt="${premio.nombre} id="imgPremio" class="card-img-top"">
                </div>
                <div class="card-body">
                    <h5 id="tituloPremio">${premio.nombre}</h5>
                    <p id="detallePremio" class="card-text">${premio.descripcion}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <h5 id="cantidadPuntos" class="badge text-bg-warning">${premio.puntos} Puntos</h5>
                    <button type="button" onclick="window.seleccionar('${premio.id}');" class="btn btn-primary ms-auto mb-2">Seleccionar</button>
                    <p>Stock: ${premio.stock}</p>
                </div>
            </div>
        </div>
        `;
    cardsContainer.appendChild(card);
    });
}

    displayPremios();  //muestro los premios


})