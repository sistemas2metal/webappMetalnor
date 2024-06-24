import {collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { db } from './firebase.js'



 /*    // Define la función asíncrona para obtener los datos y convertirlos a JSON
export async function getUsuariosPorNombre(formObject) {
    const usuarios = collection(db, "usuarios");
    let q,nombre,email,cel,dni,consulta
    consulta = ''
    for (let key in formObject){
        console.log(`${key}: ${formObject[key]}`);
        if (formObject[key] !== ''){
            q = query`where("${key}", "==","${formObject[key]}"),`
        }
        console.log(consulta.slice(0,-1));
    }
    q = query(usuarios, consulta);    
    console.log(q);
    q = query(usuarios,where)
    const querySnapshot = await getDocs(q);
    // Convierte el querySnapshot a un array de objetos
    const usuariosArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return usuariosArray; // Retorna el array de objetos como JSON */
/*} */

export async function getUsuariosPorNombre(formObject) {
    const usuarios = collection(db, "usuarios");
    let q = query(usuarios); // Inicializa la consulta con la colección 'usuarios'
    // Itera sobre las claves del objeto del formulario
    for (let key in formObject) {
        if (formObject[key] !== '') { // Si el valor no está vacío
            q = query(q, where(key, '>=', formObject[key])); // Añado la condición 'where' a la consulta
        }
    }
    q = query(usuarios, consulta);
    const querySnapshot = await getDocs(q);
    // Convierte el querySnapshot a un array de objetos
    const usuariosArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return usuariosArray; // Retorna el array de objetos como JSON
}

export async function getPremios() {
    const premios = collection(db, "premios");
    const querySnapshot = await getDocs(premios);
    //console.log(querySnapshot)
    const premiosArray = querySnapshot.docs.map (doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return premiosArray;
}

export async function getPremioId(id){
    const premios = collection(db,"premios");
    const q = query(premios,where ("__name__","==",id));
    try{
        const querySnapshot = await getDocs(q);
        const datosArray = querySnapshot.docs.map( doc =>{
            return {
                id: doc.id,
                ...doc.data() 
            };
        });
        return datosArray;
    } catch (error) {
        console.error("Error al obtener premio por ID:", error);
        throw error; // opcional: relanzar el error para manejarlo en otro lugar
    }
}

