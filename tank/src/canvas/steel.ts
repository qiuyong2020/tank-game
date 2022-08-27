import config from "../config";
import canvasAbstract from "./canvasAbstract";
import Model from '../models/steel';

class Steel extends canvasAbstract {
  constructor() {
    super()  //创建画布
    super.createModels(config.steel.num, Model)  //批量生成砖墙模型
  }

  render(): void {
    super.renderModels()  //砖墙模型渲染到画布上
  }
}

export default new Steel()  