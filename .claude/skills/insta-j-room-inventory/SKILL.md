---
name: insta-j-room-inventory
description: j-room 인스타그램(@jroom.official)의 콘텐츠 재고 현황을 한눈에 집계해 보고한다. content/drafts(재고)·content/published(발행 완료)·pipeline/output(렌더 세트)을 조사해 발행/재고/미제작을 카테고리별로 정리하고, 재고 개수 대 목표(4개)를 알려준다. "재고 확인", "콘텐츠 현황", "재고 점검", "뭐 있지", "지금 상황", "inventory" 트리거.
---

# insta-j-room-inventory — 콘텐츠 재고 현황

> j-room 콘텐츠의 **발행 / 재고 / 미제작**을 실제 파일에서 집계해 한눈에 보고한다.
> (수동 기억이 아니라 파일을 직접 조사 → 항상 정확)

작업 루트: `/Users/tigercow/AI/escape-ai/j-room`

---

## 카테고리 4종 (커버리지 기준)
추천(recommendation) · 후기(review) · 연방 코스(course) · 소식(news)

---

## 조사 절차

아래를 bash로 조사한 뒤 §출력 형식으로 정리한다.

```bash
cd /Users/tigercow/AI/escape-ai/j-room

echo "=== 📦 재고 (content/drafts, status:ready) ==="
# 주의: zsh에서 $status·$type 는 예약/빌트인 → st·ty 변수명 사용
for f in content/drafts/*.md; do
  [ -f "$f" ] || continue
  ty=$(grep -m1 "^type:" "$f" | sed 's/type: *//')
  st=$(grep -m1 "^status:" "$f" | sed 's/status: *//')
  echo "• $(basename "$f")  [type=$ty · status=$st]"
done

echo "=== 🟢 발행 완료 (content/published) ==="
for f in content/published/*.md; do
  [ -f "$f" ] || continue
  echo "• $(basename "$f")"
done

echo "=== 🖼️ 렌더된 PNG 세트 (pipeline/output) ==="
for d in pipeline/output/*/; do
  [ -d "$d" ] || continue
  n=$(ls "$d"*.png 2>/dev/null | wc -l | tr -d ' ')
  echo "• $(basename "$d") — ${n}장"
done

echo "=== 📄 data JSON (제작된 콘텐츠, sample 제외) ==="
ls pipeline/data/*.json 2>/dev/null | grep -v -- "-sample"
```

> `*-sample` 세트(news/review/course-sample)는 **레이아웃 데모**이므로 재고에서 제외한다.

---

## 출력 형식 (이렇게 보고)

1. **🟢 발행 완료** — published의 콘텐츠 (카테고리 표기)
2. **📦 재고 (ready)** — drafts 중 status:ready (카테고리·장수)
3. **🚧 작업 중 (draft)** — drafts 중 status:draft (있으면)
4. **⬜ 미제작 카테고리** — 4종 중 실제 콘텐츠 없는 것
5. **카테고리 커버리지 표** (추천/후기/연방/소식 — 발행/재고/없음)
6. **재고 요약**: ready N개 / 목표 4개 → 발행 시작 가능 여부

예시:
```
🟢 발행: PLAY33 추천 (2026-06-21)
📦 재고: 메가게임 후기(7장) · 홍대 코스(10장) = 2개
⬜ 미제작: 소식
→ 재고 2/4 · 발행 1건 완료
```

---

## 부가: BACKLOG 동기화 (선택)

조사 결과가 [content/ideas/BACKLOG.md](../../../content/ideas/BACKLOG.md) 상단 "현재 재고 상태"와 다르면,
실제 조사값으로 BACKLOG를 갱신할지 사용자에게 제안한다. (실제 파일 = 정본)

---

## 발행 캘린더 참고
재고를 어디에 쓸지는 [insta-j-room-plan](../insta-j-room-plan/SKILL.md) §3 캘린더 참고.
- 기본 주 2회(수20/토11) + 보너스(일20), 격주 로테이션.
