---
name: insta-j-room-plan
description: j-room 방탈출 인스타그램(@jroom.official)의 전체 운영 계획·콘텐츠 카테고리·발행 캘린더·사용 가능한 제작 스킬을 안내하는 메타 스킬. "j-room 계획", "인스타 운영 계획", "다음에 뭐 만들지", "발행 일정", "insta-j-room-plan" 트리거. 무엇을 언제 어떻게 발행할지, 어떤 스킬로 만들지 길잡이.
---

# insta-j-room-plan — j-room 인스타 운영 길잡이

> 방탈출 정보 인스타그램 **@jroom.official** 운영의 전체 그림과 다음 행동을 안내한다.
> 작업 루트: `/Users/tigercow/AI/escape-ai/j-room` (GitHub: doorBW/j-room)

---

## 1. 계정

- **핸들**: @jroom.official (프로페셔널/크리에이터)
- **이름(검색)**: 제이룸 | 방탈출 후기·추천
- **화자**: 방탈출 400+ "늙크크" (스마일·메타몽·루피·동자모) — 공테(공포테마) 도파민에 빠진 팀
- **카드뉴스 사이즈**: 1080×1350 (4:5 세로형)
- **톤**: 친근한 솔직 위트, 스포 금지, 공식 표기 의심하되 출처 존중

---

## 2. 콘텐츠 카테고리 4종

| 카테고리 | 성격 | 생산 난이도 | 제작 스킬 |
|---------|------|-----------|----------|
| **추천** (장르/주제/지역별) ⭐ | 메인 주력 | 낮음 | `insta-j-room-create-recom` ✅ |
| **연방 코스** | 메인 | 높음 | `insta-j-room-create-course` ✅ |
| **소식** | 정기 | 낮~중 (AI 집계) | `insta-j-room-create-news` ✅ |
| **후기** | 비정기 | 중 | `insta-j-room-create-review` ✅ |

> 상세 정의: [docs/CONTENT_TYPES.md](../../../docs/CONTENT_TYPES.md)

---

## 3. 발행 캘린더 (2주 격주 사이클)

```
        수 20시     토 11시     일 20시(보너스)
1주차 │  추천   │   연방   │   후기 (생산 시)
2주차 │  소식   │   후기   │   추천 (생산 시)
```

- **기본 주 2회**: 수 20시 / 토 11시
- **보너스**: 일 20시 (재고 있을 때만)
- 유연성: 재고 없는 슬롯은 **추천으로 대체**하거나 건너뛰기 (일관성 > 빈도)

> 상세: [docs/CONTENT_STRATEGY.md](../../../docs/CONTENT_STRATEGY.md)

---

## 4. 운영 원칙

1. **생산은 몰아서(배치), 발행은 규칙적으로** — 만드는 날 ≠ 올리는 날
2. **재고 2주치(4개) 유지** — 바쁜 주에도 안 끊기게
3. **빈 슬롯은 추천으로 메우거나 건너뛰기** — 억지로 올리지 말 것
4. 콘텐츠 상태: idea → draft → ready(재고) → scheduled → published

---

## 5. 제작 워크플로우 (공통)

```
아이디어(BACKLOG) → 정보수집 → data JSON 작성 → 렌더(PNG) → 검토 → 캡션 → 발행 → 회고
```

- 카드뉴스 생성: `pipeline/` (HTML/CSS + Puppeteer). `cd pipeline && node render.js data/<slug>.json`
- 디자인 규칙: [docs/DESIGN_GUIDE.md](../../../docs/DESIGN_GUIDE.md)
- 발행 주제 풀: [content/ideas/BACKLOG.md](../../../content/ideas/BACKLOG.md)

---

## 6. 사용 가능한 스킬

| 스킬 | 용도 | 상태 |
|------|------|------|
| `insta-j-room-create-recom` | 추천 카드뉴스 제작 | ✅ 사용 가능 |
| `insta-j-room-plan` | 이 안내 (운영 길잡이) | ✅ 이 문서 |
| `insta-j-room-create-news` | 소식 카드뉴스 (AI 집계) | ✅ 사용 가능 |
| `insta-j-room-create-review` | 후기 카드뉴스 | ✅ 사용 가능 |
| `insta-j-room-create-course` | 연방 코스 카드뉴스 | ✅ 사용 가능 |

> 새 카테고리 스킬은 `create-recom`을 본떠 만든다.
> **카드2는 카테고리별로 다름**: 추천 = 늙크크 자기소개(고정) / 소식 = 이번 주 요약.
> 쫄보 브랜딩은 표지 kicker("늙크크가 모아온/체험한")로 전 카테고리 공통 유지.

---

## 7. 현재 상태 (수시 업데이트)

- ✅ 인프라: 계정/로고/브랜드/파이프라인 구축 완료
- ✅ **4개 카테고리 렌더러 + 스킬 완성** (추천/소식/후기/연방)
- ✅ 콘텐츠 2개: **PLAY33 추천** + **룸즈에이 메가게임 후기** — 둘 다 업로드 직전 대기
- 📦 재고(ready): **2개 / 목표 4개**
- ⏳ 미정: 발행 시작 시점/빈도 (사용자 검토 중)

> 발행 시작 전 권장: 재고 4개 확보(추천 위주) 후 주 2회. 소식은 발행 직전 집계.

---

## 8. 다음 행동 가이드

- **"추천 만들자"** → `insta-j-room-create-recom`
- **"다음에 뭐 만들지?"** → BACKLOG.md에서 ⭐ 우선순위 주제 선택 (추천이 가장 안 끊김)
- **"발행 일정?"** → §3 캘린더 + CONTENT_STRATEGY.md
- **"재고 점검"** → BACKLOG.md 상단 재고 상태 + content/drafts/ 의 status: ready 개수
