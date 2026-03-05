import styles from "./Input.module.css";

type InputProps = {
  placeholder?: string;
  value?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  placeholder,
  value,
  error,
  disabled,
  onChange,
}: InputProps) => {
  return (
    <div>
      <input
        className={`${styles.input} ${error ? styles.error : ""}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
