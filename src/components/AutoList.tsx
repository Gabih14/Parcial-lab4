import { useState } from "react";
import autosData from "../data/autos.json";
import { useAutoContext } from "../context/AutoContext";
import AutoCard from "./AutoCard";
import '../App.css'; 

const AutoList = () => {
  const [colorFiltro, setColorFiltro] = useState<string>("Todos");
  const [autoSeleccionado, setAutoSeleccionado] = useState<number | null>(null);
  const { favoritos, agregarFavorito } = useAutoContext();

  const coloresUnicos = [
    "Todos",
    ...Array.from(new Set(autosData.map((auto) => auto.color))),
  ];

  const autosFiltrados =
    colorFiltro === "Todos"
      ? autosData
      : autosData.filter((auto) => auto.color === colorFiltro);

  const esFavorito = (id: number) => favoritos.some((a) => a.id === id);

  // Si hay un auto seleccionado, mostrar el AutoCard
  if (autoSeleccionado !== null) {
    const auto = autosData.find((a) => a.id === autoSeleccionado);
    if (!auto) return null;
    return (
      <div className="auto-list">
        <button onClick={() => setAutoSeleccionado(null)}>Volver al listado</button>
        <AutoCard
          auto={auto}
          onAccion={() => agregarFavorito(auto)}
          esFavorito={esFavorito(auto.id)}
        />
      </div>
    );
  }

  return (
    <div className="auto-list">
      <h2>Listado de Autos</h2>
      <label>
        Filtrar por color:{" "}
        <select
          value={colorFiltro}
          onChange={(e) => setColorFiltro(e.target.value)}
        >
          {coloresUnicos.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {autosFiltrados.map((auto) => (
            <tr
              key={auto.id}
              style={auto.anio < 2020 ? { backgroundColor: "yellow" } : {}}
              onClick={() => setAutoSeleccionado(auto.id)}
             
            >
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.anio}</td>
              <td>{auto.color}</td>
              <td>${auto.precio.toLocaleString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarFavorito(auto);
                  }}
                  disabled={esFavorito(auto.id)}
                >
                  {esFavorito(auto.id) ? "En Favoritos" : "Agregar a Favoritos"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutoList;
