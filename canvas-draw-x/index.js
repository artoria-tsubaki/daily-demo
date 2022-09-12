const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let x = 0
let y = 0

const length = 15

while(y <= canvas.clientHeight) {
  while(x <= canvas.clientWidth) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + length, y + length)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + length, y)
    ctx.lineTo(x, y + length)
    ctx.stroke()
  
    x += length
  }
  // 开始渲染下一行
  y += length
  // 从容器起始开始
  x = 0
}