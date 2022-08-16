class Magnifier {
  constructor({
    targetImg,
    scale,
    magnifierSize
  }) {
    if (targetImg instanceof HTMLImageElement) {
      this.targetImg = targetImg;
    } else {
      throw new Error("targetImg is not an HTMLImageElement");
    }

    if (typeof scale === "number" && scale > 1) {
      this.scale = scale;
    } else {
      this.scale = 3
    }

    if (typeof magnifierSize === "number") {
      this.magnifierSize = magnifierSize;
    } else {
      this.magnifierSize = 300
    }

    this.#init();
  }

  // private properties
  #magnifierEl // 当前放大镜的 DOM 对象
  #showMagnifier = false // 控制放大镜显示与否的 Boolean 对象

  // private methods
  #init = () => {
    this.#createMagnifier();
    this.#initHandlerEvents();
  }

  // 创建放大镜对象
  #createMagnifier = () => {
    const magnifier = document.createElement("div");
    magnifier.style.cssText = `
      display: none;
      position: fixed;
      height: ${this.magnifierSize}px;
      width: ${this.magnifierSize}px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: inset 0 0 20px #fff;
      background: url(${this.targetImg.src}) no-repeat #ccc;
      background-size: ${this.targetImg.clientWidth * this.scale}px auto; 
    `
    document.body.appendChild(magnifier)
    this.#magnifierEl = magnifier;
  }

  // 初始化放大镜事件
  #initHandlerEvents = () => {
    document.addEventListener("click", (e) => {
      const { clientX, clientY } = e
      if (e.target === this.targetImg) {
        this.#showMagnifier = !this.#showMagnifier
      } else {
        this.#showMagnifier = false
      }

      if (this.#showMagnifier) {
        this.#updateMagnifierPosition(clientX, clientY)
      }

      this.#toggleMagnifier()
    })

    document.addEventListener("mousemove", (e) => {
      if (!this.#showMagnifier) return 
      const { clientX, clientY } = e
      if (this.#isInTarget(clientX, clientY)) {
        this.#updateMagnifierPosition(clientX, clientY)
      } else {
        this.#showMagnifier = false
        this.#toggleMagnifier()
      }
    })
  }

  // 切换展示放大镜
  #toggleMagnifier = () => {
    this.#magnifierEl.style.display = this.#showMagnifier ? 'block' : 'none'
    this.targetImg.style.cursor = this.#showMagnifier ? 'crosshair' : 'unset'
  }

  // 更新当前放大镜展示的位置
  #updateMagnifierPosition = (x, y) => {
    if (x + this.magnifierSize > window.innerWidth) {
      this.#magnifierEl.style.left = window.innerWidth - this.magnifierSize + 'px';
    } else {
      this.#magnifierEl.style.left = x + 'px';
    }

    if (y + this.magnifierSize > window.innerHeight) {
      this.#magnifierEl.style.top = window.innerHeight - this.magnifierSize + 'px';
    } else {
      this.#magnifierEl.style.top = y + 'px';
    }

    const targetImgRect = this.targetImg.getBoundingClientRect();
    const bgX = -(x - targetImgRect.x) * this.scale + ( this.magnifierSize / 2) + 'px'
    const bgY = -(y - targetImgRect.y) * this.scale + (this.magnifierSize / 2) + 'px'
    
    this.#magnifierEl.style.backgroundPosition = `${bgX} ${bgY}`
  }

  // 判断当前点击位置和对象图片的位置关系
  #isInTarget = (x, y) => {
    const targetImgRect = this.targetImg.getBoundingClientRect()
    const { width, height, left, top } = targetImgRect
    if (x < left || y < top || x > left + width || y > top + height) {
      return false
    }
    return true
  }
}