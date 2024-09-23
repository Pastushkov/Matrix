import { useMatrix } from "../state/MatrixContext";
import {
  calculateColumnPercentiles,
  findNearestCells,
  generateMatrix,
} from "../services/matrix-service";
import { useState } from "react";
import { Cell } from "../types";
import trashIcon from "../../public/assets/trash.svg";
import plusIcon from "../../public/assets/plus.svg";
import styles from "./MatrixTable.module.css";

export const MatrixTable = () => {
  const { matrix, setMatrix, X } = useMatrix();
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);
  const [rowPercentages, setRowPercentages] = useState<number[]>([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  if (matrix.length === 0) return <p>No data available</p>;

  const columnPercentiles = calculateColumnPercentiles(matrix);

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    const newMatrix = [...matrix];
    newMatrix[rowIdx][colIdx].amount += 1;
    setMatrix(newMatrix);
  };

  const handleCellHover = (hoveredCell: Cell) => {
    const nearestCells = findNearestCells(matrix, hoveredCell.amount, +X + 1);
    setHighlightedCells(nearestCells.map((cell) => cell.id));
  };

  const handleSumHover = (rowIdx: number) => {
    const row = matrix[rowIdx];
    const totalSum = row.reduce((sum, cell) => sum + cell.amount, 0);
    const rowPercentages = row.map((cell) => (cell.amount / totalSum) * 100);
    setRowPercentages(rowPercentages);
    setHoveredRowIndex(rowIdx);
  };

  const handleRemoveRow = (rowIdx: number) => {
    const newMatrix = matrix.filter((_, idx) => idx !== rowIdx);
    setMatrix(newMatrix);
  };

  const handleAddRow = () => {
    const newRow = generateMatrix(1, matrix[0].length)[0];
    setMatrix([...matrix, newRow]);
  };

  const calculateHeatmapColor = (amount: number, maxAmount: number) => {
    const intensity = (amount / maxAmount) * 100;
    return `rgba(255, 0, 0, ${intensity / 100})`;
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {Array.from({ length: matrix[0].length }, (_, idx) => (
              <th key={idx}>Col {idx + 1}</th>
            ))}
            <th>Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => {
            const maxAmountInRow = Math.max(...row.map((cell) => cell.amount));
            return (
              <tr key={rowIndex}>
                {row.map((cell, colIdx) => (
                  <td
                    key={cell.id}
                    onClick={() => handleCellClick(rowIndex, colIdx)}
                    onMouseEnter={() => handleCellHover(cell)}
                    onMouseLeave={() => setHighlightedCells([])}
                    className={`${
                      highlightedCells.includes(cell.id)
                        ? styles.highlighted
                        : ""
                    } ${styles.cell}`}
                    style={{
                      backgroundColor:
                        hoveredRowIndex === rowIndex && rowPercentages.length
                          ? calculateHeatmapColor(cell.amount, maxAmountInRow)
                          : "transparent",
                    }}
                  >
                    {hoveredRowIndex === rowIndex && rowPercentages.length
                      ? `${rowPercentages[colIdx].toFixed(2)}%`
                      : cell.amount}
                  </td>
                ))}
                <td
                  className={`${styles.cell} ${styles.pointer}`}
                  onMouseEnter={() => handleSumHover(rowIndex)}
                  onMouseLeave={() => setRowPercentages([])}
                >
                  {row.reduce((sum, cell) => sum + cell.amount, 0)}
                </td>
                <td className={`${styles.cell} ${styles.action_cell}`}>
                  <div className={styles.icon_wrapper}>
                    <div
                      className={styles.trash}
                      onClick={() => handleRemoveRow(rowIndex)}
                      style={{
                        WebkitMask: `url(${trashIcon})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
          <tr>
            {columnPercentiles.map((value, colIdx) => (
              <td key={colIdx} className={styles.cell}>
                {value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button className={styles.button} onClick={handleAddRow}>
        <div
          style={{
            WebkitMask: `url(${plusIcon})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
          }}
          className={styles.plus}
        />
        <span>New row</span>
      </button>
    </>
  );
};
