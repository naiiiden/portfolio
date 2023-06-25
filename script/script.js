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
    console.log(1)
    document.querySelector('.text-reveal').classList.toggle('anim')
})