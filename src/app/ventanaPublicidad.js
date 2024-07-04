import {actualizarPublicidad, eliminarPublicidad, agregarPublicidad,getPublicidadId} from './consultas.js'
import { updateTablaPublicidad} from './updates.js';

document.addEventListener('DOMContentLoaded',()=>{

    const vPublicidad = document.getElementById('ventanaPublicidad');
    const btnEliminarPublicidad = document.getElementById('btnVPubEliminar');
    const btnVPubAgregar = document.getElementById('btnVPubAgregar');
    const btnVPubEditar = document.getElementById('btnVPubEditar');

    const btnAceptarPublicidad = document.getElementById('btnAceptarPublicidad');  //botón en ABMPublicidad
    const VPrincipal= document.getElementById('ventanaPrincipal');   //busco el elemento
    const modalElement3 = document.getElementById('abmPublicidad');
    const modalPublicidad = new bootstrap.Modal(modalElement3);
    //const previewImagen = document.getElementById('previewImagen');
    
    async function cargarDatosPublicidad(id) {
        const publicidad = await getPublicidadId(id);
        if (publicidad) {
            document.getElementById('iPubTitulo').value = publicidad[0].titulo;
            document.getElementById('iPubDescripcion').value = publicidad[0].descripcion;
            document.getElementById('iPubDesde').value = publicidad[0].desde;
            document.getElementById('iPubHasta').value = publicidad[0].hasta;
            //previewImagen.src = premio[0].imagen;
        }
    }

    if (btnEliminarPublicidad) {
        btnEliminarPublicidad.addEventListener('click', async () => {
            const idPublicidad = document.querySelector('#idPublicidad').value;

            if (idPublicidad !== '') {
                const confirmacion = confirm('¿Desea eliminar la publicidad con Id ' + idPublicidad + '?');

                if (confirmacion) {
                    const estado = await eliminarPublicidad(idPublicidad);
                    if (estado) {
                        console.log('La publicidad se eliminó correctamente');
                        updateTablaPublicidad();
                    } else {
                        console.log('Hubo un error al eliminar la publicidad');
                    }
                }
            } else {
                alert('Debe seleccionar una publicidad');
                console.log('No seleccionó ninguna publicidad');
            }
        });
    }
    if (btnVPubEditar) {
        btnVPubEditar.addEventListener('click', async () => {
            console.log(idPublicidad.value);
            cargarDatosPublicidad(idPublicidad.value);
            modalPublicidad.show();
        });
    }
    if (btnVPubAgregar) {
        btnVPubAgregar.addEventListener('click', async () => {
            document.getElementById('iPubTitulo').value='';
            document.getElementById('iPubDescripcion').value='';
            document.getElementById('iPubDesde').value='';
            document.getElementById('iPubHasta').value='';
            document.getElementById('iPubImagen').value='';
            //previewImagen.src = '';  // Limpia la vista previa de la imagen
            console.log('mostrar modal');
            console.log(idPublicidad.value);
            idPublicidad.value = '';
            console.log(idPublicidad.value);
            modalPublicidad.show();
        });
    }
    // en Modal ABM Premios 
    if (btnAceptarPublicidad) {
        
        btnAceptarPublicidad.addEventListener('click', async () => {
            const inputTitulo = document.getElementById('iPubTitulo').value;
            const inputDescripcion = document.getElementById('iPubDescripcion').value;
            const inputDesde = document.getElementById('iPubDesde').value;
            const inputHasta = document.getElementById('iPubHasta').value;
            const inputImagen = document.getElementById('iPubImagen').files[0];
            
            const publicidad = {
                titulo: inputTitulo,
                descripcion: inputDescripcion,
                desde: inputDesde,
                hasta: inputHasta,
                imagen: './image/' + inputImagen.name
            };
            
            if (idPublicidad.value !== '') {                           //si seleccione un item entonces Edito
                console.log('Metodo Editar Premio');
                if (inputTitulo && inputDescripcion && inputDesde && inputHasta) {   //controlo que se hallan cargado los datos
                    const publicidadActualizado = {
                        ...publicidad
                    };
                    const estado = await actualizarPublicidad(idPublicidad.value, publicidadActualizado);
                    if (estado) {
                        console.log('Publicidad actualizada correctamente');
                        updateTablaPublicidad();
                        modalPublicidad.hide();
                    } else {
                        console.log('Hubo un error al actualizar la publicidad');
                    }
                } else {
                    console.log('Por favor, completa todos los campos');
                }
            } else {
                console.log('Metodo Agregar');
                if (inputTitulo && inputDescripcion && inputDesde && inputHasta && inputImagen) {   //controlo que se hallan cargado los datos
                    const publicidadNuevo = {
                        titulo: inputTitulo,
                        descripcion: inputDescripcion,
                        desde: inputDesde,
                        hasta: inputHasta,
                        imagen: `./image/`+inputImagen.name,
                    };
                    const estado = await agregarPublicidad(publicidadNuevo);
                    if (estado) {
                        console.log('Publicidad agregada correctamente');
                        updateTablaPublicidad();
                        modalPublicidad.hide();
                    } else {
                        console.log('Hubo un error al agregar el premio');
                    }
                } else {
                    console.log('Por favor, completa todos los campos');
                }
            }
        });
    }
})