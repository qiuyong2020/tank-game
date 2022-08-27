import { image } from "../service/image";
import modelAbstract from "./modelAbstract";

//! 用于创建草地模型的类
export default class Straw extends modelAbstract implements ModelInterface{
  render(): void {
    //调用父类的 draw 方法，完成草地模型的渲染
    super.draw(image.get('straw')!)
  }
}
 