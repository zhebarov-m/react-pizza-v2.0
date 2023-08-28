import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PizzaInfo.module.scss";

const PizzaInfo: React.FC = () => {
  const params = useParams();
  const [pizzaInfo, setPizzaInfo] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    async function fetchPizzaId() {
      try {
        const { data } = await axios.get(
          "https://64ab85860c6d844abedf760e.mockapi.io/pizzaData/" + params.id
        );
        setPizzaInfo(data);
      } catch (error) {
        if (error instanceof Error) {
          // TypeScript теперь знает, что error является экземпляром класса Error
          alert(error.message);
        }
      }
    }
    fetchPizzaId();
  }, []);

  if (!pizzaInfo) {
    return (
      <p style={{ textAlign: "center", fontSize: "40px", fontWeight: "400" }}>
        Загрузка...
      </p>
    );
  }

  return (
    <div className={styles.pizzaInfo}>
      <img src={pizzaInfo.imageUrl} alt="" />
      <h1>{pizzaInfo.title}</h1>
      <h2>{pizzaInfo.price} руб.</h2>
    </div>
  );
};

export default PizzaInfo;
