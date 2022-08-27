import './style.scss'
import config from './config'
import {promises} from './service/image'
import straw from './canvas/straw'
import wall from './canvas/wall'
import water from './canvas/water'
import steel from './canvas/steel'
import tank from './canvas/tank'

const app = document.querySelector<HTMLDivElement>('#app')!
// 读取全局配置中的画布尺寸
app.style.width = config.canvas.width + 'px'
app.style.height = config.canvas.height + 'px'

// 加载贴图
async function loadImage() {
  // 先加载模型贴图
  await Promise.all(promises)
  // console.log(image.get('straw'))
  // 再把模型渲染到画布上
  straw.render()
  wall.render()
  water.render()
  steel.render()
  tank.render()
}
loadImage()