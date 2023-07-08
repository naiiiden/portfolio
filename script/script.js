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

  function enableDrawing() {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mouseleave', stopDrawing);
  }

  function disableDrawing() {
    canvas.removeEventListener('mousedown', startDrawing);
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', stopDrawing);
    document.removeEventListener('mouseleave', stopDrawing);
  }

  function updateDrawingStatus() {
    const drawCheckbox = document.querySelector('.draw-checkbox');
    const text = document.querySelector('.text');

    if (drawCheckbox.checked) {
      enableDrawing();
      canvas.style.zIndex = 'unset';
      text.inert = true;
      document.querySelector('label').style.zIndex = '1000';
    } else {
      disableDrawing();
      canvas.style.zIndex = '-1';
      text.inert = false;
      document.querySelector('label').style.zIndex = 'unset';
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
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}
