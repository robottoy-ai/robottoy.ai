/* One hands-on animation per subject. Each function draws into the element it is given and returns a function that stops it. */
(function () {
const NS = 'http://www.w3.org/2000/svg';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU = Math.PI * 2;
function set(e, a) {
  for (const k in a) { const v = a[k];
    if (k === 'text') e.textContent = v;
    else if ((k === 'fill' || k === 'stroke') && String(v).indexOf('var(') === 0) e.style[k] = v;
    else e.setAttribute(k, v); }
  return e;
}
function h(tag, a, parent) { const e = document.createElementNS(NS, tag); set(e, a || {}); if (parent) parent.appendChild(e); return e; }
function frame(root, title, tryIt) {
  root.innerHTML = '<div class="demo-h"><b></b><span></span></div><svg viewBox="0 0 320 180" role="img"></svg><div class="demo-c"></div><p class="demo-o"></p>';
  root.querySelector('b').textContent = title; root.querySelector('span').textContent = tryIt;
  const svg = root.querySelector('svg'); svg.setAttribute('aria-label', title);
  return { svg: svg, ctl: root.querySelector('.demo-c'), out: root.querySelector('.demo-o') };
}
let uid = 0;
function slider(ctl, label, min, max, val, step, fmt, on) {
  const id = 'dm' + (++uid), w = document.createElement('div'); w.className = 'demo-s';
  w.innerHTML = '<label for="' + id + '"><span></span><output></output></label><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '">';
  w.querySelector('span').textContent = label;
  const inp = w.querySelector('input'), o = w.querySelector('output');
  const upd = function () { o.textContent = fmt(+inp.value); };
  inp.addEventListener('input', function () { upd(); if (on) on(+inp.value); }); upd(); ctl.appendChild(w);
  return function () { return +inp.value; };
}
function toggle(ctl, labels, on) {
  const b = document.createElement('button'); b.className = 'demo-b'; let i = 0; b.textContent = labels[0];
  b.addEventListener('click', function () { i = 1 - i; b.textContent = labels[i]; on(i); }); ctl.appendChild(b);
  return function () { return i; };
}
function run(ctl, step) {
  let on = !reduced, last = 0, id = 0, alive = true;
  const b = document.createElement('button'); b.className = 'demo-b'; b.textContent = on ? 'Pause' : 'Play'; ctl.appendChild(b);
  b.addEventListener('click', function () { on = !on; b.textContent = on ? 'Pause' : 'Play'; });
  function tick(t) { if (!alive) return; const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t; if (on) step(dt); id = requestAnimationFrame(tick); }
  step(0); id = requestAnimationFrame(tick);
  return { stop: function () { alive = false; cancelAnimationFrame(id); }, poke: function () { if (!on) step(0); } };
}
function say(f, text, cls) { f.out.textContent = text; f.out.className = 'demo-o' + (cls ? ' ' + cls : ''); }

/* ---------- statics: move the weight until it tips ---------- */
function statics(root) {
  const f = frame(root, 'Find the tipping point', 'Move the weight sideways. Then make the foot narrower.'), s = f.svg;
  h('line', { x1: 10, y1: 150, x2: 310, y2: 150, stroke: 'currentColor' }, s);
  const foot = h('rect', { y: 144, height: 6, fill: 'var(--move)' }, s), g = h('g', {}, s);
  h('rect', { x: 130, y: 54, width: 60, height: 90, rx: 8, fill: 'var(--tint)', stroke: 'currentColor' }, g);
  const com = h('circle', { r: 6, cy: 100, fill: 'currentColor' }, g);
  const pl = h('line', { stroke: 'var(--motor)', 'stroke-dasharray': '4 3', 'stroke-width': 1.5 }, s);
  let ang = 0, vel = 0, R = null; const poke = function () { if (R) R.poke(); };
  const off = slider(f.ctl, 'Weight position', -45, 45, 0, 1, function (v) { return v > 0 ? v + ' mm right' : v < 0 ? -v + ' mm left' : 'centre'; }, poke);
  const fw = slider(f.ctl, 'Foot width', 10, 80, 50, 1, function (v) { return v + ' mm'; }, poke);
  R = run(f.ctl, function (dt) {
    const o = off(), w = fw(), out = Math.abs(o) - w / 2, tip = out > 0, dir = o < 0 ? -1 : 1;
    set(foot, { x: 160 - w / 2, width: w }); com.setAttribute('cx', 160 + o);
    if (tip) { vel += 260 * dt; ang = Math.min(88, ang + vel * dt); } else { ang = 0; vel = 0; }
    const px = 160 + dir * w / 2, a = dir * ang * Math.PI / 180, dx = 160 + o - px, dy = 100 - 144;
    g.setAttribute('transform', 'rotate(' + (dir * ang) + ' ' + px + ' 144)');
    const cx = px + dx * Math.cos(a) - dy * Math.sin(a), cy = 144 + dx * Math.sin(a) + dy * Math.cos(a);
    set(pl, { x1: cx, y1: cy, x2: cx, y2: 150 });
    say(f, tip ? 'It tips. The weight is ' + out.toFixed(0) + ' mm outside the foot.' : 'It stands. Margin: ' + (-out).toFixed(0) + ' mm before it tips.', tip ? 'bad' : 'ok');
  });
  return R.stop;
}

/* ---------- mechanisms: crank against cam ---------- */
function mechanisms(root) {
  const f = frame(root, 'Crank or cam', 'Change from crank to cam. Watch the line on the right.'), s = f.svg, cx = 80, cy = 112;
  const disc = h('path', { fill: 'var(--tint)', stroke: 'currentColor' }, s), pin = h('circle', { r: 5, fill: 'var(--move)' }, s);
  h('circle', { cx: cx, cy: cy, r: 3, fill: 'currentColor' }, s);
  const rod = h('line', { x1: cx, x2: cx, y1: 18, stroke: 'var(--move)', 'stroke-width': 3 }, s), fol = h('rect', { x: cx - 16, width: 32, height: 7, fill: 'var(--move)' }, s);
  h('line', { x1: 170, y1: 150, x2: 305, y2: 150, stroke: 'currentColor' }, s); h('line', { x1: 170, y1: 40, x2: 170, y2: 150, stroke: 'currentColor' }, s);
  const trace = h('polyline', { fill: 'none', stroke: 'var(--motor)', 'stroke-width': 2 }, s), cur = h('circle', { r: 4.5, fill: 'var(--move)' }, s);
  h('text', { x: 238, y: 166, 'text-anchor': 'middle', 'font-size': 11, text: 'one full turn' }, s);
  h('text', { x: 172, y: 32, 'font-size': 11, text: 'height of the moving part' }, s);
  const ext = function (a) { a = Math.abs((((a + Math.PI) % TAU) + TAU) % TAU - Math.PI); const hd = 1.745, rp = 0.96; return a <= hd ? 1 : a >= hd + rp ? 0 : 0.5 * (1 + Math.cos(Math.PI * (a - hd) / rp)); };
  let th = 0, mode = 0, R = null; const poke = function () { if (R) R.poke(); };
  const rr = slider(f.ctl, 'Size', 6, 26, 16, 1, function (v) { return v + ' mm'; }, poke);
  toggle(f.ctl, ['Showing: crank', 'Showing: cam'], function (i) { mode = i; poke(); });
  const val = function (a, r) { return mode ? ext(Math.PI / 2 - a) : (Math.sin(a) + 1) / 2; };   // 0..1
  R = run(f.ctl, function (dt) {
    th = (th + 1.6 * dt) % TAU; const r = rr(); let d = '', pts = '';
    if (mode) { for (let i = 0; i <= 72; i++) { const a = i / 72 * TAU, rho = 12 + r * ext(a); d += (i ? 'L' : 'M') + (cx + rho * Math.cos(a + th)).toFixed(1) + ' ' + (cy - rho * Math.sin(a + th)).toFixed(1); } d += 'Z'; pin.setAttribute('visibility', 'hidden'); }
    else { for (let i = 0; i <= 48; i++) { const a = i / 48 * TAU; d += (i ? 'L' : 'M') + (cx + 30 * Math.cos(a)).toFixed(1) + ' ' + (cy - 30 * Math.sin(a)).toFixed(1); } d += 'Z'; set(pin, { visibility: 'visible', cx: cx + r * Math.cos(th), cy: cy - r * Math.sin(th) }); }
    disc.setAttribute('d', d);
    const fy = mode ? cy - (12 + r * ext(Math.PI / 2 - th)) - 7 : cy - r * Math.sin(th) - 3.5;
    fol.setAttribute('y', fy); rod.setAttribute('y2', fy);
    for (let i = 0; i <= 60; i++) { const a = i / 60 * TAU; pts += (170 + 135 * i / 60).toFixed(1) + ',' + (150 - 100 * (r / 26) * val(a, r)).toFixed(1) + ' '; }
    trace.setAttribute('points', pts); set(cur, { cx: 170 + 135 * th / TAU, cy: 150 - 100 * (r / 26) * val(th, r) });
    say(f, mode ? 'Cam: it lifts ' + r + ' mm, then stays still for 200° of each turn. That stop is the dwell.' : 'Crank: it travels ' + 2 * r + ' mm end to end, twice the crank radius, and never stops moving.');
  });
  return R.stop;
}

/* ---------- dynamics: the same stop, hard or soft ---------- */
function dynamics(root) {
  const f = frame(root, 'The same stop, hard or soft', 'Make the padding thicker. Watch the force.'), s = f.svg;
  h('line', { x1: 10, y1: 130, x2: 310, y2: 130, stroke: 'currentColor' }, s);
  h('rect', { x: 262, y: 70, width: 12, height: 60, fill: 'currentColor' }, s);
  const pad = h('rect', { y: 86, height: 44, fill: 'var(--tint)', stroke: 'currentColor' }, s), blk = h('rect', { y: 96, width: 34, height: 34, rx: 4, fill: 'var(--move)' }, s);
  const bar = h('rect', { x: 20, y: 30, height: 14, fill: 'var(--bad)' }, s); h('text', { x: 20, y: 24, 'font-size': 11, text: 'force on the block' }, s);
  let x = 20, phase = 0, hold = 0, R = null; const poke = function () { if (R) R.poke(); };
  const pd = slider(f.ctl, 'Padding', 1, 60, 4, 1, function (v) { return v + ' mm'; }, poke);
  const sp = slider(f.ctl, 'Speed', 0.2, 2, 1, 0.1, function (v) { return v.toFixed(1) + ' m/s'; }, poke);
  R = run(f.ctl, function (dt) {
    const p = pd(), v = sp(), F = 0.7 * v * v / (2 * p / 1000), hit = 262 - p - 34, px = 110 * v;
    set(pad, { x: 262 - p, width: p });
    if (phase === 0) { x += px * dt; if (x >= hit) { x = hit; phase = 1; } }
    else if (phase === 1) { const u = (x - hit) / p; x += Math.max(6, px * (1 - u)) * dt; if (x >= 262 - 34) { x = 262 - 34; phase = 2; hold = 0; } }
    else { hold += dt; if (hold > 0.8) { x = 20; phase = 0; } }
    blk.setAttribute('x', Math.min(x, 262 - 34)); if (phase === 1) pad.setAttribute('width', Math.max(0.5, 262 - (x + 34))), pad.setAttribute('x', x + 34);
    bar.setAttribute('width', phase === 1 ? Math.min(280, 38 * Math.log10(1 + F)) : 0);
    say(f, 'To stop in ' + p + ' mm takes ' + F.toFixed(0) + ' N. That is ' + (F / 6.9).toFixed(F < 69 ? 1 : 0) + ' times the weight of the block.', F > 69 ? 'bad' : F < 21 ? 'ok' : '');
  });
  return R.stop;
}

/* ---------- motors: load and gears on the torque-speed line ---------- */
function motors(root) {
  const f = frame(root, 'One motor, any gearbox', 'Raise the load. Then change the gears.'), s = f.svg, X = function (n) { return 44 + n * 0.62; }, Y = function (t) { return 150 - t * 26; };
  h('line', { x1: 44, y1: 150, x2: 304, y2: 150, stroke: 'currentColor' }, s); h('line', { x1: 44, y1: 24, x2: 44, y2: 150, stroke: 'currentColor' }, s);
  h('text', { x: 304, y: 166, 'text-anchor': 'end', 'font-size': 11, text: 'speed, rpm' }, s); h('text', { x: 48, y: 22, 'font-size': 11, text: 'push, kgf·cm' }, s);
  h('line', { x1: 44, y1: Y(2), x2: 304, y2: Y(2), stroke: 'var(--bad)', 'stroke-dasharray': '5 3' }, s); h('text', { x: 302, y: Y(2) - 4, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--bad)', text: 'gearbox limit' }, s);
  const line = h('line', { stroke: 'var(--motor)', 'stroke-width': 2.5 }, s), pt = h('circle', { r: 6 }, s), spin = h('line', { x1: 270, y1: 50, stroke: 'currentColor', 'stroke-width': 3, 'stroke-linecap': 'round' }, s);
  h('circle', { cx: 270, cy: 50, r: 17, fill: 'none', stroke: 'currentColor' }, s);
  let a = 0, R = null; const poke = function () { if (R) R.poke(); };
  const ld = slider(f.ctl, 'Load', 0, 4, 0.3, 0.05, function (v) { return v.toFixed(2) + ' kgf·cm'; }, poke);
  const gr = slider(f.ctl, 'Gears', 50, 300, 210, 10, function (v) { return v + ':1'; }, poke);
  R = run(f.ctl, function (dt) {
    const g = gr(), Ts = 3.0 * g / 210, n0 = 150 * 210 / g, T = Math.min(ld(), Ts), n = n0 * (1 - T / Ts), share = T / Ts;
    set(line, { x1: X(0), y1: Y(Ts), x2: X(n0), y2: Y(0) }); set(pt, { cx: X(n), cy: Y(T), fill: share <= 0.25 ? 'var(--ok)' : share <= 0.5 ? 'var(--move)' : 'var(--bad)' });
    a += n * 1.2 * dt; set(spin, { x2: 270 + 15 * Math.cos(a * Math.PI / 180), y2: 50 + 15 * Math.sin(a * Math.PI / 180) });
    const heat = share <= 0.25 ? 'cool enough to run all day' : share <= 0.5 ? 'warm, for short runs only' : 'too hot';
    say(f, (n < 1 ? 'Stalled. It pushes its hardest and does not turn.' : 'It turns at ' + n.toFixed(0) + ' rpm.') + ' Current is ' + (share * 100).toFixed(0) + '% of stall: ' + heat + '.' + (T > 2 ? ' The load is above the gearbox limit.' : ''), share > 0.5 || T > 2 ? 'bad' : share <= 0.25 ? 'ok' : '');
  });
  return R.stop;
}

/* ---------- electronics: current, heat and a brown-out ---------- */
function electronics(root) {
  const f = frame(root, 'Flow, pressure and a reset', 'Lower the resistance until the brain resets. Then give the motor its own line.'), s = f.svg;
  h('rect', { x: 40, y: 40, width: 240, height: 100, fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, s);
  h('rect', { x: 22, y: 70, width: 36, height: 40, fill: 'var(--tint)', stroke: 'currentColor' }, s); h('text', { x: 40, y: 94, 'text-anchor': 'middle', 'font-size': 11, text: 'battery' }, s);
  h('rect', { x: 262, y: 70, width: 36, height: 40, fill: 'var(--tint)', stroke: 'currentColor' }, s); h('text', { x: 280, y: 94, 'text-anchor': 'middle', 'font-size': 11, text: 'motor' }, s);
  const brain = h('rect', { x: 130, y: 22, width: 60, height: 36, fill: 'var(--tint)', stroke: 'currentColor' }, s), bt = h('text', { x: 160, y: 44, 'text-anchor': 'middle', 'font-size': 11 }, s);
  const dots = []; for (let i = 0; i < 16; i++) dots.push(h('circle', { r: 3.5, fill: 'var(--motor)' }, s));
  const at = function (u) { u = ((u % 1) + 1) % 1 * 680; return u < 240 ? [40 + u, 40] : u < 340 ? [280, 40 + u - 240] : u < 580 ? [280 - (u - 340), 140] : [40, 140 - (u - 580)]; };
  let ph = 0, own = 0, R = null; const poke = function () { if (R) R.poke(); };
  const vv = slider(f.ctl, 'Battery', 2, 6, 5, 0.1, function (v) { return v.toFixed(1) + ' V'; }, poke);
  const rs = slider(f.ctl, 'Motor resistance', 1, 20, 8, 0.5, function (v) { return v.toFixed(1) + ' ohm'; }, poke);
  toggle(f.ctl, ['Motor shares the brain line', 'Motor has its own line'], function (i) { own = i; poke(); });
  R = run(f.ctl, function (dt) {
    const V = vv(), Rm = rs(), I = V / (Rm + 1.5), bv = own ? V : V - I * 1.5, reset = bv < 3.0;
    ph += I * 0.22 * dt; dots.forEach(function (d, i) { const p = at(ph + i / 16); set(d, { cx: p[0], cy: p[1] }); });
    set(brain, { fill: reset ? 'var(--bad)' : 'var(--tint)' }); bt.textContent = reset ? 'RESET' : 'brain ' + bv.toFixed(1) + ' V';
    say(f, 'Current ' + I.toFixed(2) + ' A. Heat in the motor ' + (I * I * Rm).toFixed(1) + ' W. The brain gets ' + bv.toFixed(1) + ' V' + (reset ? ', below the 3.0 V it needs. It resets.' : '.'), reset ? 'bad' : 'ok');
  });
  return R.stop;
}

/* ---------- controls: gain and delay ---------- */
function controls(root) {
  const f = frame(root, 'Look, compare, correct', 'Increase the gain. Then add delay until it shakes.'), s = f.svg, H = 1 / 240;
  h('line', { x1: 30, y1: 40, x2: 290, y2: 40, stroke: 'currentColor' }, s);
  const tg = h('path', { fill: 'var(--muted)' }, s), cart = h('circle', { cy: 40, r: 9, fill: 'var(--move)' }, s);
  h('line', { x1: 30, y1: 160, x2: 290, y2: 160, stroke: 'currentColor' }, s); h('text', { x: 30, y: 74, 'font-size': 11, text: 'position over the last 6 seconds' }, s);
  const tl = h('polyline', { fill: 'none', stroke: 'var(--muted)', 'stroke-dasharray': '4 3' }, s), xl = h('polyline', { fill: 'none', stroke: 'var(--motor)', 'stroke-width': 2 }, s);
  function sim(K, dly, secs, rec) {
    let x = 0, v = 0, t = 0; const nd = Math.round(dly / H), buf = []; let over = 0, settle = null, late = 0;
    for (let i = 0; i < secs / H; i++) { buf.push(x); const xd = buf.length > nd ? buf[buf.length - 1 - nd] : 0; v += (K * (1 - xd) - 6 * v) * H; x += v * H; x = Math.max(-3, Math.min(4, x)); t += H;
      if (x - 1 > over) over = x - 1; if (Math.abs(x - 1) > 0.05) settle = null; else if (settle === null) settle = t; if (t > secs - 1) late = Math.max(late, Math.abs(x - 1)); }
    return { over: over, settle: settle, late: late };
  }
  let x = 0.25, v = 0, target = 0.75, tt = 0, acc = 0, R = null; const buf = [], hist = []; const poke = function () { if (R) R.poke(); };
  const kk = slider(f.ctl, 'Gain: how hard it corrects', 2, 120, 20, 1, function (v) { return String(v); }, poke);
  const dd = slider(f.ctl, 'Delay in the loop', 0, 300, 0, 10, function (v) { return v + ' ms'; }, poke);
  const px = function (u) { return 60 + 200 * u; };
  R = run(f.ctl, function (dt) {
    const K = kk(), nd = Math.round(dd() / 1000 / H); acc += dt; tt += dt; if (tt > 3) { tt = 0; target = target > 0.5 ? 0.25 : 0.75; }
    while (acc >= H) { acc -= H; buf.push(x); if (buf.length > 400) buf.shift(); const xd = buf.length > nd ? buf[buf.length - 1 - nd] : x; v += (K * (target - xd) * 2 - 6 * v) * H; x += v * H; if (x < -0.25) { x = -0.25; v = 0; } if (x > 1.25) { x = 1.25; v = 0; } }
    hist.push([x, target]); if (hist.length > 360) hist.shift();
    cart.setAttribute('cx', px(x)); tg.setAttribute('d', 'M' + (px(target) - 7) + ' 18 h14 l-7 11z');
    let a = '', b = ''; hist.forEach(function (p, i) { const X = 30 + 260 * i / 360; a += X.toFixed(1) + ',' + (155 - 70 * p[1]).toFixed(1) + ' '; b += X.toFixed(1) + ',' + (155 - 70 * Math.max(-0.1, Math.min(1.1, p[0]))).toFixed(1) + ' '; });
    tl.setAttribute('points', a); xl.setAttribute('points', b);
    const r = sim(K * 2, dd() / 1000, 6);
    if (r.late > 0.2) say(f, 'Unstable. It shakes and does not settle. Too much gain for this much delay.', 'bad');
    else if (r.settle !== null && r.settle > 1.5) say(f, 'Sluggish. It takes ' + r.settle.toFixed(1) + ' seconds to arrive. The gain is too low.');
    else say(f, 'Good. It arrives in ' + (r.settle === null ? '?' : r.settle.toFixed(1)) + ' seconds and goes ' + (r.over * 100).toFixed(0) + '% past the target.', 'ok');
  });
  return R.stop;
}

/* ---------- simulation: a time step that invents energy ---------- */
function simulation(root) {
  const f = frame(root, 'When the computer invents energy', 'Make the time step bigger. The right weight is the simulation.'), s = f.svg, W = TAU * 0.8;
  h('line', { x1: 40, y1: 14, x2: 280, y2: 14, stroke: 'currentColor', 'stroke-width': 2 }, s);
  const mk = function (cx, col, label) { h('text', { x: cx, y: 172, 'text-anchor': 'middle', 'font-size': 11, text: label }, s); return { cx: cx, sp: h('polyline', { fill: 'none', stroke: 'currentColor' }, s), m: h('rect', { x: cx - 16, width: 32, height: 22, rx: 3, fill: col }, s) }; };
  const A = mk(100, 'var(--ok)', 'the real spring'), B = mk(220, 'var(--move)', 'the simulation');
  const draw = function (o, y) { y = Math.max(34, Math.min(140, y)); let p = o.cx + ',14 '; for (let i = 1; i <= 8; i++) p += (o.cx + (i % 2 ? 8 : -8)) + ',' + (14 + (y - 14) * i / 9).toFixed(1) + ' '; o.sp.setAttribute('points', p + o.cx + ',' + y); o.m.setAttribute('y', y); };
  let t = 0, x = 22, v = 0, acc = 0, R = null; const poke = function () { if (R) R.poke(); };
  const st = slider(f.ctl, 'Time step', 1, 30, 1, 1, function (v) { return v + ' ms'; }, function () { t = 0; x = 22; v = 0; acc = 0; poke(); });
  R = run(f.ctl, function (dt) {
    const hs = st() / 1000; t += dt; acc += dt;
    while (acc >= hs) { acc -= hs; const a = -W * W * x; x += v * hs; v += a * hs; }
    if (t > 7 || Math.abs(x) > 300) { t = 0; x = 22; v = 0; acc = 0; }
    draw(A, 88 + 22 * Math.cos(W * t)); draw(B, 88 + x);
    const grow = Math.pow(1 + W * W * hs * hs, 5 / (2 * hs));
    say(f, grow < 1.1 ? 'With a ' + st() + ' ms step the two nearly agree. The simulated swing is ' + ((grow - 1) * 100).toFixed(0) + '% too large after 5 seconds.' : 'With a ' + st() + ' ms step the simulated swing is ' + (grow < 2 ? ((grow - 1) * 100).toFixed(0) + '% too large' : grow < 100 ? grow.toFixed(1) + ' times too large' : 'more than 100 times too large') + ' after 5 seconds. No real spring does that.', grow < 1.1 ? 'ok' : 'bad');
  });
  return R.stop;
}

/* ---------- cad: planned gap against how much parts vary ---------- */
function cad(root) {
  const f = frame(root, 'Will it fit?', 'Set the planned gap to zero. Then make the parts less exact.'), s = f.svg;
  h('rect', { x: 100, y: 108, width: 120, height: 56, fill: 'var(--tint)', stroke: 'currentColor' }, s);
  const hole = h('rect', { y: 107, height: 42, fill: 'var(--bg)', stroke: 'currentColor' }, s), peg = h('rect', { height: 46, rx: 2 }, s);
  const cnt = h('text', { x: 310, y: 30, 'text-anchor': 'end', 'font-size': 13 }, s);
  let y = 10, pw = 30, hw = 30, fits = true, n = 0, ok = 0, wait = 0, R = null;
  const rnd = function (t) { return (Math.random() * 2 - 1) * t; };
  const fresh = function () { pw = 30 + (-gp() + rnd(tl())) * 40; hw = 30 + rnd(tl()) * 40; fits = pw <= hw; y = 10; wait = 0; };
  const reset = function () { n = 0; ok = 0; fresh(); if (R) R.poke(); };
  const gp = slider(f.ctl, 'Planned gap', 0, 0.6, 0.3, 0.05, function (v) { return v.toFixed(2) + ' mm'; }, reset);
  const tl = slider(f.ctl, 'Parts vary by', 0.05, 0.4, 0.15, 0.05, function (v) { return 'up to ' + v.toFixed(2) + ' mm'; }, reset);
  fresh();
  R = run(f.ctl, function (dt) {
    const stop = fits ? 104 : 61;
    if (y < stop) y = Math.min(stop, y + 170 * dt); else { wait += dt; if (wait > 0.35) { n++; if (fits) ok++; fresh(); } }
    set(hole, { x: 160 - hw / 2, width: hw }); set(peg, { x: 160 - pw / 2, y: y, width: pw, fill: fits ? 'var(--ok)' : 'var(--bad)' });
    cnt.textContent = ok + ' of ' + n + ' fit';
    const g = gp(), t = tl();
    say(f, g < 2 * t ? 'Some will not fit. The planned gap (' + g.toFixed(2) + ' mm) is smaller than the worst case of two parts that vary (' + (2 * t).toFixed(2) + ' mm).' : 'All fit. The loosest pair has ' + (g + 2 * t).toFixed(2) + ' mm of play.', g < 2 * t ? 'bad' : 'ok');
  });
  return R.stop;
}

/* ---------- making: layers and overhang ---------- */
function making(root) {
  const f = frame(root, 'Printing in layers', 'Lean the wall. Past about 50° each layer has nothing below it.'), s = f.svg, L = [];
  h('line', { x1: 10, y1: 162, x2: 310, y2: 162, stroke: 'currentColor', 'stroke-width': 2 }, s);
  const sup = h('g', {}, s); for (let i = 0; i < 20; i++) L.push(h('rect', { height: 6, width: 54, stroke: 'currentColor', 'stroke-width': 0.5 }, s));
  let n = 0, hold = 0, on = 0, R = null; const poke = function () { if (R) R.poke(); };
  const an = slider(f.ctl, 'Lean', 0, 70, 20, 1, function (v) { return v + '° from upright'; }, poke);
  toggle(f.ctl, ['Supports: off', 'Supports: on'], function (i) { on = i; poke(); });
  R = run(f.ctl, function (dt) {
    const a = an(), sh = 6 * Math.tan(a * Math.PI / 180), bad = a > 50 && !on;
    if (n < 20) n = Math.min(20, n + 7 * dt); else { hold += dt; if (hold > 1.6) { hold = 0; n = 0; } }
    while (sup.firstChild) sup.removeChild(sup.firstChild);
    L.forEach(function (r, i) {
      const x = 40 + Math.min(sh * i, 216), sag = bad && i > 2 ? Math.pow(i - 2, 1.5) * 0.9 : 0, y = 156 - 6 * i + sag;
      set(r, { x: x, y: Math.min(y, 156), visibility: i < n ? 'visible' : 'hidden', fill: bad && i > 2 ? 'var(--bad)' : 'var(--tint)' });
      if (on && a > 50 && i > 0 && i < n && i % 2 === 0) h('line', { x1: x + 46, y1: y + 6, x2: x + 46, y2: 162, stroke: 'var(--muted)', 'stroke-width': 2 }, sup);
    });
    say(f, a <= 50 ? 'Prints clean. Each layer rests on the one below.' : on ? 'Prints, on throwaway supports. The underside will be rough.' : 'Fails. At ' + a + '° the new layers hang in air and sag.', a <= 50 ? 'ok' : on ? '' : 'bad');
  });
  return R.stop;
}

/* ---------- systems: margin against uncertainty ---------- */
function systems(root) {
  const f = frame(root, 'Why margin exists', 'Reduce the margin. Then be less sure of your numbers.'), s = f.svg, D = [];
  for (let i = 0; i < 100; i++) D.push(h('circle', { cx: 28 + (i % 20) * 13.9, cy: 40 + Math.floor(i / 20) * 24, r: 4.6 }, s));
  h('text', { x: 20, y: 22, 'font-size': 11, text: '100 builds, each a little different from the plan' }, s);
  let n = 0, fails = 0, acc = 0, hold = 0, res = [], R = null;
  const reset = function () { n = 0; fails = 0; res = []; hold = 0; if (R) R.poke(); };
  const mg = slider(f.ctl, 'Capacity', 1, 3, 1.5, 0.1, function (v) { return v.toFixed(1) + ' times the need'; }, reset);
  const un = slider(f.ctl, 'How unsure the numbers are', 5, 60, 20, 5, function (v) { return 'plus or minus ' + v + '%'; }, reset);
  R = run(f.ctl, function (dt) {
    acc += dt; const u = un() / 100, m = mg();
    while (acc > 0.035 && n < 100) { acc -= 0.035; const need = 1 + u * (Math.random() * 2 - 1), cap = m * (1 + u * (Math.random() * 2 - 1)); res[n] = need > cap; if (res[n]) fails++; n++; }
    if (n >= 100) { acc = 0; hold += dt; if (hold > 2.2) reset(); }
    D.forEach(function (c, i) { set(c, { fill: i >= n ? 'var(--tint)' : res[i] ? 'var(--bad)' : 'var(--ok)' }); });
    const safe = m * (1 - u) >= 1 + u;
    say(f, fails + ' of ' + n + ' builds fail. ' + (safe ? 'The margin is bigger than the doubt, so none can fail.' : 'The margin is smaller than the doubt. Some builds will fail, and you will not know which.'), safe ? 'ok' : 'bad');
  });
  return R.stop;
}

/* ---------- safety: choose what breaks first ---------- */
function safety(root) {
  const f = frame(root, 'Choose what breaks first', 'Push harder. Then make the link stronger than the gears and push again.'), s = f.svg;
  const parts = [['push link', 60], ['servo gears', 160], ['hinge pin', 260]].map(function (p) {
    return { r: h('rect', { x: p[1] - 40, y: 70, width: 80, height: 44, rx: 6, stroke: 'currentColor' }, s), t: h('text', { x: p[1], y: 90, 'text-anchor': 'middle', 'font-size': 12, text: p[0] }, s), v: h('text', { x: p[1], y: 106, 'text-anchor': 'middle', 'font-size': 11 }, s) }; });
  h('line', { x1: 100, y1: 92, x2: 120, y2: 92, stroke: 'currentColor', 'stroke-width': 3 }, s); h('line', { x1: 200, y1: 92, x2: 220, y2: 92, stroke: 'currentColor', 'stroke-width': 3 }, s);
  const bar = h('rect', { x: 20, y: 140, height: 12, fill: 'var(--motor)' }, s); h('text', { x: 20, y: 134, 'font-size': 11, text: 'push from a hand' }, s);
  h('line', { x1: 20 + 280 * 0.09 / 7, y1: 136, x2: 20 + 280 * 0.09 / 7, y2: 158, stroke: 'var(--ok)', 'stroke-width': 2 }, s); h('text', { x: 28, y: 170, 'font-size': 11, text: 'green line: all that flapping needs' }, s);
  const draw = function () {
    const F = ps(), L = lk(), str = [L, 2.5, 10], weak = L <= 2.5 ? 0 : 1, broke = F > str[weak];
    parts.forEach(function (p, i) { set(p.r, { fill: broke && i === weak ? 'var(--bad)' : 'var(--tint)' }); p.v.textContent = (i === 0 ? 'lets go at ' : 'breaks at ') + str[i].toFixed(1); });
    bar.setAttribute('width', 280 * F / 7);
    if (L < 0.15) say(f, 'The link is weaker than normal flapping needs. It lets go every time the flipper moves.', 'bad');
    else if (!broke) say(f, 'Nothing breaks at ' + F.toFixed(1) + ' kgf·cm.', 'ok');
    else if (weak === 0) say(f, 'The link lets go first. You click it back on. The gears are safe.', 'ok');
    else say(f, 'The gears break first. The link was stronger than the part it protects.', 'bad');
  };
  const ps = slider(f.ctl, 'Push', 0, 7, 0.1, 0.1, function (v) { return v.toFixed(1) + ' kgf·cm'; }, draw);
  const lk = slider(f.ctl, 'Link lets go at', 0.1, 6, 1, 0.1, function (v) { return v.toFixed(1) + ' kgf·cm'; }, draw);
  draw(); return function () {};
}

window.PRIMER = window.PRIMER || { topics: [] };
window.PRIMER.demos = { statics: statics, mechanisms: mechanisms, dynamics: dynamics, motors: motors, electronics: electronics, controls: controls, simulation: simulation, cad: cad, making: making, systems: systems, safety: safety };
})();
