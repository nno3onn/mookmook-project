import styles from './index.module.scss';

const ButtonComponent = ({
  label,
  width,
  backgroundColor = '#003366',
  color = 'white',
  handleClick,
}) => (
  <button
    className={styles['button-wrapper']}
    style={{
      width,
      backgroundColor,
      color,
    }}
    onClick={handleClick}
  >
    {label}
  </button>
);

export default ButtonComponent;
