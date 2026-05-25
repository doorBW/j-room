# pipeline/

> 카드뉴스 생성 자동화 코드. 서버 개발자 친화 영역.

## 단계별 자동화 로드맵

### Stage 0: 수동 (현재)
- Canva / 미리캔버스에서 손으로 작성
- 아이디어/본문만 `content/` 에 마크다운으로 저장

### Stage 1: 마크다운 → JSON
- `content/drafts/*.md` 의 frontmatter + 본문을 파싱
- 카드별 JSON 객체로 변환
- 예시 출력: `pipeline/output/2026-05-25-foo.json`

```bash
node scripts/md-to-json.js content/drafts/2026-05-25-foo.md
```

### Stage 2: JSON → 카드 이미지 (택1)

#### Option A: Bannerbear / Placid API
- Bannerbear 콘솔에서 카드별 템플릿 디자인
- 텍스트 슬롯, 이미지 슬롯, 별점 슬롯을 명명
- API에 JSON POST → PNG URL 응답

```javascript
// pipeline/render-bannerbear.js
import Bannerbear from 'bannerbear';
const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);

for (const card of cards) {
  const image = await bb.create_image({
    template: TEMPLATE_IDS[card.type],
    modifications: card.slots,
  });
  console.log(image.image_url);
}
```

#### Option B: HTML/CSS + Puppeteer (무료, 풀 컨트롤)
- `pipeline/templates/*.html` 에 카드 디자인
- Puppeteer로 1080x1350 (4:5 인스타 세로형) 영역 스크린샷

```javascript
// pipeline/render-puppeteer.js
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350 });
await page.goto(`file://${__dirname}/templates/review-cover.html`);
await page.evaluate(data => { /* DOM 채우기 */ }, card);
await page.screenshot({ path: `output/${card.id}.png` });
```

#### Option C: Figma API
- Figma에서 디자인 → 컴포넌트로 만들기
- Figma REST API로 텍스트 노드 교체 → 이미지 export

### Stage 3: 이미지 → 인스타그램
- Meta Graph API (Instagram Graph API) 로 예약 게시
- 비즈니스 계정 + Facebook 페이지 연동 필요
- 무료 (단, 리뷰 받아야 함)

```javascript
// pipeline/publish-instagram.js
const containerId = await ig.createCarousel({
  image_urls: cards.map(c => c.url),
  caption: caption,
});
await ig.publish(containerId);
```

또는 Buffer / Later 같은 SaaS 사용 (개인 계정도 OK).

---

## 추천 우선순위

| 우선순위 | 작업 | 비용 | 효과 |
|---------|------|------|------|
| 1 | Canva 템플릿 3종 만들기 | 무료 | 큼 (당장 시작) |
| 2 | md → JSON 파서 | 무료 | 중 (반복 작업 ↓) |
| 3 | Bannerbear 가입 + 템플릿 | $49/월~ | 큼 (10분 → 1분) |
| 4 | HTML/CSS 템플릿 + Puppeteer | 무료 | 중 (커스터마이즈 ↑) |
| 5 | Meta Graph API 연동 | 무료 (시간 ↑) | 작음 (예약은 Buffer로도 충분) |

---

## 환경 변수 (참고)

```bash
# .env (gitignore됨)
BANNERBEAR_API_KEY=
PLACID_API_KEY=
INSTAGRAM_USER_ID=
INSTAGRAM_ACCESS_TOKEN=
FIGMA_TOKEN=
OPENAI_API_KEY=        # 카피 생성용
ANTHROPIC_API_KEY=     # 카피 생성용 (Claude)
```

---

자세한 도구 비교는 [../docs/AI_TOOLS.md](../docs/AI_TOOLS.md) 참고.
