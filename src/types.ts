export type Cell = {
  id: number;
  amount: number;
};
export type MatrixContextType = {
  matrix: Cell[][];
  setMatrix: (matrix: Cell[][]) => void;
};
