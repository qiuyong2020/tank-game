import config from '../config';
import canvasAbstract from './canvasAbstract';
import Model from '../models/straw';

//! 草地画布
class Straw extends canvasAbstract {
  constructor() {
    //创建画布 
    super()
    //批量创建草地的模型实例
    super.createModels(config.straw.num, Model)
  }

  render(): void {
    // 调用父类的 renderModels 方法, 将模型渲染到画布上
    super.renderModels()
  } 
  
} //继承画布抽象类

export default new Straw()  //导出草地实例
