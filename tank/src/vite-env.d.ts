/// <reference types="vite/client" />

//! 为模型抽象类 modelAbstract 声明一个类型接口
interface ModelConstructor{
  new(canvas: CanvasRenderingContext2D, x: number, y: number): ModelInterface
}

// 为模型实例声明一个类型接口
interface ModelInterface{
  render(): void
}
