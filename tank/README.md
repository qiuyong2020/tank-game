# 坦克游戏大战

## 1.默认样式重置

[CDN](https://www.bootcdn.cn/) 查找 `minireseter.css` 样式文件，复制 `<link>` 标签，在 `index.html` 中进行引入。

## 2.全局配置

创建`src/config.ts` 配置文件，定制画布和模型的尺寸等参数

## 3.画布的抽象类

- 定义抽象类：

```ts
// src/canvas/canvasAbstract.ts
abstract class canvasAbstract {
  protected items = [] //记录物体种类
  abstract render(): void //声明一个抽象方法，自定义画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')! //2d画布
  ) {
    // 初始化
    this.createCanvas()
    this.drawModel()
  }

  // 创建画布
  protected createCanvas() {}

  // 绘制模型
  protected drawModel() {}

  // 生成贴图坐标
  protected position() {}
}
```

- 继承抽象类：

```ts
// src/canvas/straw.ts
import canvasAbstract from './canvasAbstract'

//! 草地画布
class Straw extends canvasAbstract {} //继承画布抽象类

export default new Straw() //导出草地实例
```

## 4.模型贴图

```ts
import imgURL from '../static/images/straw/straw.png'
// 绘制模型
drawModel() {
  // 制作模型贴图
  const img = document.createElement('img')
  img.src = imgURL
  // 解决图片的异步加载问题
  img.onload = () => {
    // 指定贴图在画布上的(x,y)坐标
    const position = this.position()
    // 将贴图绘制到画布上
    this.canvas.drawImage(img, position.x, position.y, config.model.width, config.model.height)
  }
}

// 生成随机坐标
position() {
  return {
    x: 60,
    y: 10
  }
}
```

## 5.贴图预加载

```ts
// src/service/image.ts
import config from '../config'

// 为map中的key声明一个类型，得到更好的类型提示
type mapKey = keyof typeof config.images

// 使用 map 维护所有模型的贴图集合：{K:模型名称, V:贴图的img元素}
export const image = new Map<mapKey, HTMLImageElement>()

// 遍历获取全局配置中 images 项的{模型名称: 模型贴图}
export const promises = Object.entries(config.images).map(([key, value]) => {
  // console.log(key, value)
  //! 返回一个包含各种模型贴图的 promise 数组
  return new Promise((resolve) => {
    // 为模型贴图创建 img 元素
    const img = document.createElement('img')
    img.src = value
    // 解决图片的异步加载问题
    img.onload = () => {
      // 添加到 image 集合中
      images.set(key as mapKey, img)

      resolve(img)
    }
  })
})
```

```ts
// src/canvas/straw.ts
import canvasAbstract from './canvasAbstract'

//! 草地画布
class Straw extends canvasAbstract {
  render(): void {
    // 调用父类的方法
    super.drawModel()
  }
} //继承画布抽象类

export default new Straw() //导出草地实例
```

```ts
// main.ts
import straw from './canvas/straw'
import { image, promises } from './service/image'
// 加载贴图
async function loadImage() {
  // 先加载贴图
  await Promise.all(promises)
  console.log(image.get('straw'))
  // 再渲染画布
  straw.render()
}

loadImage() //<img src="/src/static/images/straw/straw.png">
```

## 6.贴图逻辑优化

`src/config.ts` ：

```ts
// 导入图片
import straw from './static/images/straw/straw.png'

// 全局配置
export default {
  // 定制画布尺寸
  canvas: {
    width: 900,
    height: 600,
  },
  //定制模型尺寸
  model: {
    width: 30,
    height: 30,
  },
  // 各种物体模型的贴图地址
  images: {
    straw,
    tank: straw,
  },
  // 定制草地数量
  straw: {
    num: 20,
  },
}
```

`src/service/image.ts` ：

```ts
import config from '../config'

// 为map中的key声明一个类型，得到更好的类型提示
type mapKey = keyof typeof config.images

// 使用 map 维护所有模型的贴图集合：{K:模型名称, V:贴图的img元素}
const image = new Map<mapKey, HTMLImageElement>()

// 遍历获取全局配置中 images 项的{模型名称: 模型贴图}
const promises = Object.entries(config.images).map(([key, value]) => {
  // console.log(key, value)
  //! 返回一个包含各种模型贴图的 promise 数组
  return new Promise((resolve) => {
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

export { image, promises }
```

`src/canvas/canvasAbstract.ts` ：

```ts
import config from '../config'
import { image } from '../service/image'

//! 定义所有物体画布的抽象类
export default abstract class canvasAbstract {
  protected items = [] //记录物体个数
  abstract render(): void //声明一个抽象方法，用于画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')! //2d画布
  ) {
    // 初始化
    this.createCanvas()
    // this.drawModel()
  }

  // 创建画布
  protected createCanvas() {
    // 物体画布的宽高
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height

    // 将物体对应的canvas元素插入页面进行显示
    this.app.insertAdjacentElement('afterbegin', this.el)
  }

  // 绘制模型
  protected drawModel(num: number) {
    // 指定贴图在画布上的(x,y)坐标
    const position = this.position()

    // num为物体数量，每一个物体都要在画布上绘制一次
    Array(num)
      .fill('')
      .forEach(() => {
        // 制作贴图并绘制到画布上
        const img = image.get('straw')!
        // console.log(img)
        this.canvas.drawImage(img, position.x, position.y, config.model.width, config.model.height)
      })
  }

  // 生成随机坐标
  protected position() {
    return {
      x: 60,
      y: 10,
    }
  }
}
```

## 7.随机生成模型元素的坐标

`src/canvas/canvasAbstract.ts` ：

```ts
import config from '../config'
import { image } from '../service/image'

//! 定义所有物体画布的抽象类
export default abstract class canvasAbstract {
  protected items = [] //记录物体个数
  abstract render(): void //声明一个抽象方法，用于画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')! //2d画布
  ) {
    //初始化
    this.createCanvas()
    // this.drawModel()
  }

  // 创建画布
  protected createCanvas() {
    //物体画布的宽高
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height

    //将物体对应的canvas元素插入页面进行显示
    this.app.insertAdjacentElement('afterbegin', this.el)
  }

  // 绘制模型
  protected drawModel(num: number) {
    // 遍历坐标数组，将模型贴图一一绘制在画布上
    this.positionCollection(num).forEach((position) => {
      //制作贴图并绘制到画布上
      const img = image.get('straw')!
      // console.log(img)
      this.canvas.drawImage(img, position.x, position.y, config.model.width, config.model.height)
    })
  }

  // 多个模型的坐标组成一个集合
  protected positionCollection(num: number) {
    const collection = []
    for (let i = 0; i < num; i++) {
      collection.push(this.position())
    }

    return collection
  }

  // 随机生成模型坐标
  protected position() {
    return {
      //画布尺寸、模型尺寸
      x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
      y: Math.floor(Math.random() * (config.canvas.height / config.model.height)) * config.model.height,
    }
  }
}
```

## 8.批量生成唯一坐标

`src/canvas/canvasAbstract.ts` ：

```ts
// 批量获取唯一坐标
protected positionCollection(num: number) {
  const collection = [] as {x:number, y:number}[]
  for(let i = 0; i < num; i++) {
    //新坐标与集合值进行比较，进行去重
    while(true) {
      const position = this.position()
      const exist = collection.some(pos => pos.x == position.x && pos.y == position.y)
      if(!exist) {
        collection.push(this.position())
        break
      }
    }
  }

  return collection
}
```

## 9.模型的抽象类

`src/models/modelAbstract.ts` ：

```ts
import config from '../config'
import { image } from '../service/image'

//! 创建模型实例的抽象类
export default abstract class modelAbstract {
  constructor(protected canvas: CanvasRenderingContext2D, protected x: number, protected y: number) {
    // 初始化
    this.canvas.drawImage(image.get('straw')!, x, y, config.model.width, config.model.height)
  }
}
```

创建一个草地模型：

```ts
// src/models/straw.ts
import modelAbstract from './modelAbstract'

//! 用于创建草地模型的类
export default class Straw extends modelAbstract {}
```

```ts
// src/canvas/straw.ts
import config from '../config'
import canvasAbstract from './canvasAbstract'
import Model from '../models/straw'

//! 草地画布
class Straw extends canvasAbstract {
  render(): void {
    // 调用父类的方法
    super.drawModel(config.straw.num, Model)
  }
} //继承画布抽象类

export default new Straw() //导出草地实例
```

```ts
// src/canvas/canvasAbstract.ts
protected drawModel(num: number, Model: any) {
  this.positionCollection(num).forEach(position => {
    ...
    // 模型实例
    new Model(this.canvas, position)
    ...
  })
```

## 10.模型抽象类的 TS 类型支持

`src/vite-env.d.ts` ：

```ts
/// <reference types="vite/client" />

//! 为模型抽象类 modelAbstract 声明一个类型接口
interface ModelConstructor {
  new (canvas: CanvasRenderingContext2D, x: number, y: number): ModelInterface
}

// 为模型实例声明一个类型接口
interface ModelInterface {
  render(): void
}
```

`src/canvas/canvasAbstract.ts` ：

```ts
import config from '../config'
import { image } from '../service/image'

//! 定义所有物体画布的抽象类
export default abstract class canvasAbstract {
  protected items = [] //记录物体个数
  abstract render(): void //声明一个抽象方法，用于画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')! //2d画布
  ) {
    //初始化
    this.createCanvas()
  }

  // 创建画布
  protected createCanvas() {
    //物体画布的宽高
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height

    //将物体对应的canvas元素插入页面进行显示
    this.app.insertAdjacentElement('afterbegin', this.el)
  }

  // 绘制模型（子类可复用）
  protected drawModel(num: number, Model: ModelConstructor) {
    // num为物体数量，每一个物体对应着画布上的一个模型贴图，位置都不一样
    this.positionCollection(num).forEach((position) => {
      // 模型实例
      const instance = new Model(this.canvas, position.x, position.y)
      // 模型渲染
      instance.render()

      //制作贴图并绘制到画布上
      const img = image.get('straw')!
      // console.log(img)
      this.canvas.drawImage(img, position.x, position.y, config.model.width, config.model.height)
    })
  }

  // 批量获取唯一坐标
  protected positionCollection(num: number) {
    const collection = [] as { x: number; y: number }[]
    for (let i = 0; i < num; i++) {
      //新坐标与集合值进行比较，进行去重
      while (true) {
        const position = this.position()
        const exist = collection.some((pos) => pos.x == position.x && pos.y == position.y)
        if (!exist) {
          collection.push(position)
          break
        }
      }
    }

    return collection
  }

  // 随机生成一组坐标
  protected position() {
    return {
      //画布尺寸、模型尺寸
      x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
      y: Math.floor(Math.random() * (config.canvas.height / config.model.height)) * config.model.height,
    }
  }
}
```

`src/canvas/straw.ts` ：

```ts
import config from '../config'
import canvasAbstract from './canvasAbstract'
import Model from '../models/straw'

//! 草地画布
class Straw extends canvasAbstract {
  render(): void {
    // 调用父类的 drawModel 方法, 进行草地模型的渲染
    super.drawModel(config.straw.num, Model)
  }
} //继承画布抽象类

export default new Straw() //导出草地实例
```

`src/models/straw.ts` ：

```ts
import modelAbstract from './modelAbstract'

//! 用于创建草地模型的类
export default class Straw extends modelAbstract implements ModelInterface {
  render(): void {
    //调用父类的 draw 方法，完成草地模型的渲染
    super.draw()
  }
}
```

`src/models/modelAbstract.ts` ：

```ts
import config from '../config'
import { image } from '../service/image'

//! 创建模型实例的抽象类
export default abstract class modelAbstract {
  // 定义一个抽象方法，子类必须实现该方法
  abstract render(): void

  constructor(protected canvas: CanvasRenderingContext2D, protected x: number, protected y: number) {}

  // 物体模型的渲染动作（子类可复用）
  protected draw() {
    this.canvas.drawImage(image.get('straw')!, this.x, this.y, config.model.width, config.model.height)
  }
}
```

`src/main.ts` ：（在`#app`上渲染 30 个草地贴图）

```ts
import './style.scss'
import config from './config'
import { image, promises } from './service/image'
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
```

## 11.模型的位置管理服务

`src/service/position.ts` ：

```ts
import config from '../config'

type positionType = { x: number; y: number }
class Position {
  // 不同种类的模型，不能重叠在一起
  totalCollection: positionType[] = []

  // 批量获取唯一坐标
  public getCollection(num: number) {
    const collection = [] as { x: number; y: number }[]
    for (let i = 0; i < num; i++) {
      //新坐标与集合值进行比较，进行去重
      while (true) {
        const position = this.position()
        const exist = collection.some((pos) => pos.x == position.x && pos.y == position.y)
        if (!exist) {
          this.totalCollection.push(position)

          collection.push(position)
          break
        }
      }
    }
    // console.log(this.totalCollection)
    return collection
  }

  // 随机生成一组坐标
  protected position() {
    return {
      //画布尺寸、模型尺寸
      x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
      y: Math.floor(Math.random() * (config.canvas.height / config.model.height - 5)) * config.model.height + config.model.height * 1,
    }
  }
}

export default new Position()
```

`src/canvas/canvasAbstract.ts` ：

```ts
import config from '../config'
import { image } from '../service/image'
import position from '../service/position'

//! 定义所有物体画布的抽象类
export default abstract class canvasAbstract {
  protected items = [] //记录物体个数
  abstract render(): void //声明一个抽象方法，用于画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')! //2d画布
  ) {
    //初始化
    this.createCanvas()
  }

  // 创建画布
  protected createCanvas() {
    //物体画布的宽高
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height

    //将物体对应的canvas元素插入页面进行显示
    this.app.insertAdjacentElement('afterbegin', this.el)
  }

  // 绘制模型
  protected drawModel(num: number, Model: ModelConstructor) {
    // num为物体数量，每一个物体对应着画布上的一个模型贴图，位置都不一样
    position.getCollection(num).forEach((position) => {
      // 模型实例
      const instance = new Model(this.canvas, position.x, position.y)
      instance.render()

      //制作贴图并绘制到画布上
      const img = image.get('straw')!
      // console.log(img)
      this.canvas.drawImage(img, position.x, position.y, config.model.width, config.model.height)
    })
  }
}
```

## 12.草地模型的渲染全流程

`src/canvas/canvasAbstract.ts` ：

```ts
import config from '../config'
import position from '../service/position'

//! 定义所有物体画布的抽象类
export default abstract class canvasAbstract {
  protected models: ModelInterface[] = [] //维护已创建的模型实例
  abstract render(): void //声明一个抽象方法，用于画布的渲染

  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'), //为物体创建canvas元素
    protected canvas = el.getContext('2d')! //2d画布
  ) {
    //初始化
    this.createCanvas()
  }

  // 1.创建画布
  protected createCanvas() {
    //物体画布的宽高
    this.el.width = config.canvas.width
    this.el.height = config.canvas.height

    //将物体对应的canvas元素插入页面进行显示
    this.app.insertAdjacentElement('afterbegin', this.el)
  }

  // 2.生成模型实例
  protected createModels(num: number, Model: ModelConstructor) {
    // num为物体数量，每一个物体对应着画布上的一个模型贴图，位置都不一样
    position.getCollection(num).forEach((position) => {
      // 模型实例
      const instance = new Model(this.canvas, position.x, position.y)
      this.models.push(instance)
    })
  }

  // 3.将模型渲染到画布上
  protected renderModels() {
    this.models.forEach((model) => {
      console.log(1)
      model.render()
    })
  }
}
```

`src/canvas/straw.ts` ：

```ts
import config from '../config'
import canvasAbstract from './canvasAbstract'
import Model from '../models/straw'

//! 草地画布
class Straw extends canvasAbstract {
  constructor() {
    //1.创建画布
    super()
    //2.批量创建草地的模型实例
    super.createModels(config.straw.num, Model)
  }
  render(): void {
    //3.调用父类的 renderModels 方法, 将模型渲染到画布上
    super.renderModels()
  }
} //继承画布抽象类

export default new Straw() //导出草地实例
```