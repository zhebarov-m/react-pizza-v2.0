import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import { popupList } from "../components/Sort";
import Sort from "../components/Sort";

import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";
import axios from "axios";
import { setFilters } from "../redux/slices/filterSlice";

function Home() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sortType } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state.search.searchValue);

  const sort = `sortBy=${sortType.sort}&order=asc`;
  const search = searchValue ? `&search=${searchValue}` : "";
  const category = categoryId > 0 ? `&category=${categoryId}` : "";

  const PIZZA_API_URL = "https://64ab85860c6d844abedf760e.mockapi.io/films";

  const fetchPizzas = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${PIZZA_API_URL}?${sort}${category}${search}`
      );
      const data = await response.data;
      setPizzas(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
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

      dispatch(
        setFilters({
          ...params,
          sort: sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
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
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza, index) => (
              <PizzaCard key={pizza.id} {...pizza} />
            ))}
      </div>
    </>
  );
}

export default Home;
