import styles from './Gallery.module.css';
import { useNavigate } from 'react-router-dom';
import pngMainIcon from '../../../../public/pngMainIcon.png';
import krkrIcon from '../../../../public/krkrIcon.svg';
import readDocIcon from '../../../../public/icon/readDoc.svg';
import makeGameIcon from '../../../../public/icon/makeGame.svg';


const Gallery = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.gallery} >
      <img src={krkrIcon} className={styles.krkrIcon} alt='KrKrIcon' />
      <img src={pngMainIcon} className={styles.pngMainIcon} alt='pngMainIcon' />
      <div className={styles.quickStartPart}>
        <div className={styles.produceArea}>
          <button className={styles.makeGameButton} onClick={()=>navigate('/Factory')}>
            <img src={makeGameIcon} className={styles.quickStartIcon} alt='makeGameIcon'/>
          </button>
          <p className={styles.textHead}>制作脚本</p>
          <p className={styles.textContent}>纸上得来终觉浅。进入图形化工作界面，大展一番身手，享受即时渲染Kag脚本的极致快乐。</p>
        </div>
        <div className={styles.documentArea}>
          <button className={styles.readDocButton} onClick={()=>navigate('/Library')}>
            <img src={readDocIcon} className={styles.quickStartIcon} alt='readDocIcon'/>
          </button>
          <p className={styles.textHead}>查阅文档</p>
          <p className={styles.textContent}>已为您统合了散布在网络中、可授权的、可公开的、与吉里吉里开发相关的教程。请愉快地开始浏览吧</p>
        </div>
      </div>
    </div>
  );
}

export default Gallery