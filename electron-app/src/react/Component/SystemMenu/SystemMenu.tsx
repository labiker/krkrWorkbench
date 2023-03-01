import styles from './SystemMenu.module.css';
import { useState } from 'react';

declare const window: Window & { systemMenu: any};

const SystemMenu = () => {
    const [state, setState] = useState({
        dropDownMenuStyleDisplay: 'none',
    })
    const clickDropDownMenuButton = (btnName: string) => {
        switch(btnName){
            case 'Open Folder...':{
                window.systemMenu.openFolder();
                break;
            }
        }
    }
    const clickSystemMenuButton = (btnName: string)=> {
        const nextDropDownMenuStyleDisplay = state.dropDownMenuStyleDisplay === 'block' ? 'none' : 'block';
        switch(btnName){
            case 'File':{
                setState(() => {
                  const nextState = {
                    dropDownMenuStyleDisplay: nextDropDownMenuStyleDisplay,
                  }
                  return {...state, ...nextState};
                });
                break;
            }
            case 'other':{
                if(state.dropDownMenuStyleDisplay !== 'none'){
                    // 等待点击事件
                    setTimeout(() => {
                        setState(() => {
                          const nextState = {
                            dropDownMenuStyleDisplay: 'none',
                          }
                          return {...state, ...nextState};
                        });
                    }, 150);
                }
                break;
            }
        }
    }
    return (
        <div>
            <div className={styles.systemMenu} onBlur={()=>clickSystemMenuButton('other')}>
                <button className={styles.fileButton} onClick={()=>clickSystemMenuButton('File')}>File</button>
            </div>
            <div className={styles.dropDownMenu} style={{display:state.dropDownMenuStyleDisplay}}>
                <button className={styles.openFolderButton} onClick={()=>clickDropDownMenuButton('Open Folder...')}>　Open Folder...　　　　　　　　　　　　　</button>
            </div>
        </div>
    )
}

export default SystemMenu;