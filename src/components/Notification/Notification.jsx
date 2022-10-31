import PropTypes from 'prop-types';
import s from '../../styles.module.css';

export const Notification = ({ msg }) => {
  return <h2 className={s.Notification}>{msg}</h2>;
};

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
};
