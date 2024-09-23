import { Cell } from "../types";

export const generateMatrix = (M: number, N: number): Cell[][] => {
  let idCounter = 1;
  return Array.from({ length: M }, () =>
    Array.from({ length: N }, () => ({
      id: idCounter++,
      amount: Math.floor(100 + Math.random() * 900),
    }))
  );
};

// export const calculateRowSums = (matrix: Cell[][]): number[] => {
//   return matrix.map((row) => row.reduce((sum, cell) => sum + cell.amount, 0));
// };

export const calculateColumnPercentiles = (matrix: Cell[][]): number[] => {
  const columns = matrix[0].length;
  const columnValues: number[][] = Array.from(
    { length: columns },
    (_, colIdx) => matrix.map((row) => row[colIdx].amount)
  );

  return columnValues.map((colValues) => {
    const sorted = [...colValues].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  });
};

export const findNearestCells = (
  matrix: Cell[][],
  targetValue: number,
  X: number
) => {
  const allCells = matrix.flat();
  allCells.sort(
    (a, b) =>
      Math.abs(a.amount - targetValue) - Math.abs(b.amount - targetValue)
  );

  return allCells.slice(0, X);
};
