let countdown = 5;
let timer = setInterval(() => {
  if (countdown <= 0) {
    clearInterval(timer);
  }
  document.querySelector('.mobile-message span').innerHTML = countdown !== 1 ? `${countdown} seconds` : `${countdown} second`;
  countdown -= 1;
}, 1000);

const today = new Date();
const birthday = new Date(2000, 6, 5); // months are 0-based
const age = today.getFullYear() - birthday.getFullYear() - (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()));

document.querySelector('.years').textContent = age;

let cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
});

function updateStrokeStyle() {
  const strokeStyle = getStrokeStyle();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let drawingStarted = false;

  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    if (point === null) {
      drawingStarted = false;
      continue;
    }

    const { x, y } = point;

    if (!drawingStarted) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      drawingStarted = true;
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.strokeStyle = strokeStyle;
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateStrokeStyle);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let points = [];

if (window.matchMedia('(pointer: fine)').matches) {
  let isDrawing = false;

  function startDrawing(e) {
    isDrawing = true;
    points.push({ x: e.offsetX, y: e.offsetY });
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  function draw(e) {
    if (!isDrawing) return;
    points.push({ x: e.offsetX, y: e.offsetY });
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = getStrokeStyle();
  }

  function stopDrawing() {
    isDrawing = false;
    points.push(null);
  }

  function getStrokeStyle() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? '#fff' : '#000';
  }

  function updateDrawingStatus() {
    const drawCheckbox = document.querySelector('.draw-checkbox');
    const label = document.querySelector('label');
    const elementsToDisable = document.querySelectorAll('.inerted')

    if (drawCheckbox.checked) {
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      document.addEventListener('mouseleave', stopDrawing);

      canvas.style.zIndex = 'unset';
      canvas.style.backdropFilter = 'blur(.125rem)'
      label.style.zIndex = '1000';
      label.style.position = 'fixed';
      
      elementsToDisable.forEach(element => {
        element.inert = true;
      });
    } else {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      document.removeEventListener('mouseleave', stopDrawing);

      canvas.style.zIndex = '-1';
      canvas.style.backdropFilter = 'unset'
      label.style.zIndex = 'unset';
      label.style.position = 'absolute';

      elementsToDisable.forEach(element => {
        element.inert = false;
      });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const drawCheckbox = document.querySelector('.draw-checkbox');
    drawCheckbox.addEventListener('click', updateDrawingStatus);
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
    redrawCanvas();
  }

  function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let drawingStarted = false;
    const strokeStyle = getStrokeStyle();

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point === null) {
        drawingStarted = false;
        continue;
      }

      const { x, y } = point;

      if (!drawingStarted) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        drawingStarted = true;
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.strokeStyle = strokeStyle;
    }
  }

  function updateStrokeStyle() {
    const strokeStyle = getStrokeStyle();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    let drawingStarted = false;
  
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
  
      if (point === null) {
        drawingStarted = false;
        continue;
      }
  
      const { x, y } = point;
  
      if (!drawingStarted) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        drawingStarted = true;
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
  
      ctx.strokeStyle = strokeStyle;
    }
  
    updateFavicon();
  }
  
  function updateFavicon() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.querySelector("link[rel='icon']").href = prefersDarkScheme ? "./images/favicon_dark.ico" : "./images/favicon_light.ico";
  }
  
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateStrokeStyle);
  
  updateStrokeStyle();
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}
