import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeCategorySelected, selectorFilter } from '../redux/slices/filter/filterSlice';
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const { categorySelected } = useSelector(selectorFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => {
          return (
            <li
              key={index} // can be used index if array is static
              className={categorySelected === index ? 'active' : ''}
              onClick={() => {
                dispatch(changeCategorySelected(index));
              }}>
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
