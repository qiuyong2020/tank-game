// 导入图片
import straw from './static/images/straw/straw.png';


// 全局配置
export default {
  // 定制画布尺寸
  canvas: {
    width: 900,
    height: 600
  },
  //定制模型尺寸
  model: {
    width: 30,
    height: 30
  },
  // 各种物体模型的贴图地址
  images: {
    straw,
    tank: straw,
  },
  // 定制草地数量
  straw: {
    num: 50
  }
}