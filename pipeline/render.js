'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { buildHtml } = require('./lib/cards');

(async () => {
  const dataArg = process.argv[2] || 'data/play33-gundae.json';
  const dataPath = path.resolve(__dirname, dataArg);
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ 데이터 파일 없음: ${dataPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const css = fs.readFileSync(path.resolve(__dirname, 'styles.css'), 'utf8');
  const html = buildHtml(data, css);

  // 브라우저로 열어볼 수 있는 미리보기 저장
  const previewPath = path.resolve(__dirname, 'preview.html');
  fs.writeFileSync(previewPath, html);

  const outDir = path.resolve(__dirname, 'output', data.meta.slug);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const cards = await page.$$('.card');
  for (let i = 0; i < cards.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const file = path.join(outDir, `${data.meta.slug}-${n}.png`);
    await cards[i].screenshot({ path: file });
    console.log(`  ✅ ${data.meta.slug}-${n}.png`);
  }

  await browser.close();
  console.log(`\n✅ ${cards.length}장 생성 → ${path.relative(process.cwd(), outDir)}`);
  console.log(`👀 미리보기: open ${path.relative(process.cwd(), previewPath)}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
