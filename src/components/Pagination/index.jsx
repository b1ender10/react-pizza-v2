import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { changeCurrentPage } from '../../redux/slices/filter/filterSlice';

import styles from './Pagination.module.scss';

export const Pagination = () => {
  const dispatch = useDispatch();

  const onChange = (event) => {
    dispatch(changeCurrentPage(event.selected + 1));
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onChange}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
