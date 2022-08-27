import { directionEnum } from "../enum/directionEnum";
import { image, type mapKey } from "../service/image";
import modelAbstract from "./modelAbstract";
import _ from 'lodash';
import config from "../config";

// 创建坦克模型的类
export default class extends modelAbstract implements ModelInterface{
  // 坦克运动方向的枚举类型
  protected direction: directionEnum = directionEnum.top

  render(): void {
    this.randomDirection()
    super.draw(this.randomImage())

    setInterval(() => {
      this.move()
    }, 50)
  }

  // 坦克在四个方向上的一次移动
  protected move(): void {
    //将移动前的旧模型从画布上清除 
    this.canvas.clearRect(this.x, this.y, config.model.width, config.model.height)

    //改变模型坐标 
    switch(this.direction) {
      case directionEnum.top:
        //炮口朝上，向上走
        this.y -= 2
        break
      case directionEnum.right:
        this.x += 2
        break
      case directionEnum.bottom:
        this.y += 2
        break
      case directionEnum.left:
        this.x -= 2
        break
    }

    //位置移动后，重绘新模型
    super.draw(this.randomImage())
  }

  // 随机方向
  randomDirection(): void {
    //0~3随机整数 
    const index = Math.floor(Math.random() * 4)
    //Object.keys(enum) => 将“枚举类型”转换为“可迭代对象”
    this.direction = Object.keys(directionEnum)[index] as directionEnum
    // console.log(this.direction)
  }

  randomImage():HTMLImageElement {
    //安装 lodash 库，字符串首字母大写 
    let direction = 'tank' + _.upperFirst(this.direction)

    return image.get(direction as mapKey)!
  }
}
