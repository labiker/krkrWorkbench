import styles from './SettingPanel.module.css';
import { useState } from 'react';
import { useSpring } from '@react-spring/web';
import ConfigSetting from '../ConfigSetting/ConfigSetting';
import WindowSetting from '../WindowSetting/WindowSetting';
import ResolutionSetting from '../ResolutionSetting/ResolutionSetting';

const SettingPanel = () => {
    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }));
    const [state, setState] = useState({
        panelNavigation: (
            <ol>
                <li><button className={styles.selected}>设置面板</button></li>
            </ol>
        ),
        objectPanel: <ConfigSetting style={{...springs}} onClick={() => clickSettingPanelButton('窗口')}/>
    })
    const clickSettingPanelButton = (src:string) => {
        api.start({
          from: {
            x: 0,
          },
          to: {
            x: -1200,
          },
        });
        setTimeout(()=>{
            switch(src){
                case '窗口': {
                    setState(() => {
                        const nextState = {
                            panelNavigation: (
                                <ol>
                                    <li><button onClick={() => clickSettingPanelButton('')}>设置面板</button></li>
                                    <li><button className={styles.selected}>　{'>'}　窗口</button></li>
                                </ol>
                            ),
                            objectPanel: <WindowSetting style={{...springs}} onClick={() => clickSettingPanelButton('分辨率')}/>
                        };
                        return {...state, ...nextState};
                    });
                    api.start({ from: { x: 500}, to: { x: 0 } });
                    break;
                }
                case '分辨率': {
                    setState(() => {
                        const nextState = {
                            panelNavigation: (
                                <ol>
                                    <li><button onClick={() => clickSettingPanelButton('')}>设置面板</button></li>
                                    <li><button onClick={() => clickSettingPanelButton('窗口')}>　{'>'}　窗口</button></li>
                                    <li><button className={styles.selected}>　{'>'}　分辨率</button></li>
                                </ol>
                            ),
                            objectPanel: <ResolutionSetting style={{...springs}}/>
                        };
                      return {...state, ...nextState};
                    });
                    api.start({ from: { x: 500}, to: { x: 0 } });
                    break;
                }
                default: {
                    setState(() => {
                        const nextState = {
                            panelNavigation: (
                                <ol>
                                    <li><button className={styles.selected}>设置面板</button></li>
                                </ol>
                            ),
                            objectPanel: <ConfigSetting style={{...springs}} onClick={() => clickSettingPanelButton('窗口')}/>
                        };
                      return {...state, ...nextState};
                    });
                    api.start({ from: { x: 500}, to: { x: 0 } });
                    break;
                }
            }
        }, 100);
    }
    return (
        <div className={styles.settingPanel}>
            <div className={styles.header}>
                <div className={styles.panelStatusBar}>
                    {state.panelNavigation}
                </div>
            </div>
            {state.objectPanel}
        </div>
    )
}

export default SettingPanel;