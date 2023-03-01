import styles from './WindowSetting.module.css';
import { animated } from '@react-spring/web';
import ImageWithTextButton from '../Common/ImageWithTextButton/ImageWithTextButton';
import resolutionIcon from '../../../../public/icon/resolutionIcon.svg';

const WindowSetting = (props:any) => {
    const { style, onClick } = props;
    return (
        <animated.div className={styles.panelBody} style={style}>
            <ImageWithTextButton icon={resolutionIcon}
                title='分辨率' descripe='调整游戏整体的分辨率'
                onClick={onClick}
            />
        </animated.div>
    )
}

export default WindowSetting;