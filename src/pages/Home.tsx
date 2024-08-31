import React from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import {
  setFilters,
  selectorFilter,
  changeCurrentPage,
  SortOrderOptions,
} from '../redux/slices/filter/filterSlice';
import { fetchPizzas, selectorPizza } from '../redux/slices/pizza/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categorySelected, searchValue, sortSelected, sortOrder, currentPage } =
    useSelector(selectorFilter);
  const { items, status } = useSelector(selectorPizza);

  const onChangePage = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  // Вытаскиваем параметры из url в redux и предотвращаем повторный запрос на бэкенд
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          currentPage: Number(params.currentPage),
          categorySelected: Number(params.category),
          searchValue: params.search as string,
          sortSelected: sort,
          sortOrder: params.sortOrder === 'desc' ? SortOrderOptions.desc : SortOrderOptions.asc,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если есть параметры в url, то не делаем запрос, т.к. будет повторный после изменения данных в redux
  React.useEffect(() => {
    const fetchingData = () => {
      const category = categorySelected > 0 ? `category=${categorySelected}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      const sort = sortSelected.sortProperty;
      const order = sortOrder + search;

      dispatch(fetchPizzas({ currentPage, category, sort, order }));
    };

    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchingData();
    }
    isSearch.current = false;
  }, [categorySelected, sortSelected, sortOrder, searchValue, currentPage, dispatch]);

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
  }, [categorySelected, sortSelected, currentPage, sortOrder, navigate]);

  const pizzas = items.map((object) => <PizzaBlock {...object} key={object.id} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Пиццы в наличии</h2>

      {status === 'error' ? (
        <>
          <div className="content__error">
            <h2>
              Ни одной пиццы не найдено <span>😕</span>
            </h2>
            <p>
              Вероятней всего произошла ошибка.
              <br />
              Попробуйте обновить страницу позже.
            </p>
          </div>
        </>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
