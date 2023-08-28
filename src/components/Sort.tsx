import React, { useEffect, useRef, useState } from "react";
import { RxTriangleUp } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, tSort } from "../redux/slices/filterSlice";
import styles from "./Sort.module.scss";
import { RootState } from "../redux/store";

export const popupList: tSort[] = [
  { name: "популярности", sort: "rating" },
  { name: "цене", sort: "price" },
  { name: "алфавиту", sort: "title" },
];
const Sort: React.FC = () => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sortType = useSelector((state: RootState) => state.filter.sortType);
  const dispatch = useDispatch();

  const handleSelectedItem = (sort: tSort) => {
    dispatch(setSortType(sort));
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    document.body.addEventListener('click', e => {
      
    })
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="sort-text">
          {
            <RxTriangleUp
              className={`${styles.triangleSortIcon} ${
                isVisible ? styles.rotateIcon : ""
              }`}
            />
          }
          <b>Сортировка по:</b>
        </div>
        <span onClick={() => setIsVisible(!isVisible)}>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {popupList.map((itemObj, id) => (
              <li
                key={id}
                onClick={() => handleSelectedItem(itemObj)}
                className={itemObj.sort === sortType.sort ? "active" : ""}
              >
                {itemObj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
