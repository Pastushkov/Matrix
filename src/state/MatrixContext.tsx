import { ReactNode, createContext, useContext, useState } from "react";
import { Cell, MatrixContextType } from "../types";

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context)
    throw new Error("useMatrix must be used within a MatrixProvider");
  return context;
};

export const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [X, setX] = useState<number | string>("");
  return (
    <MatrixContext.Provider value={{ matrix, setMatrix, X, setX }}>
      {children}
    </MatrixContext.Provider>
  );
};
