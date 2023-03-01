import styles from './ImageWithTextButton.module.css';

const ImageWithTextButton = (props: any) => {
  const { icon, title, descripe, onClick } = props;
  const normalButton = (
    <div className={styles.container} onClick={onClick}>
      <img src={icon} className={styles.imageIcon} alt='imageIcon' />
      <p className={styles.title}>{title}</p>
      <p className={styles.descripe}>{descripe}</p>
    </div>
  )
  return normalButton;
}

export default ImageWithTextButton;