export type Cell = {
  id: number;
  amount: number;
};
export type MatrixContextType = {
  matrix: Cell[][];
  setMatrix: (matrix: Cell[][]) => void;
  X: number | string;
  setX: React.Dispatch<React.SetStateAction<number | string>>;
};
