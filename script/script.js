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

document.querySelector('button').addEventListener('click', () => {
    const text = document.querySelector('.text-reveal')
    const img = document.querySelector('img')

    text.classList.toggle('anim')
    img.setAttribute('src', text.classList.contains('anim') ? './images/close-dark.svg' : './images/open-dark.svg')
    img.setAttribute('aria-label', text.classList.contains('anim') ? 'Hide text' : 'Reveal text')
})