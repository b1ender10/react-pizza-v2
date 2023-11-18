import React, { useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categorySelected, setCategorySelected] = useState(0);
  const [sortSelected, setSortSelected] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items?${
        categorySelected > 0 ? `category=${categorySelected}` : ''
      }&sortBy=${sortSelected.sortProperty}&order=desc`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categorySelected, sortSelected]);

  // React.useEffect(() => {
  //   let url = new URL('https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items');

  //   if (categorySelected > 0) {
  //     url.searchParams.append('category', categorySelected);
  //   }

  //   if (sortSelected === 0) {
  //     url.searchParams.append('sortBy', 'rating');
  //   }

  //   if (sortSelected === 1) {
  //     url.searchParams.append('sortBy', 'price');
  //   }

  //   if (sortSelected === 2) {
  //     url.searchParams.append('sortBy', 'title');
  //   }

  //   fetch(url)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => {
  //       setItems(json);
  //       setIsLoading(false);
  //     });
  // }, [categorySelected, sortSelected]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categorySelected} setter={setCategorySelected} />
        <Sort value={sortSelected} setter={setSortSelected} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((object) => <PizzaBlock key={object.id} {...object} />)}
      </div>
    </div>
  );
};

export default Home;
