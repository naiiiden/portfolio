let cursor = document.querySelector('.cursor')

document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 7.5) + 'px'
    cursor.style.top = (e.clientY - 2.5) + 'px' 
})

document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        link.classList.add('hover')
        cursor.classList.remove('cursor')
    })

    link.addEventListener('mouseleave', (e) => {
        link.classList.remove('hover')
        cursor.classList.add('cursor')
    })
})