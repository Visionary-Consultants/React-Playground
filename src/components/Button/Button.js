import commonStyles from "../../styles/common.module.css";
import styles from "./button.module.css";



export default function Button(props) {
  return (
    <button className={`${styles.button} ${styles.primary} ${commonStyles.container}`}>{props.text}</button>
  );
}