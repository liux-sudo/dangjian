/*!
* @desc: 互动终端屏幕适配解决方案
* @author: helianyanghly@gmail.com
*/

// 参数:
// designWidth {number} 设计稿宽度
// designHeight {number} 设计稿高度
// mode {obj} 内置五种缩放适配模式之一，如 cover、contain
// resizeCallback resize回调函数
//
// 使用示例：
// 例如，缩放适配为CONTAIN模式
// const view = new ViewAdap();
// view.setViewMode({
//   designWidth: 1920,
//   designHeight: 1080,
//   mode: 'contain'
// })

class ViewAdap {
  constructor() {
    this.mode = '';
    this.body = document.body;
    this.winWidth = 0;
    this.winHeight = 0;
    this.designWidth = 0;
    this.designHeight = 0;
    this.radioX = 0;
    this.radioY = 0;
  }
  // contain 模式,保持宽高比进行缩放适配浏览器可视窗口（window），缩放至其能显示完整的内容
  CONTAIN() {
    this.radioX = this.radioY = Math.min((this.winWidth / this.designWidth) , (this.winHeight / this.designHeight));
  }
  // cover 模式, 内容会保持宽高比进行缩放适配浏览器可视窗口（window），缩放至内容填满窗口
  COVER() {
    this.radioX = this.radioY = Math.max((this.winWidth / this.designWidth) , (this.winHeight / this.designHeight));
  }
  // fill 模式，可以类比为 backgrouns-size: 100% 100% 的表现
  FILL() {
    this.radioX = (this.winWidth / this.designWidth);
    this.radioY = (this.winHeight / this.designHeight);
  }
  // fixedHeight 模式, 纵向内容保持不变，而横向宽度则会动态裁补
  FIXED_HEIGHT() {
    this.radioX = this.radioY = this.winHeight  / this.designHeight;
  }
  // fixedWidth 模式, 横向内容保持不变，而纵向高度则会动态裁补
  FIXED_WIDTH() {
    this.radioX = this.radioY = this.winWidth / this.designWidth;
  }
  _setPolicy() {
    switch (this.mode) {
      case 'contain':
        this.CONTAIN();
        break;
      case 'cover':
        this.COVER();
        break;
      case 'fill':
        this.FILL();
        break;
      case 'fixedHeight':
        this.FIXED_HEIGHT();
        break;
      case 'fixedWidth':
        this.FIXED_WIDTH();
        break;
    }
  }
  _setSize() {
    const client = document.documentElement;
    this.winWidth = client.clientWidth;
    this.winHeight = client.clientHeight;

    this._setPolicy();

    // 计算溢出高度、宽度
    let halfCutWidth = (this.designWidth * this.radioX - this.winWidth) / 2 / this.radioX;
    let halfCutHeight = (this.designHeight * this.radioY - this.winHeight) / 2 / this.radioY;

    const bodyStyle = this.body.style;
    bodyStyle.width = `${this.designWidth}px`;
    bodyStyle.height = `${this.designHeight}px`;
    bodyStyle.transform = `scale(${this.radioX}, ${this.radioY}) translate(${-halfCutWidth}px, ${-halfCutHeight}px)`;
    bodyStyle.transformOrigin = '0 0'
  }
  /**
   * 设置缩放适配模式
   * @param designWidth {number} 设计稿宽度
   * @param designHeight {number} 设计稿高度
   * @param mode {string} 内置五种缩放适配模式之一，如 cover、contain
   * @param resizeCallback resize回调函数
   */
  setViewMode({designWidth, designHeight, mode = 'contain', resizeCallback}) {
    this.designWidth = designWidth; // 设计稿宽度
    this.designHeight = designHeight; // 设计稿高度
    this.mode = mode; // 缩放适配模式
    
    this._setSize()

    window.addEventListener('resize', () => {
      this._resizeHandler(resizeCallback);
    })
  }
  _resizeHandler(callback) {
    this._setSize();
    callback && callback();
  }

}


