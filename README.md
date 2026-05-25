# j-room

> 방탈출 정보 인스타그램 계정 [@jroom.official](https://instagram.com/jroom.official) 의 콘텐츠 제작 파이프라인 저장소

방탈출을 사랑하는 서버 개발자가 운영하는 인스타그램 카드뉴스 계정의 모든 콘텐츠, 템플릿, 자동화 스크립트를 GitHub에서 버전 관리합니다.

- **인스타그램**: [@jroom.official](https://instagram.com/jroom.official) (프로페셔널/크리에이터 계정)
- **카드뉴스 사이즈**: 1080×1350 (4:5 세로형)
- **콘텐츠 톤**: 친근한 존댓말, 솔직함, 스포일러 없음

---

## 콘텐츠 카테고리

| 카테고리 | 설명 | 빈도 (목표) |
|---------|------|------------|
| **연방 일정 추천** | 특정 위치에서 연속해서 즐길 수 있는 방탈출 코스 | 주 1회 |
| **방탈출 후기** | 직접 체험한 테마 리뷰 + 추천 여부 | 주 2~3회 |
| **테마별 추천** | 입문/공포/추리/4인 등 큐레이션 | 주 1회 |

자세한 콘텐츠 정의는 [docs/CONTENT_TYPES.md](docs/CONTENT_TYPES.md) 참고.

---

## 폴더 구조

```
j-room/
├── docs/                  # 파이프라인, 컨텐츠 정의, 브랜드 가이드
│   ├── PIPELINE.md        # 아이디어 → 게시 전체 워크플로우
│   ├── CONTENT_TYPES.md   # 콘텐츠 타입별 상세 정의
│   ├── BRAND_GUIDE.md     # 톤앤매너, 컬러, 폰트
│   └── AI_TOOLS.md        # 카드뉴스 제작 AI 도구 리서치
├── content/               # 실제 콘텐츠 (마크다운 원본)
│   ├── ideas/             # 아이디어 단계 (날것)
│   ├── drafts/            # 작업 중인 초안
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

1. 아이디어가 떠오르면 → `content/ideas/YYYY-MM-DD-주제.md` 에 메모
2. 작성할 차례가 되면 → `templates/card-news/<타입>.md` 복사 → `content/drafts/` 에서 작성
3. 카드뉴스 디자인 → [docs/PIPELINE.md](docs/PIPELINE.md) 의 디자인 단계 따라 진행
4. 인스타그램 게시 후 → `content/published/` 로 이동 + `reviews/` 에 성과 기록

---

## 라이센스 & 컨텐츠 권리

- 사진/이미지: 직접 촬영했거나 라이센스 확보한 자료만 사용
- 방탈출 업체명/테마명: 출처 명시
- AI 생성 이미지: 프롬프트 함께 보관
