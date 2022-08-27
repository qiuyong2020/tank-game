/* 提供动态加载模型贴图的服务 */

import config from "../config"

// 为map中的key声明一个类型，得到更好的类型提示
type mapKey = keyof typeof config.images

// 使用 map 维护所有模型的贴图集合：{K:模型名称, V:贴图的img元素}
const image = new Map<mapKey, HTMLImageElement>()

// 遍历获取全局配置中 images 项的{模型名称: 模型贴图}
const promises = Object.entries(config.images).map(([key, value]) => {
  // console.log(key, value)
  //! 返回一个包含各种模型贴图的 promise 数组 
  return new Promise(resolve => {
    // 为模型贴图创建 img 元素
    const img = document.createElement('img')
    img.src = value
    // 解决图片的异步加载问题
    img.onload = () => {
      // 添加到 image 集合中
      image.set(key as mapKey, img)

      resolve(img)
    }
  })
})

export {image, promises, type mapKey}
