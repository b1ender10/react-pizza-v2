import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => {
          return (
            <li
              key={index} // can be used index if array is static
              className={activeIndex === index ? 'active' : ''}
              onClick={() => setActiveIndex(index)}>
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
