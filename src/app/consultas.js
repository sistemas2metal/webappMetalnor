import {collection, query, where, getDocs, Timestamp, deleteDoc,doc,addDoc,updateDoc,orderBy, limit } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { db, storage } from './firebase.js'
import {ref, uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js"
//---------------- Función para formatear el objeto Timestamp a una cadena de fecha legible
function formatDate(timestamp) {
    if (timestamp instanceof Timestamp) {
        const date = timestamp.toDate(); // Convertir el Timestamp a un objeto Date de JavaScript
        return date.toLocaleDateString(); // Formatear la fecha y hora como una cadena
    }
    return ''; // En caso de que no sea un Timestamp válido, devolver una cadena vacía
}
//---------------------OBTIENE LOS USUARIOS POR EL NOMBRE O EL DNI----------------------------------------------------------------
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
//-----------------OBTIENE UN ARRAY CON TODOS LOS PREMIOS-------------------------------------------------------------------------
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
//------------------OBTIENE EL PREMIO A PARTIR DEL ID DE PREMIO-------------------------------------------------------------------
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
// -------------Obtiene los puntos de cada usuario CONOCIENDO EL IDCLIENTE -------------------------------------------------------
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
//----------------------CONSULTA PARA OBTENER EL USUARIO POR EL ID ---------------------------------------------------------------
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
//----------------------CONSULTA PARA OBTENER LOS PREMIOS ------------------------------------------------------------------------
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
//--------------------CONSULTA PARA OBTENER LAS PUBLICIDADES ---------------------------------------------------------------------
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
//---------------------OBTENER PUBLICIDAD POR EL ID-------------------------------------------------------------------------------
export async function getPublicidadId(id){
    const publicidad = collection(db,"posts");
    const q = query(publicidad,where ("__name__","==",id));
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
        console.error("Error al obtener la publicidad por ID:", error);
    }
}
//--------------------CONSULTA PARA OBTENER LOS PUNTOS DEL USUARIO ---------------------------------------------------------------
export async function getPuntosDelUsuarios(id){
    const puntosRef = collection(db,"puntos");
    const q = query(puntosRef,where("idcliente","==",String(id)));
    try{
        const querySnapshot = await getDocs(q);
    
        const datosArray = querySnapshot.docs.map( doc =>{
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
        return datosArray;
    }catch (error){
        console.error("Error al obtener puntos por ID:", error);
        
    }
}
//--------------------------CONSULTA PARA GUARDAR UN NUEVO CLIENTE----------------------------------------------------------------
export async function agregarCliente(cliente) {
    try {
        const docRef = await addDoc(collection(db, 'usuarios'), cliente);
        console.log('Cliente agregado con ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('Error al agregar cliente:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA EDITAR UN CLIENTE EXISTENTE-------------------------------------------------------------
export async function actualizarCliente(idCliente, clienteActualizado) {
    try {
        const clienteRef = doc(db, 'usuarios', idCliente);
        await updateDoc(clienteRef, clienteActualizado);
        console.log('Cliente actualizado con ID:', idCliente);
        return true;
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA ELIMINAR UN CLIENTE --------------------------------------------------------------------
export async function eliminarUsuario(idCliente) { // Función para eliminar un usuario por su idcliente
    try {
        await deleteDoc(doc(db, 'usuarios', idCliente));
        console.log('Usuario eliminado correctamente');
        return true;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA GUARDAR PUNTOS -------------------------------------------------------------------------
export async function agregarPuntos(puntos) {
    try {
        const docRef = await addDoc(collection(db, 'puntos'), puntos);
        console.log('puntos agregado con ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('Error al agregar puntos:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA EDITAR PUNTOS EXISTENTE-----------------------------------------------------------------
export async function actualizarPuntos(idPunto, puntoActualizado) {
    try {
        const puntosRef = doc(db, 'puntos', idPunto);
        await updateDoc(puntosRef, puntoActualizado);
        console.log('Puntos actualizado con ID:', idPunto);
        return true;
    } catch (error) {
        console.error('Error al actualizar Puntos:', error);
        return false;
    }
}
//--------------------------CONSULTA CANJEAR PUNTOS-------------------------------------------------------------------------------
export async function canjearPuntos(cantidad,idCliente){
    let remainingCantidad = cantidad;
    //mientras cantidad > 0 
    
    while (remainingCantidad > 0) {
        // Buscar los puntos más antiguos
        const puntosQuery = query(
            collection(db, 'puntos'),
            where('idcliente', '==', idCliente),
            orderBy('fecha'),
            limit(1)
        );
        
        const puntosSnapshot = await getDocs(puntosQuery);

        if (puntosSnapshot.empty) {
            console.log('No hay más puntos disponibles para canjear.');
            break;
        }

        for (const puntosDoc of puntosSnapshot.docs) {
            const puntosData = puntosDoc.data();
            const puntosId = puntosDoc.id;
            const puntosCantidad = puntosData.cantidad;

            if (remainingCantidad >= puntosCantidad) {
                // Restar los puntos de la cantidad y eliminar el registro
                remainingCantidad -= puntosCantidad;
                await deleteDoc(doc(db, 'puntos', puntosId));
                console.log(`Se eliminaron ${puntosCantidad} puntos (ID: ${puntosId}).`);
            } else {
                // Restar los puntos de la cantidad y actualizar el registro
                const nuevosPuntosCantidad = puntosCantidad - remainingCantidad;
                await updateDoc(doc(db, 'puntos', puntosId), {
                    cantidad: nuevosPuntosCantidad
                });
                console.log(`Se actualizaron los puntos (ID: ${puntosId}) a ${nuevosPuntosCantidad} puntos.`);
                remainingCantidad = 0;
            }
        }
    }

    if (remainingCantidad > 0) {
        console.log(`No se pudieron canjear ${remainingCantidad} puntos porque no hay suficientes puntos disponibles.`);
    }

}
//--------------------------CONSULTA PARA ELIMINAR PUNTOS POR ID  ----------------------------------------------------------------
export async function eliminarPunto(idPunto) { // Función para eliminar un usuario por su idcliente
    try {
        await deleteDoc(doc(db, 'puntos', idPunto));
        console.log('Puntos eliminado correctamente');
        return true;
    } catch (error) {
        console.error('Error al eliminar Puntos:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA GUARDAR PUBLICIDAD ---------------------------------------------------------------------
export async function agregarPublicidad(publicidad) {
    try {
        const docRef = await addDoc(collection(db, 'posts'), publicidad);
        console.log('publicidad agregado con ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('Error al agregar publicidad:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA EDITAR PUBLICIDAD EXISTENTE-------------------------------------------------------------
export async function actualizarPublicidad(idPublicidad, publicidadActualizado) {
    try {
        const publicidadRef = doc(db, 'posts', idPublicidad);
        await updateDoc(publicidadRef, publicidadActualizado);
        console.log('Publicidad actualizado con ID:', idPublicidad);
        return true;
    } catch (error) {
        console.error('Error al actualizar Publicidad:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA ELIMINAR PUBLICIDAD --------------------------------------------------------------------
export async function eliminarPublicidad(idPublicidad) {
    try {
        await deleteDoc(doc(db, 'posts', idPublicidad));
        console.log('Publicidad eliminada correctamente');
        return true;
    } catch (error) {
        console.error('Error al eliminar publicidad:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA GUARDAR PREMIOS ------------------------------------------------------------------------
export async function agregarPremios(premios) {
    try {
        const docRef = await addDoc(collection(db, 'premios'), premios);
        console.log('premios agregado con ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('Error al agregar premios:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA EDITAR PREMIO EXISTENTE ----------------------------------------------------------------
export async function actualizarPremios(idPremio, premioActualizado) {
    try {
        const premiosRef = doc(db, 'premios', idPremio);
        await updateDoc(premiosRef, premioActualizado);
        console.log('Premio actualizado con ID:', idPremio);
        return true;
    } catch (error) {
        console.error('Error al actualizar Premio:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA ELIMINAR PREMIO ------------------------------------------------------------------------
export async function eliminarPremio(idPremio) {
    try {
        await deleteDoc(doc(db, 'premios', idPremio));
        console.log('Premio eliminado correctamente');
        return true;
    } catch (error) {
        console.error('Error al eliminar premio:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA GUARDAR PROMOCION ----------------------------------------------------------------------
export async function agregarPromocion(promocion) {
    try {
        const docRef = await addDoc(collection(db, 'Promociones'), promocion);
        console.log('promocion agregado con ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('Error al agregar promocion:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA EDITAR UNA PROMOCION EXISTENE ----------------------------------------------------------
export async function actualizarPromocion(idPromocion, promocionesActualizado) {
    try {
        const promocionRef = doc(db, 'Promociones', idPromocion);
        await updateDoc(promocionRef, promocionesActualizado);
        console.log('Promocion actualizado con ID:', idPromocion);
        return true;
    } catch (error) {
        console.error('Error al actualizar Promocion:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA ELIMINAR PROMOCION ---------------------------------------------------------------------
export async function eliminarPromocion(idPromocion) {
    try {
        await deleteDoc(doc(db, 'Promociones', idPromocion));
        console.log('Promocion eliminado correctamente');
        return true;
    } catch (error) {
        console.error('Error al eliminar Promocion:', error);
        return false;
    }
}
//--------------------------CONSULTA PARA GUARDAR EN AUDITORIA -------------------------------------------------------------------
export async function agregarAuditoria(auditoria) {
    try {
        const docRef = await addDoc(collection(db, 'auditoria'), auditoria);
        console.log('auditoria agregado con ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('Error al agregar auditoria:', error);
        return false;
    }
}
//---------------------------CARGAR ARCHIVO---------------------------------------------------------------------------------------
export const cargarArchivo = async ({file})=>{
    // 1 Referencia al espacio en el bucket donde estarà el archivo
    console.log(file);
    const storageRef = ref(storage, '/imagenes/' + file.name);
    // 2 Subir el archivo
    try{
        const image = await uploadBytes(storageRef,file)
        const url = await getDownloadURL(image.ref)
        return url;
    // 3 Retornar la refernecia
    }catch (error){
        console.log(error);
    }
    
}
//--------------------------CONSULTAR AUDITORIA ----------------------------------------------------------------------------------