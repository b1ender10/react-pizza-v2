import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { setFilters } from '../redux/slices/filter/filterSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categorySelected, searchValue, sortSelected, sortOrder, currentPage } = useSelector(
    (state) => state.filter,
  );

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchingData = () => {
    setIsLoading(true);

    const category = categorySelected > 0 ? `category=${categorySelected}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortSelected.sortProperty}&order=${sortOrder}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  // Вытаскиваем параметры из url в redux и предотвращаем повторный запрос на бэкенд
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если есть параметры в url, то не делаем запрос, т.к. будет повторный после изменения данных в redux
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchingData();
    }
    isSearch.current = false;
  }, [categorySelected, sortSelected, sortOrder, searchValue, currentPage]);

  // Пропускаем первый рендер, т.к. нам не нужно записывать данные из redux сразу в url, только если пользователь что-то изменит
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortSelected.sortProperty,
        categorySelected,
        currentPage,
        sortOrder,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categorySelected, sortSelected, currentPage, sortOrder]);

  const pizzas = items.map((object) => <PizzaBlock key={object.id} {...object} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
