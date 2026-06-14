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
  return `<span class="diff"><span class="diff__on">${'★'.repeat(n)}</span><span class="diff__off">${'☆'.repeat(5 - n)}</span></span>`;
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
  const sub = c.subtitle ? `<p class="intro__subtitle">${c.subtitle}</p>` : '';
  return `
    <h2 class="section__title">${c.title}</h2>
    ${sub}
    <ul class="bullets">${c.points.map((p) => `<li>${p}</li>`).join('')}</ul>`;
}

function theme(c) {
  const badge = c.badge ? `<span class="badge">${c.badge}</span>` : '';
  const poster = c.posterData
    ? `<div class="poster"><img src="${c.posterData}" alt="${c.name}"></div>`
    : '';
  return `
    ${poster}
    <h2 class="theme__name theme__name--below">〈${c.name}〉${badge}</h2>
    <p class="theme__quote">"${c.quote}"</p>
    <p class="theme__meta">${c.genre} · 난이도(공식) ${difficultyStars(c.officialDiff)} · 공포도(공식) ${c.officialFear}<br>${c.players} · ${c.time} · 1인 ${c.price}원</p>
    <div class="theme__felt">체감난이도 ${difficultyStars(c.feltDiff)} · 체감공포도 <b>${c.feltFear}</b></div>
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

function lineup(c) {
  const items = c.items.map((it) => `
    <div class="lineup__item">
      <div class="lineup__poster"><img src="${it.posterData}" alt="${it.name}"></div>
      <div class="lineup__name">〈${it.name}〉</div>
      <div class="lineup__stat">${it.feltDiff}<br>${it.feltFear}</div>
    </div>`).join('');
  const tip = c.tip ? `<div class="lineup__tip">${c.tip}</div>` : '';
  return `
    <h2 class="section__title">${c.title}</h2>
    <div class="lineup">${items}</div>
    <div class="lineup__order">🎓 ${c.order}</div>
    <div class="lineup__tagline">${c.tagline}</div>
    ${tip}`;
}

function newsitem(c) {
  const poster = c.posterData
    ? `<div class="poster news__poster"><img src="${c.posterData}" alt="${c.name}"></div>`
    : '';
  const info = (c.info || [])
    .map((it) => `<span class="news__chip"><span class="label">${it.label}</span> ${it.value}</span>`)
    .join('');
  const store = c.store ? `${c.store} ` : '';
  return `
    <div class="news__tag">${c.tag || '🆕 신규'}</div>
    ${poster}
    <h2 class="theme__name theme__name--below">${store}〈${c.name}〉</h2>
    <div class="news__info">${info}</div>
    ${c.comment ? `<div class="theme__review">${c.comment}</div>` : ''}
    ${c.source ? `<div class="news__source">출처 · ${c.source}</div>` : ''}`;
}

function ratings(c) {
  const poster = c.posterData
    ? `<div class="poster news__poster"><img src="${c.posterData}" alt="${c.name}"></div>`
    : '';
  const rows = (c.ratings || [])
    .map((r) => `
      <div class="rating-row">
        <span class="rating-row__label">${r.label}</span>
        ${stars(r.score)}
        <span class="rating-row__num">${r.score}</span>
      </div>`)
    .join('');
  const storeLine = c.store ? `<div class="ratings__store">${c.store}</div>` : '';
  return `
    ${poster}
    <h2 class="theme__name theme__name--below">〈${c.name}〉</h2>
    ${storeLine}
    ${c.quote ? `<p class="theme__quote">"${c.quote}"</p>` : ''}
    <div class="ratings">${rows}</div>
    ${c.players ? `<div class="theme__felt">👥 권장 ${c.players}</div>` : ''}`;
}

function timeline(c) {
  const rows = (c.schedule || [])
    .map((s) => `
      <div class="tl-row">
        <span class="tl-row__time">${s.time}</span>
        <span class="tl-row__event">${s.event}</span>
      </div>`)
    .join('');
  return `
    <h2 class="section__title">${c.title}</h2>
    <div class="timeline">${rows}</div>`;
}

function coursestop(c) {
  const poster = c.posterData
    ? `<div class="poster news__poster"><img src="${c.posterData}" alt="${c.name}"></div>`
    : '';
  const info = (c.info || [])
    .map((it) => `<span class="news__chip"><span class="label">${it.label}</span> ${it.value}</span>`)
    .join('');
  const store = c.store ? `${c.store} ` : '';
  return `
    <div class="news__tag">STOP ${c.no}</div>
    ${poster}
    <h2 class="theme__name theme__name--below">${store}〈${c.name}〉</h2>
    <div class="news__info">${info}</div>
    ${c.comment ? `<div class="theme__review">${c.comment}</div>` : ''}
    ${c.next ? `<div class="course-next">${c.next}</div>` : ''}`;
}

const RENDERERS = { cover, intro, theme, compare, store, cta, lineup, newsitem, ratings, timeline, coursestop };

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
