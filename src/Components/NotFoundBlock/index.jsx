import React from "react";
import styles from "./NotFoundBlock.module.scss";

function index() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует
      </p>
    </div>
  );
}

export default index;
