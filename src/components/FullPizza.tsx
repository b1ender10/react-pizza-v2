import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPizza } from '../redux/slices/fullPizza/fullPizzaSlice.ts';

const FullPizza: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { item, status } = useSelector((state : any) => state.fullPizza);

  React.useEffect(() => {
    dispatch(fetchPizza(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      {status === 'error' ? (
        'Такой пиццы не сущесвует :('
      ) : status === 'loading' ? (
        'Загрузка...'
      ) : (
        <>
          <img src={item.imageUrl} alt="Пицца" />
          <h2>{item.title}</h2>
        </>
      )}
    </div>
  );
};

export default FullPizza;
