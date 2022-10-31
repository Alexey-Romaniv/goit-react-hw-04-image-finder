import s from '../../styles.module.css';
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
