import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tareas/";

const Items = () => {
  const [items, setItems] = useState([]); //items almacena las tareas obtenidas del backend
  const [form, setForm] = useState({ Titulo: "", Fecha: "", Descripcion: "" }); //form Guarda los valores del formulario para agregar una nueva tarea

  useEffect(() => { //se ejecuta cuando el componente se carga gracias a useEffect
    fetchItems();
  }, []);

  const fetchItems = async () => { //Obtiene tareas desde la API(fetchItems)
    try {
      const response = await axios.get(API_URL); //Obtiene las tareas desde la API
      setItems(response.data); //Guarda los datos en el estado items
    } catch (error) {
      console.error("Error fetching items:", error); //se muestra en consola si hay un error
    }
  };

  const handleInputChange = (e) => { //se ejecuta cada vez que el usuario escribe en un input
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); //Actualiza el estado form con los valores de los inputs
  };



//ENVIAR EL FORMULARIO
  const handleSubmit = async (e) => {  
    e.preventDefault(); //Evita que el formulario se envíe de forma tradicional
    try {
      const formattedData = { 
        ...form, 
        Fecha: new Date(form.Fecha).toISOString().split("T")[0] // Formato YYYY-MM-DD
      };
      await axios.post(API_URL, formattedData); //se envian los datos a la API para agregar una nueva tarea
      setForm({ Titulo: "", Fecha: "", Descripcion: "" });
      fetchItems();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  //ELIMINAR UNA TAREA
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`); //se envia la solicitud a la API para eliminar la tarea
      fetchItems(); //actualiza la lista de tareas
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Gestión de Tareas</h1>
      <form onSubmit={handleSubmit} className="bg-sky-700 p-6 rounded-lg shadow-md w-96">
        <input
          name="Titulo"
          value={form.Titulo}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          name="Fecha"
          value={form.Fecha}
          onChange={handleInputChange}
          placeholder="Date"
          required
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md mb-2 "
        />
        <input
          name="Descripcion"
          value={form.Descripcion}
          onChange={handleInputChange}
          placeholder="Descripción"
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        
        <button className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition">
          Agregar Tarea
        </button>
      </form>

      <ul className="mt-6 w-96">
        {items.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded-md shadow-md flex justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{item.Titulo}</h3>
              <p className="text-gray-500">{item.Fecha}</p>
              <p className="text-green-500 font-bold">{item.Descripcion}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
