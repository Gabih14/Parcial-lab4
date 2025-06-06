import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Auto = {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  color: string;
};

type AutoContextType = {
  favoritos: Auto[];
  agregarFavorito: (auto: Auto) => void;
  quitarFavorito: (id: number) => void;
};

const AutoContext = createContext<AutoContextType | undefined>(undefined);

export const AutoProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<Auto[]>([]);

  const agregarFavorito = (auto: Auto) => {
    if (!favoritos.some((a) => a.id === auto.id)) {
      setFavoritos((prev) => [...prev, auto]);
    }
  };

  const quitarFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((auto) => auto.id !== id));
  };

  return (
    <AutoContext.Provider value={{ favoritos, agregarFavorito, quitarFavorito }}>
      {children}
    </AutoContext.Provider>
  );
};

export const useAutoContext = () => {
  const context = useContext(AutoContext);
  if (!context) {
    throw new Error("useAutoContext debe usarse dentro de un <AutoProvider>");
  }
  return context;
};
