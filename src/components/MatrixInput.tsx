import { useState } from "react";
import { useMatrix } from "../state/MatrixContext";
import { generateMatrix } from "../services/matrix-service";
import styles from "./MatrixInput.module.css";

export const MatrixInput = () => {
  const { setMatrix } = useMatrix();
  const [M, setM] = useState<number | string>("");
  const [N, setN] = useState<number | string>("");

  const handleSubmit = () => {
    const newMatrix = generateMatrix(+M, +N);
    setMatrix(newMatrix);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number | string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (/^\d*$/.test(value)) {
        let numberValue = Number(value);

        if (numberValue < 0) numberValue = 0;
        if (numberValue > 100) numberValue = 100;

        setter(numberValue);
      }
    };

  return (
    <div className={styles.input_wrapper}>
      <input
        className={styles.input}
        value={M}
        onChange={handleInputChange(setM)}
        placeholder="Rows (M)"
        max={100}
        min={0}
      />
      <input
        className={styles.input}
        value={N}
        onChange={handleInputChange(setN)}
        placeholder="Columns (N)"
        max={100}
        min={0}
      />
      <button
        onClick={handleSubmit}
        className={styles.button}
        disabled={!M || !N}
      >
        Generate Matrix
      </button>
    </div>
  );
};
