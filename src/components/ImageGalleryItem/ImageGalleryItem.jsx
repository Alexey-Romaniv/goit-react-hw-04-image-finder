import s from '../../styles.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ image, largeImage }, key) => {
  return (
    <li key={key} className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={image}
        alt=""
        data-url={largeImage}
      />
    </li>
  );
};

// ImageGalleryItem.propTypes = {
//   id: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };
