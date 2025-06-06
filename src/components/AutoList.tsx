import { useState, useEffect } from "react";
import { useAutoContext } from "../context/AutoContext";
import AutoCard from "./AutoCard";
import '../App.css'; 

const AutoList = () => {
  const [colorFiltro, setColorFiltro] = useState<string>("Todos");
  const [autoSeleccionado, setAutoSeleccionado] = useState<number | null>(null);
  const [autos, setAutos] = useState<any[]>([]);
  const { favoritos, agregarFavorito } = useAutoContext();

  useEffect(() => {
    import("../data/autos.json").then((mod) => {
      setAutos(mod.default);
    });
  }, []);

  const coloresUnicos = [
    "Todos",
    ...Array.from(new Set(autos.map((auto) => auto.color))),
  ];

  const autosFiltrados =
    colorFiltro === "Todos"
      ? autos
      : autos.filter((auto) => auto.color === colorFiltro);

  const esFavorito = (id: number) => favoritos.some((a) => a.id === id);

  if (autoSeleccionado !== null) {
    const auto = autos.find((a) => a.id === autoSeleccionado);
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
              style={{
                cursor: "pointer",
                backgroundColor: auto.anio < 2020 ? "yellow" : undefined,
              }}
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
