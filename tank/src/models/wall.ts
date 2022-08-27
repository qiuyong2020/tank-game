import { image } from "../service/image";
import modelAbstract from "./modelAbstract";

// 创建坦克模型的类
export default class extends modelAbstract implements ModelInterface{
  render(): void {
    super.draw(image.get('wall')!)
  }
}
