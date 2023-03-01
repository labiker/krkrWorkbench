import styles from './ForegroundLayer.module.css';
import { useState, useEffect } from 'react';

const ForegroundLayer = (props: any) => {
  const { src, alt } = props;
  const [state, setState] = useState({
    firstRender: true,
    left: 0,
    top: 0,
    offsetX: 0,
    offsetY: 0,
  })
  const onMouseDown = (event: any) => {
    setState(() => {
      const nextState = {
        offsetX: event.nativeEvent.offsetX,
        offsetY: event.nativeEvent.offsetY,
      }
      return {...state, ...nextState};
    });
  }
  const onDrag = (event: any) => {
    setState(() => {
      const nextState = {
        isMouseDown: false,
        left: event.clientX - state.offsetX,
        top: event.clientY - 35 - state.offsetY,
      }
      return {...state, ...nextState};
    });
  };
  useEffect(()=>{
    if(state.firstRender){
      setState(() => {
        const nextState = {
          firstRender: false,
        }
        return {...state, ...nextState};
      });
    };
  });
  return (
    <div className={styles.container} style={{left:state.left + 'px', top:state.top + 'px'}}>
      <img src={src} alt={alt} className={styles.foregroundLayer} onMouseDown={ e => onMouseDown(e) } onDrag={ e => onDrag(e) } onDragEnd={ e => onDrag(e) }/>
    </div>
  );
}

export default ForegroundLayer;