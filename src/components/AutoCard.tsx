import React from "react";
import type { Auto } from "../context/AutoContext";

type AutoCardProps = {
  auto: Auto;
  onAccion: () => void;
  esFavorito?: boolean;
  textoBoton?: string;
};

const AutoCard: React.FC<AutoCardProps> = ({
  auto,
  onAccion,
  esFavorito = false,
  textoBoton = "Agregar a Favoritos",
}) => {
  return (
    <div
      className="auto-card"
      style={auto.anio < 2020 ? { backgroundColor: "yellow" } : {}}
    >
      <h3>
        {auto.marca} {auto.modelo}
      </h3>
      <p>Año: {auto.anio}</p>
      <p>Color: {auto.color}</p>
      <p>Precio: ${auto.precio.toLocaleString()}</p>
      <button onClick={onAccion} disabled={esFavorito}>
        {esFavorito ? "En Favoritos" : textoBoton}
      </button>
    </div>
  );
};

export default AutoCard;