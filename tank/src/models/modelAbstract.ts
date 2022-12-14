import config from "../config";

//! 创建模型实例的抽象类
export default abstract class modelAbstract {
  // 定义一个抽象方法，子类必须实现该方法
  abstract render(): void

  constructor(protected canvas: CanvasRenderingContext2D, protected x:number, protected y:number) {}

  // 物体模型的渲染动作（子类可复用）
  protected draw(img: HTMLImageElement) {
    this.canvas.drawImage(img, this.x, this.y, config.model.width, config.model.height)
  }
} 