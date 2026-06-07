'use strict';

/* ---------- helpers ---------- */

function stars(rating) {
  const pct = (Math.max(0, Math.min(5, rating)) / 5 * 100).toFixed(1);
  return `<span class="stars"><span class="stars__bg">★★★★★</span>` +
         `<span class="stars__fill" style="width:${pct}%">★★★★★</span></span>`;
}

function fearDots(level, max = 3) {
  let s = '';
  for (let i = 1; i <= max; i++) s += i <= level ? '●' : '○';
  return s;
}

function difficultyStars(n) {
  return `<span class="diff">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</span>`;
}

/* ---------- card type renderers ---------- */

function cover(c) {
  return `
    <div class="cover__kicker">${c.kicker || ''}</div>
    <h1 class="cover__title">${c.title}<br><span class="accent">${c.titleAccent}</span></h1>
    <p class="cover__hook">${c.hook}</p>
    <p class="cover__sub">${c.sub || ''}</p>`;
}

function intro(c) {
  return `
    <h2 class="section__title">${c.title}</h2>
    <ul class="bullets">${c.points.map((p) => `<li>${p}</li>`).join('')}</ul>`;
}

function theme(c) {
  const badge = c.badge ? `<span class="badge">${c.badge}</span>` : '';
  const head = c.posterData
    ? `<div class="poster">
         <img src="${c.posterData}" alt="${c.name}">
         <div class="poster__grad"></div>
         <div class="level poster__level"><span class="level__dots">${fearDots(c.level)}</span> 공포 LV.${c.level} · ${c.levelLabel}</div>
         <div class="poster__name">〈${c.name}〉${badge}</div>
       </div>`
    : `<div class="level"><span class="level__dots">${fearDots(c.level)}</span> 공포 LV.${c.level} · ${c.levelLabel}</div>
       <h2 class="theme__name">〈${c.name}〉${badge}</h2>`;
  return `
    ${head}
    <p class="theme__quote">"${c.quote}"</p>
    <p class="theme__meta">${c.genre} · 난이도 ${difficultyStars(c.difficulty)}<br>${c.players} · ${c.time} · 1인 ${c.price}원</p>
    <div class="theme__rating">추천도 ${stars(c.rating)} <span class="num">${c.rating.toFixed(1)}</span></div>
    <div class="theme__review">${c.review}</div>`;
}

function compare(c) {
  const rows = c.rows.map((r) =>
    `<tr><td class="name">${r.name}</td><td>${r.fear}</td><td class="${r.hot ? 'hot' : ''}">${r.rating}</td><td>${r.players}</td><td>${r.time}</td></tr>`
  ).join('');
  const match = c.match.map((m) => `<div><span class="accent">${m.label}</span> → ${m.value}</div>`).join('');
  return `
    <h2 class="section__title">${c.title}</h2>
    <table class="ctable">
      <tr><th>테마</th><th>공포도</th><th>추천도</th><th>인원</th><th>시간</th></tr>
      ${rows}
    </table>
    <div class="match">${match}</div>`;
}

function store(c) {
  const items = c.items.map((it) => `<div><span class="label">${it.label}</span> ${it.value}</div>`).join('');
  return `
    <h2 class="section__title">${c.title}</h2>
    <div class="store__list">${items}</div>`;
}

function cta(c) {
  return `
    <h2 class="cta__title">${c.title}</h2>
    <div class="cta__actions">${c.actions.join('<br>')}</div>
    <div class="cta__next">${c.next || ''}</div>`;
}

const RENDERERS = { cover, intro, theme, compare, store, cta };

/* ---------- shell + assembly ---------- */

function renderCard(c, meta, index, total) {
  const fn = RENDERERS[c.type];
  if (!fn) throw new Error(`Unknown card type: ${c.type}`);
  const accentClass = c.accent ? ' card--accent' : '';
  return `
  <div class="card card--${c.type}${accentClass}">
    <div class="card__header">
      <span class="logo">${meta.logo || '🔒 J-ROOM'}</span>
      <span class="store">${meta.store}</span>
    </div>
    <div class="card__body">${fn(c)}</div>
    <div class="card__footer">
      <span>${meta.handle}</span>
      <span>${index} / ${total}</span>
    </div>
  </div>`;
}

function buildHtml(data, css) {
  const { meta, cards } = data;
  const body = cards.map((c, i) => renderCard(c, meta, i + 1, cards.length)).join('\n');
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>${meta.store} — card news preview</title>
  <style>${css}</style>
</head>
<body>${body}</body>
</html>`;
}

module.exports = { buildHtml, renderCard };
