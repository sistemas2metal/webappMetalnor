import { eliminarPremio, actualizarPremios, agregarPremios, getPremioId } from './consultas.js';
import { updateTablaPremios } from './updates.js';

document.addEventListener('DOMContentLoaded', () => {
    const vPremios = document.getElementById('ventanaPremios');
    const btnEliminarPremio = document.getElementById('btnVPremioEliminar');
    const btnVPremioEditar = document.getElementById('btnVPremioEditar');
    const btnVPremioAgregar = document.getElementById('btnVPremioAgregar');
    const VPrincipal = document.getElementById('ventanaPrincipal');
    let modalPremios;
    const modalElement2 = document.getElementById('abmPremios');
    modalPremios = new bootstrap.Modal(modalElement2);
    const previewImagen = document.getElementById('previewImagen');
    
    async function cargarDatosPremio(id) {
        const premio = await getPremioId(id);
        if (premio) {
            document.getElementById('inputTitulo').value = premio[0].nombre;
            document.getElementById('inputDetalle').value = premio[0].descripcion;
            document.getElementById('inputPuntos').value = premio[0].puntos;
            document.getElementById('inputStock').value = premio[0].stock;
            previewImagen.src = premio[0].imagen;
        }
    }

    window.radioClickedPremios = function (radio) {
        idPremio.value = radio.value;
        console.log(idPremio.value);
    }

    if (btnVPremioAgregar) {
        btnVPremioAgregar.addEventListener('click', async () => {
            document.getElementById('inputTitulo').value = '';
            document.getElementById('inputDetalle').value = '';
            document.getElementById('inputPuntos').value = '';
            document.getElementById('inputStock').value = '';
            document.getElementById('inputImagen').value = '';
            previewImagen.src = '';  // Limpia la vista previa de la imagen
            console.log('mostrar modal');
            idPremio.value = '';
            modalPremios.show();
        });
    }

    if (btnVPremioEditar) {
        btnVPremioEditar.addEventListener('click', async () => {
            console.log(idPremio.value);
            cargarDatosPremio(idPremio.value);
            modalPremios.show();
        });
    }

    if (btnPremioEliminar) {
        btnPremioEliminar.addEventListener('click', async () => {
            if (idPremio.value !== '') {
                const confirmacion = confirm('¿Desea eliminar el premio con Id ' + idPremio.value + '?');
                if (confirmacion) {
                    const estado = await eliminarPremio(idPremio.value);
                    if (estado) {
                        console.log('El premio se eliminó correctamente');
                        updateTablaPremios();
                    } else {
                        console.log('Hubo un error al eliminar el premio');
                    }
                }
            } else {
                console.log('No seleccionó ningún premio');
            }
        });
    }
// en Modal ABM Premios 
    if (btnPremiosAceptar) {
        
        btnPremiosAceptar.addEventListener('click', async () => {
            const inputTitulo = document.getElementById('inputTitulo').value;
            const inputDetalle = document.getElementById('inputDetalle').value;
            const inputPuntos = document.getElementById('inputPuntos').value;
            const inputStock = document.getElementById('inputStock').value;
            const inputImagen = document.getElementById('inputImagen').files[0];
            
            const premios = {
                descripcion: inputDetalle,
                nombre: inputTitulo,
                puntos: parseInt(inputPuntos, 10),
                stock: parseInt(inputStock, 10),
                imagen: './image/'+inputImagen.name
            };
            
            if (idPremio.value !== '') {                           //si seleccione un item entonces Edito
                console.log('Metodo Editar Premio');
                if (inputTitulo && inputDetalle && inputPuntos && inputStock) {   //controlo que se hallan cargado los datos
                    const premioActualizado = {
                        ...premios
                    };
                    const estado = await actualizarPremios(idPremio.value, premioActualizado);
                    if (estado) {
                        console.log('Premio actualizado correctamente');
                        updateTablaPremios();
                        modalPremios.hide();
                    } else {
                        console.log('Hubo un error al actualizar el cliente');
                    }
                } else {
                    console.log('Por favor, completa todos los campos');
                }
            } else {
                console.log('Metodo Agregar');
                if (inputTitulo && inputDetalle && inputPuntos && inputStock && inputImagen) {
                    const premioNuevo = {
                        descripcion: inputDetalle,
                        imagen: `./image/`+inputImagen.name,
                        nombre: inputTitulo,
                        puntos: parseInt(inputPuntos, 10),
                        stock: parseInt(inputStock, 10)
                    };
                    const estado = await agregarPremios(premioNuevo);
                    if (estado) {
                        console.log('Premio agregado correctamente');
                        updateTablaPremios();
                        modalPremios.hide();
                    } else {
                        console.log('Hubo un error al agregar el premio');
                    }
                } else {
                    console.log('Por favor, completa todos los campos');
                }
            }
        });
    }
});
