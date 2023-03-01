import styles from './ResolutionSetting.module.css';
import boxHeight from '../../../../public/icon/boxHeight.svg';
import boxWidth from '../../../../public/icon/boxWidth.svg';
import relution from '../../../../public/icon/relution.svg';
import { animated } from '@react-spring/web';
import TextBoxWithImage from '../Common/TextBoxWithImage/TextBoxWithImage';
import SelectWithImageAndText from '../Common/SelectWithImageAndText/SelectWithImageAndText';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../store/action';

const ResolutionSetting = (props:any) => {
    const { style } = props;
    const screenWidth = useSelector((state:any) => state.screenWidth);
    const screenHeight = useSelector((state:any) => state.screenHeight);
    const dispatch = useDispatch();
    return (
        <animated.div className={styles.panelBody} style={style}>
            <TextBoxWithImage icon={boxWidth} title='宽度' defaultValue={screenWidth}
                onBlur={(e:any)=>dispatch(update('screenWidth', e.target.value))}
            />
            <TextBoxWithImage icon={boxHeight} title='高度' defaultValue={screenHeight}
                onBlur={(e:any)=>dispatch(update('screenHeight', e.target.value))}
            />
            <SelectWithImageAndText icon={relution} title='宽高比' options={['自定义', '4:3', '16:9']}/>
        </animated.div>
    )
}

export default ResolutionSetting;