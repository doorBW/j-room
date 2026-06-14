---
name: insta-j-room-create-course
description: j-room 인스타그램(@jroom.official)의 "연방 코스(course)" 카테고리 카드뉴스를 제작한다. 특정 지역에서 연속으로 방탈출하는 타임라인 + 동선 + 매장별 소개를 7장 카드뉴스로 렌더한다. 사용자가 코스(순서/시간/매장) 정보를 주면 data JSON 작성 → 렌더 → PNG. "연방 코스 만들자", "방탈출 코스 추천", "insta-j-room-create-course" 트리거.
---

# insta-j-room-create-course — 연방 코스 카드뉴스 제작

> j-room 인스타그램의 **연방 코스(course)** 카테고리. 위치 기반 연속 방탈출 코스.
> 레퍼런스: `pipeline/data/course-sample.json` (레이아웃 데모)

---

## 0. 핵심 원칙

- **저장 유발 콘텐츠**: 실용 정보라 "저장"이 많이 찍힘 (알고리즘 ↑). CTA는 저장 유도.
- **동선이 생명**: 매장 간 **도보 5분 이내**가 베스트. 동선을 명확히.
- **난이도 그라데이션**: 가벼움 → 무거움 순서 (입문자 배려).
- **장르 다양성**: 추리/공포/모험 섞기.
- 사용자(4인방)가 순서·시간·매장 정보 제공. 제작 부담 큰 편 → 과거 다녀온 코스부터.
- 발행 슬롯: 격주 1주차 토요일.

---

## 1. 카드 구조 (가변 7~9장)

| # | type | 역할 |
|---|------|------|
| 1 | `cover` | 표지 — 지역 + N시간 N연방 코스 |
| 2 | `timeline` | 시간표 (모임~마무리) |
| 3~N | `coursestop` | 매장 1곳 = 1장 (정보 + 다음 동선) |
| N+1 | `intro` | 총평 (예산/난이도 구성/추천 대상) |
| N+2 | `cta` | 저장·태그 유도 + 다음 지역 예고 |

> 카드2는 timeline(시간표). 쫄보 브랜딩은 표지 kicker("쫄보 4인방의").

---

## 2. data JSON 스키마

cover/intro/cta는 추천과 동일. 신규는 `timeline`, `coursestop`.

### cover
```json
{ "type": "cover", "kicker": "쫄보 4인방의", "title": "강남역", "titleAccent": "4시간 3연방 코스", "hook": "동선 5분, 점심까지 한 번에 🗺️", "sub": "난이도 자연스럽게 ↗︎ · 입문자 친구와도 OK" }
```

### timeline (카드 2)
```json
{
  "type": "timeline",
  "title": "타임라인",
  "schedule": [
    { "time": "10:00", "event": "모임 · 카페 작전 회의 ☕" },
    { "time": "10:30", "event": "1번 테마 입장" },
    { "time": "12:00", "event": "점심 (도보 3분)" }
  ]
}
```

### coursestop (매장 1곳)
```json
{
  "type": "coursestop",
  "no": 1,
  "poster": "assets/images/<매장>/<테마>.jpg",  // 선택
  "store": "매장명",
  "name": "테마명",
  "info": [
    { "label": "난이도", "value": "★★★" },
    { "label": "👥", "value": "2~3인" },
    { "label": "⏱️", "value": "60분" }
  ],
  "comment": "한 줄 평 (이 코스에서의 역할)",
  "next": "🚶 다음 장소까지 도보 4분 · 가는 길 점심"
}
```

### intro (총평) / cta
```json
{ "type": "intro", "title": "총평", "subtitle": "1인 약 9만원 · 약 9시간", "points": ["난이도: 입문→중급→고급", "장르: 추리·공포·모험", "..."] }
```

---

## 3. 워크플로우

1. **정보**(사용자 필수): 지역, 시간 순서, 각 매장/테마, 난이도, 도보 동선, 식사/카페, 예산.
2. 공식 정보(가격/주소/시간)는 웹 확인. 동선(도보 분)은 지도로 확인.
3. 포스터(선택): 매장 공식 → assets, 영문명, SOURCES.md, gitignore.
4. **data JSON** → `node render.js data/course-<지역>.json`.
5. 검토(동선·시간·오타·footer) → 캡션 → drafts→published → commit.

---

## 4. 완료 체크리스트

- [ ] 동선 명확 (도보 분 표기), 가능하면 5분 이내
- [ ] 난이도 그라데이션 (가벼움→무거움)
- [ ] 시간표 현실적 (식사·휴식 포함)
- [ ] 예산 합계 정확
- [ ] 렌더 성공, 이미지 검토
- [ ] 캡션 + 해시태그(#방탈출코스 #방탈출일정 ...)
- [ ] git 커밋
