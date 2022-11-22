import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Categories from "../Components/Categories";
import Sort, { list } from "../Components/Sort";
import axios from "axios";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import Pagination from "../Components/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../Redux/slices/filterSlice";
import {
  setItems,
  fetchPizzas,
  selectPizzaItems,
} from "../Redux/slices/pizzaSlice";

const Home = () => {
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaItems); // status состояние загрузки
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  // const [categoryId, setCategoryId] = React.useState(0);
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : ""; // запрос на бэкэнд поиск

    dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, currentPage, searchValue]); // [] Обозначает для useEffect, что код следует выполнить один раз после первого рендера

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort value={sortType} />
      </div>
      {status == "error" ? (
        <div />
      ) : (
        <h2 className="content__title">Все пиццы</h2>
      )}
      {status == "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            Во время загрузки произошла ошибка. Повторите попытку позже или
            обратитесь в поддержку: hsnlvsea@pizza.com
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status == "loading" // Условие на загрузку, пока данные грузятся, подкидываем компонент-скилет
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
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => onChangePage(number)}
      />
    </>
  );
};

export default Home;
