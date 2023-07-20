import styles from "./NotFoundB.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.rootNFB}>
      <h1>
        <span>😶‍🌫</span> <br />
        Ничего не найдено :(
      </h1>
      <p>
        <b>Причина:</b> данная страница не найдена в нашем интернет-магазине
      </p>
    </div>
  );
}

export default NotFoundBlock;
