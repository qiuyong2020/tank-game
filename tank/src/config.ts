// 导入模型图片
import straw from './static/images/straw/straw.png';
import wall from './static/images/wall/wall.gif';
import water from './static/images/water/water.gif';
import steel from './static/images/wall/steels.gif';

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
    wall,
    water,
    steel
  },
  // 定制草地数量
  straw: {
    num: 60
  },
  // 定制砖墙数量
  wall: {
    num: 60
  },
  // 定制水墙数量
  water: {
    num: 30
  },
  // 定制白墙数量
  steel: {
    num: 30
  }
}