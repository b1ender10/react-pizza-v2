import React from 'react';

function Categories(params) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => {
          return (
            <li
              key={index} // can be used index if array is static
              className={params.value === index ? 'active' : ''}
              onClick={() => {
                params.setter(index);
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
