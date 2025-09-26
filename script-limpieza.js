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

// 📌 Referencias
const formulario = document.getElementById("formulario");
const tabla = document.querySelector("#tabla tbody");
const dbRef = collection(db, "inventarioLimpieza");

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
      <td>${item.almacen}</td>
      <td>${item.stock}</td>
      <td>${item.inventario}</td>
      <td>${item.solicitar}</td>
    `;
    tabla.appendChild(fila);
  });
}

// ➕ Agregar nuevo registro (ID automático)
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    descripcion: document.getElementById("descripcion").value,
    udm: document.getElementById("udm").value,
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

  const ref = doc(db, "inventarioLimpieza", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return alert("No se encontró ningún registro con ese ID.");

  const item = snap.data();
  document.getElementById("descripcion").value = item.descripcion;
  document.getElementById("udm").value = item.udm;
  document.getElementById("almacen").value = item.almacen;
  document.getElementById("stock").value = item.stock;
  document.getElementById("inventario").value = item.inventario;
  document.getElementById("solicitar").value = item.solicitar;
};

// ✏️ Actualizar registro
window.actualizar = async () => {
  const id = document.getElementById("id").value.trim();
  if (!id) return alert("Ingrese un ID para actualizar.");

  const ref = doc(db, "inventarioLimpieza", id);
  const data = {
    descripcion: document.getElementById("descripcion").value,
    udm: document.getElementById("udm").value,
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

  const ref = doc(db, "inventarioLimpieza", id);
  await deleteDoc(ref);
  alert("Eliminado exitosamente");
  formulario.reset();
  cargarDatos();
};

// 🧩 Carga masiva desde MySQL con IDs personalizados
const datosDesdeMySQL = [
  
  {
    "id": 1,
    "descripcion": "Jabon de trastos tarro 400 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 26,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 2,
    "descripcion": "Jabon de trastos tarro 425 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 22,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 3,
    "descripcion": "Jabon de trastos tarro 1000 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 28,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 4,
    "descripcion": "Jabon de trastos tarro 800 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 10,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 5,
    "descripcion": "Jabon de trastos tarro 600 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 6,
    "descripcion": "Jabon de trastos tarro 500 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 3,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 7,
    "descripcion": "Jabon de trastos tarro 235 g",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 34,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 8,
    "descripcion": "Jabon de trastos barra variado",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 37,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 9,
    "descripcion": "Jabon de trastos liquido 750 ml",
    "udm": "Litros",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 10,
    "descripcion": "Jabon de trastos liquido 400 ml",
    "udm": "Litros",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 11,
    "descripcion": "Jabon de trastos liquido 1.2 L",
    "udm": "Litros",
    "almacen": "Almacen 2",
    "stock": 3,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 12,
    "descripcion": "Ajax 600 g",
    "udm": "Botella",
    "almacen": "Almacen 2",
    "stock": 6,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 13,
    "descripcion": "Jabon de trastos liquido 3785 ml",
    "udm": "Litros",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 14,
    "descripcion": "Toallas desinfectantes bote 565 g",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 7,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 15,
    "descripcion": "Toallas desinfectantes bote 80 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 10,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 16,
    "descripcion": "Toallas desinfectantes 598 g",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 17,
    "descripcion": "Esponja para baño",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 18,
    "descripcion": "Guantes de hule variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 19,
    "descripcion": "Trapos limpiadores",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 16,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 20,
    "descripcion": "Esponja de Alambre",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 8,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 21,
    "descripcion": "Esponja para superficie",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 6,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 22,
    "descripcion": "Toallas Humedas 80 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 555,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 23,
    "descripcion": "Toallas Humedas 72 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 24,
    "descripcion": "Toallas Humedas 100 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 50,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 25,
    "descripcion": "Toallas Humedas 112 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 26,
    "descripcion": "Toallas Humedas 184 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 27,
    "descripcion": "Toallas Humedas 60 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 18,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 28,
    "descripcion": "Toallas Humedas 96 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 23,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 29,
    "descripcion": "Toallas Humedas 120 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 10,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 30,
    "descripcion": "Toallas Humedas 48 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 15,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 31,
    "descripcion": "Toallas Humedas 15 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 11,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 32,
    "descripcion": "Insecticida variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 33,
    "descripcion": "Ambiental Variado",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 7,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 34,
    "descripcion": "Pasta Dental 125 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 126,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 35,
    "descripcion": "Pasta Dental 150 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 36,
    "descripcion": "Pasta Dental 140 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 37,
    "descripcion": "Pasta Dental 160 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 38,
    "descripcion": "Pasta Dental 100 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 39,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 39,
    "descripcion": "Pasta Dental 75 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 33,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 40,
    "descripcion": "Pasta Dental 66 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 43,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 41,
    "descripcion": "Pasta Dental 55 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 42,
    "descripcion": "Pasta Dental 50 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 24,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 43,
    "descripcion": "Pasta Dental 20 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 10,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 44,
    "descripcion": "Pasta Dental 22 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 49,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 45,
    "descripcion": "Pasta Dental 22 ml. Con Cepillo",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 25,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 46,
    "descripcion": "Cepillo de Inodoro con base",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 47,
    "descripcion": "Matamoscas",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 48,
    "descripcion": "Cepillo variado de baño",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 49,
    "descripcion": "Enjuague bucal 1 lt.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 50,
    "descripcion": "Escobas",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 51,
    "descripcion": "Escoba de ángulo",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 52,
    "descripcion": "Trapeador tipo bucle",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 53,
    "descripcion": "Toallas para trapeador",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 34,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 54,
    "descripcion": "Pega moscas",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 8,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 55,
    "descripcion": "Sapo de descarga para baño",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 56,
    "descripcion": "Jabon para manos 3785 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 57,
    "descripcion": "Jabon para baño",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 425,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 58,
    "descripcion": "Jabon para manos 5 lt.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 59,
    "descripcion": "Jabon para manos 3.785 lt. (Galón)",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 60,
    "descripcion": "Jabon para manos 1000 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 21,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 61,
    "descripcion": "Jabon para manos 450 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 62,
    "descripcion": "Jabon para manos 460 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 25,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 63,
    "descripcion": "Rasuradora Variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 124,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 64,
    "descripcion": "Kleenex paquete 50 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 65,
    "descripcion": "Desodorante en spray 150 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 22,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 66,
    "descripcion": "Desodorante en rollon 30 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 52,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 67,
    "descripcion": "Desodorante en rollon 20 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 68,
    "descripcion": "Desodotante en rollon 50 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 69,
    "descripcion": "Desodorante en rollon 50 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 70,
    "descripcion": "Desodorante en rollon 70 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 71,
    "descripcion": "Desodorante en barra 85 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 72,
    "descripcion": "Hisopos paquete 100 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 15,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 73,
    "descripcion": "Hisopos paquete 150 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 74,
    "descripcion": "Hisopos paquete 200 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 3,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 75,
    "descripcion": "Hisopos paquete 300 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 21,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 76,
    "descripcion": "Hisopos paquete 350 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 10,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 77,
    "descripcion": "Aceite para bebé 120 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 3,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 78,
    "descripcion": "Aceite para bebé 115 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 79,
    "descripcion": "Aceite para bebé 240 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 80,
    "descripcion": "Veladora",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 13,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 81,
    "descripcion": "Pomada para labios",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 2,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 82,
    "descripcion": "Toallas sanitarias",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 291,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 83,
    "descripcion": "Toallas protectoras",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 440,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 84,
    "descripcion": "Crema para cuerpo 300 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 85,
    "descripcion": "Crema para cuerpo 1 lt.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 86,
    "descripcion": "Crema para cuerpo 775 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 87,
    "descripcion": "Crema para cuerpo 920 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 88,
    "descripcion": "Crema para cuerpo 400 ml. Variado",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 89,
    "descripcion": "Espuma antibacterial 75 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 90,
    "descripcion": "Espuma de afeitar 395 g.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 6,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 91,
    "descripcion": "Desinfectante antibacterial spray 400 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 92,
    "descripcion": "Shampoo 190 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 93,
    "descripcion": "Shampoo 325 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 94,
    "descripcion": "Shampoo 375 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 95,
    "descripcion": "Shampoo 510 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 96,
    "descripcion": "Shampoo 830 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 4,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 97,
    "descripcion": "Shampoo 944 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 98,
    "descripcion": "Shampoo 1 lt.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 15,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 99,
    "descripcion": "Shampoo sobrecitos 10 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 100,
    "descripcion": "Shampoo sobrecitos 15 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 101,
    "descripcion": "Shampoo sobrecitos 20 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 0,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 102,
    "descripcion": "Peines para el cabello variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 44,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 103,
    "descripcion": "Talcos 200 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 3,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 104,
    "descripcion": "Talcos 250 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 3,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 105,
    "descripcion": "Talcos 300 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 5,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 106,
    "descripcion": "Talcos 340 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 107,
    "descripcion": "Talcos 400 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 108,
    "descripcion": "Guantes de Látex par",
    "udm": "pares",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 109,
    "descripcion": "Cepillo de dientes para niño",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 333,
    "solicitar": "hay suficiente"
  },
  {
    "id": 110,
    "descripcion": "Cepillo de dientes para adulto",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 353,
    "solicitar": "hay suficiente"
  },
  {
    "id": 111,
    "descripcion": "Bolsas de Tonel",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 40,
    "inventario": 139,
    "solicitar": "hay suficiente"
  },
  {
    "id": 112,
    "descripcion": "Bolsas para basura",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 40,
    "inventario": 134,
    "solicitar": "hay suficiente"
  },
  {
    "id": 113,
    "descripcion": "Trompeta plástica",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 114,
    "descripcion": "Pachones plásticos variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 39,
    "solicitar": "hay suficiente"
  },
  {
    "id": 115,
    "descripcion": "Limpia vidrios 780 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 116,
    "descripcion": "Trapeador con mango de metal",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 117,
    "descripcion": "Palo de escoba",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 18,
    "solicitar": "hay suficiente"
  },
  {
    "id": 118,
    "descripcion": "Clorox galón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 119,
    "descripcion": "Cloro 20 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 120,
    "descripcion": "Cloro galón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 121,
    "descripcion": "Cloro botella 1lt.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 122,
    "descripcion": "Cloro 1.89 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 123,
    "descripcion": "Desinfectante 10 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 124,
    "descripcion": "Desinfectante 2 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 125,
    "descripcion": "Desinfectante 5 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 9,
    "solicitar": "hay suficiente"
  },
  {
    "id": 126,
    "descripcion": "Desinfectante galón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 21,
    "solicitar": "hay suficiente"
  },
  {
    "id": 127,
    "descripcion": "Desinfectante botella 900 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 34,
    "solicitar": "hay suficiente"
  },
  {
    "id": 128,
    "descripcion": "Cloro 210 ml. Populino",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 129,
    "descripcion": "Cloro 900 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 130,
    "descripcion": "Desinfectante variedad bolsitas",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 10,
    "solicitar": "hay suficiente"
  },
  {
    "id": 131,
    "descripcion": "Desinfectante 700 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 132,
    "descripcion": "Desinfectante 750 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 133,
    "descripcion": "Desinfectante 675 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 134,
    "descripcion": "Desinfectante 450 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 135,
    "descripcion": "Detergente líquido 5 galones",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 136,
    "descripcion": "Detergente líquido 18 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 137,
    "descripcion": "Detergente líquido 10 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 138,
    "descripcion": "Detergente líquido 5 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 139,
    "descripcion": "Detergente líquido galón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 140,
    "descripcion": "Detergente líquido 3.5 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 141,
    "descripcion": "Detergente líquido 2 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 142,
    "descripcion": "Detergente líquido 550 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 143,
    "descripcion": "Detergente líquido 1 lt.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 144,
    "descripcion": "Detergente líquido 800 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 145,
    "descripcion": "Creolina botella 1000 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 146,
    "descripcion": "Detergente en polvo 9 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 147,
    "descripcion": "Detergente en polvo 8.5 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 148,
    "descripcion": "Detergente en polvo 5 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 9,
    "solicitar": "hay suficiente"
  },
  {
    "id": 149,
    "descripcion": "Detergente en polvo 4.5 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 150,
    "descripcion": "Detergente en polvo 4 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 151,
    "descripcion": "Detergente en polvo 2.5 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 152,
    "descripcion": "Detergente en polvo 2 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 153,
    "descripcion": "Detergente en polvo 1.8 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 154,
    "descripcion": "Detergente en polvo 1.65 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 155,
    "descripcion": "Detergente en polvo 1kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 156,
    "descripcion": "Detergente en polvo 900 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 157,
    "descripcion": "Detergente en polvo 850 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 158,
    "descripcion": "Detergente en polvo 800 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 159,
    "descripcion": "Detergente en polvo 500 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 160,
    "descripcion": "Detergente en polvo 400 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 161,
    "descripcion": "Detergente en polvo 250 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 162,
    "descripcion": "Detergente en polvo 35 gr populino",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 163,
    "descripcion": "Pañales de adulto talla L",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 470,
    "inventario": 1247,
    "solicitar": "hay suficiente"
  },
  {
    "id": 164,
    "descripcion": "Pañales de adulto talla M",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 68,
    "solicitar": "hay suficiente"
  },
  {
    "id": 165,
    "descripcion": "Pañales de niño talla XXXG",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 166,
    "descripcion": "Pañales de niño talla XXG",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 192,
    "solicitar": "hay suficiente"
  },
  {
    "id": 167,
    "descripcion": "Pañales de niño Recien Nacido",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 204,
    "solicitar": "hay suficiente"
  },
  {
    "id": 168,
    "descripcion": "Pañales de niño talla G",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 250,
    "solicitar": "hay suficiente"
  },
  {
    "id": 169,
    "descripcion": "Pañales de niño talla M",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 558,
    "solicitar": "hay suficiente"
  },
  {
    "id": 170,
    "descripcion": "Pañales de niño Etapa 3",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 40,
    "solicitar": "hay suficiente"
  },
  {
    "id": 171,
    "descripcion": "Pañales de niño Etapa 5",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 96,
    "solicitar": "hay suficiente"
  },
  {
    "id": 172,
    "descripcion": "Pañales de niño Etapa 4",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 173,
    "descripcion": "Pañales de niño Etapa 6",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 174,
    "descripcion": "Pañales de niño tipo calzón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 175,
    "descripcion": "Pañales de adulto tipo calzón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 299,
    "solicitar": "hay suficiente"
  },
  {
    "id": 176,
    "descripcion": "Pañales de adulto talla XL",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 17,
    "inventario": 130,
    "solicitar": "hay suficiente"
  },
  {
    "id": 177,
    "descripcion": "Pañales para niño Etapa 7",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 178,
    "descripcion": "Bola de jabón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 179,
    "solicitar": "hay suficiente"
  },
  {
    "id": 179,
    "descripcion": "Papel higienico variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 869,
    "solicitar": "hay suficiente"
  },
  {
    "id": 180,
    "descripcion": "Alcohol en gel galón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 181,
    "descripcion": "Jabon líquido para manos y cuerpo galón",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 182,
    "descripcion": "Detergente en polvo 15 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 183,
    "descripcion": "Esponja lavatrastos",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 184,
    "descripcion": "Shampoo 778 ml",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 185,
    "descripcion": "Shampoo Galon",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 10,
    "solicitar": "hay suficiente"
  },
  {
    "id": 186,
    "descripcion": "Cloro 5 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 187,
    "descripcion": "Desodorante Roll-on 50 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 188,
    "descripcion": "Desodorante Roll-on 60 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 189,
    "descripcion": "Desodorante Roll-on 75 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 190,
    "descripcion": "Jabón para manos 2000 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 191,
    "descripcion": "Shampoo 750 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 192,
    "descripcion": "Shampoo 488 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 193,
    "descripcion": "Shampoo 715 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 194,
    "descripcion": "Toallas limpiadoras",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 4,
    "solicitar": "hay suficiente"
  },
  {
    "id": 195,
    "descripcion": "Bombilla Led",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 196,
    "descripcion": "Jabón para manos 944 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 197,
    "descripcion": "Desinfectante 960 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 198,
    "descripcion": "Toallas Sanitaria Extagrandes",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 133,
    "solicitar": "hay suficiente"
  },
  {
    "id": 199,
    "descripcion": "Jabon para manos 2000 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 200,
    "descripcion": "Jabon de trastos liquido 610 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 201,
    "descripcion": "Desinfectante 500 ml",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 202,
    "descripcion": "Detergente liquido 4 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 203,
    "descripcion": "Detergente en polvo 1.5 kg.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 204,
    "descripcion": "Desodorante Roll-on 50 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": -1,
    "solicitar": "solicitar material"
  },
  {
    "id": 205,
    "descripcion": "Desodorante 73 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 206,
    "descripcion": "Desodorante Roll-on 65 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 207,
    "descripcion": "Crema para cuerpo 591 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 208,
    "descripcion": "Crema para cuerpo 250 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 209,
    "descripcion": "Toallas humedas 84 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 210,
    "descripcion": "Toallas humedas 36 U.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 211,
    "descripcion": "Shampoo 716 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 212,
    "descripcion": "Shampoo 730 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 213,
    "descripcion": "Shampoo 200 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 214,
    "descripcion": "Shampoo 444 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 215,
    "descripcion": "Jabon para manos 2200 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 216,
    "descripcion": "Jabon para manos 440 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 217,
    "descripcion": "Jabon para manos 525 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 218,
    "descripcion": "Pasta dental 178 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 6,
    "solicitar": "hay suficiente"
  },
  {
    "id": 219,
    "descripcion": "Pasta dental 204 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 220,
    "descripcion": "Aceite 100 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 221,
    "descripcion": "Lazos",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 11,
    "solicitar": "hay suficiente"
  },
  {
    "id": 222,
    "descripcion": "Jabon de trastos liquido 1000 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 223,
    "descripcion": "Jabon de trastos liquido 500 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 224,
    "descripcion": "Jabon de trastos tarro 850 gr.",
    "udm": "Tarro",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 225,
    "descripcion": "Detergente en polvo 2500 gr.",
    "udm": "Bolsa",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 226,
    "descripcion": "Jabon para manos 10 lts.",
    "udm": "Galon",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 227,
    "descripcion": "Cepillo para ropa",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 3,
    "solicitar": "hay suficiente"
  },
  {
    "id": 228,
    "descripcion": "Atomizadores grandes",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 12,
    "solicitar": "hay suficiente"
  },
  {
    "id": 229,
    "descripcion": "Atomizadores pequeños",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 17,
    "solicitar": "hay suficiente"
  },
  {
    "id": 230,
    "descripcion": "Pasta dental 60 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 231,
    "descripcion": "Pasta dental 63 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 232,
    "descripcion": "Pasta dental 70 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 8,
    "solicitar": "hay suficiente"
  },
  {
    "id": 233,
    "descripcion": "Desodorante Roll-on 84 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": -1,
    "solicitar": "solicitar material"
  },
  {
    "id": 234,
    "descripcion": "Desodorante en Barra 45 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 235,
    "descripcion": "Desodorante Roll-on 60 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 236,
    "descripcion": "Jabon liquido para trastos 400 gr.",
    "udm": "Bolsa",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 237,
    "descripcion": "Shampoo 400 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 238,
    "descripcion": "Cortauñas variedad",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 239,
    "descripcion": "Desodorante en spray 185 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 240,
    "descripcion": "Shampoo 1.18 lts.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 241,
    "descripcion": "Jabon para manos 500 gr.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 242,
    "descripcion": "Detergente en polvo 22 lbs.",
    "udm": "Bolsa",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 243,
    "descripcion": "Desinfectante 1.89 lts.",
    "udm": "Botella",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 244,
    "descripcion": "Jabon liquido para trastos 280 ml.",
    "udm": "Bolsa",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 245,
    "descripcion": "Desinfectante 1 lt.",
    "udm": "Botella",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 7,
    "solicitar": "hay suficiente"
  },
  {
    "id": 246,
    "descripcion": "Detergente liquido 20 lts.",
    "udm": "Bolsa",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 247,
    "descripcion": "Desinfectante 5 galones",
    "udm": "Galon",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 248,
    "descripcion": "Detergente liquido para ropa 5 galones",
    "udm": "Galon",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 0,
    "solicitar": "solicitar material"
  },
  {
    "id": 249,
    "descripcion": "Jabon líquido para trastos 500 ml.",
    "udm": "Botella",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 250,
    "descripcion": "Suavizante para ropa 2 lts.",
    "udm": "Botella",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 251,
    "descripcion": "Jabon para manos 350 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  },
  {
    "id": 252,
    "descripcion": "Crema para cuerpo 500 ml.",
    "udm": "Botella",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 1,
    "solicitar": "solicitar material"
  },
  {
    "id": 253,
    "descripcion": "Jabon para manos 221 ml.",
    "udm": "unitario",
    "almacen": "Almacen 2",
    "stock": 1,
    "inventario": 2,
    "solicitar": "hay suficiente"
  }
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
      await setDoc(doc(db, "inventarioLimpieza", item.id.toString()), item);
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

// 🟢 Cargar tabla al iniciar
cargarDatos();