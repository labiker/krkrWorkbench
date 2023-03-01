import styles from './Factory.module.css';
import InspectorWindow from '../InspectorWindow/InspectorWindow';
import SettingPanel from '../SettingPanel/SettingPanel';

const Factory = () => {
  return (
    <div className={styles.factory} >
      <InspectorWindow/>
      <SettingPanel/>
    </div>
  );
}

export default Factory;