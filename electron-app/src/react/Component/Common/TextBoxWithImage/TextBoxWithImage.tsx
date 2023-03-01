import styles from './TextBoxWithImage.module.css';
import { useState } from 'react';

const TextBoxWithImage = (props: any) => {
  const { icon, title, defaultValue, onBlur } = props;
  const [inputValue, setInputValue] = useState(defaultValue);
  return (
    <div className={styles.container}>
      <img src={icon} className={styles.imageIcon} alt='imageIcon' />
      <p className={styles.title}>{title}</p>
      <input className={styles.input} value={inputValue}
        onChange={e=>{
          setInputValue(e.target.value);
        }}
        onBlur={ onBlur }
      />
    </div>
  )
}

export default TextBoxWithImage;