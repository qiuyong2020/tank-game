import config from "../config";
import canvasAbstract from "./canvasAbstract";
import Model from '../models/tank';
import position from "../service/position";

//! 坦克画布
class Tank extends canvasAbstract implements CanvasInterface {
  constructor() {
    super()  //创建画布
    this.createModels()  //批量生成砖墙模型
  }

  render(): void {
    super.renderModels()
  }
  num(): number {
    return config.tank.num
  }
  model(): ModelConstructor {
    return Model
  }

  //重写坦克模型的生成逻辑，只在顶部的两行上刷新，有四个方向
  protected createModels() {
    for (let i = 0; i < this.num(); i++) {
      // 随机生成坐标
      const pos = position.position()
      
      // 模型实例
      const Model = this.model()
      const instance = new Model(this.canvas, pos.x, 0)
      this.models.push(instance)
    }
  }
} 

export default new Tank()