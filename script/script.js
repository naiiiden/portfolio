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

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const text = document.querySelector('.text-reveal')
const img = document.querySelector('img')

function svgStrokeColor() {
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