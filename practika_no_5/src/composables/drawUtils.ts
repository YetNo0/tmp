import { type Ref } from 'vue';

interface Coordinate {
  x: number;
  y: number;
}

export function useDrawUtils(canvas: Ref<HTMLCanvasElement | null>) {
  // Функция для отрисовки произвольного отрезка на основе прямого вычисления координат
  function drawLine(coords: { x1: number, y1: number, x2: number, y2: number }): void {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(coords.x1, coords.y1);
    ctx.lineTo(coords.x2, coords.y2);
    ctx.stroke();
  }

// Функция для отрисовки произвольного отрезка на основе алгоритма Брезенхэма
function drawLineBresenham(coords: { x1: number, y1: number, x2: number, y2: number }): void {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  const { x1, y1, x2, y2 } = coords;
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  ctx.strokeStyle = 'red'; // Устанавливаем цвет линии
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  let x = x1;
  let y = y1;

  while (true) {
    ctx.lineTo(x, y); // Добавляем линию
    if (x === x2 && y === y2) {
      break;
    }

    const e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }

    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  ctx.stroke(); // Рисуем линию
}



  // Функция для закрашивания произвольной замкнутой области
  function fillArea(coords: Coordinate[]): void {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'blue'; // Задаем цвет и прозрачность
    ctx.fill();
  }

  return {
    drawLine,
    drawLineBresenham,
    fillArea
  };
}
