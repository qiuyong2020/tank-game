import './style.css'

// 创建黑板类
class Blackboard {
  // 1. 黑板画布的构造器
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!, 
    private context = el.getContext('2d')!,
    private width: number = el.width, 
    private height: number = el.height, 
    private btns: HTMLDivElement = document.createElement('div'),
    private bgColor = '#000',
    private lineColor = '#fff'
  ) {
    // 初始化画布
    this.initCanvas()
    // 绑定事件
    this.bindEvent()
    // 粉笔写字
    this.draw()
  }

  private initCanvas() {
    this.context.fillStyle = this.bgColor
    this.context.fillRect(0, 0, this.width, this.height)

    // 在画布屁股后面添加按钮
    this.btns.classList.add('btns')
    this.el.insertAdjacentElement('afterend', this.btns)
  }

  // 修改黑板颜色
  public setBgColor(color: string) {
    this.bgColor = color
    // 重新填充黑板画布，否则修改不生效
    this.context.fillStyle = color
    this.context.fillRect(0, 0, this.el.width, this.el.height)

    return this
  }

  private bindEvent() {
    // 鼠标在黑板上画线
    const callback = this.drawLine.bind(this) //保存this指向

    // 2. 在黑板上写字：按下鼠标后，跟随鼠标移动，在黑板上开始画白线
    this.el.addEventListener('mousedown', () => {
      this.context.beginPath()
      this.context.strokeStyle = this.lineColor
      this.el.addEventListener('mousemove', callback)
      // this.el.addEventListener('mousemove', () => {
      //   console.log("在画线...")
      // })
    })

    // 3. 事件移除：松开鼠标后，移除鼠标移动事件，停止画线
    document.addEventListener('mouseup', () => {
      this.el.removeEventListener('mousemove', callback)
    })
  }

  // 粉笔写字
  private drawLine(event: MouseEvent) {
    // 捕获鼠标不断移动的坐标(x,y)
    this.context.lineTo(event.offsetX, event.offsetY)
    // 轨迹连线
    this.context.stroke()
  }

  // 黑板清屏
  public clear() {
    // 清屏按钮
    const btn = document.createElement('button')
    btn.innerText = '清屏'
    // 添加到按钮组
    this.btns.insertAdjacentElement('afterbegin', btn)

    // 点击清屏
    btn.addEventListener('click', () => {
      // 黑板画布变为bgColor，覆盖线条颜色
      this.context.fillStyle = this.bgColor
      // 重新绘制
      this.context.fillRect(0, 0, this.el.width, this.el.height)
    })

    return this
  }
  
  // 5. 切换粉笔颜色
  public setLineColor() {
    const colors = ['#fff', '#ccc', '#ddd', 'pink']
    // 为每一种颜色创建一栏，自由点击切换
    const container = document.createElement('div')
    container.classList.add('color-container')

    colors.forEach(color => {
      const div = document.createElement('div')
      // 按钮样式
      div.style.cssText = `width: 30px; height: 20px; background: ${color}`

      container.insertAdjacentElement('afterbegin', div)

      // 点击切换粉笔颜色
      div.addEventListener('click', () => (this.lineColor = color))
    })
    // 将颜色栏添加到按钮组
    this.btns.insertAdjacentElement('beforeend', container)
  }

  // 6. 橡皮擦工具
  public erase() {
    // 创建按钮
    const el = document.createElement('button')
    el.innerText = '橡皮擦'

    // 添加到按钮组
    this.btns.insertAdjacentElement('afterbegin', el)

    // 擦除粉笔文字
    el.addEventListener('click', ()=> {
      this.lineColor = this.bgColor
      // 橡皮擦大小
      this.context.lineWidth = 10
    })

    return this
  }

  // 写字（使用橡皮擦除部分内容后，可以重新用粉笔写字）
  public draw() {
    // 创建按钮
    const el = document.createElement('button')
    el.innerText = '粉笔'

    // 添加到按钮组
    this.btns.insertAdjacentElement('afterbegin', el)

    // 擦除粉笔文字
    el.addEventListener('click', ()=> {
      this.lineColor = 'white'
      // 粉笔大小
      this.context.lineWidth = 1
    })
  }


  // 7. 画布截图
  public shotcut() {
    // 创建按钮
    const el = document.createElement('button')
    el.innerText = '截图'

    this.btns.insertAdjacentElement('afterbegin', el)

    // 图像
    const img = document.createElement('img')

    // 截图功能
    el.addEventListener('click', ()=> {
      // toDataURL(type)：Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
      img.src = this.el.toDataURL('image/jpeg')

      img.classList.add('img-short')  //添加类名，修改图像样式
    })

    // 显示截图
    this.btns.insertAdjacentElement('afterend', img)

    return this
  }
}

// 创建实例
const instance = new Blackboard()
// 黑板清屏操作
instance.clear()
// instance.setBgColor('#16a085')

// 使用橡皮擦
instance.erase()

// 切换粉笔色
instance.setLineColor()

// 保存截图功能
instance.shotcut()