import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategorySelected } from '../redux/sort/sortSlice';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const selector = useSelector((state) => state.sort);

  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => {
          return (
            <li
              key={index} // can be used index if array is static
              className={selector.categorySelected === index ? 'active' : ''}
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
}

export default Categories;
