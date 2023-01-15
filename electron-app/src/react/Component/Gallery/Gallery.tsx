// import krkrIcon from './krkrIcon.svg';
import styles from './Gallery.module.css';
import React, { useState, useEffect } from 'react';
import MinimizeIcon from '@mui/icons-material/HorizontalRule';
import MaximizeIcon from '@mui/icons-material/CropSquare';
import CloseIcon from '@mui/icons-material/Close';
import pngMainIcon from '../../../../public/pngMainIcon.png';
import krkrIcon from '../../../../public/krkrIcon.svg';
import closeAppIcon from '../../../../public/icon/closeAppIcon.svg';
import maximizeAppIcon from '../../../../public/icon/maximizeAppIcon.svg';
import minimizeAppIcon from '../../../../public/icon/minimizeAppIcon.svg';
import unmaximizeAppIcon from '../../../../public/icon/unmaximizeAppIcon.svg';

const Gallery = () => {
  const toMin = () => {
    window.controlProgram.minApp();
  }
  const toMax = () => {
    window.controlProgram.maxApp();
  }
  const toClose = () => {
    window.controlProgram.closeApp();
  }
  const [state, setState] = useState({
    currentMaximizeAppIcon: maximizeAppIcon,
    firstRender: true,
  })
  useEffect(()=>{
    if(state.firstRender){
      window.addEventListener('resize', () => {
        const object = document.getElementById('react-app').children[0];
        var nextMaximizeAppIcon = maximizeAppIcon;
        if(screen.availHeight === object.clientHeight && screen.availWidth === object.clientWidth){
          nextMaximizeAppIcon = unmaximizeAppIcon;
        }
        if(state.currentMaximizeAppIcon !== nextMaximizeAppIcon){
          setState(() => {
            const nextState = {
              currentMaximizeAppIcon: nextMaximizeAppIcon,
            }
            return {...state, ...nextState};
          });
        }
      });
      setState(() => {
        const nextState = {
          firstRender: false,
        }
        return {...state, ...nextState};
      });
    };
  });
  return (
    <div className={styles.gallery} >
      <div className={styles.header}>
          <img src={pngMainIcon} className={styles.pngSmallIcon} alt='pngSmallIcon' />
          <button className={styles.minimizeIcon} onClick={toMin}>
            <img src={minimizeAppIcon} alt='minimizeAppIcon' className={styles.minimizeAppIcon}/>
          </button>
          <button className={styles.maximizeIcon} onClick={toMax}>
            <img src={state.currentMaximizeAppIcon} alt='maximizeAppIcon' className={styles.maximizeAppIcon}/>
          </button>
          <button className={styles.closeIcon} onClick={toClose}>
            <img src={closeAppIcon} alt='closeAppIcon' className={styles.closeAppIcon}/>
          </button>
      </div>
      <img src={krkrIcon} className={styles.krkrIcon} alt='KrKrIcon' />
      <img src={pngMainIcon} className={styles.pngMainIcon} alt='pngMainIcon' />
    </div>
  );
}

export default Gallery