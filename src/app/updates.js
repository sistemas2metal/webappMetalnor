
import {getPremios,getPublicidad} from './consultas.js'
//------------------------------------ACTUALIZA LA TABLA DE BUSQUEDA--------------------------
export function updateTable(usuarios) {
    const tbody = document.getElementById('tClientestbody');
    tbody.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos
    
    usuarios.forEach((usuario) => {
        const tr = document.createElement('tr');

        const tdCheck = document.createElement('td');
        tdCheck.innerHTML = '<input class="form-check-input" type="radio" name="flexRadioDefault" value="'+usuario.id+'" id="flexRadioDefault1" onclick="radioClicked(this)">'
        tr.appendChild(tdCheck);

        const tdNombre = document.createElement('td');
        tdNombre.textContent = usuario.nombre;
        tr.appendChild(tdNombre);

        const tdEmail = document.createElement('td');
        tdEmail.textContent = usuario.email;
        tr.appendChild(tdEmail);

        const tdCel = document.createElement('td');
        tdCel.textContent = usuario.cel;
        tr.appendChild(tdCel);

        const tdDni = document.createElement('td');
        tdDni.textContent = usuario.dni;
        tr.appendChild(tdDni);

        const tdPuntos = document.createElement('td');
        tdPuntos.textContent = usuario.puntos; 
        tr.appendChild(tdPuntos);

        tbody.appendChild(tr);
    });
}
//---------------------------------- ACTUALIZA LA TABLA PREMIOS -------------------------------
export async function updateTablaPremios() {
    const tbody = document.getElementById('tPremios');
    const premios = await getPremios(); 
    tbody.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos

    premios.forEach((premio) => {
        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = premio.nombre;
        tr.appendChild(tdNombre);

        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = premio.descripcion;
        tr.appendChild(tdDescripcion);

        const tdPuntos = document.createElement('td');
        tdPuntos.textContent = premio.puntos;
        tr.appendChild(tdPuntos);

        const tdStock = document.createElement('td');
        tdStock.textContent = premio.stock;
        tr.appendChild(tdStock);

        tbody.appendChild(tr);
    });
} 
//---------------------------------- ACTUALIZA LA TABLA PUBLICIDAD ----------------------------
export async function updateTablaPublicidad() {
    const tbody = document.getElementById('tPublicidad');
    const publicidades = await getPublicidad();
    tbody.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos

    publicidades.forEach((publicidad) => {
        const tr = document.createElement('tr');

        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = publicidad.titulo;
        tr.appendChild(tdTitulo);

        const tdContenido = document.createElement('td');
        tdContenido.textContent = publicidad.contenido;
        tr.appendChild(tdContenido);

        const tdDesde = document.createElement('td');
        tdDesde.textContent = publicidad.desde;
        tr.appendChild(tdDesde);

        const tdHasta = document.createElement('td');
        tdHasta.textContent = publicidad.hasta;
        tr.appendChild(tdHasta);

        tbody.appendChild(tr);
    });
} 
//---------------------------------- ACTUALIZA LA TABLA HISTORICO ----------------------------
export function updateTablaHistoricoP(puntos) {
    const tbody = document.getElementById('tHistoricoP');
    tbody.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos
    console.log(puntos);
    puntos.forEach((punto) => {
        const tr = document.createElement('tr');

        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = punto.cantidad;
        tr.appendChild(tdCantidad);

        const tdfecha = document.createElement('td');
        tdfecha.textContent = punto.fecha;
        tr.appendChild(tdfecha);

        const tdFechaVen = document.createElement('td');
        tdFechaVen.textContent = punto.fechaVen;
        tr.appendChild(tdFechaVen);

        tbody.appendChild(tr);
    });
} 