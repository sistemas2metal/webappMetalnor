import {collection, query, where, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { db } from './firebase.js'

//---------------- Función para formatear el objeto Timestamp a una cadena de fecha legible
function formatDate(timestamp) {
    if (timestamp instanceof Timestamp) {
        const date = timestamp.toDate(); // Convertir el Timestamp a un objeto Date de JavaScript
        return date.toLocaleDateString(); // Formatear la fecha y hora como una cadena
    }
    return ''; // En caso de que no sea un Timestamp válido, devolver una cadena vacía
}
//---------------------OBTIENE LOS USUARIOS POR EL NOMBRE O EL DNI-------------------------
export async function getUsuariosPorNombre(nombre,dni) {
    const usuarios = collection(db, "usuarios");
    let q,consulta
    if (nombre === ''){
        if (dni === ''){
            //console.log('nombre vacio y dni vacío')
            return [];
        }else{
            //console.log('nombre vacìo y dni '+dni);
            q = query(usuarios,where ("dni","==",parseInt(dni, 10)));
        }
    }else { 
        if (dni === ''){
            //console.log('nombre lleno y dni vacio');
            q = query(usuarios,where ("nombre",">=",nombre));
        }else {
            //console.log('nombre lleno y dni lleno');
            q = query(usuarios,where ("nombre",">=",nombre),where("dni","==",parseInt(dni, 10)));
            
        }
    }
    //console.log(q)
    const querySnapshot = await getDocs(q);
    // Convierte el querySnapshot a un array de objetos
    const usuariosArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    //console.log(usuariosArray);
    return usuariosArray; // Retorna el array de objetos como JSON
}
//-----------------OBTIENE UN ARRAY CON TODOS LOS PREMIOS-------------------------
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
//------------------OBTIENE EL PREMIO A PARTIR DEL ID DE PREMIO
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
    }
}
// -------------Obtiene los puntos de cada usuario CONOCIENDO EL IDCLIENTE 
export async function getPuntosUsuarios(id){
    const puntosRef = collection(db,"puntos");
    const q = query(puntosRef,where("idcliente","==",String(id)));
    try{
        const querySnapshot = await getDocs(q);
    
        const datosArray = querySnapshot.docs.map( doc =>{
            return{
                id: doc.id,
                ...doc.data()
            };
        });
        //console.log(datosArray);
        let puntos = 0;
        datosArray.forEach(punto =>{
            puntos += parseInt(punto.cantidad,10);
        });
        return puntos;
    }catch (error){
        console.error("Error al obtener puntos por ID:", error);
        
    }
}
//----------------------CONSULTA PARA OBTENER EL USUARIO POR EL ID ----------------
export async function getClientesPorId(id){
    const usuariosRef = collection(db,"usuarios");
    const q = query(usuariosRef,where("__name__","==",id))
    try{
        const querySnapshot = await getDocs(q);

        const datosArray = querySnapshot.docs.map (doc=>{
            return{
                id: doc.id,
                ...doc.data()
            };
        });
        return datosArray[0];
    }catch (error) {
        console.error("Error al obtener Clientes por ID:",error);
    }
} 
//----------------------CONSULTA PARA OBTENER LOS PREMIOS ---------------------
export async function getPuntos(){
    try{
        const puntosRef=collection(db,"puntos");
        const querySnapshot= await getDocs(puntosRef);
        const datosArray = querySnapshot.doc.map(doc =>({
                id: doc.id,
                ...doc.data()          
        }));
        return datosArray;
    }catch (error){
        console.log("Error al obtener los Puntos");
    }
}
//--------------------CONSULTA PARA OBTENER LAS PUBLICIDADES -------------------------
export async function getPublicidad() {
    try {
        const publicidad = collection(db, "posts");
        const querySnapshot = await getDocs(publicidad);
        const publicidadArray = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const formattedData = {};

            // Formatear los campos Timestamp a cadenas de fecha
            for (const key in data) {
                if (data[key] instanceof Timestamp) {
                    formattedData[key] = formatDate(data[key]);
                } else {
                    formattedData[key] = data[key];
                }
            }

            return {
                id: doc.id,
                ...formattedData
            };
        });
        return publicidadArray;
    } catch (error) {
        console.log('error!', error);
    }
}
//--------------------CONSULTA PARA OBTENER LOS PUNTOS DEL USUARIO -------------------
export async function getPuntosDelUsuarios(id){
    const puntosRef = collection(db,"puntos");
    const q = query(puntosRef,where("idcliente","==",String(id)));
    try{
        const querySnapshot = await getDocs(q);
    
        const datosArray = querySnapshot.docs.map( doc =>{
            return{
                id: doc.id,
                ...doc.data()
            };
        });
        console.log(datosArray);
        return datosArray;
    }catch (error){
        console.error("Error al obtener puntos por ID:", error);
        
    }
}
