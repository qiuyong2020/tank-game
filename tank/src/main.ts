import './style.scss'
import config from './config'
import {image, promises} from './service/image'
import straw from './canvas/straw'

const app = document.querySelector<HTMLDivElement>('#app')!
// 读取全局配置中的画布尺寸
app.style.width = config.canvas.width + 'px'
app.style.height = config.canvas.height + 'px'

// 加载贴图
async function loadImage() {
  // 先加载贴图
  await Promise.all(promises)
  // console.log(image.get('straw'))
  // 再渲染画布
  straw.render()
}
loadImage()