import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";



const Categories:React.FC = () => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();

  const hundlerClickCategory = (index:number) => dispatch(setCategoryId(index));

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианское",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            key={id}
            onClick={() => hundlerClickCategory(id)}
            className={categoryId === id ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
