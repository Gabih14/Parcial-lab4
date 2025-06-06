import { useAutoContext } from "../context/AutoContext";
import '../App.css'; 

const Favoritos = () => {
  const { favoritos, quitarFavorito } = useAutoContext();

  if (favoritos.length === 0) {
    return <p>No hay autos en favoritos.</p>;
  }

  return (
    <div className="favoritos">
      <h2>Autos Favoritos</h2>
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
          {favoritos.map((auto) => (
            <tr key={auto.id} className={`card ${auto.anio < 2020 ? "destacado" : ""}`}>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.anio}</td>
              <td>{auto.color}</td>
              <td>${auto.precio.toLocaleString()}</td>
              <td>
                <button onClick={() => quitarFavorito(auto.id)}>
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favoritos;