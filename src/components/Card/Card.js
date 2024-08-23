import commonStyles from "../../styles/common.module.css";
import Button from "../Button/Button";
import styles from "./card.module.css";
import * as THREE from 'three';


function CardFooter(props) {
  return (
    <div className={styles.cardFooter}>
      {props.footer ? <span>{props.footer}</span> : <span></span>}
      
      {props.footerButton ? <Button text={props.footerButton}/> : ''}
    </div>
  );
}

export default function Card(props) {

  return (
    <div className={`${commonStyles.container} ${styles.card}`}>
      <div className={styles.cardHeader}>
        <h3>{props.title}</h3>
      </div>
      <div className={styles.cardBody}>
        {props.children}
      </div>
      {props.footer || props.footerButton ?
        (
          <div>
            <div className={styles.footerSeparator}/>
            <CardFooter footer={props.footer} footerButton={props.footerButton}/>
          </div>)
      : ''}
    </div>
  );
}