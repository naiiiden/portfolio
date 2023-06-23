document.addEventListener('mousemove', (e) => {
    let cursor = document.querySelector('.cursor');
    cursor.style.left = (e.clientX - 7.5) + 'px';
    cursor.style.top = (e.clientY - 2.5) + 'px'; 
});