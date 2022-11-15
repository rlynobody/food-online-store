import React from "react";
import ReactPaginate from "react-paginate";
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import Pagination from "../Components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // Состояние идет ли загрузка
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "По убыванию цены",
    sortProperty: "price",
  });

  React.useEffect(() => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : ""; // запрос на бэкэнд поиск
    setIsLoading(true);

    fetch(
      `https://6363b07f8a3337d9a2e4920d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]); // [] Обозначает для useEffect, что код следует выполнить один раз после первого рендера

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => setCategoryId(index)}
        />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* <PizzaBlock title='Мексиканская' price={500}/> */}
        {isLoading // Условие на загрузку, пока данные грузятся, подкидываем компонент-скилет
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />) //_, заглушка для map, данных нет
          : items
              // Способ поиска через фронт
              // подходит, когда информации мало и надо сделать быстрый поиск
              // .filter((obj) => {
              //   if (
              //     obj.title.toLowerCase().includes(searchValue.toLowerCase())
              //   ) {
              //     return true;
              //   }
              //   return false;
              // })
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
