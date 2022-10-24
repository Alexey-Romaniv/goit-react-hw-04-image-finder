import s from '../../styles.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ id, image, largeImage }) => {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={image}
        alt=""
        data-url={largeImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
