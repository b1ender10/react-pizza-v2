import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPizza, selectorFullPizza } from '../redux/slices/fullPizza/fullPizzaSlice';
import { useAppDispatch } from '../redux/store';
// import { RootState } from '../redux/store';
import { StatusType } from '../redux/slices/fullPizza/fullPizzaSlice';

const FullPizza: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { item, status } = useSelector(selectorFullPizza);

  React.useEffect(() => {
    dispatch(fetchPizza(id));
  }, [dispatch, id]);

  if (status === StatusType.loading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      {status === StatusType.error ? (
        'Такой пиццы не сущесвует :('
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
