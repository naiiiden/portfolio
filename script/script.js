let countdown = 5
let timer = setInterval(() => {
  if (countdown <= 0) {
    clearInterval(timer)
  }
  document.querySelector('.mobile-message span').innerHTML = countdown
  countdown -= 1
}, 1000)

const today = new Date()
const birthday = new Date(2000, 6, 5) // months are 0-based
const age = today.getFullYear() - birthday.getFullYear() - (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()))

document.querySelector('.years').textContent = age

let cursor = document.querySelector('.cursor')

document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 10) + 'px'
    cursor.style.top = (e.clientY - 10) + 'px' 
})

document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.remove('cursor')
    })

    link.addEventListener('mouseleave', () => {
        cursor.classList.add('cursor')
    })
})

const text = document.querySelector('.text-reveal')
const img = document.querySelector('img')

document.querySelector('button').addEventListener('click', () => {
    text.classList.toggle('anim')
    svgStrokeColor()
    img.setAttribute('aria-label', text.classList.contains('anim') ? 'Hide text' : 'Reveal text')
})

function svgStrokeColor() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    img.setAttribute('src', text.classList.contains('anim')
        ? isDark
            ? './images/close-dark.svg'
            : './images/close-light.svg'
        : isDark
            ? './images/open-dark.svg'
            : './images/open-light.svg'
    )
    updateStrokeStyle()
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', svgStrokeColor)

if (window.matchMedia('(pointer: fine)').matches) {
  // ChatGPT
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  // TODO
  window.addEventListener("resize", function(){
      canvas.setAttribute("width", window.innerWidth)
      canvas.setAttribute("height", window.innerHeight)
      console.log(canvas.width)
      console.log(canvas.height)
  })
  
  
  let isDrawing = false
  let points = []
  
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', stopDrawing)
  document.addEventListener('mouseleave', stopDrawing)
  
  function startDrawing(e) {
    isDrawing = true
    points.push({ x: e.offsetX, y: e.offsetY })
    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
  }
  
  function draw(e) {
    if (!isDrawing) return
    points.push({ x: e.offsetX, y: e.offsetY })
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    ctx.lineWidth = 0.5
    ctx.strokeStyle = getStrokeStyle()
  }
  
  function stopDrawing() {
    isDrawing = false
    points.push(null)
  }
  
  function getStrokeStyle() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return isDark ? '#fff' : '#000'
  }
  
  function updateStrokeStyle() {
    const strokeStyle = getStrokeStyle()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    let drawingStarted = false
  
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
  
      if (point === null) {
        drawingStarted = false
        continue
      }
  
      const { x, y } = point
  
      if (!drawingStarted) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        drawingStarted = true
      } else {
        ctx.lineTo(x, y)
        ctx.stroke()
      }
  
      ctx.strokeStyle = strokeStyle
    }
  }
  
  svgStrokeColor()
}
