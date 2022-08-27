import config from "../config";
import canvasAbstract from "./canvasAbstract";
import Model from '../models/wall';

class Wall extends canvasAbstract implements CanvasInterface {
  num(): number {
    return config.wall.num
  }
  model(): ModelConstructor {
    return Model
  }

  constructor() {
    super()  //创建画布
    super.createModels()  //批量生成砖墙模型
  }

  render(): void {
    super.renderModels()  //砖墙模型渲染到画布上
  }
}

export default new Wall()  