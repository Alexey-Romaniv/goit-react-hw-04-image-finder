import s from '../../styles.module.css';
import PropTypes from 'prop-types';

export const LoadMore = ({ handleNextPage }) => {
  return (
    <button className={s.Button} onClick={handleNextPage} type="button">
      Load More
    </button>
  );
};

LoadMore.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
};
