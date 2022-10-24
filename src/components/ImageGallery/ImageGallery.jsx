import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from '../../styles.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ array, openModal }) => {
  return (
    <ul className={s.ImageGallery} onClick={e => openModal(e)}>
      {array.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          largeImage={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  array: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
