// 🔗 Conexión con Firebase
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// 🧹 Función para eliminar todos los documentos duplicados
async function eliminarTodosLosDocumentos() {
  const snapshot = await getDocs(collection(db, "inventarioAlimentos"));
  const promesas = [];
  snapshot.forEach(docSnap => {
    promesas.push(deleteDoc(doc(db, "inventarioAlimentos", docSnap.id)));
  });
  await Promise.all(promesas);
  alert("🧹 Todos los documentos fueron eliminados");
}


// 📌 Referencias a elementos
const formulario = document.getElementById("formulario");
const tabla = document.querySelector("#tabla tbody");
const dbRef = collection(db, "inventarioAlimentos");

// 🔄 Mostrar todos los registros ordenados por ID
async function cargarDatos() {
  tabla.innerHTML = "";
  const q = query(dbRef, orderBy("id"));
  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap => {
    const item = docSnap.data();
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.descripcion}</td>
      <td>${item.udm}</td>
      <td>${item.categoria}</td>
      <td>${item.almacen}</td>
      <td>${item.stock}</td>
      <td>${item.inventario}</td>
      <td>${item.solicitar}</td>
    `;
    tabla.appendChild(fila);
  });
}

// ➕ Agregar nuevo registro (con ID automático)
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    descripcion: document.getElementById("descripcion").value,
    udm: document.getElementById("udm").value,
    categoria: document.getElementById("categoria").value,
    almacen: document.getElementById("almacen").value,
    stock: parseInt(document.getElementById("stock").value),
    inventario: parseInt(document.getElementById("inventario").value),
    solicitar: document.getElementById("solicitar").value
  };

  await addDoc(dbRef, data);
  alert("Agregado exitosamente");
  formulario.reset();
  cargarDatos();
});

// 🔍 Consultar por ID
window.consultarPorID = async () => {
  const id = document.getElementById("id").value.trim();
  if (!id) return alert("Ingrese un ID para consultar.");

  const ref = doc(db, "inventarioAlimentos", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return alert("No se encontró ningún registro con ese ID.");

  const item = snap.data();
  document.getElementById("descripcion").value = item.descripcion;
  document.getElementById("udm").value = item.udm;
  document.getElementById("categoria").value = item.categoria;
  document.getElementById("almacen").value = item.almacen;
  document.getElementById("stock").value = item.stock;
  document.getElementById("inventario").value = item.inventario;
  document.getElementById("solicitar").value = item.solicitar;
};

// ✏️ Actualizar registro
window.actualizar = async () => {
  const id = document.getElementById("id").value.trim();
  if (!id) return alert("Ingrese un ID para actualizar.");

  const ref = doc(db, "inventarioAlimentos", id);
  const data = {
    descripcion: document.getElementById("descripcion").value,
    udm: document.getElementById("udm").value,
    categoria: document.getElementById("categoria").value,
    almacen: document.getElementById("almacen").value,
    stock: parseInt(document.getElementById("stock").value),
    inventario: parseInt(document.getElementById("inventario").value),
    solicitar: document.getElementById("solicitar").value
  };

  await updateDoc(ref, data);
  alert("Actualizado exitosamente");
  formulario.reset();
  cargarDatos();
};

// 🗑️ Eliminar registro
window.eliminar = async () => {
  const id = document.getElementById("id").value.trim();
  if (!id) return alert("Ingrese un ID para eliminar.");

  const ref = doc(db, "inventarioAlimentos", id);
  await deleteDoc(ref);
  alert("Eliminado exitosamente");
  formulario.reset();
  cargarDatos();
};

// 🧩 Carga masiva desde MySQL con IDs personalizados
const datosDesdeMySQL = [
  {
    "id": 1,
    "descripcion": "Aceite de 3.78 lt.",
    "udm": "Botella",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 2,
    "descripcion": "Aceite de 3000 ml",
    "udm": "Botella",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 3,
    "descripcion": "Aceite de 2500 ml",
    "udm": "Botella",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 14,
    "solicitar": "hay suficiente"
  },
  {
    "id": 4,
    "descripcion": "Aceite de 445 ml",
    "udm": "Botella",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 32,
    "solicitar": "hay suficiente"
  },
  {
    "id": 5,
    "descripcion": "Aceite de 18.925L (5 galones)",
    "udm": "Botella",
    "categoria": "golosina",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 6,
    "descripcion": "Arroz 3lb",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 7,
    "descripcion": "Arroz Libra",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 76,
    "solicitar": "hay suficiente"
  },
  {
    "id": 8,
    "descripcion": "Arroz 1kg",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 7,
    "solicitar": "solicitar material"
  },
  {
    "id": 9,
    "descripcion": "Arroz 2300g",
    "udm": "Bosla",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 10,
    "descripcion": "Arroz 2000g",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 11,
    "descripcion": "Arroz 1816g",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 9,
    "solicitar": "hay suficiente"
  },
  {
    "id": 12,
    "descripcion": "arroz 5lbs",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 13,
    "descripcion": "Arroz 4535g",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 14,
    "descripcion": "Arroz granel",
    "udm": "Libras",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 50,
    "inventario": 779,
    "solicitar": "hay suficiente"
  },
  {
    "id": 15,
    "descripcion": "Atun variado",
    "udm": "Latas",
    "categoria": "conservas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 16,
    "descripcion": "Azucar morena 800 gr.",
    "udm": "bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 50,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 17,
    "descripcion": "Azucar blanca 2500g",
    "udm": "Bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": -11,
    "solicitar": "solicitar material"
  },
  {
    "id": 18,
    "descripcion": "Azucar blanca 500g",
    "udm": "Bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 114,
    "solicitar": "hay suficiente"
  },
  {
    "id": 19,
    "descripcion": "Azucar morena 2500g",
    "udm": "Bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 11,
    "inventario": 7,
    "solicitar": "solicitar material"
  },
  {
    "id": 20,
    "descripcion": "Azucar morena 400g",
    "udm": "bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 53,
    "solicitar": "hay suficiente"
  },
  {
    "id": 21,
    "descripcion": "Azucar granel",
    "udm": "libra",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 50,
    "inventario": 833,
    "solicitar": "hay suficiente"
  },
  {
    "id": 22,
    "descripcion": "Barras de frutas 18g",
    "udm": "unidad",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 23,
    "descripcion": "Bienestarina 400 gr.",
    "udm": "Bolsa",
    "categoria": "atoles",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 24,
    "descripcion": "Bolsas de 5lbs",
    "udm": "rollos",
    "categoria": "plasticos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 25,
    "descripcion": "Café de hervir 1 libra",
    "udm": "bolsa",
    "categoria": "café",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 141,
    "solicitar": "hay suficiente"
  },
  {
    "id": 26,
    "descripcion": "Café instantaneo variedad bolsita",
    "udm": "Bolsa",
    "categoria": "café",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 27,
    "descripcion": "Carbon",
    "udm": "bolsa",
    "categoria": "carbon",
    "almacen": "Almacen 1",
    "stock": 3,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 28,
    "descripcion": "Carne Costilla",
    "udm": "Bolsa",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 29,
    "descripcion": "Carne de pollo bolsa de 10lbs",
    "udm": "Bolsa",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 30,
    "descripcion": "Carne molida",
    "udm": "libras",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 31,
    "descripcion": "Carne higado 5.47 libras",
    "udm": "libras",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 32,
    "descripcion": "Carne hueso de pata de res",
    "udm": "libras",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 33,
    "descripcion": "Pezcuezos de Pollo",
    "udm": "libras",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 34,
    "descripcion": "Carne alitas barbacoa 5lb",
    "udm": "bolsas",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 35,
    "descripcion": "Carnes pechuguitas 390g",
    "udm": "caja",
    "categoria": "carnes",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 36,
    "descripcion": "Cereal cork flakes 800g grande",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 37,
    "descripcion": "Cereal variado 300g",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 38,
    "descripcion": "Chile pasa",
    "udm": "unidad",
    "categoria": "especie",
    "almacen": "Almacen 1",
    "stock": 20,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 39,
    "descripcion": "Chile pimiento",
    "udm": "unidad",
    "categoria": "especie",
    "almacen": "Almacen 1",
    "stock": 20,
    "inventario": 111,
    "solicitar": "hay suficiente"
  },
  {
    "id": 40,
    "descripcion": "Chile guaque",
    "udm": "unidad",
    "categoria": "especie",
    "almacen": "Almacen 1",
    "stock": 20,
    "inventario": 143,
    "solicitar": "hay suficiente"
  },
  {
    "id": 41,
    "descripcion": "Chaomein",
    "udm": "bolsa",
    "categoria": "pastas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 42,
    "descripcion": "Arroz con chocolate 400 gr.",
    "udm": "Bolsa",
    "categoria": "atoles",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 43,
    "descripcion": "Compotas bolsita 105 gr.",
    "udm": "bolsa",
    "categoria": "papilla",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 44,
    "descripcion": "Compotas frasco 113g",
    "udm": "frasco",
    "categoria": "papilla",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 45,
    "descripcion": "Canela en raja",
    "udm": "unitario",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 38,
    "solicitar": "hay suficiente"
  },
  {
    "id": 46,
    "descripcion": "Consome de pollo malher bolsa 800g",
    "udm": "bolsa",
    "categoria": "condimento",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 47,
    "descripcion": "Consome 227 gr.",
    "udm": "bolsa",
    "categoria": "condimento",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 48,
    "descripcion": "Corazon de trigo 400g",
    "udm": "bolsa",
    "categoria": "atoles",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 49,
    "descripcion": "Cuchillo vasconia",
    "udm": "unidad",
    "categoria": "utencilio",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 50,
    "descripcion": "Cuchillo Jorge",
    "udm": "unidad",
    "categoria": "utencilio",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 51,
    "descripcion": "Cuchillo",
    "udm": "unidad",
    "categoria": "utencilio",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 96,
    "solicitar": "hay suficiente"
  },
  {
    "id": 52,
    "descripcion": "Crema",
    "udm": "Bolsa",
    "categoria": "lacteos",
    "almacen": "Almacen 1",
    "stock": 4,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 53,
    "descripcion": "Desechable cucharas",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 395,
    "solicitar": "hay suficiente"
  },
  {
    "id": 54,
    "descripcion": "Desechable recipientes transparentes",
    "udm": "unitario",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 55,
    "descripcion": "Desechable vaso 8 onz",
    "udm": "unitario",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 56,
    "descripcion": "Desechable vaso 10 onz",
    "udm": "unitario",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 57,
    "descripcion": "Desechable vaso plastico azul de 16 onz",
    "udm": "unitario",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 9,
    "solicitar": "solicitar material"
  },
  {
    "id": 58,
    "descripcion": "Desechable vaso de carton 12 onz",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 59,
    "descripcion": "Desechables bandeja cuadrado 50 unidades",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 14,
    "solicitar": "hay suficiente"
  },
  {
    "id": 60,
    "descripcion": "Desechables bandeja #7",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 37,
    "solicitar": "hay suficiente"
  },
  {
    "id": 61,
    "descripcion": "Desechables Cuchillos blancos",
    "udm": "unidad",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 4000,
    "solicitar": "hay suficiente"
  },
  {
    "id": 62,
    "descripcion": "Desechables Cuchillos",
    "udm": "paquetes",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 63,
    "descripcion": "Desechables plato con divisiones",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 64,
    "descripcion": "Desechables plato hondo de carton",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 5,
    "solicitar": "solicitar material"
  },
  {
    "id": 65,
    "descripcion": "Desechables Platos pastelero",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 14,
    "solicitar": "hay suficiente"
  },
  {
    "id": 66,
    "descripcion": "Desechables bandeja con tapadera",
    "udm": "unidades",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 93,
    "solicitar": "hay suficiente"
  },
  {
    "id": 67,
    "descripcion": "Desechables Tenedores de 25 unidades",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 374,
    "solicitar": "hay suficiente"
  },
  {
    "id": 68,
    "descripcion": "Desechables Vaso color rojo 18 onz",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 12,
    "solicitar": "hay suficiente"
  },
  {
    "id": 69,
    "descripcion": "Desechables vaso 4 onz 25 unidades",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 143,
    "solicitar": "hay suficiente"
  },
  {
    "id": 70,
    "descripcion": "Desechables vaso de colores",
    "udm": "paquetes",
    "categoria": "desechables",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 558,
    "solicitar": "hay suficiente"
  },
  {
    "id": 71,
    "descripcion": "Vegetales en lata 220 gr.",
    "udm": "lata",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 72,
    "descripcion": "embutido jamon 2270g",
    "udm": "paquetes",
    "categoria": "embutidos",
    "almacen": "Almacen 1",
    "stock": 4,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 73,
    "descripcion": "Embutidos Salchicha paq. 54 unid",
    "udm": "paquetes",
    "categoria": "embutidos",
    "almacen": "Almacen 1",
    "stock": 3,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 74,
    "descripcion": "Aceite 3200 ml.",
    "udm": "Galon",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 75,
    "descripcion": "Encendedores",
    "udm": "unitario",
    "categoria": "gas",
    "almacen": "Almacen 1",
    "stock": 4,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 76,
    "descripcion": "Ensure 850g",
    "udm": "bote",
    "categoria": "lacteos",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 77,
    "descripcion": "Fideos variedad",
    "udm": "bolsa",
    "categoria": "pastas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 343,
    "solicitar": "hay suficiente"
  },
  {
    "id": 78,
    "descripcion": "Cereal 690 gr.",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 79,
    "descripcion": "Refresco instantaneos variados 8g",
    "udm": "unitario",
    "categoria": "frescos",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 80,
    "descripcion": "Frijol granel",
    "udm": "libras",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 1051,
    "solicitar": "hay suficiente"
  },
  {
    "id": 81,
    "descripcion": "Frijol 1 Libra",
    "udm": "bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 40,
    "inventario": 130,
    "solicitar": "hay suficiente"
  },
  {
    "id": 82,
    "descripcion": "Frijol 1700g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 3,
    "solicitar": "solicitar material"
  },
  {
    "id": 83,
    "descripcion": "Frijol (800G)",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 12,
    "solicitar": "hay suficiente"
  },
  {
    "id": 84,
    "descripcion": "Frijol (908 G)",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 3,
    "solicitar": "solicitar material"
  },
  {
    "id": 85,
    "descripcion": "Frijol (1816G)",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": -2,
    "solicitar": "solicitar material"
  },
  {
    "id": 86,
    "descripcion": "Frijol (1000G)",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 87,
    "descripcion": "Frijol (2300G)",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 88,
    "descripcion": "Frijol (2000G)",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 9,
    "solicitar": "hay suficiente"
  },
  {
    "id": 89,
    "descripcion": "Frijol Rojo bote 400g",
    "udm": "Lata",
    "categoria": "Enlatados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 40,
    "solicitar": "hay suficiente"
  },
  {
    "id": 90,
    "descripcion": "Frijol Rojo 1 libra",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 61,
    "solicitar": "hay suficiente"
  },
  {
    "id": 91,
    "descripcion": "Frijoles volteados 993 gr. Bolsa",
    "udm": "Bolsa",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 92,
    "descripcion": "Frijoles rojos volteados 800g",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 93,
    "descripcion": "Frijol negro entero 850.5 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 94,
    "descripcion": "Frijoles volteados negros 142g",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 95,
    "descripcion": "Frijoles volteados 298g",
    "udm": "bolsa",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 2,
    "solicitar": "solicitar material"
  },
  {
    "id": 96,
    "descripcion": "Frijoles volteados La Chula 35oz",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 97,
    "descripcion": "Frijoles ducal volteados 227 gr.",
    "udm": "bote",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 98,
    "descripcion": "Fruta Piña",
    "udm": "unidad",
    "categoria": "fruta",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 99,
    "descripcion": "Fruta banano",
    "udm": "unidad",
    "categoria": "fruta",
    "almacen": "Almacen 1",
    "stock": 60,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 100,
    "descripcion": "Fruta papaya",
    "udm": "unidad",
    "categoria": "fruta",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 101,
    "descripcion": "Fruta Naranja",
    "udm": "unidad",
    "categoria": "fruta",
    "almacen": "Almacen 1",
    "stock": 60,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 102,
    "descripcion": "Fruta Platanos",
    "udm": "unidad",
    "categoria": "fruta",
    "almacen": "Almacen 1",
    "stock": 50,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 103,
    "descripcion": "Gaseosa 350 ml.",
    "udm": "Lata",
    "categoria": "gaseosa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 104,
    "descripcion": "Galletas con avena",
    "udm": "unitario",
    "categoria": "golosinas",
    "almacen": "Almacen 1",
    "stock": 60,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 105,
    "descripcion": "Galletas variadas",
    "udm": "unitario",
    "categoria": "golosinas",
    "almacen": "Almacen 1",
    "stock": 60,
    "inventario": 415,
    "solicitar": "hay suficiente"
  },
  {
    "id": 106,
    "descripcion": "Jugos sabores 200 ml",
    "udm": "Botella",
    "categoria": "jugos",
    "almacen": "Almacen 1",
    "stock": 9,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 107,
    "descripcion": "Gaseosa 600 ml.",
    "udm": "botella",
    "categoria": "gaseosa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 108,
    "descripcion": "Gelatina 454 g",
    "udm": "Bolsa",
    "categoria": "gelatina",
    "almacen": "Almacen 1",
    "stock": 6,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 109,
    "descripcion": "Gelatina 400g",
    "udm": "Bolsas",
    "categoria": "gelatinas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 110,
    "descripcion": "Gelatina de 80 g",
    "udm": "Bolsas",
    "categoria": "gelatina",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 111,
    "descripcion": "Gelatina de 85 g",
    "udm": "Bolsas",
    "categoria": "gelatina",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 112,
    "descripcion": "huevos marrones",
    "udm": "unitario",
    "categoria": "huevos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 150,
    "solicitar": "hay suficiente"
  },
  {
    "id": 113,
    "descripcion": "huevos blancos",
    "udm": "unitario",
    "categoria": "huevos",
    "almacen": "Almacen 1",
    "stock": 3,
    "inventario": 2033,
    "solicitar": "hay suficiente"
  },
  {
    "id": 114,
    "descripcion": "Incaparina bebible 200 ml",
    "udm": "caja",
    "categoria": "incaparina",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 48,
    "solicitar": "hay suficiente"
  },
  {
    "id": 115,
    "descripcion": "Incaparina Liquida 1 lts",
    "udm": "unitario",
    "categoria": "incaparina",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 116,
    "descripcion": "Incaparina 450g",
    "udm": "libras",
    "categoria": "incaparina",
    "almacen": "Almacen 1",
    "stock": 50,
    "inventario": 2094,
    "solicitar": "hay suficiente"
  },
  {
    "id": 117,
    "descripcion": "Jugos sabores 200 ml",
    "udm": "caja",
    "categoria": "jugos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 118,
    "descripcion": "Jugos sabores variados 1 litro",
    "udm": "caja",
    "categoria": "jugos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 119,
    "descripcion": "Leche variada 350g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 120,
    "descripcion": "Leche Australian 1500g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 121,
    "descripcion": "Leche variada 110g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 122,
    "descripcion": "Leche Australian",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 123,
    "descripcion": "Leche variada 2200g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 10,
    "solicitar": "hay suficiente"
  },
  {
    "id": 124,
    "descripcion": "Leche Orphan",
    "udm": "Libra",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 200,
    "solicitar": "hay suficiente"
  },
  {
    "id": 125,
    "descripcion": "Leche variada 2000g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 126,
    "descripcion": "Leche Coranado descremada litro",
    "udm": "Litro",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 127,
    "descripcion": "Leche Coranado S/L Litro",
    "udm": "Litro",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 128,
    "descripcion": "Leche Coranado S/L 946g",
    "udm": "unitario",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 129,
    "descripcion": "Leche variada 800g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 130,
    "descripcion": "Leche delisoya",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 131,
    "descripcion": "Leche soyapac 350 gr.",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 132,
    "descripcion": "Leche variado 900g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 133,
    "descripcion": "Leche variado 800g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 134,
    "descripcion": "Leche variado 360g",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 16,
    "solicitar": "hay suficiente"
  },
  {
    "id": 135,
    "descripcion": "Cereal 710 gr.",
    "udm": "Caja",
    "categoria": "Cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 136,
    "descripcion": "Leche Ensure 400g",
    "udm": "Bote",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 137,
    "descripcion": "Leche variada 2.2kg",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 138,
    "descripcion": "Leche dos pinos Deslactosada",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 139,
    "descripcion": "Leche soyapac 1800g",
    "udm": "bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 140,
    "descripcion": "Leche",
    "udm": "Bolsa",
    "categoria": "leche",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 141,
    "descripcion": "Lentejas en bote 400 g",
    "udm": "Lata",
    "categoria": "lentejas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 95,
    "solicitar": "hay suficiente"
  },
  {
    "id": 142,
    "descripcion": "Lonchera termica",
    "udm": "unitario",
    "categoria": "lonchera",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 143,
    "descripcion": "Maicena caja 45g",
    "udm": "unitario",
    "categoria": "maicena",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 144,
    "descripcion": "Maicena caja 375g",
    "udm": "Caja",
    "categoria": "maicena",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 145,
    "descripcion": "Margarina 450g",
    "udm": "unitario",
    "categoria": "margarina",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 164,
    "solicitar": "hay suficiente"
  },
  {
    "id": 146,
    "descripcion": "Manteca 450g",
    "udm": "unitario",
    "categoria": "manteca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 147,
    "descripcion": "Miel de maple 450g",
    "udm": "Botella",
    "categoria": "maple",
    "almacen": "Almacen 1",
    "stock": 3,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 148,
    "descripcion": "Miel de abeja 330ml",
    "udm": "Botella",
    "categoria": "maple",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 149,
    "descripcion": "Maizena variedad",
    "udm": "Unitario",
    "categoria": "maicena",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 150,
    "descripcion": "Maseca 4 lb",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 151,
    "descripcion": "Maseca 2000g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 152,
    "descripcion": "Maseca 1867g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 153,
    "descripcion": "Maseca 1816g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 154,
    "descripcion": "Maseca 1814g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 155,
    "descripcion": "Maseca 907g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 156,
    "descripcion": "Maseca 800g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 14,
    "solicitar": "hay suficiente"
  },
  {
    "id": 157,
    "descripcion": "Maseca 820g",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 14,
    "solicitar": "hay suficiente"
  },
  {
    "id": 158,
    "descripcion": "Maseca 5 LIBRAS",
    "udm": "Bolsas",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 159,
    "descripcion": "Maseca granel",
    "udm": "libras",
    "categoria": "maseca",
    "almacen": "Almacen 1",
    "stock": 20,
    "inventario": 1027,
    "solicitar": "hay suficiente"
  },
  {
    "id": 160,
    "descripcion": "Mayonesa 3500 g",
    "udm": "bolsas",
    "categoria": "mayonesa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 161,
    "descripcion": "Atol de maíz 300g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 162,
    "descripcion": "Mermelada frasco 260g",
    "udm": "bolsa",
    "categoria": "mermelada",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 163,
    "descripcion": "Mermelada frasco 340g",
    "udm": "frasco",
    "categoria": "mermelada",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 164,
    "descripcion": "Miga de pan",
    "udm": "bolsa",
    "categoria": "miga",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 165,
    "descripcion": "Mosh 600g",
    "udm": "Bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 166,
    "descripcion": "Mosh bolsa 400g",
    "udm": "Bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 16,
    "solicitar": "hay suficiente"
  },
  {
    "id": 167,
    "descripcion": "Mosh granel",
    "udm": "Libras",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 25,
    "inventario": 117,
    "solicitar": "hay suficiente"
  },
  {
    "id": 168,
    "descripcion": "Mostaza 370 g",
    "udm": "Bolsa",
    "categoria": "mostaza",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 169,
    "descripcion": "Nestum bote 730g",
    "udm": "Bote",
    "categoria": "nestum",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 170,
    "descripcion": "Nutrikito",
    "udm": "bolsa",
    "categoria": "atoles",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 171,
    "descripcion": "Panqueque 4.53 kg",
    "udm": "bolsa",
    "categoria": "panqueques",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 172,
    "descripcion": "Panqueques 908g  (2lb)",
    "udm": "bolsa",
    "categoria": "panqueques",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 173,
    "descripcion": "Panqueques de 5lb",
    "udm": "bolsa",
    "categoria": "panqueques",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 174,
    "descripcion": "Panqueques de 450 g",
    "udm": "bolsa",
    "categoria": "panqueques",
    "almacen": "Almacen 1",
    "stock": 3,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 175,
    "descripcion": "Panqueques de 400g",
    "udm": "bolsa",
    "categoria": "panqueques",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 176,
    "descripcion": "Panqueques de 3lb",
    "udm": "Bolsa",
    "categoria": "pastillas",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 177,
    "descripcion": "Picante en Bolcita",
    "udm": "bolsita",
    "categoria": "picante",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 178,
    "descripcion": "Poporopos 400g para realizar",
    "udm": "Bolsa",
    "categoria": "poporopos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 179,
    "descripcion": "Pelador de metal",
    "udm": "unidad",
    "categoria": "utencilio",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 180,
    "descripcion": "Rosa Jamaica 1/2 libra",
    "udm": "Bolsa",
    "categoria": "rosa",
    "almacen": "Almacen 1",
    "stock": 4,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 181,
    "descripcion": "Aceituna 150 gr.",
    "udm": "Lata",
    "categoria": "Enlatados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 182,
    "descripcion": "Salsa Soya",
    "udm": "bote",
    "categoria": "salsa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 183,
    "descripcion": "Salsa Inglesa",
    "udm": "bote",
    "categoria": "salsa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 184,
    "descripcion": "Salsa de tomate 100g",
    "udm": "Bolsa",
    "categoria": "salsa",
    "almacen": "Almacen 1",
    "stock": 3,
    "inventario": 2,
    "solicitar": "solicitar material"
  },
  {
    "id": 185,
    "descripcion": "Salsa de tomate Ketchup 1800g",
    "udm": "Bolsa",
    "categoria": "salsa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 186,
    "descripcion": "servilletas 100 unidades c/u",
    "udm": "paquetes",
    "categoria": "servilletas",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 27,
    "solicitar": "hay suficiente"
  },
  {
    "id": 187,
    "descripcion": "Servilletas 500 unidades c/u",
    "udm": "paquetes",
    "categoria": "servilletas",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 159,
    "solicitar": "hay suficiente"
  },
  {
    "id": 188,
    "descripcion": "Sopa sobre 76 gr.",
    "udm": "sobre",
    "categoria": "sopa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 189,
    "descripcion": "Sopa deshidratada Orphan",
    "udm": "bolsa",
    "categoria": "sopa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 190,
    "descripcion": "Sopa de sobre 60 gr.",
    "udm": "sobre",
    "categoria": "sopa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 85,
    "solicitar": "hay suficiente"
  },
  {
    "id": 191,
    "descripcion": "Adobado sobre 58 g",
    "udm": "sobre",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 192,
    "descripcion": "Sopa sobre 57 gr.",
    "udm": "sobre",
    "categoria": "sopa",
    "almacen": "Almacen 1",
    "stock": 12,
    "inventario": 4,
    "solicitar": "solicitar material"
  },
  {
    "id": 193,
    "descripcion": "arroz 25 lbs",
    "udm": "Bolsa",
    "categoria": "sopa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 194,
    "descripcion": "Fruta Tamarindo bolsa",
    "udm": "unitario",
    "categoria": "frescos",
    "almacen": "Almacen 1",
    "stock": 2,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 195,
    "descripcion": "Tortimax",
    "udm": "frasco",
    "categoria": "tortimax",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 196,
    "descripcion": "Vinagre de 94ml",
    "udm": "botella",
    "categoria": "vinagre",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 197,
    "descripcion": "Vinagre galon",
    "udm": "Galon",
    "categoria": "vinagre",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 198,
    "descripcion": "Verdura Zanahoria",
    "udm": "unitario",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 84,
    "solicitar": "hay suficiente"
  },
  {
    "id": 199,
    "descripcion": "Verdura Apio",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 200,
    "descripcion": "Verdura repollo",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 201,
    "descripcion": "Verdura pepino",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 30,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 202,
    "descripcion": "Fruta Limon",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 25,
    "inventario": 20,
    "solicitar": "solicitar material"
  },
  {
    "id": 203,
    "descripcion": "Verdura Remolacha",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 30,
    "inventario": 116,
    "solicitar": "hay suficiente"
  },
  {
    "id": 204,
    "descripcion": "Verdura Cilantro",
    "udm": "Manojo",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 205,
    "descripcion": "Verdura Guicoy tierno",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 20,
    "inventario": 69,
    "solicitar": "hay suficiente"
  },
  {
    "id": 206,
    "descripcion": "Verdura Ajonjoli 1/2",
    "udm": "bolsa",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 207,
    "descripcion": "Verdura Pepitoria 1/2",
    "udm": "bolsa",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 208,
    "descripcion": "verdura cabeza de ajo red",
    "udm": "Unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 209,
    "descripcion": "Verdura Guisquil",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 87,
    "solicitar": "hay suficiente"
  },
  {
    "id": 210,
    "descripcion": "Verdura papa",
    "udm": "libra",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 15,
    "inventario": 118,
    "solicitar": "hay suficiente"
  },
  {
    "id": 211,
    "descripcion": "Verdura Camote",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 212,
    "descripcion": "Verdura Cebolla",
    "udm": "unidad",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 10,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 213,
    "descripcion": "Verdura tomate 9 libras la bolsa",
    "udm": "libra",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 5,
    "inventario": 3,
    "solicitar": "solicitar material"
  },
  {
    "id": 214,
    "descripcion": "Verdura Elote",
    "udm": "Unidades",
    "categoria": "verdura",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 215,
    "descripcion": "Carne de Pollo entero",
    "udm": "unidad",
    "categoria": "pollo",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 216,
    "descripcion": "Tortitas de Pollo 18 U.",
    "udm": "Bolsa",
    "categoria": "pollo",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 217,
    "descripcion": "Aceite 400 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 9,
    "solicitar": "hay suficiente"
  },
  {
    "id": 218,
    "descripcion": "Aceite 430 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 219,
    "descripcion": "Aceite 800 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 220,
    "descripcion": "Aceite 750 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 20,
    "solicitar": "hay suficiente"
  },
  {
    "id": 221,
    "descripcion": "Aceite Canola 4.73 L (1.25 gl)",
    "udm": "litro",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 222,
    "descripcion": "Aceite 450 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 223,
    "descripcion": "Aceite 500 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 224,
    "descripcion": "Aceite 700 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 225,
    "descripcion": "Aceite 1000 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 10,
    "solicitar": "hay suficiente"
  },
  {
    "id": 226,
    "descripcion": "Aceite 1400 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 227,
    "descripcion": "Aceite 800 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 24,
    "solicitar": "hay suficiente"
  },
  {
    "id": 228,
    "descripcion": "Aceite 946 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": -2,
    "solicitar": "solicitar material"
  },
  {
    "id": 229,
    "descripcion": "Aceite 1250 ml",
    "udm": "unitario",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 230,
    "descripcion": "Aceite 375 ml",
    "udm": "litro",
    "categoria": "Grasas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 231,
    "descripcion": "Panqueque 2270 gr",
    "udm": "gramos",
    "categoria": "Harinas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 232,
    "descripcion": "Panqueques 800 gr.",
    "udm": "gramos",
    "categoria": "Harinas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 233,
    "descripcion": "Panqueque 165 gr.",
    "udm": "Bolsa",
    "categoria": "Harinas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 234,
    "descripcion": "Frijol negro bote 240g",
    "udm": "gramos",
    "categoria": "Granos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 195,
    "solicitar": "hay suficiente"
  },
  {
    "id": 235,
    "descripcion": "Azucar 4 lbs.",
    "udm": "Bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 236,
    "descripcion": "Azucar blanca 1,000 gr.",
    "udm": "Bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 237,
    "descripcion": "Azucar Morena 2000 gr.",
    "udm": "Bolsa",
    "categoria": "Dulces",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 238,
    "descripcion": "Frijol Rojo 2 lbs.",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 239,
    "descripcion": "Maseca 1640 g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 240,
    "descripcion": "Maseca 1600 g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 10,
    "solicitar": "hay suficiente"
  },
  {
    "id": 241,
    "descripcion": "Harina de trigo 400 gramos",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 242,
    "descripcion": "Maseca 400 g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 243,
    "descripcion": "Sal granulada 920g",
    "udm": "bolsa",
    "categoria": "Libra",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 244,
    "descripcion": "Sal granulada 116g",
    "udm": "bolsa",
    "categoria": "Libra",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 245,
    "descripcion": "Protemas 120 gr",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": -4,
    "solicitar": "solicitar material"
  },
  {
    "id": 246,
    "descripcion": "Puré de papa 100 gr",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 247,
    "descripcion": "Frijoles volteados 400g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 248,
    "descripcion": "Frijos negro volteado 794g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 249,
    "descripcion": "Frijoles volteados 142g",
    "udm": "bolsa",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 250,
    "descripcion": "Frijol volteado lata 823 gr.",
    "udm": "lata",
    "categoria": "gramos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 146,
    "solicitar": "hay suficiente"
  },
  {
    "id": 251,
    "descripcion": "Frijoles volteados lata 156 g",
    "udm": "lata",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 252,
    "descripcion": "Frijoles volteados 425 g",
    "udm": "lata",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 253,
    "descripcion": "Frijoles volteados rojos bolsa 800g",
    "udm": "lata",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 254,
    "descripcion": "Frijoles enteros la costeña 400g",
    "udm": "lata",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 255,
    "descripcion": "Bolsa de Jamon 10 lbs.",
    "udm": "Bolsa",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 256,
    "descripcion": "Arroz 1700 g",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 257,
    "descripcion": "Frijol negro entero 560 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 258,
    "descripcion": "arroz 20lbs",
    "udm": "Bolsa",
    "categoria": "granos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 259,
    "descripcion": "arroz 10lbs",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 260,
    "descripcion": "arroz 800 gr",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 261,
    "descripcion": "Agua Pura 236 ml.",
    "udm": "Botella",
    "categoria": "Bebidas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 14,
    "solicitar": "hay suficiente"
  },
  {
    "id": 262,
    "descripcion": "Agua Pura 350 ml.",
    "udm": "Botella",
    "categoria": "Bebidas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 263,
    "descripcion": "Nutrilon 400 gr",
    "udm": "bolsa",
    "categoria": "lacteos",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 264,
    "descripcion": "Ensure 40g",
    "udm": "bote",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 265,
    "descripcion": "Cereal 490 gr",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 266,
    "descripcion": "Cereal 600 gr",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": -2,
    "solicitar": "solicitar material"
  },
  {
    "id": 267,
    "descripcion": "Cereal 580 g",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 268,
    "descripcion": "spaguetti 250 g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 269,
    "descripcion": "Salsita de tomate con queso 200 gr.",
    "udm": "Sobre",
    "categoria": "conservas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 270,
    "descripcion": "Cuajo Pastilla",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 78,
    "solicitar": "hay suficiente"
  },
  {
    "id": 271,
    "descripcion": "Arroz con protemas 370 g",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1221,
    "solicitar": "hay suficiente"
  },
  {
    "id": 272,
    "descripcion": "Canela 22gr",
    "udm": "sobre",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 273,
    "descripcion": "Mosh 900g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 274,
    "descripcion": "Mosh 1200g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 275,
    "descripcion": "Mosh 1000g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 276,
    "descripcion": "Mosh 300g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 18,
    "solicitar": "hay suficiente"
  },
  {
    "id": 277,
    "descripcion": "Mosh 360g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 10,
    "solicitar": "hay suficiente"
  },
  {
    "id": 278,
    "descripcion": "Haba 400 g",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 279,
    "descripcion": "Haba 425 g",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 280,
    "descripcion": "Semola de trigo 400 g",
    "udm": "Atol",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 281,
    "descripcion": "pinol 400g",
    "udm": "Atol",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": -1,
    "solicitar": "solicitar material"
  },
  {
    "id": 282,
    "descripcion": "Binestarina 450 g",
    "udm": "Atol",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 283,
    "descripcion": "pinol 425g",
    "udm": "Atol",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 284,
    "descripcion": "Atolina 454 g",
    "udm": "Atol",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 285,
    "descripcion": "Mosh 40g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 286,
    "descripcion": "Mosh 50g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 287,
    "descripcion": "Palomitas (microondas)",
    "udm": "Sobre",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 288,
    "descripcion": "Harina de trigo a granel",
    "udm": "Libra",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 289,
    "descripcion": "Angelitos 40 gr.",
    "udm": "Bolsa",
    "categoria": "golosina",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 290,
    "descripcion": "Gelatina 12g",
    "udm": "Bolsas",
    "categoria": "gelatinas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 291,
    "descripcion": "Galletas maria",
    "udm": "unitario",
    "categoria": "golosinas",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 292,
    "descripcion": "Frijoles de soja lata 400g",
    "udm": "lata",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 293,
    "descripcion": "Lentejas bolsa 400g",
    "udm": "Bolsa",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 9,
    "solicitar": "hay suficiente"
  },
  {
    "id": 294,
    "descripcion": "Frijoles volteados rojos 400g",
    "udm": "lata",
    "categoria": "preparados",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 295,
    "descripcion": "Salsa de tomate 180 g",
    "udm": "frasco",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 296,
    "descripcion": "Ablandador de carne 8g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 297,
    "descripcion": "Sopa sobre 50 gr.",
    "udm": "sobre",
    "categoria": "sopa",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 27,
    "solicitar": "hay suficiente"
  },
  {
    "id": 298,
    "descripcion": "Hilachas sobre 58 g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 299,
    "descripcion": "avena instantanea 40 g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 300,
    "descripcion": "Mermelada 550g",
    "udm": "frasco",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 237,
    "solicitar": "hay suficiente"
  },
  {
    "id": 301,
    "descripcion": "Miel de abeja 1000g",
    "udm": "botella",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 302,
    "descripcion": "Esencia frasco 250 ml.",
    "udm": "Botella",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 303,
    "descripcion": "Miel de abeja 500g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 304,
    "descripcion": "Miel de maple 360g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 305,
    "descripcion": "Concentrado para refrescos 3785 ml",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 306,
    "descripcion": "Refrescos Ya 18 gr.",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 307,
    "descripcion": "Leche Lacti 4,500 gramos",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 308,
    "descripcion": "Leche variada 300g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 309,
    "descripcion": "",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 310,
    "descripcion": "Leche Australian entera",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 311,
    "descripcion": "Leche Pharmasure Endurance",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 312,
    "descripcion": "Leche variado 120g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 313,
    "descripcion": "Leche",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 314,
    "descripcion": "Leche de vaca",
    "udm": "Litros",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 315,
    "descripcion": "Leche delactomy entera",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 316,
    "descripcion": "Leche Australian 1900 gr.",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 317,
    "descripcion": "Leche Lacti 1,500 gramos",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 318,
    "descripcion": "Leche entera",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 319,
    "descripcion": "Cereal variado 510g",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": -1,
    "solicitar": "solicitar material"
  },
  {
    "id": 320,
    "descripcion": "Cereal 430 gr.",
    "udm": "Caja",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 321,
    "descripcion": "Cereal variado pequeño",
    "udm": "Caja",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 322,
    "descripcion": "Cereal variado 500g",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 16,
    "solicitar": "hay suficiente"
  },
  {
    "id": 323,
    "descripcion": "Leche Nido bote 800g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 324,
    "descripcion": "Frijol Blanco 1 libra",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 325,
    "descripcion": "Aceite de 175 ml",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 326,
    "descripcion": "Aceite de 2900 ml",
    "udm": "",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 327,
    "descripcion": "Frijol pinto 425g",
    "udm": "lata",
    "categoria": "",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 328,
    "descripcion": "Mosh 907g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 329,
    "descripcion": "Mosh 272g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 330,
    "descripcion": "Mosh 350g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 331,
    "descripcion": "Mosh 290g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 332,
    "descripcion": "Mosh 275g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 333,
    "descripcion": "Mosh 550g",
    "udm": "bolsa",
    "categoria": "mosh",
    "almacen": "Almacen 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 334,
    "descripcion": "Fortiharina 450g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 335,
    "descripcion": "Harina de platano 400g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 336,
    "descripcion": "Atol Chispudito 450g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 337,
    "descripcion": "Frijol negro entero 4 lbs.",
    "udm": "Bolsa",
    "categoria": "preparados",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 338,
    "descripcion": "Horchata Galon",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 339,
    "descripcion": "Horchata 225 ml.",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 340,
    "descripcion": "Compota de manza 4oz",
    "udm": "Frasco",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 341,
    "descripcion": "Frasco anicillo",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 342,
    "descripcion": "Refresco soya y avena 400 gr.",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 343,
    "descripcion": "Refrescos Yus 25 gr.",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 344,
    "descripcion": "Frijoles volteados negro 425",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 345,
    "descripcion": "Frijol volteado 794 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 346,
    "descripcion": "Frijol negro volteado 426g",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 347,
    "descripcion": "Frijol bayo entero lata 560g",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 348,
    "descripcion": "Frijol entero lata 400g",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 349,
    "descripcion": "Frijol volteado bolsa 298g",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 350,
    "descripcion": "Frijol negro volteado 156g",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 351,
    "descripcion": "Sopa de Pollo 55 gr.",
    "udm": "sobre",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 71,
    "solicitar": "hay suficiente"
  },
  {
    "id": 352,
    "descripcion": "Sopa de sobre 58 gr.",
    "udm": "sobre",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 353,
    "descripcion": "Sopa de Crema variado",
    "udm": "sobre",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 354,
    "descripcion": "Bolsa de pepian 55gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 355,
    "descripcion": "Sobres de Cremas variados",
    "udm": "unitario",
    "categoria": "preparados",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 356,
    "descripcion": "Sopa de 27 gramos",
    "udm": "sobre",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 357,
    "descripcion": "Leche Liquida Litro Caja",
    "udm": "Caja",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 358,
    "descripcion": "Leche liquida 900 ml. Bolsa",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 359,
    "descripcion": "Bolsa de patitas de pollo de 5 libras",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 63,
    "solicitar": "hay suficiente"
  },
  {
    "id": 360,
    "descripcion": "Verdura Perulero",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 244,
    "solicitar": "hay suficiente"
  },
  {
    "id": 361,
    "descripcion": "Desechables Tenedores blancos",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1400,
    "solicitar": "hay suficiente"
  },
  {
    "id": 362,
    "descripcion": "Desechables Cuchillos blanco 25 unidades",
    "udm": "paquetes",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 48,
    "solicitar": "hay suficiente"
  },
  {
    "id": 363,
    "descripcion": "Jugos sabores 100 ml",
    "udm": "Botella",
    "categoria": "jugos",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 372,
    "solicitar": "hay suficiente"
  },
  {
    "id": 364,
    "descripcion": "Jugos sabores 330ml",
    "udm": "unidades",
    "categoria": "jugos",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 365,
    "descripcion": "Frijol quebrado a granel",
    "udm": "libra",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 666,
    "solicitar": "hay suficiente"
  },
  {
    "id": 366,
    "descripcion": "Incaparina instantanea 375 gr",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 40,
    "solicitar": "hay suficiente"
  },
  {
    "id": 367,
    "descripcion": "Incaparina 900 gramos",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 146,
    "solicitar": "hay suficiente"
  },
  {
    "id": 368,
    "descripcion": "Incaparina 75 gramos",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 12,
    "solicitar": "hay suficiente"
  },
  {
    "id": 369,
    "descripcion": "Incaparina 1800 gramos",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 45,
    "solicitar": "hay suficiente"
  },
  {
    "id": 370,
    "descripcion": "Pan para Hamburquesa",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 371,
    "descripcion": "Pan Pirujo",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 372,
    "descripcion": "Pan Frances",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 373,
    "descripcion": "Pan Dulce",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 374,
    "descripcion": "Arverja bote 400g",
    "udm": "bote",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 375,
    "descripcion": "Sal libra (400g)",
    "udm": "libra",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 136,
    "solicitar": "hay suficiente"
  },
  {
    "id": 376,
    "descripcion": "Jugos sabores 100 ml",
    "udm": "Caja",
    "categoria": "jugos",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 19,
    "solicitar": "hay suficiente"
  },
  {
    "id": 377,
    "descripcion": "Nestum caja 200g",
    "udm": "Caja",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 378,
    "descripcion": "Cupcakes",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 379,
    "descripcion": "Campiñones",
    "udm": "Libras",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 380,
    "descripcion": "Manojo Laurel",
    "udm": "Manojo",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 381,
    "descripcion": "Manojo Tomillo",
    "udm": "Manojo",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 382,
    "descripcion": "Cereal Variado 1.3lb",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 383,
    "descripcion": "Cereal Variado 1.5kg",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 384,
    "descripcion": "Cereal Variado 370g",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 385,
    "descripcion": "Sal 200g",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 386,
    "descripcion": "Cereal Variado 1kg",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": -1,
    "solicitar": "solicitar material"
  },
  {
    "id": 387,
    "descripcion": "Frijol Voleado negro 6lb",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 388,
    "descripcion": "Sal 2 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 18,
    "solicitar": "hay suficiente"
  },
  {
    "id": 389,
    "descripcion": "Jugo de naranja 3800 ml.",
    "udm": "Galon",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 390,
    "descripcion": "Frijos rojo volteado 795g",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 391,
    "descripcion": "Cereal variado 290 gr.",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 392,
    "descripcion": "Frijol ducal negro 130g",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 393,
    "descripcion": "Sopa Instantanea variedad",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 394,
    "descripcion": "Compota 100g",
    "udm": "Frasco",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 395,
    "descripcion": "Super comal 750ml",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 396,
    "descripcion": "Fosforos",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 397,
    "descripcion": "Frijol volteado negro 48 onz.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 398,
    "descripcion": "Gaseosa 3 lts.",
    "udm": "Litros",
    "categoria": "Refrescos",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 399,
    "descripcion": "Requeson",
    "udm": "Unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 400,
    "descripcion": "Leche liquida 450 ml. Bolsa",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 401,
    "descripcion": "Harina de pan 5lb",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 402,
    "descripcion": "Tortillas de Harina 180 gr.",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 403,
    "descripcion": "Gelatina 125 gr.",
    "udm": "bote",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 12,
    "solicitar": "hay suficiente"
  },
  {
    "id": 404,
    "descripcion": "Mayonesa bolsa variedad",
    "udm": "Botella",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 405,
    "descripcion": "Bolsa 9*14",
    "udm": "paquete",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 406,
    "descripcion": "Vinagre 473ml",
    "udm": "Botella",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 407,
    "descripcion": "Ricitos 10 gr.",
    "udm": "Bolsitas",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 408,
    "descripcion": "Ricitos 800g",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 409,
    "descripcion": "Cocacola 355ml",
    "udm": "Botella",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 410,
    "descripcion": "Cocacola sin azucar 355ml",
    "udm": "Botella",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 5,
    "solicitar": "hay suficiente"
  },
  {
    "id": 411,
    "descripcion": "Pizzas 8 dazos C/U",
    "udm": "",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 412,
    "descripcion": "Crazy Puff de Peperoni",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 413,
    "descripcion": "Hamburguesas Donación",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 414,
    "descripcion": "Leche de cabra",
    "udm": "litro",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 415,
    "descripcion": "Hongos comestibles",
    "udm": "libra",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 416,
    "descripcion": "Mosh 50 gr.",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 417,
    "descripcion": "Mosh 215 gr.",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 418,
    "descripcion": "Aceite de Soya 5 lts.",
    "udm": "Litro",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 419,
    "descripcion": "Verdura Ejote",
    "udm": "Libra",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 420,
    "descripcion": "Frijol Pinto Granel",
    "udm": "Libra",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 184,
    "solicitar": "hay suficiente"
  },
  {
    "id": 421,
    "descripcion": "Carambola",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 422,
    "descripcion": "Verdura Aguacate",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 423,
    "descripcion": "Mosh 140 gr.",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 424,
    "descripcion": "Sardina variedad",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 425,
    "descripcion": "Mole sobre",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 426,
    "descripcion": "Rostizador caja 100 gr.",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 427,
    "descripcion": "Granos de Elote 220 gr.",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 428,
    "descripcion": "Bolsa de Salami 10 lbs.",
    "udm": "Bolsa",
    "categoria": "embutidos",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 429,
    "descripcion": "Refrescos variados 1 kg.",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 430,
    "descripcion": "Sazon completa",
    "udm": "paquete",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 431,
    "descripcion": "Cereal 200 gr.",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 432,
    "descripcion": "Cereal 180 gr.",
    "udm": "bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 433,
    "descripcion": "Frijol negro 920 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 434,
    "descripcion": "Granola variedad",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 435,
    "descripcion": "Cerelac 250 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 436,
    "descripcion": "Consome 454 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 437,
    "descripcion": "Bolsa Hueso de res 2 lb.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 438,
    "descripcion": "Bolsa de Carne Molida 4 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 439,
    "descripcion": "Bolsa de Carne Bolovique 5 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 440,
    "descripcion": "Bolsa de Carne Caña 5 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 441,
    "descripcion": "Chile Morron",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 137,
    "solicitar": "hay suficiente"
  },
  {
    "id": 442,
    "descripcion": "Verduras Juliana 14 onz.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 443,
    "descripcion": "Snacks Diana 20 grs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 444,
    "descripcion": "Bolsa de Salchicha 10 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 445,
    "descripcion": "Bolsa de Lomo 10 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 446,
    "descripcion": "Bolsa de Carne para Hilachas 3 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 447,
    "descripcion": "Salsita Naturas Variedad",
    "udm": "Bolsita",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 448,
    "descripcion": "Harina para crepa 400 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 449,
    "descripcion": "Stevia caja 70 sobres",
    "udm": "Caja",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 450,
    "descripcion": "Cus Cus 250 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 451,
    "descripcion": "Coditos con queso 400 gr.",
    "udm": "Caja",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 452,
    "descripcion": "Flan 60 gr.",
    "udm": "Caja",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 453,
    "descripcion": "Mezcla para helado 130 gr.",
    "udm": "Caja",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 454,
    "descripcion": "Hongos en lata 184 gr.",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 455,
    "descripcion": "Pasta de Tomate 340 gr.",
    "udm": "Lata",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 456,
    "descripcion": "Salsa de Tomate 114 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 457,
    "descripcion": "Crema de Tomate 200 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 458,
    "descripcion": "Cereal 90 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 459,
    "descripcion": "Cereal 620 gr.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 460,
    "descripcion": "Bolsa de Embutido 10 lbs. Variado",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 461,
    "descripcion": "Bolsa de Carne Prensada 10 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 462,
    "descripcion": "Fruta Mango",
    "udm": "unidad",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 463,
    "descripcion": "Manzana deshidratada bolsa",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 464,
    "descripcion": "Bolsa de Longaniza 10 lbs.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 465,
    "descripcion": "Cereal 900 gr.",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 466,
    "descripcion": "Cereal 1250 gr.",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 467,
    "descripcion": "Cereal 250 gr.",
    "udm": "Caja",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 468,
    "descripcion": "Cereal 140 gr.",
    "udm": "Caja",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 469,
    "descripcion": "Avena grano entero 3.5 lbs",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 470,
    "descripcion": "Cereal 400 gr.",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 471,
    "descripcion": "Cereal 670 gr.",
    "udm": "Bolsa",
    "categoria": "cereal",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 472,
    "descripcion": "Café instantaneo 260 gr.",
    "udm": "Frasco",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 473,
    "descripcion": "Frijol volteado 96 onz.",
    "udm": "Bolsa",
    "categoria": "",
    "almacen": "Almacén 1",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  }

  // 👉 Pegá aquí todos tus registros convertidos desde MySQL
];

async function subirDatosDesdeMySQL() {
  try {
    const ids = new Set();
    for (const item of datosDesdeMySQL) {
      if (!item.id || ids.has(item.id)) {
        console.warn("❌ ID duplicado o faltante:", item);
        continue;
      }
      ids.add(item.id);
      await setDoc(doc(db, "inventarioAlimentos", item.id.toString()), item);
    }
    alert("✅ Datos subidos con tus propios IDs");
    cargarDatos();
  } catch (error) {
    console.error("❌ Error al subir los datos:", error);
    alert("Ocurrió un error. Revisá la consola.");
  }
}


// 🚀 Ejecutalo una sola vez (descomentá si querés subir los datos)
//subirDatosDesdeMySQL();
//eliminarTodosLosDocumentos();
// 🟢 Cargar tabla al iniciar
cargarDatos();