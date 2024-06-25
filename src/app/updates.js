

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