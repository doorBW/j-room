---
slug: course-hongdae-6
type: course
post_date: 2026-06-23
ig_media_id: 18055700891733794
ig_permalink: https://www.instagram.com/p/DZ7a30WoOT9/
image_count: 10
host: github
---

# 홍대 6연방 코스 발행 회고 (2026-06-23)

## 발행 정보
- 계정: @jroom.official
- 장수: 10장 캐러셀 (제로월드 3 + 티켓투 3 + 표지/타임라인/총평/CTA)
- 캡션 첫 줄: "홍대 하루 6연방, 이게 되네 🗺️"
- permalink: https://www.instagram.com/p/DZ7a30WoOT9/

## 발행 시 메모
- 호스팅: `ig_host.sh --github` (raw.githubusercontent.com, 01·05·10 → 200 검증)
- ⚠️ **publish_carousel 1차 실패** → `Media ID is not available`. 원인은 캐러셀 컨테이너 처리 완료 전 publish 호출(10장이라 처리 지연) 추정.
  - media_count로 미발행 확인(중복 없음) 후 **즉시 재시도 → 성공**(2차). Meta가 이미지를 1차 때 한 번 fetch해 CDN이 데워진 덕으로 추정.
  - 📌 교훈: 10장 캐러셀은 1차에서 이 에러 잘 남. 실패 시 (1)media_count로 미발행 확인 → (2)그대로 재시도가 정석. → publish 스킬 트러블슈팅에 반영 권장.
- 캡션 원문 그대로 사용(수정 없음).
- 두 번째 게시물(첫 발행은 PLAY33 추천 06-21).

## 사후 점검 (발행 1~2주 뒤 다시 보기)
- [ ] 도달/저장/공유 수치 (저장률이 코스 콘텐츠 핵심 지표)
- [ ] 댓글·DM 반응 ("어느 지역 코스 원해요?" 유도에 반응 오는지)
- [ ] 다음 코스 콘텐츠에 반영할 점
- [ ] 가격(1인 15만원 추정)·도보 동선 등 추정치에 대한 지적 댓글 여부
