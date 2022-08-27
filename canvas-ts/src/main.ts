const el = document.querySelector<HTMLCanvasElement>('#canvas')!
let context = el.getContext('2d')!

// 1. 绘制一个颜色为red、左上角点为(0,0)且大小为300*300的正方形
// context.fillStyle = 'red'
// context.fillRect(0,0,300,300)
// 2. 绘制一个颜色为red、中心点为(150,150)且大小为100*100的正方形
// context.fillStyle = '#0000ff'
// context.fillRect(el.width / 2 - 50, el.height / 2 - 50, 100, 100)

// 3. 绘制灰色、线宽为30px、倒圆角的线条
// context.strokeStyle = '#ccc'
// context.lineWidth = 30
// context.lineJoin = 'round'
// context.strokeRect(50,50,200,200) //填充

// 4. 画圆 => 圆心和半径
// context.strokeStyle = 'red'
// context.lineWidth = 20
// context.arc(100,100,50,0,2*Math.PI)
// context.stroke() //画线条

// 5. 点移动、画直线
// context.beginPath()
// context.strokeStyle = 'green'
// context.fillStyle = 'blue'
// context.lineWidth = 10
// context.moveTo(el.width / 2, 10)
// context.lineTo(el.width, 250)
// context.lineTo(10,250)
// context.closePath()

// context.stroke() //轮廓线
// context.fill() //内部填充


// 6. 线性渐变
const gradient = context.createLinearGradient(0,0,300,300)
gradient.addColorStop(0, '#16a085')
gradient.addColorStop(0.5, 'pink')
gradient.addColorStop(1, 'skyblue')

// context.strokeStyle = gradient //渐变
// context.lineWidth = 20
// context.lineJoin = 'round' //倒圆角
// context.strokeRect(50,50,200,200) //轮廓线


// 7. 文字处理
// // context.fillStyle = '#aaa'
// context.fillRect(0,0,300,300)

// context.font = '40px SourceHanSansSC-Normal'
// context.fillStyle = gradient
// // context.strokeStyle = gradient
// // context.lineWidth = 5
// context.textBaseline = 'top'
// context.fillText('hello world', 0, 0)


// 8. 图片贴图
// context.fillStyle = 'skyblue'
// context.fillRect(0, 0, el.width, el.height)
// const img = document.createElement('img')  //图片标签
// img.src = './images/picture.jpeg' //<img src="" />

// img.onload = () => {
//   // 按原图的宽和高的较小比例为准对 img 进行缩放
//   el.width = img.naturalWidth * scale(img, el)
//   el.height = img.naturalHeight * scale(img, el)
//   // 图片在画布上绘制成贴图
//   context.drawImage(img, 0, 0, el.width, el.height)
// }

// 页面中图片与原图相比较，宽、高缩放比例的较小值
// function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
//   return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight)
// }


// 9. 绘制随机色块
context.fillRect(0,0,500,500)

for(let i = 0; i < 20; i++) {
  context.beginPath()
  // 随机色块
  context.fillStyle = ['red', 'green', 'blue', 'yellow', 'pink']
  .sort(() => Math.floor(Math.random() * 3) ? 1 : -1)[0]
  // 随机生成小圆点
  context.arc(Math.floor(Math.random() * (el.width /2)), Math.floor(Math.random() * (el.height /2)), 10, 0, 2*Math.PI)

  // 绘制到画布上
  context.fill()
}