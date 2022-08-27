import { image } from "../service/image";
import modelAbstract from "./modelAbstract";

// 创建砖墙模型的类
export default class extends modelAbstract implements ModelInterface{
  render(): void {
    super.draw(image.get('steel')!)
  }
}
