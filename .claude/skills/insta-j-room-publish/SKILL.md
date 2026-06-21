---
name: insta-j-room-publish
description: j-room 인스타그램(@jroom.official)의 완성된 카드뉴스 PNG를 Instagram으로 캐러셀 발행한다. content/drafts의 status:ready 콘텐츠를 골라 pipeline/output PNG(7~8장)를 JPG로 변환 → 공개 URL 호스팅 → Instagram MCP(@mcpware/instagram-mcp)의 publish_carousel로 게시 → content/published 이동 + reviews 회고 기록까지 처리한다. "인스타 올려줘", "카드뉴스 발행", "업로드해줘", "publish", "insta-j-room-publish" 트리거. ⚠️ 발행은 외부 공개 행위 — 실행 전 캡션·이미지·계정 최종 확인 + 사용자 승인 필수.
---

# insta-j-room-publish — 카드뉴스 인스타그램 발행

> 만들어 둔 카드뉴스(PNG)를 **Instagram 캐러셀**로 올리는 스킬.
> 생성 스킬(recom/review/course/news)이 만든 결과물을 **발행**하는 마지막 단계.
> 작업 루트: `/Users/tigercow/AI/escape-ai/j-room` (GitHub: doorBW/j-room, **public**)

---

## 0. 핵심 제약 — 먼저 이해하기

이 계정에 연결된 Instagram MCP는 **`@mcpware/instagram-mcp`** (Instagram **Graph API** 기반).
Graph API는 **로컬 파일을 받지 않는다.** Meta 서버가 이미지를 **공개 HTTPS URL**에서 직접 가져간다(server-side fetch).

따라서 발행 파이프라인은 반드시 이 순서다:
```
렌더된 PNG → JPG 변환(1080×1350) → 공개 URL 호스팅 → publish_carousel(image_urls=[URL...], caption)
```

검증된 MCP 도구 시그니처(소스 확인):

| 도구 | 파라미터 | 비고 |
|------|----------|------|
| `publish_carousel` | `image_urls`: string[] (2~10개, 공개 URL, **필수**), `caption`: string (선택) | 캐러셀(앨범). 우리 기본값 |
| `publish_media` | `image_url` \| `video_url` (공개 URL), `caption` | 단일 1장 |
| `publish_reel` | `video_url`, `caption`, `share_to_feed` | 릴스(영상) |

> 도구 설명 원문: *"All media must be publicly accessible URLs."* (carousel 2~10장)
> 이미지 포맷은 **JPEG**가 안전(PNG는 거부/변환 이슈). 비율 4:5(1080×1350)는 인스타 세로 최대치 → 그대로 OK.

---

## 1. 사전 준비 — Instagram MCP 로드 + 계정 검증 ⚠️ (가장 중요)

발행 대상은 **@jroom.official** 이고, 이 계정 전용 MCP 서버는 **`instagram-jroom`** 이다.
(jroom 전용 장기 토큰 + IG business account_id **`17841428955013517`** 로 등록. 앱 "OpenEscape Publisher" app_id `1027422653062310`. JRoom FB 페이지 id `1099255746614957`.)

> 🚨 **`instagram-openescape` 서버는 다른 계정(`open.escape`)이다. 절대 그 서버/토큰으로 jroom 콘텐츠를 발행하지 말 것.**
> 두 서버가 동시에 로드돼 있을 수 있다(open.escape는 user 스코프 전역 등록). openescape 토큰을 복사하면 jroom에 발행된다고 **잘못 가정했다가 엉뚱한 계정에 올릴 뻔한 사고**가 있었다 → 그래서 STEP A-2 계정검증이 필수다.

**STEP A — jroom 도구 존재 확인**
```
ToolSearch  query: "select:mcp__instagram-jroom__publish_carousel"
```
- 보이면 → **STEP A-2로(건너뛰지 말 것).**
- **안 보이면** → 아래 STEP B로 등록 후 **세션 재시작** 필요.

**STEP A-2 — 계정 검증 (발행 전 필수 가드)** 🔒
```
mcp__instagram-jroom__get_profile_info()   → 반환 username 확인
```
- `username == "jroom.official"` → OK, 2번으로.
- **다른 값(예: open.escape)이면 즉시 중단.** 잘못된 서버/토큰이다. 절대 발행 호출하지 말 것.

**STEP B — instagram-jroom 서버 등록(최초 1회, 별도 터미널)**
open.escape 토큰은 재사용 불가 — jroom **전용 장기 토큰**이 필요하다.
1. Graph API Explorer(앱: **OpenEscape Publisher**)에서 **사용자 토큰** 생성. 권한: `instagram_basic, instagram_content_publish, pages_show_list, pages_read_engagement`. 팝업에서 **JRoom 페이지 포함** 승인.
2. 토큰 옆 **ⓘ → 액세스 토큰 도구 → "Extend Access Token"** 으로 **60일 장기 토큰** 발급(단기 토큰은 1~2h 만료).
3. 등록:
```bash
claude mcp add -s user instagram-jroom \
  -e INSTAGRAM_ACCESS_TOKEN=<jroom 장기토큰> \
  -e INSTAGRAM_ACCOUNT_ID=17841428955013517 \
  -- npx -y @mcpware/instagram-mcp
```
4. **세션 재시작** → STEP A부터 다시.
> ⚠️ 토큰은 **채팅에 붙여넣지 말고 터미널에서만** 다룬다. `~/.claude.json`은 **절대 커밋 금지**(토큰 포함).
> account_id 확인/재취득: 토큰으로 `me/accounts?fields=name,instagram_business_account{id,username}` → `"name":"JRoom"` 의 `instagram_business_account.id`.

---

## 2. 업로드 대상 선택

`content/drafts/` 에서 **`status: ready`** 프론트매터를 가진 .md를 후보로 제시한다.
각 draft 프론트매터에서 다음을 읽는다:

| 필드 | 용도 |
|------|------|
| `data: pipeline/data/<slug>.json` | **slug** 추출 (= 파일 basename) |
| `type` | recommendation / review / course / news |
| `status` | `ready` 만 발행 대상 |
| `store`, `topic`/`theme` | 사람이 확인용 |

- slug 예: `pipeline/data/play33-gundae.json` → slug=`play33-gundae`.
- 출력 PNG 위치: `pipeline/output/<slug>/<slug>-NN.png` (7장 또는 8장).
- 여러 개면 사용자에게 어떤 걸 올릴지 묻는다(한 번에 1개 발행).

---

## 3. 워크플로우

### STEP 1 — PNG 존재 확인 (없으면 렌더)
```bash
ls pipeline/output/<slug>/<slug>-*.png
# 없으면: cd pipeline && node render.js data/<slug>.json
```

### STEP 2 — JPG 변환 (1080×1350)
```bash
scripts/ig_prepare.sh <slug>
# → pipeline/output/<slug>/ig/<slug>-NN.jpg (q90), 장수 출력
```

### STEP 3 — 이미지 최종 검토 (발행 전 마지막 관문)
- `open pipeline/output/<slug>/ig/`(또는 PNG)로 **눈으로 직접** 확인:
  표지 후킹 · 별점(채운/빈) · 한줄평 줄바꿈 · footer(@jroom.official · N/N) 안 잘림 ·
  매장/테마/가격 정확 · **스포일러 없음**.
- 장수 = 캐러셀 2~10장 범위인지(7/8 OK).

### STEP 4 — 공개 URL 호스팅 (⚠️ `--github` 사용, litterbox 금지)
```bash
scripts/ig_host.sh <slug> --github   # ✅ 권장(기본): 공개 repo raw URL(영구/소유), commit+push
# scripts/ig_host.sh <slug>          # ⛔ litterbox(인자 없는 기본값) — IG 발행 실패 확인됨, 쓰지 말 것
```
- 출력: 공개 URL이 **카드 순서(01→NN)대로** 한 줄에 하나씩.
- **검증**: 첫 URL 하나를 `curl -sI "<url>" | head -1` 로 `200` 확인 후 진행.
  (push 직후 raw CDN 반영에 수 초 걸릴 수 있음 → 실패 시 2~3초 후 재시도.)

> 🚨 **litterbox(catbox) 금지.** 2026-06-21 play33-gundae 발행에서 litterbox URL로
> `publish_carousel`이 **실패**: `Only photo or video can be accepted as media type`.
> FB 크롤러 차단이 아니다 — `facebookexternalhit` UA로도 200·image/jpeg 정상 응답.
> **catbox/litterbox ↔ Instagram 인제스트 비호환**(IG가 catbox 제공 이미지를 디코드/검증 못 함; 이미지 자체는 유효).
> `ig_host.sh`의 인자 없는 기본값이 litterbox이므로 **반드시 `--github`를 명시**한다.
>
> 트레이드오프: github 모드는 카드 JPG가 공개 repo `content/published/_media/<slug>/` git 이력에
> 영구 보존된다. 단 IG에 올라가는 최종 결과물과 동일 콘텐츠이고, 발행 성공 후 IG가 자체 CDN에
> 사본을 보관하므로 수용 가능. 자세한 건 `scripts/ig_host.sh` 상단 주석 참고.

### STEP 5 — 캡션 추출
draft .md 안의 **"인스타그램 캡션"** 헤딩 아래 첫 ``` 코드펜스 ``` 블록이 캡션이다.
```bash
awk '/캡션/{f=1} f&&/^[`][`][`]/{c++; if(c==1)next; if(c==2)exit} f&&c==1{print}' \
  content/drafts/<draft>.md
```
- 출력 그대로(해시태그 포함)를 캡션으로 사용. **임의 수정 금지**(필요하면 사용자 확인).

### STEP 6 — 발행 승인 받기 ⚠️
발행은 **외부 공개 행위**다. publish_carousel 호출 직전 사용자에게:
- 계정(@jroom.official) · 슬러그 · 장수 · 캡션 첫 줄 · 호스팅 URL 개수 를 요약 제시하고
- **명시적 "올려줘/예" 승인**을 받는다. 승인 전엔 호출하지 않는다.

### STEP 7 — 캐러셀 게시 (MCP 호출)
승인되면 publish_carousel 호출:
```
mcp__instagram-jroom__publish_carousel(          # ⚠️ openescape 아님! jroom 서버
  image_urls = [ "<url-01>", "<url-02>", ... "<url-NN>" ],   # STEP 4 순서 그대로
  caption    = "<STEP 5 캡션 전문>"
)
```
- 반환값에서 **media id / permalink**를 확보(후처리·회고에 기록).
- 실패 시 메시지 확인: **`Only photo or video can be accepted...`(=litterbox 호스팅 탓 → STEP4대로 `--github` 재호스팅 후 재시도)**, 토큰 만료(재발급), URL 비공개(호스팅 재시도), 비율/포맷(JPG·4:5 확인), 레이트리밋(잠시 후).

---

## 4. 발행 후 처리 (성공 시에만)

### 4-1. draft 프론트매터 갱신 + published 이동
- draft .md 프론트매터: `status: ready` → `status: published`, `post_date: <YYYY-MM-DD>` 기입,
  `ig_permalink:` / `ig_media_id:` 추가.
- 파일 이동: `git mv content/drafts/<draft>.md content/published/<draft>.md`

### 4-2. 회고 기록 (reviews/)
`reviews/<YYYY-MM-DD>-<slug>.md` 생성 (§6 템플릿).

### 4-3. 커밋
```bash
git add content/ reviews/
git commit -m "publish(<type>): <slug> 인스타 발행 (<YYYY-MM-DD>)"
git push
```
> `--github` 호스팅을 썼다면 이미지 커밋이 STEP 4에서 따로 들어가 있을 수 있음(정상).

### 4-4. 상태 안내
- `insta-j-room-plan` §8 재고(ready 개수) 갱신을 사용자에게 환기.
- permalink 사용자에게 전달.

---

## 5. 트러블슈팅

| 증상 | 원인 / 해결 |
|------|------------|
| ToolSearch에 instagram-jroom 도구 안 보임 | 미등록 → §1 STEP B로 instagram-jroom 등록 후 **세션 재시작** |
| `get_profile_info`가 open.escape 반환 | 잘못된 서버 — instagram-jroom 서버/토큰·account_id(`17841428955013517`) 확인. **openescape로 발행 금지** |
| `Media must be a publicly accessible URL` | 호스팅 URL이 비공개/만료/404 → `curl -sI`로 200 확인, 재호스팅 |
| PNG로 올려 실패 / 흐릿 | 반드시 `ig_prepare.sh`로 **JPG** 변환분(`/ig/*.jpg`) 사용 |
| `Aspect ratio not supported` | 4:5(1080×1350) 확인. 렌더 원본이 4:5라 보통 문제없음 |
| 토큰 만료(`OAuthException`) | jroom 장기 토큰 재발급(Graph Explorer ⓘ→Extend) 후 `claude mcp add`로 instagram-jroom env 갱신 → 재시작 |
| litterbox URL로 발행 실패 (`Only photo or video can be accepted as media type`) | catbox/litterbox ↔ IG 인제스트 비호환 (FB 크롤러 차단 아님 — `facebookexternalhit` UA로도 200·jpeg 정상). **litterbox 쓰지 말고 `scripts/ig_host.sh <slug> --github`로 호스팅** (STEP4 기본) |
| 캐러셀 장수 오류 | 2~10장만 허용. 7/8장 OK, 1장이면 `publish_media` 사용 |

---

## 6. reviews 회고 템플릿

```markdown
---
slug: <slug>
type: <recommendation|review|course|news>
post_date: <YYYY-MM-DD>
ig_media_id: <id>
ig_permalink: <url>
image_count: <N>
host: github   # 기본 권장(litterbox는 IG 발행 비호환)
---

# <매장/주제> 발행 회고 (<YYYY-MM-DD>)

## 발행 정보
- 계정: @jroom.official
- 장수: <N>장 캐러셀
- 캡션 첫 줄: "<...>"
- permalink: <url>

## 발행 시 메모
- (호스팅 방식, 변환 이슈, 캡션 수정 여부 등)

## 사후 점검 (발행 1~2주 뒤 다시 보기)
- [ ] 도달/저장/공유 수치
- [ ] 댓글·DM 반응
- [ ] 다음 콘텐츠에 반영할 점
```

---

## 7. 완료 체크리스트

- [ ] §1: instagram-jroom 도구 로드(ToolSearch) + `get_profile_info`로 **jroom.official** 계정 검증 🔒
- [ ] 대상 draft 선택(status: ready) + slug 확정
- [ ] PNG 존재(없으면 렌더) → `ig_prepare.sh`로 JPG 변환
- [ ] 이미지 눈으로 검토(별점/줄바꿈/footer/오타/스포)
- [ ] `ig_host.sh <slug> --github`로 공개 URL 확보 + `curl -sI` 200 검증 (litterbox 금지)
- [ ] 캡션 추출(원문 유지)
- [ ] **사용자 발행 승인** 받음
- [ ] `publish_carousel` 호출 성공 → permalink/media_id 확보
- [ ] draft 프론트매터 갱신 + `git mv`로 published 이동
- [ ] reviews 회고 작성
- [ ] git commit + push
- [ ] 재고 현황 안내(plan §8)
```
