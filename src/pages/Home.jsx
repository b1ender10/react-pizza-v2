import React, { useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categorySelected, setCategorySelected] = useState(0);
  const [sortSelected, setSortSelected] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurentPage] = useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categorySelected > 0 ? `category=${categorySelected}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortSelected.sortProperty}&order=${sortOrder}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categorySelected, sortSelected, sortOrder, searchValue, currentPage]);

  const pizzas = items.map((object) => <PizzaBlock key={object.id} {...object} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categorySelected} setter={setCategorySelected} />
        <Sort
          sortSelected={sortSelected}
          setterSortSelected={setSortSelected}
          sortOrder={sortOrder}
          setterSortOrder={setSortOrder}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination setCurentPage={setCurentPage} />
    </div>
  );
};

export default Home;
