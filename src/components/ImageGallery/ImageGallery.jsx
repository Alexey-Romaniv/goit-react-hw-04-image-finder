import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from '../../styles.module.css';

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
