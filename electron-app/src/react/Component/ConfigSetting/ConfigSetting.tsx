import styles from './ConfigSetting.module.css';
import { animated } from '@react-spring/web';
import ImageWithTextButton from '../Common/ImageWithTextButton/ImageWithTextButton';
import screenSettingIcon from '../../../../public/icon/screenSettingIcon.svg';

const ConfigSetting = (props:any) => {
    const { style, onClick } = props;
    return (
        <animated.div className={styles.panelBody} style={style}>
            <ImageWithTextButton icon={screenSettingIcon} title='窗口'
                descripe='游戏分辨率、文字层和前景层定位、各层次大小设置'
                onClick={ onClick }
            />
        </animated.div>
    )
}

export default ConfigSetting;