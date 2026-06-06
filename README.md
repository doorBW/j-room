# j-room

> 방탈출 정보 인스타그램 계정 [@jroom.official](https://instagram.com/jroom.official) 의 콘텐츠 제작 파이프라인 저장소

방탈출을 사랑하는 서버 개발자가 운영하는 인스타그램 카드뉴스 계정의 모든 콘텐츠, 템플릿, 자동화 스크립트를 GitHub에서 버전 관리합니다.

- **인스타그램**: [@jroom.official](https://instagram.com/jroom.official) (프로페셔널/크리에이터 계정)
- **계정명**: 제이룸 | 방탈출 후기·추천 (방탈출 400+ 찐방탈출러)
- **카드뉴스 사이즈**: 1080×1350 (4:5 세로형)
- **콘텐츠 톤**: 친근한 존댓말, 솔직함, 스포일러 없음

---

## 콘텐츠 카테고리

| 카테고리 | 설명 | 성격 |
|---------|------|------|
| **장르/주제별 추천** | 공포/추리/판타지 등 장르·입문/지역 등 주제별 방탈출 2~5개 큐레이션 | 메인 ⭐ |
| **연방 코스** | 특정 위치에서 연속해서 즐길 수 있는 방탈출 타임라인 + 동선 | 메인 |
| **방탈출 소식** | 주간 신규 오픈/테마/이벤트 집계 (AI 활용) | 정기 |
| **방탈출 후기** | 직접 체험한 테마 솔직 리뷰 + 추천 여부 | 비정기 |

**발행**: 기본 주 2회(수 20시 / 토 11시) + 보너스(일 20시, 재고 시). 2주 격주 로테이션.
자세한 정의는 [docs/CONTENT_TYPES.md](docs/CONTENT_TYPES.md), 발행 전략은 [docs/CONTENT_STRATEGY.md](docs/CONTENT_STRATEGY.md) 참고.

---

## 폴더 구조

```
j-room/
├── docs/                  # 파이프라인, 컨텐츠 정의, 브랜드 가이드
│   ├── PIPELINE.md          # 아이디어 → 게시 전체 워크플로우
│   ├── CONTENT_TYPES.md     # 콘텐츠 타입별 상세 정의
│   ├── CONTENT_STRATEGY.md  # 발행 캘린더 + 카테고리 맵 + 배치 생산법
│   ├── BRAND_GUIDE.md       # 톤앤매너, 컬러, 폰트, 프로필
│   ├── DESIGN_GUIDE.md      # 미리캔버스 카드뉴스 디자인 가이드 (실전 포함)
│   └── AI_TOOLS.md          # 카드뉴스 제작 AI 도구 리서치
├── content/               # 실제 콘텐츠 (마크다운 원본)
│   ├── ideas/             # 아이디어 + BACKLOG.md (발행 주제 풀)
│   ├── drafts/            # 작업 중인 초안 / 발행 대기(재고)
│   └── published/         # 게시 완료 (백업 + 회고)
├── templates/             # 재사용 템플릿
│   ├── card-news/         # 콘텐츠 타입별 카드뉴스 텍스트 템플릿
│   └── instagram-caption/ # 인스타 캡션/해시태그 템플릿
├── assets/                # 이미지, 폰트, 로고 등 정적 자원
│   ├── images/
│   ├── fonts/
│   └── logos/
├── pipeline/              # 카드뉴스 생성 자동화 (Bannerbear, Placid, HTML 등)
├── reviews/               # 게시 후 성과 회고 (좋아요/저장/도달)
└── scripts/               # 개발자용 유틸 스크립트 (예약 게시, 백업 등)
```

---

## 시작하기

1. 발행할 주제는 [content/ideas/BACKLOG.md](content/ideas/BACKLOG.md) 에서 고르거나 추가
2. 만들 차례가 되면 → `templates/card-news/<타입>.md` 복사 → `content/drafts/` 에서 작성
3. 카드뉴스 디자인 → [docs/PIPELINE.md](docs/PIPELINE.md) 의 디자인 단계 따라 진행
4. 인스타그램 게시 후 → `content/published/` 로 이동 + `reviews/` 에 성과 기록

**운영 원칙**: 생산은 몰아서(배치), 발행은 규칙적으로(주 2회). → [docs/CONTENT_STRATEGY.md](docs/CONTENT_STRATEGY.md)

---

## 라이센스 & 컨텐츠 권리

- 사진/이미지: 직접 촬영했거나 라이센스 확보한 자료만 사용
- 방탈출 업체명/테마명: 출처 명시
- AI 생성 이미지: 프롬프트 함께 보관
