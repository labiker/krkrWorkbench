import styles from './BackgroundLayer.module.css';
import { useState, useEffect } from 'react';

const BackgroundLayer = (props: any) => {
  const { src, alt } = props;
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.backgroundLayer}/>
    </div>
  );
}

export default BackgroundLayer;