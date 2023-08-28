import styles from "./NotFoundB.module.scss";

const NotFoundBlock: React.FC = () => {
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
    //   <div className="content__error">
    //   <h2>
    //     Список пицц пуст <span>😕</span>
    //   </h2>
    //   <p>
    //     Вероятней всего, произошла какая-то ошибка.
    //     <br />
    //     Попробуйте чуть позже.
    //   </p>
    // </div>
  );
};

export default NotFoundBlock;
