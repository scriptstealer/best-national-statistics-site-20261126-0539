// charts.js — plain-canvas charts, no libraries.
// Every chart is drawn by hand on a <canvas> so the site needs no network
// and no vendored code. All drawing honours devicePixelRatio so charts stay
// sharp on phones.

function setupCanvas(canvas, heightCss) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  const height = heightCss || 260;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceMax(v) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}

function formatTick(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'k';
  if (Math.abs(v) >= 100) return Math.round(v).toString();
  if (Math.abs(v) >= 10) return v.toFixed(0);
  return v.toFixed(1);
}

// Draw the grid, axes and labels shared by bar and line charts.
function drawAxes(ctx, plot, minV, maxV, labels) {
  const { x, y, w, h } = plot;
  ctx.strokeStyle = '#e2e8f0';
  ctx.fillStyle = '#64748b';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = minV + ((maxV - minV) * i) / steps;
    const py = y + h - (h * i) / steps;
    ctx.beginPath();
    ctx.moveTo(x, py);
    ctx.lineTo(x + w, py);
    ctx.stroke();
    ctx.fillText(formatTick(v), x - 8, py);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((lab, i) => {
    const px = x + (w * (i + 0.5)) / labels.length;
    ctx.fillText(String(lab), px, y + h + 6);
  });
}

// Bar chart. `points` is [{label, value}], `highlightIndex` marks the
// selected year, `color` is the bar colour.
export function drawBarChart(canvas, points, opts) {
  const { highlightIndex = -1, color = '#0f766e', height = 260 } = opts || {};
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const padL = 52, padR = 12, padT = 14, padB = 28;
  const plot = { x: padL, y: padT, w: width - padL - padR, h: h - padT - padB };
  const values = points.map((p) => p.value);
  const minV = Math.min(0, ...values);
  const maxV = niceMax(Math.max(...values) * 1.05);
  drawAxes(ctx, plot, minV, maxV, points.map((p) => p.label));
  const zeroY = plot.y + plot.h - ((0 - minV) / (maxV - minV)) * plot.h;
  const slot = plot.w / points.length;
  const barW = Math.min(46, slot * 0.62);
  points.forEach((p, i) => {
    const px = plot.x + slot * i + (slot - barW) / 2;
    const top = plot.y + plot.h - ((p.value - minV) / (maxV - minV)) * plot.h;
    ctx.fillStyle = i === highlightIndex ? '#b45309' : color;
    const y0 = p.value >= 0 ? top : zeroY;
    const bh = Math.abs(zeroY - top);
    ctx.fillRect(px, y0, barW, Math.max(bh, 1.5));
    if (i === highlightIndex) {
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(px - 1, y0 - 1, barW + 2, Math.max(bh, 1.5) + 2);
    }
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(formatTick(p.value), px + barW / 2, y0 - 4);
  });
  return true;
}

// Line chart with dots and a filled area under the line.
export function drawLineChart(canvas, points, opts) {
  const { highlightIndex = -1, color = '#0f766e', height = 260 } = opts || {};
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const padL = 52, padR = 16, padT = 16, padB = 28;
  const plot = { x: padL, y: padT, w: width - padL - padR, h: h - padT - padB };
  const values = points.map((p) => p.value);
  let minV = Math.min(...values);
  let maxV = Math.max(...values);
  const span = maxV - minV || 1;
  minV -= span * 0.12;
  maxV += span * 0.12;
  drawAxes(ctx, plot, minV, maxV, points.map((p) => p.label));
  const xs = points.map((_, i) => plot.x + (plot.w * i) / Math.max(points.length - 1, 1));
  const ys = values.map((v) => plot.y + plot.h - ((v - minV) / (maxV - minV)) * plot.h);
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0]);
  xs.forEach((px, i) => ctx.lineTo(px, ys[i]));
  ctx.lineTo(xs[xs.length - 1], plot.y + plot.h);
  ctx.lineTo(xs[0], plot.y + plot.h);
  ctx.closePath();
  ctx.fillStyle = color + '22';
  ctx.fill();
  ctx.beginPath();
  xs.forEach((px, i) => (i === 0 ? ctx.moveTo(px, ys[i]) : ctx.lineTo(px, ys[i])));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(xs[i], ys[i], i === highlightIndex ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = i === highlightIndex ? '#b45309' : '#ffffff';
    ctx.fill();
    ctx.strokeStyle = i === highlightIndex ? '#92400e' : color;
    ctx.lineWidth = 2;
    ctx.stroke();
    if (i === highlightIndex || i === points.length - 1) {
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(formatTick(p.value), xs[i], ys[i] - 9);
    }
  });
  return true;
}

// Donut chart with a legend drawn beside it in the page (legend is HTML).
export function drawDonut(canvas, slices, opts) {
  const { height = 260 } = opts || {};
  const { ctx, width, height: h } = setupCanvas(canvas, height);
  const cx = width / 2;
  const cy = h / 2;
  const r = Math.min(width, h) / 2 - 14;
  const inner = r * 0.58;
  let a = -Math.PI / 2;
  slices.forEach((s) => {
    const sweep = (s.share / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();
    a += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('100%', cx, cy - 8);
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('of GDP', cx, cy + 12);
  return true;
}

// Horizontal bar list, used for trade partners and age groups.
export function drawHBarChart(canvas, rows, opts) {
  const { color = '#0f766e', height = 260, suffix = '%' } = opts || {};
  const rowH = 34;
  const { ctx, width } = setupCanvas(canvas, Math.max(height, rows.length * rowH + 20));
  const padL = 150, padR = 52, padT = 8;
  const maxV = Math.max(...rows.map((r) => r.value));
  rows.forEach((row, i) => {
    const y = padT + i * rowH;
    ctx.fillStyle = '#0f172a';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(row.label, padL - 10, y + 12);
    const bw = ((width - padL - padR) * row.value) / maxV;
    ctx.fillStyle = row.color || color;
    ctx.fillRect(padL, y, Math.max(bw, 2), 22);
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'left';
    ctx.fillText(row.value.toFixed(1) + suffix, padL + bw + 6, y + 12);
  });
  return true;
}
