
export function updateTable(usuarios) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos

    usuarios.forEach((usuario, index) => {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = index + 1;
        tr.appendChild(th);

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
        tdDni.textContent = usuario.id;
        tr.appendChild(tdDni);

        tbody.appendChild(tr);
    });
}

/* export function updateTablaPremios(premios) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos

    premios.forEach((usuario, index) => {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = index + 1;
        tr.appendChild(th);

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
        tdDni.textContent = usuario.id;
        tr.appendChild(tdDni);

        tbody.appendChild(tr);
    });
} */