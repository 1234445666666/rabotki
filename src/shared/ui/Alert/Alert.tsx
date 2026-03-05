import styles from "./Alert.module.css";

type AlertProps = {
  message: string;
  type?: "info" | "success" | "error";
};

export const Alert = ({ message, type = "info" }: AlertProps) => {
  return <div className={`${styles.alert} ${styles[type]}`}>{message}</div>;
};
