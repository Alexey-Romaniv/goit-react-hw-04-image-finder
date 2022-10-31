import PropTypes from 'prop-types';
import { useEffect } from 'react';
import s from './Modal.module.css';

export const Modal = ({ closeModal, url }) => {
  const closeByEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);
    window.addEventListener('click', closeByBackdrop);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
      window.removeEventListener('click', closeByBackdrop);
    };
  }, []);

  return (
    <div className={s.overlay} onClick={closeByBackdrop}>
      <div className={s.modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
