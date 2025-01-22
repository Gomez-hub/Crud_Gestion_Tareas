import React, { useEffect, useState } from "react";
//import api from './api/api.jsx';
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/tareas/");
    return setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <h1>Lista de tareas</h1>
      <ul>
        {data.map((tarea) => (
          <li key={tarea.id}>
            {tarea.Titulo} {tarea.Fecha} {tarea.Descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
