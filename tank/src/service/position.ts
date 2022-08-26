/* 管理模型位置的服务 */

import config from "../config"

type positionType = {x:number, y:number}
class Position {
  // 不同种类的模型，不能重叠在一起
  totalCollection: positionType[] = []

  // 批量获取唯一坐标
  public getCollection(num: number) {
    const collection = [] as {x:number, y:number}[]
    for(let i = 0; i < num; i++) {
      //新坐标与集合值进行比较，进行去重
      while(true) {
        const position = this.position()
        const exist = collection.some(pos => pos.x == position.x && pos.y == position.y)
        if(!exist) {
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
    return { //画布尺寸、模型尺寸
      x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
      y: Math.floor(Math.random() * (config.canvas.height / config.model.height - 5)) * config.model.height + config.model.height * 1
    }
  }
}

export default new Position()