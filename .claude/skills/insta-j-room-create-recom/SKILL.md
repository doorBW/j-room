---
name: insta-j-room-create-recom
description: j-room 인스타그램(@jroom.official)의 "추천(recommendation)" 카테고리 방탈출 카드뉴스를 제작한다. 장르/주제/매장별 방탈출 2~5개를 큐레이션하는 8장짜리 카드뉴스를 HTML/CSS/Puppeteer 파이프라인으로 렌더한다. 사용자가 매장·테마 정보를 주면 data JSON 작성 → 렌더 → PNG 산출까지 진행. "추천 카드뉴스 만들어줘", "방탈출 추천 만들자", "insta-j-room-create-recom" 트리거.
---

# insta-j-room-create-recom — 추천 카드뉴스 제작

> j-room 인스타그램의 **추천(recommendation)** 카테고리 카드뉴스를 만든다.
> 레퍼런스 원본: `pipeline/data/play33-gundae.json` (PLAY33 건대 3테마 추천, 첫 콘텐츠)

---

## 0. 전제 / 위치

- 작업 루트: `/Users/tigercow/AI/escape-ai/j-room`
- 파이프라인: `pipeline/` (HTML/CSS → Puppeteer → PNG)
- 렌더 명령: `cd pipeline && node render.js data/<slug>.json`
- 출력: `pipeline/output/<slug>/<slug>-01.png ~ -08.png` (2160×2700, @2x)
- 폰트/색/레이아웃 규칙: [docs/DESIGN_GUIDE.md](../../../docs/DESIGN_GUIDE.md)
- 카테고리 정의: [docs/CONTENT_TYPES.md](../../../docs/CONTENT_TYPES.md)

---

## 1. 카드 8장 구조 (고정 골격)

| # | type | 역할 |
|---|------|------|
| 1 | `cover` | 표지 — 후킹, 매장/주제명 |
| 2 | `intro` | **늙크크 자기소개 (항상 고정 — §3 참고)** |
| 3 | `theme` | 추천 1 (공포도 약한 것부터) |
| 4 | `theme` | 추천 2 |
| 5 | `theme` | 추천 3 (보통 팀 최애 = accent 배경) |
| 6 | `lineup` | 한눈에 보기 (포스터 가로 배열 + 졸업 순서 + 예약 팁) |
| 7 | `store` | 매장 정보 |
| 8 | `cta` | 마무리 (공유/태그/맛보기 도전) |

> 추천 개수는 2~5개로 유연. theme 카드를 늘리거나 줄이면 됨(총 장수는 인스타 캐러셀 권장 10장 이내 유지).

---

## 2. data JSON 스키마 (카드 타입별)

`pipeline/data/<slug>.json` 형식. `meta` + `cards[]`.

```json
{
  "meta": { "slug": "<영문-슬러그>", "store": "<매장명>", "handle": "@jroom.official", "logo": "🔒 J-ROOM" },
  "cards": [ ... ]
}
```

### cover
```json
{ "type": "cover", "kicker": "윗줄(작게)", "title": "큰제목1줄", "titleAccent": "큰제목2줄(빨강)", "hook": "후킹(빨강 바)", "sub": "부제(회색)" }
```

### intro — §3 고정값 사용

### theme (추천 1개 = 카드 1장)
```json
{
  "type": "theme",
  "accent": true,                       // (선택) 팀 최애 등 강조 카드면 어두운 배경
  "poster": "assets/images/<매장>/<테마>.jpg",  // 정사각 권장, repo 미포함(저작권)
  "name": "테마명",
  "badge": "팀 최애",                    // (선택) 테마명 옆 빨강 뱃지
  "quote": "포스터 카피/스토리 한 줄",
  "genre": "공포 · 스릴러",              // 공식 장르 표기
  "officialDiff": 3,                     // 공식 난이도 (별 개수 1~5)
  "officialFear": "2",                   // 공식 공포도 (매장 표기 그대로)
  "players": "2~5인",
  "time": "60분",
  "price": "27,000",
  "feltDiff": 2,                         // 체감 난이도 (별 개수)
  "feltFear": "3.5/5",                   // 체감 공포도
  "review": "한줄평. \\n 으로 줄바꿈. <strong>강조</strong> 가능"
}
```
- **공식 vs 체감 분리가 핵심**: 정보줄엔 `난이도(공식)/공포도(공식)`, 그 아래 `체감난이도/체감공포도`.
- 별점은 `officialDiff`/`feltDiff` 숫자로 → 채운별(빨강)+빈별(회색) 자동 렌더.

### lineup (카드 6 — 한눈에 보기)
```json
{
  "type": "lineup",
  "title": "<매장> 한눈에 보기",
  "items": [
    { "name": "테마명", "poster": "assets/images/<매장>/<테마>.jpg", "feltDiff": "체감 ★★☆", "feltFear": "공포 2/5" }
  ],
  "order": "졸업 추천 순서 : A → B → C",
  "tagline": "감성 한 줄 (예: 건대는 다시금 공테 성지가 될 것인가..)",
  "tip": "예약 독려 등 한 줄 (빨강 박스, 선택)"
}
```

### store (카드 7)
```json
{
  "type": "store",
  "title": "매장 정보",
  "items": [
    { "label": "📍 위치", "value": "..." },
    { "label": "🚇 오시는 길", "value": "OO역 N번 출구 도보 N분" },
    { "label": "☎️ 전화", "value": "..." },
    { "label": "🕘 운영", "value": "..." },
    { "label": "💰 가격", "value": "..." },
    { "label": "🔗 예약", "value": "play33.kr · @계정" }
  ]
}
```

### cta (카드 8)
```json
{ "type": "cta", "title": "어떤 게 제일 끌리세요?", "actions": ["공유 유도 📲", "태그 유도 😈"], "next": "맛보기 도전 멘트 (빨강) 🔓" }
```

---

## 3. 카드 2 (intro) — 항상 동일 (복붙)

> **이 카드는 매 추천 콘텐츠마다 동일하게 들어간다.** 그대로 사용.

```json
{
  "type": "intro",
  "title": "늙크크",
  "subtitle": "공테 &amp; 문제방에 미쳐가는 중 🔥",
  "points": [
    "<span class=\"accent\">스마일</span> · 100+ 쫄보, 힘에 밀리면 감 · 인테리어 감탄 전문 1",
    "<span class=\"accent\">메타몽</span> · 30+ 왕쫄보 방린이, 밀어도 안 감 · 인테리어 감탄 전문 2",
    "<span class=\"accent\">루피</span> · 100+ 쫄탱, 뼛속까지 이과 똑똑이 🧠",
    "<span class=\"accent\">동자모</span> · 350+ 쫄탱, 인생 최대 업적 멸탐대 1위 🏆"
  ]
}
```

> 멤버: **스마일 · 메타몽 · 루피 · 동자모** (팀명 늙크크). 번호/프로필 바꾸지 말 것.

---

## 4. 톤앤매너 (쫄보 컨셉)

- **화자**: "공테 도파민에 빠진 늙크크". 친근·과장 위트, 솔직.
- **공테** = 공포테마. **방린이** = 방탈출 초보. **쫄탱** = 많이 했지만 여전히 쫄보.
- 후킹은 매장 카피를 비트는 식 (예: "분명히 할 만하다면서요 사장님..").
- **공식 표기는 의심하되 출처 존중**: 매장 공식 난이도/공포도는 그대로 적고, 체감은 별도로 솔직하게.
- 스포일러 금지. 졸업(클리어) 추천 순서 제시.
- 이모지는 카드당 1~2개, 과하지 않게.
- 색: 딥 네이비 배경 + 크림슨(#E94560) 강조. (DESIGN_GUIDE 참고)

---

## 5. 제작 워크플로우

### STEP 1 — 정보 수집 (사용자 + 웹)
사용자가 주는 것: 매장명, 테마들, 체감 난이도/공포도, 한줄평, 추천 순서.
웹에서 확인(출처 검증 필수): 공식 장르/난이도/공포도, 인원, 시간, 가격, 위치, 포스터.
- 공식 사이트 / 예약 페이지 / 매장 인스타에서 교차 확인.
- **가격·위치·오픈일은 반드시 출처 확인** (틀리면 신뢰도 손상).

### STEP 2 — 포스터 확보 (선택)
- 매장 공식 포스터 URL → `assets/images/<매장>/<테마>.확장자` 로 다운로드.
- 파일명은 **영문**(macOS 한글 정규화 이슈 회피). 예: `dial.jpg`, `geunal.png`.
- ⚠️ 저작권: 매장 자산. 출처(@매장계정) 표기. repo에는 미포함(.gitignore), 로컬에서만. 출처는 `assets/images/<매장>/SOURCES.md`에 기록.

### STEP 3 — data JSON 작성
- `pipeline/data/play33-gundae.json` 복사 → `pipeline/data/<새-slug>.json`.
- 카드2(intro)는 §3 그대로. 나머지는 수집 정보로 교체.

### STEP 4 — 렌더
```bash
cd pipeline
node render.js data/<새-slug>.json
```
- 결과: `pipeline/output/<slug>/<slug>-01~08.png` + `pipeline/preview.html`.
- `open preview.html` 로 8장 미리보기.

### STEP 5 — 검토 (이미지 직접 확인)
- 표지 후킹, 별점(채운/빈 구분), 한줄평 줄바꿈, footer(@jroom.official · N/8) 안 잘림.
- 매장명/테마명/가격 정확, 스포 없음.
- 넘치면 `styles.css`의 `.card--theme` 간격이나 `.poster` 크기 조정 후 재렌더.

### STEP 6 — 캡션 작성
- 카드 내용과 동일 톤으로 인스타 캡션 + 해시태그.
- 첫 줄 후킹, 테마별 한 줄 요약(체감공포도), 졸업 순서, 저장/태그 CTA.
- 해시태그: #방탈출 #방탈출추천 #<지역>방탈출 #공포방탈출 #<매장> ... #jroom_official
- 콘텐츠 원본 + 캡션은 `content/drafts/<날짜>-<주제>.md` 에 보관.

### STEP 7 — 발행 (사용자 결정)
- `content/drafts/` → `content/published/` 이동, git commit.
- 발행 캘린더는 `insta-j-room-plan` 스킬 / docs/CONTENT_STRATEGY.md 참고.

---

## 6. 렌더 파이프라인 메모 (개발자용)

- 카드 렌더러: `pipeline/lib/cards.js` (type별 함수 + RENDERERS 맵).
- 스타일: `pipeline/styles.css` (Pretendard 웹폰트, CSS 변수).
- 포스터는 `render.js`가 base64 data URI로 임베드 (setContent 안정성).
- 새 카드 타입이 필요하면: cards.js에 렌더러 추가 → RENDERERS 등록 → styles.css 스타일 → data에서 사용.

---

## 7. 완료 체크리스트

- [ ] data JSON 작성 (카드2 = 고정값 그대로)
- [ ] 공식 정보 출처 확인 (장르/난이도/공포도/가격/위치)
- [ ] 포스터 영문명 + SOURCES.md 기록 + gitignore
- [ ] 렌더 성공, PNG 8장
- [ ] 이미지 검토 (별점/줄바꿈/footer/오타/스포)
- [ ] 캡션 + 해시태그 작성, drafts에 보관
- [ ] git 커밋
