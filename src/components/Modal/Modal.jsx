import PropTypes from 'prop-types';
import { useEffect } from 'react';
import s from './Modal.module.css';

export const Modal = ({ closeModal, url }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const closeByEsc = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

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
