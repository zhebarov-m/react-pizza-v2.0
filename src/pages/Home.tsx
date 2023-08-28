import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import { popupList } from "../components/Sort";
import Sort from "../components/Sort";

import PizzaCard from "../components/PizzaCard/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType } = useSelector(
    (state: RootState) => state.filter
  );
  const { pizzas, status } = useSelector((state: RootState) => state.pizza);

  const dispatch = useAppDispatch();

  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );

  const getPizzas = async () => {
    const sort = `sortBy=${sortType.sort}&order=asc`;
    const search = searchValue ? `&search=${searchValue}` : "";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";

    dispatch(
      fetchPizzas({
        sort,
        search,
        category,
      })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sortType.sort,
          categoryId,
        },
        { skipNulls: true }
      );
      if (categoryId !== 0) {
        navigate(`?${queryString}`);
      } else {
        navigate("");
      }
    }

    isMounted.current = true;
  }, [categoryId, sortType]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = popupList.find((obj) => obj.sort === params.sortProperty);
      console.log(sort, params);

      if (sort) {
        dispatch(
          setFilters({
            categoryId: Number(params.categoryId),
            sortType: sort,
          })
        );
      }
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <NotFoundBlock />
      ) : (
        <div className="content__items">
          {status === "pending"
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((pizza, index) => (
                <PizzaCard key={pizza.id} {...pizza} />
              ))}
        </div>
      )}
    </>
  );
};

export default Home;
