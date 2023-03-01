import styles from './InspectorWindow.module.css';
import { useSelector } from 'react-redux';
import * as PIXI from 'pixi.js';
import imageThatchedHuts from '../../../../public/image/ThatchedHuts.png';
import { createRef, useState, useEffect } from 'react';

export interface IElectronAPI {
  getAppPath: () => Promise<string>,
  getImgBase64: (relativePath:string) => Promise<string>,
}

declare global {
  interface Window {
    systemInfo: IElectronAPI
  }
}

// Inspector window 是 unity 引擎中的一个特殊窗口。
// 它用于查看和编辑场景中游戏对象的属性。可以在 Inspector 窗口中查看并编辑游戏对象的位置、大小、贴图、材质、物理属性等。
const InspectorWindow = () => {
  const screenWidth = useSelector((state:any) => state.screenWidth);
  const screenHeight = useSelector((state:any) => state.screenHeight);
  const windowRef = createRef<HTMLDivElement>();
  const [state, setState] = useState({
      firstLoadFlag: true,
  });
  const initialize = async () => {
    const imgBase64 = await window.systemInfo.getImgBase64('./public/image/ThatchedHuts.png');
    const kag = new KAGWindow;
    kag.setHtmlElement(windowRef.current);
    kag.image({storage: imageThatchedHuts});
    setState(() => {
      const nextState = {
        firstLoadFlag: false,
      }
      return {...state, ...nextState};
    });
  }
  useEffect(()=>{
    if(state.firstLoadFlag) {
      initialize();
    };
    /* if(state.firstLoadFlag){
      // Create a Pixi Application
      let app = new PIXI.Application({width: 800, height: 600});
      // Magically load the PNG asynchronously
      let sprite = PIXI.Sprite.from(imageThatchedHuts);
      app.stage.addChild(sprite);
      // Add a variable to count up the seconds our demo has been running
      let elapsed = 0.0;
      // Tell our application's ticker to run a new callback every frame, passing
      // in the amount of time that has passed since the last tick
      app.ticker.add((delta) => {
        // Add the time to our total elapsed time
        elapsed += delta;
        // Update the sprite's X position based on the cosine of our elapsed time.  We divide
        // by 50 to slow the animation down a bit...
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
      });
      // Add the canvas that Pixi automatically created for you to the HTML document
      windowRef.current.appendChild(app.view as HTMLCanvasElement);
      setState(() => {
          const nextState = {
            firstLoadFlag: false,
          }
          return {...state, ...nextState};
      });
    }; */
  });

  return (
    <div ref={windowRef} className={styles.inspectorWindow} style={{width: screenWidth + 'px', height: screenHeight + 'px'}}>
    </div>
  );
}


/**
 * @author Song Yang
 * @description Window是用于管理窗口的类。
 */
class Window{
  /**
   * 构建Window对象
   * @returns 无
   */
  constructor() {
    this.width = 1024;
    this.height = 768;
    this.renderer = new PIXI.Application({width: this.width, height: this.height});
    this.borderStyle = 'bsSizeable';
    this.hintDelay = 500;
    this.mouseCursorState = 'mcsVisible';
    this.layers = [];
    this.reflectProperty();
  }
  /**
   * 添加管理对象
   * @note 在这里被指定的对象，会在窗口被无效化时也自动被无效化。
   * @param object 指定被管理的对象。
   * @returns 无
   */
  add(object:Layer | Font) {
    if(object instanceof Layer){
      this.layers.push(object);
      this.renderer.stage.addChild(object.sprite);
    } else{
      this.messages.push(object);
    }
  }
  /**
   * 将窗口移动到最前方
   * @note 应用未处在活动状态时，也会因此进入活动状态。未实装。
   * @param 无
   * @returns 无
   */
  bringToFront() {
  }
  /**
   * 关闭窗口
   * @note 关闭窗口前，会触发Window.onCloseQuery事件，并可以确认能否关闭窗口。待完善。
   * @returns 无
   */
  close() {
    /**
     * 在 PixiJS 中，
     * 你可以使用 PIXI.Application<PIXI.ICanvas>.destroy() 方法来关闭应用程序。
     * 该方法将销毁应用程序并清除所有的资源，包括纹理、声音、事件监听器等等。
     */
    this.renderer.destroy();
  }
  /**
   * 获得鼠标的移动速度（1.1.0之后）
   * @note 与原生吉里吉里不一致。
   * 可以使用该方法，开启当前窗口上鼠标移动速度的监控与计算。
   * 单位是像素/秒。从进入窗口的瞬间开始计算。
   * 可以通过访问下面三个属性来获取计算后的速度。
   * Window.mouseSpeedX，鼠标在 x 轴方向上的速度。
   * Window.mouseSpeedY，鼠标在 y 轴方向上的速度。
   * Window.totalMouseSpeed，鼠标在两个方向上的总速度。
   * @param 无
   * @returns 无
   */
  getMouseVelocity() {
    this.renderer.view.addEventListener('mousemove', (event:MouseEvent) => {
      // 获取鼠标当前位置
      const mouseX = event.clientX;
      const mouseY = event.clientY;
    
      // 计算鼠标在 x 轴和 y 轴方向上的速度
      const mouseSpeedX = mouseX - this.lastMouseX;
      const mouseSpeedY = mouseY - this.lastMouseY;
    
      // 计算鼠标在两个方向上的总速度
      const totalMouseSpeed = Math.sqrt(mouseSpeedX * mouseSpeedX + mouseSpeedY * mouseSpeedY);
    
      // 将当前位置保存为上一次位置，以便下一次计算速度
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
      this.mouseSpeedX = mouseSpeedX;
      this.mouseSpeedY = mouseSpeedY;
      this.totalMouseSpeed = totalMouseSpeed;
    });
  }
  /**
   * 获得触摸坐标
   * @note 未实装。
   * @param index 指定触摸坐标数组的下标。
   * @returns 无
   */
  getTouchPoint(index:number) {
  }
  /**
   * 获得触摸坐标的移动速度
   * @note 未实装。
   * @param 无
   * @returns 无
   */
  getTouchVelocity() {
  }
  /**
   * 暂时隐藏鼠标光标
   * @note 鼠标只要一移动，就会恢复鼠标的显示。
   * 该方法与将Window.mouseCursorState属性指定为mcsTempHidden的效果一致。
   * @param 无
   * @returns 无
   */
  hideMouseCursor() {
    // 通过设置PixiJS画布的 CSS 样式来实现。
    // 监听鼠标移动事件，只执行一次
    const handle = () => {
      // 显示鼠标光标
      this.renderer.view.style.cursor = 'default';
      // 移除鼠标移动事件监听器
      this.renderer.view.removeEventListener('mousemove', handle);
    };
    // 隐藏鼠标光标
    this.renderer.view.style.cursor = 'none';
    this.renderer.view.addEventListener('mousemove', handle);
  }
  /**
   * 生成输入事件
   * @note 未实装。当前版本只能生成与按键输入相关的3种事件。
   * 该方法会将事件非同步化生成，也就是说，不等待事件句柄终止就会返回。
   * 实际上事件句柄只会在返回后执行处理。
   * 输入事件和其它的Window类、普通的输入事件相同，
   * Layer类的对应事件也会发生。
   * @param eventname 指定事件名称。可用的字符串如下。
   * onkeyDown, 生成Window.onKeyDown事件。
   * onKeyPress, 生成Window.onKeyPress事件。
   * onKeyUp, 生成Window.onKeyUp事件。
   * 因为onkeyDown和onKeyUp往往是成对的，推荐同时生成这两个事件。
   * @param params onkeyDown事件或onKeyUp事件是将虚拟键存入key，
   * 将shift状态存入shift。省略shift后，会将其视为0。
   * onKeyPress事件则是通过key来指定字符。
   * onkeyDown, 生成Window.onKeyDown事件。
   * @returns 无
   */
  postInputEvent (
    eventname: 'onkeyDown' | 'onKeyPress' | 'onKeyUp',
    params: {
      key: string,
      shift: 'ssShift' | '0',
    }
  ) {
  }
  /**
   * 反映窗口属性到浏览器内核及渲染器
   * @note 自建函数。会在构建Window对象时自动执行，无需额外执行。
   * 因为是将类属性直接开放给用户使用的，
   * 程序需要以一个稳定的频率定期反映这些属性到浏览器内核以及渲染器上。
   * Electron框架使用的浏览器内核是Chromium内核，
   * 其刷新频率是60帧/秒（60Hz），与一般浏览器相同。
   * 由于该程序是使用Electron框架在桌面应用程序中使用Web技术，
   * 因此在编写Electron应用程序时，也需要注意优化代码以最大化利用这个刷新频率。
   * @param 无
   * @returns 无
   */
  reflectProperty() {
    const intervalMs = 1000/60;
    const reflectHandle = setInterval(()=>{
      if(this.maxHeight !== 0){
        this.htmlElement.style.maxHeight = this.maxHeight + 'px';
      }
      if(this.maxWidth !== 0){
        this.htmlElement.style.maxWidth = this.maxWidth + 'px';
      }
      if(this.minHeight !== 0){
        this.htmlElement.style.minHeight = this.minHeight + 'px';
      }
      if(this.minWidth !== 0){
        this.htmlElement.style.minWidth = this.minWidth + 'px';
      }
      this.htmlElement.style.left = this.left + 'px';
      this.htmlElement.style.top = this.top + 'px';
      this.htmlElement.style.width = this.width + 'px';
      this.htmlElement.style.height = this.height + 'px';
      this.renderer.view.height = this.innerHeight;
      this.renderer.view.width = this.innerWidth;
      /* this.messages.forEach((fontObject) => {
        fontObject
      }) */
    }, intervalMs);
  }
  /**
   * 登录/注销 消息接收器
   * @note 未实装。
   * @param 无
   * @returns 无
   */
  registerMessageReceiver() {

  }
  /**
   * 删除管理对象
   * @param object 指定需要从管理对象数组中删除的对象。
   * @returns 无
   */
  remove(object: Layer | Font) {
    if(object instanceof Layer){
      const indexToDelete = this.layers.findIndex(
        (value) => { value === object; }
      );
      if (indexToDelete !== -1) {
        this.layers.splice(indexToDelete, 1);
      }
    } else{
      const indexToDelete = this.messages.findIndex(
        (value) => { value === object; }
      );
      if (indexToDelete !== -1) {
        this.messages.splice(indexToDelete, 1);
      }
    }
  }
  /**
   * 解除窗口区域
   * @note 未实装。解除根据Window.setMaskRegion设定过的窗口区域，
   * 窗口会恢复为矩形。
   * @param 无
   * @returns 无
   */
  removeMaskRegion() {

  }
  /**
   * 重置鼠标的移动速度的计算（1.1.0之后）
   * @note 与原生吉里吉里不一致。
   * 未实装。
   * @param 无
   * @returns 无
   */
  resetMouseVelocity() {
  }
  /**
   * 指定浏览器元素，与浏览器内核建立交互接口
   * @note 自建方法。
   * @param element 浏览器元素，
   * 目前限制为只能使用div元素或是body元素。
   * @returns 无
   */
  setHtmlElement(element: HTMLBodyElement | HTMLDivElement) {
    this.htmlElement = element;
    element.appendChild(this.renderer.view as HTMLCanvasElement);
  }
  /**
   * 指定显示区域的尺寸
   * @note 指定窗口的显示区域的尺寸，图层只能在这个区域内显示。
   * 指定这个尺寸后，窗口的尺寸也会随之发生变化。
   * 可以单独使用Window.innerWidth或Window.innerHeight属性，分开指定。
   * @param width 显示区域的宽度
   * @param height 显示区域的高度
   * @returns 无
   */
  setInnerSize(width:number, height:number) {
    this.innerWidth = width;
    this.innerHeight = height;
  }
  /**
   * 根据掩码显示窗口区域
   * @note 未实装。根据主图层的掩码（主图层的不透明度信息）显示窗口区域。
   * 能借此改变窗口的形状。
   * 为了不让被显示的主图层和窗口的大小、位置之间出现偏差，
   * 需要进行以下的处理。
   * Window.borderStyle, 将其指定为 bsNone。
   * Layer.imageLeft和Layer.imageTop, 将其指定为 0。
   * @param threshold 指定掩码的域值。
   * 主图层的掩码（图层的不透明度信息）内，
   * 大于该值的部分的形状会被截取显示。
   * @returns 无
   */
  setMaskRegion(threshold:number) {

  }
  /**
   * 指定窗口的最大尺寸
   * @note 窗口将无法超出该方法指定的尺寸。
   * @param width 指定窗口的最大宽度，为0则不限制。
   * @param height 指定窗口的最大高度，为0则不限制。
   * @returns 无
   */
  setMaxSize(width:number, height:number) {
    this.maxWidth = width;
    this.maxHeight = height;
  }
  /**
   * 指定窗口的最小尺寸
   * @note 窗口将无法少于该方法指定的尺寸。
   * @param width 指定窗口的最小宽度，为0则不限制。
   * @param height 指定窗口的最小高度，为0则不限制。
   * @returns 无
   */
  setMinSize(width:number, height:number) {
    this.maxWidth = width;
    this.maxHeight = height;
  }
  /**
   * 指定窗口的位置
   * @note 可以单独使用Window.left或Window.top属性，分开指定。
   * @param left 指定窗口的左端位置
   * @param top 指定窗口的上端位置
   * @returns 无
   */
  setPos(left:number, top:number) {
    this.left = left;
    this.top = top;
  }
  /**
   * 指定窗口的尺寸
   * @note 可以单独使用Window.width或Window.height属性，分开指定。
   * @param width 指定窗口的宽度
   * @param heifht 指定窗口的高度
   * @returns 无
   */
  setSize(width:number, height:number) {
    this.width = width;
    this.height = height;
  }
  /**
   * 指定图层的缩放倍率
   * @note 未实装
   * @param number 指定倍率的分子
   * @param denom 指定倍率的分母
   * @returns 无
   */
  setZoom(number:number, denom:number) {
    /* this.zoomNumber = number;
    this.zoomDenom = denom; */
  }
  /**
   * 强制执行窗口内容的绘制
   * @note 未实装。
   * @param type 指定窗口绘制的类型。
   * tutNormal，被指定后进行普通绘制（差分绘制），
   * tutEntire，被指定后进行窗口全体内容的绘制。
   * @returns 无
   */
  update() {
  }
  /** 
   * 是否为活动状态
   * @description 自建属性。
  */
  active: boolean;
  /** 
   * window handle
   * @description 未实装。
  */
  HWND: number;
  /** 
   * 窗口样式
   * @description 表示窗口的窗口样式。可以设值。
   * @note 下面是可用的值
   * bsDialog，尺寸不可变更。具有和对话框相同的样式。
   * bsSingle，尺寸不可变更的窗口。
   * bsNone，无边框窗口。
   * bsSizeable，尺寸可变更的普通窗口，同时也是默认值。
   * bsToolWindow，尺寸不可变更的工具窗口（标题很小的窗口）。
   * bsSizeToolWin，和bsToolWindow相似，但是尺寸可变更。
  */
  borderStyle: 'bsDialog' | 'bsSingle' | 'bsNone' | 'bsSizeable' | 'bsToolWindow' | 'bsSizeToolWin';
  /** 
   * 窗口标题
   * @description 表示窗口的标题（标题栏的标题）。可以设值。
  */
  caption: string;
  /** 
   * 显示方向（1.1.0之后）
   * @description 表示显示方向。
   * @note oriUnknown（取得失败/不明），oriPortrait（纵向），
   * oriLandscape（横向）其中的任意值。
  */
  displayOrientation: 'oriUnknown' | 'oriPortrait' | 'oriLandscape';
  /** 
   * 显示的旋转角度（1.1.0之后）
   * @description 表示显示的旋转方向。
   * @note 0、90、180、270、-1，其中的任意值。未能取得时值为-1。
  */
  displayRotate: 0 | 90 | 180 | 270 | -1;
  /** 
   * 绘制设备
   * @description 表示绘制设备对象。可以设值。未实装。
   * @note 指定值后，之前被指定的绘制设备将会自动失效。
   * 默认情况是指定Window.BasicDrawDevice类的实例。
   * 关于Window.BasicDrawDevice详细信息，请参照吉里吉里源码的core/visual/win32/BasicDrawDevice.cpp内的说明。
   * 指定独立的绘制设备（通过插件获得）时，请参照那个插件的文档。
  */
  drawDevice: string;
  /** 
   * 是否点击事件有效
   * @description 表示点击事件是否有效。可以设值。
   * @note 指定为真后，Window.onTouchDown等的事件会变得有效，
   * 触摸操作不会导致Window.onMouseDown等的发生。
   * 在启用了可触摸设备和多点触摸的环境中，值为真。
  */
  enableTouch: boolean;
  /** 
   * 是否能够获得焦点
   * @description 表示是否能够获得焦点。可以设值。
   * @note 指定为假后，将不能获得焦点，也就是说，窗口将变得不活动。
   * 副作用方面，按住标题栏来移动窗口、或是调整窗口尺寸、
   * 点击关闭键来关闭窗口的操作也将变得不可行。
   * 想要获得按键输入时，可以使用Window.trapKey属性。
   * 通常，会有像弹出菜单一样，显示在最前面的窗口，
   * 但它自身是无法获得焦点，该属性可以用于实装那些窗口，
   * 当前版本，窗口全屏化时，或是退出全屏时，有可能失去该属性的设定内容。
  */
  focusable: boolean;
  /** 
   * 持有焦点的层对象
   * @description 表示当前正在持有焦点的层对象。可以设值。
   * @note 为null时，表示当前所有层都未持有焦点，
   * 设定层对象后，焦点会移动到那个层对象上。
  */
  focusedLayer: Layer;
  /** 
   * 是否为全屏状态
   * @description 表示是否为全屏状态。可以设值。
   * @note 指定为真后，当前窗口会全屏化，全屏时的画面解析度也会适应屏幕。
   * 指定为假后，会窗口化表示、
  */
  fullScreen: boolean;
  /** 
   * 窗口高度
   * @description 表示窗口高度。可以设值。默认值为768。
  */
  height: number;
  /** 
   * 提示的等待时间
   * @description 表示显示提示的等待时间（毫秒单位）。可以设值。
   * @note 默认值是500毫秒。指定为0后，会立即呼出Window.onHintChanged（保持显示）。
   * 指定为-1后，提示将无法被显示。
  */
  hintDelay: number;
  /** 
   * 与浏览器内核交互的接口
   * @description 自建属性。
  */
  htmlElement: HTMLBodyElement | HTMLDivElement;
  /** 
   * 输入法编辑器 (IME) 的运行模式
   * @description 设置或检索是否允许用户激活输入中文，韩文，日文等的输入法（IME）状态。可以设值。
   * @note 未实装
  */
  imeMode: string;
  /** 
   * 显示区域的高度
   * @note 未实装
   * @description 表示显示区域的高度。可以设值。
  */
  innerHeight: number;
  /** 
   * 显示区域的宽度
   * @description 表示显示区域的宽度。可以设值。
  */
  innerWidth: number;
  /** 
   * 左shift键是否按下
   * @description 自建属性。配合Window.postInputEvent事件使用。
  */
  isShiftPressed: boolean;
  /** 
   * 窗口的左端位置
   * @description 表示窗口的左端位置。可以设值。
   * @note 左端位置是相对于屏幕的坐标原点（左上角）的x坐标。
  */
  left: number;
  /** 
   * 最后一次记录的鼠标位置（X轴）
   * @note 自建属性。计算鼠标移动速度的辅助属性。
  */
  lastMouseX: number;
  /** 
   * 最后一次记录的鼠标位置（Y轴）
   * @note 自建属性。计算鼠标移动速度的辅助属性。
  */
  lastMouseY: number;
  /** 
   * 主窗口
   * @description 表示主窗口（最先创建的窗口，只读）。
  */
  mainWindow: Window;
  /** 
   * 被管理对象
   * @description 自建属性。作为数组，用于存储被管理的文字层。
  */
  messages: Array<Font>;
  /** 
   * 被管理对象
   * @description 自建属性。作为数组，用于存储被管理的图层。
  */
  layers: Array<Layer>;
  /** 
   * 窗口的最大高度
   * @description 表示窗口的最大高度。可以设值。
   * @note 指定为0后表示不限制。
  */
  maxHeight: number;
  /** 
   * 窗口的最大宽度
   * @description 表示窗口的最大高度。可以设值。
   * @note 指定为0后表示不限制。
  */
  maxWidth: number;
  /** 
   * 窗口的最小高度
   * @description 表示窗口的最小高度。可以设值。
   * @note 指定为0后表示不限制。
  */
  minHeight: number;
  /** 
   * 窗口的最小宽度
   * @description 表示窗口的最小高度。可以设值。
   * @note 指定为0后表示不限制。
  */
  minWidth: number;
  /** 
   * 鼠标的光标状态
   * @description 表示鼠标的光标状态。可以设值。
   * @note 下面是可用的值。
   * mcsVisible，指定后将使得鼠标光标可见。这是默认值。
   * mcsTempHidden，指定后将使得鼠标光标不可见，
   * 但只要移动鼠标就会变成mcsVisible，回到可见状态，
   * 调用Window.hideMouseCursor方法将会使得鼠标光标变为这个状态。
   * mcsHidden，指定后将使得鼠标光标不可见，
   * 移动鼠标也无法使其变得可见。
  */
  mouseCursorState: 'mcsVisible' | 'mcsTempHidden' | 'mcsHidden';
  /** 
   * 鼠标在 x 轴方向上的速度
   * @note 单位是像素/秒。
  */
  mouseSpeedX: number;
  /** 
   * 鼠标在 y 轴方向上的速度
   * @note 单位是像素/秒。
  */
  mouseSpeedY: number;
  /** 
   * 主图层对象
   * @description 表示主图层对象（只读）。
  */
  primaryLayer: Layer;
  /** 
   * 渲染器对象
   * @description 自建属性。
  */
  renderer: PIXI.Application<PIXI.ICanvas>;
  /** 
   * 是否保持最前显示
   * @description 表示是否保持最前显示。可以设值。
   * @note 为真则保持最前显示。当前版本，窗口全屏化时，或是退出全屏时，有可能失去该属性的设定内容。
  */
  stayOnTop: number;
  /** 
   * 窗口的上端位置
   * @description 表示窗口的上端位置。可以设值。
   * @note 上端位置是相对于屏幕的坐标原点（左上角）的y坐标。
  */
  top: number;
  /** 
   * 计算鼠标在两个方向上的总速度
   * @note 单位为像素/秒。
  */
  totalMouseSpeed: number;
  /** 
   * 点击数
   * @description 表示触摸板的被点击次数。
  */
  touchPointCount: number;
  /** 
   * 多点触摸的旋转域值
   * @description 表示通过多点触摸进行旋转的开始域值。
   * @note 各个触摸位置的移动距离变得大于这个值时，会发生旋转事件。
   * 从超过域值到手指移开为止，旋转事件都是有效的。
  */
  touchRotateThreshold: number;
  /** 
   * 多点触摸的伸缩域值
   * @description 表示通过多点触摸进行伸缩的开始域值。
   * @note 两个触摸位置的距离的变得大于这个值时，会发生伸缩事件。
   * 从超过域值到手指移开为止，伸缩事件都是有效的。
  */
  touchScaleThreshold: number;
  /** 
   * 是否捕获按键输入
   * @description 表示是否捕获按键输入。可以设值。
   * @note 指定为真后，会截取在其它窗口发生的按键输入事件，
   * 从而能够让其发生在该窗口上。
  */
  trapKey: boolean;
  /** 
   * 是否使用鼠标键
   * @description 表示是否使用鼠标键。可以设值。
   * @note 为真则可以使用鼠标键。启用鼠标键后，
   * 可以通过使用光标键来移动鼠标光标，但是任何一个键盘输入类事件都不会发生。
  */
  useMouseKey: boolean;
  /** 
   * 是否窗口可见
   * @description 表示是否窗口可见。可以设值。
   * @note 为真则窗口可见，未假则窗口不可见。
  */
  visible: boolean;
  /** 
   * 等待垂直同步
   * @description 未实装。
  */
  waitVSync: boolean;
  /** 
   * 窗口宽度
   * @description 表示窗口宽度。可以设值。默认值为1024。
  */
  width: number;
  /** 
   * 层的缩放比例（分母）
   * @description 表示层的缩放比例的分母。可以设值，
   * 但是请使用Window.setZoom方法来指定值。
   * 分子请参照Window.zoomNumer属性。详情请参照Window.setZoom方法。
  */
  zoomDenom: number;
  /** 
   * 层的缩放比例（分子）
   * @description 表示层的缩放比例的分子。可以设值，
   * 但是请使用Window.setZoom方法来指定值。
   * 分母请参照Window.zoomDenom属性。详情请参照Window.setZoom方法。
  */
  zoomNumber: number;
}

/**
 * @author Song Yang
 * @description 自建类。DisplayObject是可被Windows管理的子类。
 */
abstract class DisplayObject{
  /**
   * 构建DisplayObject对象
   * @returns 无
   */
  constructor() {
    this.zIndex = 0;
  }
  /** 
   * 对象的堆叠顺序
   * @description 自建属性。堆叠顺序越高，显示对象就越靠近屏幕的前面。
   * @note 默认值为0。zIndex的值必须是整数，否则将会被PixiJS忽略。
  */
  zIndex: number;
}

/**
 * @author Song Yang
 * @description Window是用于管理文字层的类。
 */
class Font extends DisplayObject{
  /** 
   * 绘制文字时的倾斜角度
   * @description 表示绘制文字时的倾斜角度。可以设值，
   * @note 单位是角度（degree）的十分之一，可以是0~3600之间的值。
   * 纵向书写时，在字体名上指定纵向书写用的字体名后，
   * 需要把该属性指定为2700.
  */
  angle: number;
  /** 
   * 粗体
   * @description 表示是否粗体显示。可以设值。
   * @note 指定为真后会变成粗体。
  */
  bold: boolean;
  /** 
   * 字体名
   * @description 表示字体名。可以设值，
   * @note 可以指定多个以逗号分隔的候选项。
   * 在这种情况下，将优先使用真实存在且靠前的。
   * 根据系统的字体列表检查字体是否真实存在。
   * 没有满足条件的字体时，将使用默认字体。
   * 当前版本是...
   * （与原生吉里吉里不一致）
  */
  face: string;
  /** 
   * 字体高度
   * @description 表示被绘制文字的高度（像素单位）。可以设值。
   * @note 指定为真后会变成粗体。
  */
  height: number;
  /** 
   * 斜体
   * @description 表示是否为斜体。可以设值，
   * @note 指定为真后会变成斜体。
  */
  italic: boolean;
  /** 
   * 字符串绘制方式
   * @description 未实装。
  */
  rasterizer: string;
  /** 
   * 删除线
   * @description 表示是否带有删除线。可以设值，
   * @note 指定为真后会带有删除线。
  */
  strikeout: boolean;
  /** 
   * 下划线
   * @description 表示是否带有下划线。可以设值，
   * @note 指定为真后会带有下划线。
  */
  underline: boolean;
  /**
   * 构建Window对象
   * @param parent 指定该层的父层，之后将会那个层的子层。不指定时请省略。
   * @returns 无
   */
  constructor(parent:Window) {
    super();
  }
}

/**
 * @author Song Yang
 * @description Layer是用于管理图层的类。
 */
class Layer extends DisplayObject{
  /**
   * 构建Layer对象
   * @param window 指定保存该层的窗口，构建后无法更改。
   * @returns 无
   */
  constructor(window: Window) {
    super();
    this.window = window;
    this.hasImage = true;
    this.hitThreshold = 16;
    this.hitType = "htMask";
    this.holdAlpha = false;
  }
  /**
   * 读入图像
   * @param image 指定想要读取的图片的目录。
   * @returns 无
   */
  loadImages(image:string) {
    // 创建纹理
    const texture = PIXI.Texture.from(image);
    // 未创建过图像容器时
    if(this.sprite === undefined) {
      // 创建sprite
      this.sprite = new PIXI.Sprite(texture);
    } else { // 已创建过图像容器时
      this.sprite.texture = texture;
    }
  }
  /** 
   * 绝对位置
   * @description 表示拥有相同父层的兄弟层之间的重叠顺序。值越小，显示地越靠后。
   * @note 与Layer.order属性不同，兄弟层之间的值可以不连续。设值后，
   * 能够更改兄弟层之间的重叠顺序，父层的Layer.absoluteOrderMode属性会被设置为真。
  */
  absolute: number;
  /** 
   * 是否为绝对位置模式
   * @description 表示直属子层的重叠顺序模式。可以设值。
   * @note 指定为假，则使用相对位置模式，Layer.order属性将会表示那个顺序。
   * 指定为真，则使用绝对位置模式，Layer.absolute属性将会表示那个顺序。
  */
  absoluteOrderMode: boolean;
  /** 
   * 注视左端位置
   * @description 表示注视左端位置（根据显示坐标的像素单位）。可以设值。
  */
  attentionLeft: number;
  /** 
   * 注视上端位置
   * @description 表示注视上端位置（根据显示坐标的像素单位）。可以设值。
  */
  attentionTop: number;
  /** 
   * 是否进行缓存
   * @description 未实装
  */
  cached: boolean;
  /** 
   * 是否触发onPaint事件
   * @description 未实装
  */
  callOnPaint: boolean;
  /** 
   * 表示装载子层的数组对象
   * @note 可以对这个数组进行增删元素、修改元素值等操作，
   * 但这些操作无法被反映到实际的层的状态上，请只在这里进行读取操作。
  */
  children: Array<Layer>;
  /** 
   * 剪裁矩形的高度
   * @description 表示剪裁矩形的高度（像素单位）。可以设值。
  */
  clipHeight: number;
  /** 
   * 剪裁矩形的左端
   * @description 表示剪裁矩形的左端（像素单位）。可以设值。
  */
  clipLeft: number;
  /** 
   * 剪裁矩形的上端
   * @description 表示剪裁矩形的上端（像素单位）。可以设值。
  */
  clipTop: number;
  /** 
   * 剪裁矩形的宽度
   * @description 表示剪裁矩形的宽度（像素单位）。可以设值。
  */
  clipWidth: number;
  /** 
   * 鼠标光标
   * @description 表示层上鼠标的光标类型。可以设值。
   * @note 与吉里吉里原生用法不一致。
  */
  cursor: string;
  /** 
   * 鼠标光标的横坐标
   * @description 表示鼠标光标的横坐标（根据显示坐标的像素单位）。可以设值。
   * @note 想要实现鼠标移动，不仅需要设定该属性的值，还需要设定Layer.cursorY属性的值。
  */
  cursorX: number;
  /** 
   * 鼠标光标的纵坐标
   * @description 表示鼠标光标的纵坐标（根据显示坐标的像素单位）。可以设值。
   * @note 想要实现鼠标移动，不仅需要设定该属性的值，还需要设定Layer.cursorX属性的值。
  */
  cursorY: number;
  /** 
   * 是否可操作
   * @description 表示是否能够操作该层。可以设值。
   * @note 为真时可以操作，能够获得焦点，等等。
   * 为假时不可操作，不能获得焦点，等等。
  */
  enable: boolean;
  /** 
   * 绘制方式
   * @description 未实装
  */
  face: string;
  /** 
   * 是否能获得焦点
   * @description 表示是否能够获得焦点。可以设值。
   * @note 为真时可以获得焦点，为假时不可获得焦点。
  */
  focusable: boolean;
  /** 
   * 是否获得焦点
   * @description 表示是否获得焦点。
   * @note 为真时已获得焦点，为假时未获得焦点。
  */
  focused: boolean;
  /** 
   * 字体
   * @description 表示绘制文字时使用的字体。
   * @note 与吉里吉里原生用法不一致。
  */
  font: boolean;
  /** 
   * 是否已持有图像
   * @description 表示是否持有了图像。可以设值。
   * @note 为真时持有图像，这是默认值。
   * 为假时会释放图像，变成未持有图像的状态。
   * 设定Layer.type属性后，hasImage会被重置为真。
   * 未持有图像时，如果Layer.type为ltOpaque的话，
   * 层整体会参照Layer.neutralColor进行显示。
   * 其它类型的场合会被变成透明。
   * 该属性为假的层，Layer.hitType为htMask时，层整体会变得完全透明。
   * 并且，无法进行绘制和字体的操作。
   * 该属性为假的层，通常包含数个子层，但自身是透明的。
  */
  hasImage: boolean;
  /** 
   * 高度
   * @description 表示层的高度（像素单位）。可以设值。
  */
  height: number;
  /** 
   * 提示
   * @description 表示层的提示字符串。可以设值。
   * @note 提示字符串是让鼠标光标在层上停留一会儿后，在光标附近显示的字符串。
   * 不想显示时可以指定为空字符串。
  */
  hint: string;
  /** 
   * 鼠标事件的不透明度域值（待确认）
   * @description 表示鼠标事件在不透明度上的可行域值。可以设值。
   * @note 该属性仅在Layer.hitType为htMask时有效，
   * 蒙版图像的不透明度在该属性所指定的值之上时，才能够接收鼠标事件信息。
   * 指定为0时，所有的鼠标事件都能接收，
   * 指定为256时，所有的鼠标事件都不能接收。默认值为16。
  */
  hitThreshold: number;
  /** 
   * 点击判定的类型
   * @description 表示鼠标事件的点击判定的类型。可以设值。
   * @note 指定为htProvince后，领域图像的不透明度只有不是0，都能接收鼠标事件。
   * 指定为htMask后，蒙版图像的不透明度在Layer.hitThreshold属性所指定的值之上时，
   * 才能接收鼠标事件。无法接收的鼠标事件，将会在更靠后的层上被处理。默认值为htMask。
  */
  hitType: "htProvince" | "htMask";
  /** 
   * 是否保护阿尔法通道
   * @description 表示是否保护绘制时的透明和不透明度。可以设值。
   * @note 默认值为假。截止到吉里吉里2.23 beta 1 ，各个绘制方法里还有名为hda属性，
   * 它和该属性的功能相同，但是从2.23 beta 2 开始就不再作为属性了。
   * 有几个的绘制演算，是在Layer.face属性为dfOpaque时，由该属性指定是否保护图像的阿尔法通道。
   * 大多数的方法，只在该属性为假时才能进行高速绘制。
   * Layer.type既不是ltAlpha也不是ltAddAlpha时，将无法使用图像的阿尔法通道，
   * 这种情况下就算把该属性指定为假也没有问题。只是，该属性为假的话阿尔法通道会被破坏。
   * 以下的方法不会收到该属性的影响。
   * Layer.loadImages
   * Layer.loadProvinceImage
   * Layer.setMainPixel
   * Layer.setMaskPixel
   * Layer.setProvincePixel
   * Layer.piledCopy
   * Layer.adjustGamma(阿尔法通道经常会被保护)
   * Layer.doGrayScale(阿尔法通道经常会被保护)
   * Layer.flipLR
   * Layer.flipUD
   * Layer.assignImages
   * 以下的方法会收到该属性的影响。Layer.copyRect
   * Layer.stretchCopy
   * Layer.affineCopy
   * Layer.fillRect
   * Layer.colorRect
   * Layer.drawText
   * Layer.operateRect
   * Layer.operateStretch
   * Layer.operateAffine
  */
  holdAlpha: boolean;
  /** 
   * 是否进行显示提示的判定
   * @description 表示是否进行显示提示的判定。
   * @note 指定为真后，该层将不会进行显示提示的判定。指定为假后，会进行显示提示的判定。
  */
  ignoreHintSensing: boolean;
  /** 
   * 图像高度
   * @description 表示层内图像的高度（像素单位）。可以设值。
  */
  imageHeight: number;
  /** 
   * 层内图像的左偏移
   * @description 表示层内图像的左偏移（像素单位）。可以设值。
  */
  imageLeft: number;
  /** 
   * 是否已变更图像
   * @description 表示层内图像是否已变更。可以设值。
   * @note 对层内图像进行绘制、变更尺寸等操作会自动将该属性指定为真。
   * 指定该属性为假的话，层内图像会在变更时将该属性指定为真，
   * 可以借此监控层内图像是否发生过变动。该属性本身不会对层的动作产生影响。
  */
  imageModified: boolean;
  /** 
   * 层内图像的上偏移
   * @description 表示层内图像的上偏移（像素单位）。可以设值。
  */
  imageTop: number;
  /** 
   * 图像宽度
   * @description 表示层内图像的宽度（像素单位）。可以设值。
  */
  imageWidth: number;
  /** 
   * 输入法编辑器 (IME) 的运行模式
   * @description 设置或检索是否允许用户激活输入中文，韩文，日文等的输入法（IME）状态。可以设值。
   * @note 未实装
  */
  imeMode: string;
  /** 
   * 是否为主图层
   * @description 表示是否为主图层。
   * @note 主图层是没有父层、最靠后显示的层。
  */
  isPrimary: boolean;
  /** 
   * 是否加入焦点链
   * @description 表示是否加入焦点链。
   * @note 指定为真后，将加入焦点链，并会出现在Layer.prevFocusable等之间，
   * 能根据TAB键等方式移动焦点到该层。指定为假后，将不会加入焦点链，
   * 但能通过Layer.focus等方法获得焦点。
  */
  joinFocusChain: boolean;
  /** 
   * 左端位置
   * @description 表示层的左端位置（参照父层的显示坐标，像素单位）。可以设值。
  */
  left: number;
  /** 
   * 主图像缓冲区
   * @description 未实装。
  */
  mainImageBuffer: string;
  /** 
   * 主图像缓冲区（写入用）
   * @description 未实装。
  */
  mainImageBufferForWrite: string;
  /** 
   * 主图像缓冲区间距
   * @description 未实装。
  */
  mainImageBufferPitch: string;
  /** 
   * 层名
   * @description 表示层名。可以设值。
   * @note 对该属性进行的设置，不会对Layer类的动作产生影响。
  */
  name: string;
  /** 
   * 中性色
   * @description 表示层的中性色（通过0xAARRGGBB的形式）。可以设值。
   * @note 在Layer.type属性变动时，层的中性色将会被指定成那个类别的中性色。
   * 在层内图像的尺寸被变化时，中性色将会作为初始色填充到那上面。
   * 根据具体设的值，能够指定层内图像的尺寸变化时的初始色。
  */
  neutralColor: string;
  /** 
   * 后方能够获得焦点的层
   * @description 在后方检索能够获得焦点的层。没有的话将变为null。
  */
  nextFocusable: Layer | null;
  /** 
   * 是否可操作层节点
   * @description 表示是否能够操作层节点。
   * @note 不仅不能操作自身，还在父层中存在不可操作的层的话，将会变为假。
   * 其它场合将会变为真。
  */
  nodeEnabled: boolean;
  /** 
   * 是否节点可见
   * @description 表示节点是否可见。
   * @note 只要父层中存在一个不可见的层，就会变为假。全部可见时才会为真。
  */
  nodeVisible: boolean;
  /** 
   * 不透明度
   * @description 表示层的不透明度。可以设值。
   * @note 值为0~255范围的整数，值越大越不透明。
  */
  opacity: number;
  /** 
   * 相对位置
   * @description 表示拥有同一父层的兄弟层之间的显示顺序。值越小越靠后显示。
   * @note 设值后，能够改变兄弟层之间的显示顺序，
   * 且父层的Layer.absoluteOrderMode属性将会被变为假。
  */
  order: number;
  /** 
   * 父层
   * @description 表示父层对象。可以设值。
   * @note 设值后，将会变为那个层的子层。既不能更改所属的窗口或者主图层，
   * 也不能成为自身和自身的子层的子层。
  */
  parent: Layer;
  /** 
   * 前方能够获得焦点的层
   * @description 在前方检索能够获得焦点的层。没有的话将变为null。
  */
  prevFocusable: Layer | null;
  /** 
   * 领域图像的缓冲区
   * @description 未实装。
  */
  provinceImageBuffer: string;
  /** 
   * 领域图像的缓冲区（写入用）
   * @description 未实装。
  */
  provinceImageBufferForWrite: string;
  /** 
   * 领域图像的缓冲间距
   * @description 未实装。
  */
  provinceImageBufferPitch: string;
  /** 
   * 是否继承父层的提示
   * @description 表示是否继承父层的提示。可以设值。
   * @note 为真时，且Layer.hint属性为空字符串时，
   * 将会回溯到父层继承并显示被设定在父层上的提示。
   * 未假时，只要Layer.hint属性不为空字符串就会显示它，为空字符串则不显示。
  */
  showParentHint: boolean;
  /** 
   * 装载图像信息的容器
   * @description 自建属性。可以设值。
  */
  sprite: PIXI.Sprite;
  /** 
   * 上端位置
   * @description 表示层的上端位置（参照父层的显示坐标，像素单位）。可以设值。
  */
  top: string;
  /** 
   * 层的显示类型
   * @description 表示层的显示类型。可以设值。未实装。
   * @note 可用值如下
   * ltOpaque或ltCoverRect，被指定后，像素的无法混合使用阿尔法通道。
   * ltCoverRect和ltOpaque也是一样。
   * 当Layer.opacity属性为255时，会成为完全不透明矩形。蒙版图像会被无视，
   * 试用该类型的绘制方法是deOpaque。
  */
  type: "ltOpaque";
  /** 
   * 是否使用注视信息
   * @description 表示是否使用注视信息。可以设值。
   * @note 被指定为真时，该层的注视信息将变得可用。
   * 被指定为假时，该层的父层（如果存在的话）的注视信息将变得可用。
  */
  useAttention: boolean;
  /** 
   * 是否可见
   * @description 表示是否可见。可以设值。
   * @note 指定为假后，将变得不可见。
   * 指定为真后，将变得可见。
  */
  visible: boolean;
  /** 
   * 宽度
   * @description 表示层的宽度（像素单位）。可以设值。
  */
  width: number;
  /** 
   * 窗口对象
   * @description 表示持有该层的窗口对象。未实装。
  */
  window: Window;
}

/**
 * @author Song Yang
 * @description KAG的窗口类。
 * @note 在这里可以进行符合KAG语法规则的动作。
 */
class KAGWindow extends Window{
  /**
   * 构建Stage对象
   * @returns 无
   */
  constructor() {
    super();
    this.innerWidth = 1024;
    this.innerHeight = 768;
  }

  //------------------------------------------- 属性->图层对象 --
  getLayerFromElm(elm:{
    layer: string,
  }){

  }
  //------------------------------------------- 标签群(图层操作) --

  /**
   * 载入图像
   * @param elm 参数字典
   * @param elm.storage 图像文件(file)的路径。
   * 用于指定想要读取的图像，可以省略格式后缀。
   * @param elm.layer 对应图层在图层数组里的下标。
   * 需是一个大于等于0的整数。
   * @returns 无
   */
  image(elm:{
    storage: string,
    layer? : number,
  }) {
    const start = Date.now();
    // 未指定layer时，新建一个图层对象
    if( elm.layer === undefined || this.layers[elm.layer] === undefined ) {
      const newLayer = new Layer(this);
      newLayer.loadImages(elm.storage);
      this.add(newLayer);
    } else { // 已指定layer并且对应下标的图层可用时
      this.layers[elm.layer].loadImages(elm.storage);
    }
    console.log(elm.storage + ' 的读取花费了 ' + (Date.now() - start) + 'ms。');
  }
  /** 
   * 场景内的窗口子对象
  */
  children: Array<Window>;
}

export default InspectorWindow;