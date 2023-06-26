const today = new Date()
const birthday = new Date(2000, 6, 5) // months are 0-based
const age = today.getFullYear() - birthday.getFullYear() - (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()))

document.querySelector('.years').textContent = age

let cursor = document.querySelector('.cursor')

document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 7.5) + 'px'
    cursor.style.top = (e.clientY - 2.5) + 'px' 
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
}

svgStrokeColor()

document.querySelector('button').addEventListener('click', () => {
    text.classList.toggle('anim')
    svgStrokeColor()
    img.setAttribute('aria-label', text.classList.contains('anim') ? 'Hide text' : 'Reveal text')
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', svgStrokeColor)

// draw
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext("2d");

ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 10, 10)