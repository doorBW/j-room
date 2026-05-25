# 카드뉴스 제작 AI 도구 가이드

> 인스타그램 방탈출 카드뉴스 제작에 사용 가능한 AI 도구/서비스/스킬 정리.
> 서버 개발자 관점에서 코드/API 기반 자동화 가능 여부를 함께 표기.

---

## 1. 올인원 카드뉴스/디자인 도구

### 미리캔버스 (MiriCanvas) — 🇰🇷 한국 1위
| 항목 | 내용 |
|---|---|
| 한국어 지원 | 최상 — UI/메뉴/고객센터 전부 한국어, 한국 폰트 완비 |
| 카드뉴스 템플릿 | SNS 카드뉴스 전용 포맷, 53만+ |
| AI 기능 | AI 이미지 추천, 텍스트 자동 생성(베타), 배경 제거 |
| 인스타 사이즈 | 1080×1080 / 1080×1350 직접 지원 |
| 무료 | 있음 (기능 제한) |
| 유료 | Pro ₩13,400/월 또는 ₩160,800/년 |
| API/자동화 | ❌ 없음 (노코드 전용) |

**강점**: 한국 감성, 저작권 안전 한국 폰트, 카드뉴스 형식 최적화.
**약점**: 다크/미스터리 템플릿 다소 부족, API 없어 자동화 불가.
**방탈출 적합성**: 텍스트 기반 카드뉴스 제작에 최적. 배경은 Midjourney/Ideogram으로 별도 생성 후 합치는 방식 권장.

---

### 망고보드 (MangoBoard) — 🇰🇷
- 카드뉴스 + PPT + 포스터 + 동영상 + 인쇄까지 원스톱
- Pro ₩48,000/월 (미리캔버스의 3배 이상)
- AI 이미지 생성, AI 문구 추천 내장
- **추천도**: 미리캔버스로 충분하면 이쪽 비추천 (가격 부담)

---

### Canva — 🌍 글로벌 1위
- 템플릿 200만+, AI 기능 가장 성숙 (Magic Studio + Adobe Firefly 연동)
- Pro 약 ₩15,000/월
- **Canva Connect API**는 Enterprise 전용 (개인 개발자 사용 어려움)
- **방탈출 적합성**: 다크/미스터리/호러 영문 템플릿 다수. 한국어 폰트 선택 주의.

---

### Adobe Express — Firefly AI 내장
- Firefly로 **상업 저작권 안전한** AI 이미지 생성
- 약 ₩14,000/월 (또는 Creative Cloud 포함)
- 한국 특화 템플릿/폰트는 미리캔버스보다 부족

---

## 2. AI 이미지 생성 도구 (배경/일러스트)

### Midjourney — 🎨 분위기 최강
- 미스터리/호러/다크 판타지 표현력 업계 최고
- $10/월 Basic ~ $60/월 Pro
- **공식 API 없음** (비공식만)
- 한글 텍스트 이미지 내 삽입 불가 → 텍스트는 별도 도구에서

**방탈출 프롬프트 예시**:
```
dark escape room, mystery puzzle chamber, candlelight,
antique clock, cinematic horror atmosphere,
1:1 ratio, highly detailed --ar 1:1 --style raw
```

---

### Ideogram 3.0 — 📝 텍스트 렌더링 최강
- 영문 텍스트 정확도 ~90~95%
- 무료 플랜 있음, Basic $8/월
- **REST API 제공**, $0.08/이미지
- 한글 텍스트 직접 생성은 아직 불안정

---

### DALL-E 3 / GPT-Image-1 (OpenAI)
- ChatGPT Plus $20/월 또는 API $0.04~0.12/이미지
- ChatGPT 대화로 이미지 + 카피 동시 생성 가능
- 예술성은 Midjourney보다 낮음

---

### Stable Diffusion (오픈소스)
- 로컬 실행 무료 (GPU 필요), Replicate API $0.003~0.02/이미지
- 다크/호러 특화 체크포인트(Anything V5, DreamShaper) 다수
- **방탈출 적합성**: GPU 보유 시 비용 최저로 무제한 생성

---

### Recraft AI — 🎯 시리즈 일관성
- 시리즈 카드뉴스의 동일 스타일 유지에 강점
- 무료 (일일 30 크레딧), API $0.04/이미지
- 일러스트/벡터 카드뉴스에 적합

---

## 3. AI 텍스트 생성 도구

### Claude (Anthropic) — 한국어 품질 최상급 ⭐
긴 콘텐츠 기획, 시리즈 기획, 브랜드 톤앤매너 설정에 탁월.

**카드뉴스 카피 생성 프롬프트 예시**:
```
방탈출 [매장명]의 [테마명]를 다녀왔습니다.
다음 정보를 바탕으로 인스타그램 카드뉴스 5장 분량의 카피를 작성해주세요:
- 난이도: ★★★★☆
- 인원: 2명 추천
- 특징: 잠금장치 없는 전자 자물쇠, 몰입감 높은 배우 등장

각 카드별로:
- 헤드라인 (15자 이내)
- 본문 (50자 이내)
- 이모지 1개
```

가격: Claude.ai 무료 / Pro $20/월 / API (Sonnet $3/1M 입력 토큰)

---

### ChatGPT (OpenAI)
- 이미지(DALL-E 3) + 텍스트 동시 처리
- 인스타 캡션/해시태그 생성 워크플로우 검증됨

**해시태그 프롬프트 예시**:
```
방탈출 인스타그램 포스트용 해시태그 30개를 한/영 혼용으로 추천.
대형(50만+): 5개, 중형(5만~50만): 15개, 소형(5천~5만): 10개
```

---

### Gemini (Google) — 트렌드 연동
- Google Trends 연동, 최신 트렌드 반영
- 이미지(Imagen 4) 내장
- $20/월

---

### 한국어 특화 LLM
- **HyperCLOVA X / CLOVA X (네이버)**: 한국 문화/트렌드 이해 ↑, 무료
- **뤼튼 (Wrtn.ai)**: 마케팅 카피/SNS 특화, 무료 플랜

---

## 4. 자동화/파이프라인 도구 (개발자 친화 ⭐)

### Bannerbear — 🏆 표준 도구
템플릿 기반 이미지/동영상 자동 생성 API.

| 항목 | 내용 |
|---|---|
| 무료 | 30 크레딧 (테스트) |
| Automate | $49/월 (1,000 이미지) |
| Scale | $149/월 |
| 한국어 폰트 | 템플릿 설계 시 한글 정상 렌더링 |

**Node.js 예시**:
```javascript
const response = await fetch('https://sync.api.bannerbear.com/v2/images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    template: 'TEMPLATE_UID',
    modifications: [
      { name: 'headline', text: '방탈출 추천: 미로의 저택' },
      { name: 'difficulty', text: '난이도 ★★★★☆' },
      { name: 'background', image_url: 'https://...mj-image.jpg' }
    ]
  })
});
```

**방탈출 적합성**: 시리즈 카드뉴스 대량 자동 생성에 최적. 데이터 DB → 카드뉴스 완전 자동화 가능.

---

### Placid.app — Bannerbear보다 저렴
- Basic $19/월 (500 크레딧)
- **URL API**가 특이점: URL 파라미터만으로 이미지 생성

```
https://placid.app/u/YOUR-TEMPLATE-ID?title=방탈출+추천&date=2025-06-01
```

- Zapier/Make/Airtable 노코드 연동 강점

---

### HTML/CSS to Image API (hcti.io) — 개발자 친숙
HTML + CSS 코드 → PNG 변환 API.

| 항목 | 내용 |
|---|---|
| 한국어 | Google Fonts (Noto Sans KR 등) CSS로 로드 가능 |
| 고해상도 | 기본 @2X 레티나 |
| 무료 | 제한적 무료 |
| 유료 | $9~99/월 |

**예시**:
```javascript
const html = `
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap" rel="stylesheet">
  <style>
    body { width: 1080px; height: 1080px; background: #1a1a2e;
           display: flex; align-items: center; justify-content: center; }
    .card { font-family: 'Noto Sans KR'; color: white; text-align: center; }
    .title { font-size: 60px; font-weight: 700; color: #e94560; }
  </style>
</head>
<body><div class="card"><div class="title">${escapeName}</div></div></body>
</html>`;

await fetch('https://hcti.io/v1/image', {
  method: 'POST',
  headers: { 'Authorization': 'Basic ' + btoa('USER_ID:API_KEY') },
  body: JSON.stringify({ html, google_fonts: 'Noto Sans KR' })
});
```

---

### Puppeteer (자체 호스팅) — 🆓 무료
Node.js로 Chrome 제어 → HTML을 스크린샷.

```javascript
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080 });
await page.setContent(htmlTemplate);
await page.screenshot({
  path: 'card.png',
  clip: { x: 0, y: 0, width: 1080, height: 1080 }
});
await browser.close();
```

**완전 무료**, 디자인 100% 자유. 초기 구축 비용 있지만 장기적으로 가장 저렴.

---

### Figma API
- Figma 디자인 파일을 REST API로 제어 → 이미지 export
- 분당 최대 500 이미지
- Figma 무료 플랜에서도 API 접근 가능

```python
import requests
headers = {'X-Figma-Token': FIGMA_TOKEN}
export = requests.get(
  f'https://api.figma.com/v1/images/{FILE_ID}?ids={NODE_ID}&format=png&scale=2',
  headers=headers
)
```

---

### 인스타그램 자동 게시

| 도구 | 가격 | 특징 |
|---|---|---|
| **Meta Graph API** | 무료 | 직접 코드 게시, 25회/일, Business 계정 필수 |
| **Buffer** | 무료(3채널)~$5/채널/월 | API 제공, 간단 예약 |
| **Later** | $8.75+/월 | 인스타 특화 비주얼 플래너 |
| **Meta Business Suite** | 무료 | FB+IG 통합, 기본 스케줄링 |

**개발자 권장**: Meta Graph API 직접 사용 또는 n8n(오픈소스 자동화).

---

## 5. 추천 스택 — 3가지 시나리오

### A. 완전 수동 (퀄리티 우선)
> 주 1~2회, 1세트당 2~3시간, 약 **6만원/월**

| 단계 | 도구 |
|---|---|
| 배경 이미지 | Midjourney ($10/월) |
| 카드 조립 | 미리캔버스 Pro (₩13,400/월) |
| 카피/캡션 | Claude.ai Pro ($20/월) |
| 게시 | Meta Business Suite (무료) |

---

### B. 반자동 ⭐ **추천 (이 계정의 시작점)**
> 주 2~3회, 1세트당 30~40분, 약 **3~4만원/월**

| 단계 | 도구 |
|---|---|
| 배경 (배치 생성) | Midjourney ($10/월, 주 1회 10장 미리 만들기) |
| 카드 조립 (고정 템플릿) | 미리캔버스 Pro (₩13,400/월) |
| 카피 생성 | Claude API (스크립트 자동 호출) |
| 예약 게시 | Buffer Free 또는 $5/월 |

**워크플로우**:
```
[주 1회] Midjourney로 배경 10장 배치 생성 → assets/images/
[발행마다]
  1. Claude에게 방탈출 정보 입력 → 카피 5장 생성 (5분)
  2. 미리캔버스 고정 템플릿 → 카피/배경 교체 (15~20분)
  3. Buffer 업로드 + 캡션/해시태그 → 예약 (5분)
```

---

### C. 완전 자동 (개발자 강점 풀활용)
> 사람 개입 최소, 초기 구축 20~30시간, **약 7만원/월**

| 단계 | 도구 |
|---|---|
| 데이터 | Notion DB 또는 Google Sheets |
| 카피 | Claude API (~$2/월) |
| 이미지 | Bannerbear Automate ($49/월) **또는** Puppeteer 자체 서버 (무료) |
| 게시 | Meta Graph API (무료) 또는 Buffer API |

**파이프라인**:
```
[cron: 매주 월 09:00]
  1. Notion API → 이번 주 추천 데이터 읽기
  2. Claude API → 카드뉴스 카피 5장 생성 (JSON)
  3. Puppeteer/Bannerbear → HTML 템플릿에 카피 주입 → 5장 PNG
  4. Cloudinary/S3 → 이미지 업로드 → URL 획득
  5. Meta Graph API → 캐러셀 게시 예약
  6. Slack/Discord 웹훅 → 알림
```

**주의사항**:
- Meta Graph API: 25회/24시간 게시 제한
- Business 계정 + Facebook 페이지 연동 필수
- 초기 Meta 앱 승인 과정 필요

---

## 6. 최종 추천 매트릭스

| 상황 | 추천 |
|---|---|
| 디자인 경험 없음, 당장 시작 | **시나리오 B** (미리캔버스 + MJ + Claude) |
| 완전 자동화 구축 여유 | **시나리오 C** (Puppeteer/Bannerbear + Claude API + Meta Graph API) |
| 비용 최소화 | 미리캔버스 무료 + ChatGPT 무료 + Meta Business Suite |
| 방탈출 분위기 최고 퀄리티 | Midjourney 배경 + 캔바 Pro 레이아웃 |
| 한국어 카피 품질 | **Claude > ChatGPT > CLOVA X** |

---

## 7. 이 계정에 추천하는 마이그레이션 경로

1. **Week 1~4**: 시나리오 B로 시작. 미리캔버스에서 콘텐츠 타입(review/course/recommendation) 3종 템플릿 직접 디자인.
2. **Week 5~8**: 일관성 검증. 좋아요/저장 데이터 모으기 → BRAND_GUIDE 다듬기.
3. **Month 3~**: `pipeline/` 에 Puppeteer + HTML 템플릿 구축 시작. 카피 생성은 Claude API로 자동화.
4. **Month 6~**: Meta Graph API 연동, 완전 자동 (시나리오 C).

---

## Sources
- [미리캔버스 vs 캔바 비교](https://www.forest-of-violet.co.kr/2026/03/miricanvas-vs-canva.html)
- [미리캔버스 공식](https://www.miricanvas.com/en)
- [망고보드 요금제](https://www.mangoboard.net/MangoPrice.do)
- [Canva 한국 가격](https://www.canva.com/ko_kr/pricing/)
- [Adobe Express 한국](https://www.adobe.com/kr/express/pricing)
- [Bannerbear 공식](https://www.bannerbear.com/) · [가격](https://www.bannerbear.com/pricing/)
- [Placid.app](https://placid.app/) · [가격](https://placid.app/pricing)
- [HTML/CSS to Image API](https://htmlcsstoimage.com/)
- [Puppeteer 문서](https://pptr.dev/)
- [Figma Developer API](https://www.figma.com/developers/api)
- [Ideogram 3.0 리뷰](https://aiphotolabs.com/reviews/ideogram/)
- [Midjourney Horror Prompts](https://www.aiarty.com/midjourney-prompts/midjourney-horror-prompts.htm)
- [Recraft AI 가격](https://www.recraft.ai/pricing)
- [Buffer 인스타그램](https://buffer.com/instagram)
- [Later vs Buffer](https://postfa.st/blog/later-vs-buffer-2025-feature-and-pricing-comparison)
- [Meta Instagram Graph API](https://developers.facebook.com/docs/instagram-platform/content-publishing/)
- [Bannerbear API 비교 2025](https://templated.io/blog/best-image-apis-for-automation/)
