import styles from './SelectWithImageAndText.module.css';

const SelectWithImageAndText = (props: any) => {
  const { icon, title, options } = props;
  const optionList = options.map((value:string) =>
    <option key={value.toString()} className={styles.option}>{value}</option>
  );
  return (
    <div className={styles.container}>
      <button className={styles.clickArea}/>
      <img src={icon} className={styles.imageIcon} alt='imageIcon' />
      <p className={styles.title}>{title}</p>
      <select className={styles.select}>
        {optionList}
      </select>
    </div>
  )
}

export default SelectWithImageAndText;