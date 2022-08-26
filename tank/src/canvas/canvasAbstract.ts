import config from "../config"
import position from "../service/position"

//! 定义所有物体画布的抽象类
export default abstract class canvasAbstract {
  protected models: ModelInterface[] = []  //维护已创建的模型实例
  abstract render():void  //声明一个抽象方法，用于画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')!, //2d画布
  ) {
    //初始化
    this.createCanvas()
  }

  // 创建画布
  protected createCanvas() {
    //物体画布的宽高
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height

    //将物体对应的canvas元素插入页面进行显示
    this.app.insertAdjacentElement('afterbegin', this.el)
  }

  // 生成模型实例
  protected createModels(num: number, Model: ModelConstructor) {
    // num为物体数量，每一个物体对应着画布上的一个模型贴图，位置都不一样
    position.getCollection(num).forEach(position => {
      // 模型实例
      const instance = new Model(this.canvas, position.x, position.y)
      this.models.push(instance)
    })
  }

  // 将模型渲染到画布上
  protected renderModels() {
    this.models.forEach(model => {
      // console.log(1)
      model.render()
    })
  }
}