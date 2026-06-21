#!/usr/bin/env bash
# ig_host.sh — IG 업로드용 JPG를 공개 HTTPS URL로 호스팅하고, 순서대로 URL을 출력한다.
#
# 왜 필요한가:
#   Instagram Graph API(@mcpware/instagram-mcp)는 로컬 파일을 받지 않는다.
#   Meta 서버가 이미지를 "공개 URL"에서 직접 가져간다(server-side fetch).
#   따라서 publish_carousel 호출 전에 8장(또는 7장)을 공개 URL로 올려야 한다.
#
# 사용법:
#   scripts/ig_host.sh <slug>            # 기본: litterbox 임시 호스팅(72시간 후 자동 만료)
#   scripts/ig_host.sh <slug> --github   # 대안: 공개 GitHub repo raw URL (영구 보관/소유)
#
# 입력:  pipeline/output/<slug>/ig/<slug>-NN.jpg  (먼저 ig_prepare.sh 실행)
# 출력:  공개 URL을 한 줄에 하나씩, 카드 순서(01→NN)대로 stdout 으로.
#
# 호스팅 방식 선택 가이드:
#   - litterbox(기본): repo에 커밋 안 함 → 저작권 포스터를 git 영구이력에 남기지 않음.
#       발행 성공 후 IG가 자체 CDN에 사본을 보관하므로, 72시간 임시 URL이면 충분.
#   - --github: 본인 소유 공개 repo(doorBW/j-room)의 raw URL. 가장 안정적이지만
#       카드(포스터 포함)가 git 이력에 영구 보존된다(=인스타에 올라가는 최종 결과물과 동일).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

slug="${1:?usage: scripts/ig_host.sh <slug> [--github]}"
mode="${2:-litterbox}"

jpgdir="pipeline/output/$slug/ig"
shopt -s nullglob
jpgs=("$jpgdir"/*.jpg)
if [ ${#jpgs[@]} -eq 0 ]; then
  echo "ERR: '$jpgdir' 에 JPG 없음. 먼저 실행:  scripts/ig_prepare.sh $slug" >&2
  exit 1
fi
# 파일명 정렬(01,02,...)로 카드 순서 보장
IFS=$'\n' jpgs=($(printf '%s\n' "${jpgs[@]}" | sort)); unset IFS

case "$mode" in
  --github|github)
    repo="$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo doorBW/j-room)"
    dest="content/published/_media/$slug"
    mkdir -p "$dest"
    cp "${jpgs[@]}" "$dest"/
    git add "$dest" >/dev/null
    if ! git diff --cached --quiet; then
      git commit -q -m "chore(ig): host $slug carousel images for publish"
    fi
    git push -q
    sha="$(git rev-parse HEAD)"
    for jpg in "${jpgs[@]}"; do
      echo "https://raw.githubusercontent.com/$repo/$sha/$dest/$(basename "$jpg")"
    done
    ;;
  litterbox|--litterbox|--ephemeral|ephemeral)
    api="https://litterbox.catbox.moe/resources/internals/api.php"
    for jpg in "${jpgs[@]}"; do
      url="$(curl -fsS -F reqtype=fileupload -F time=72h -F "fileToUpload=@$jpg" "$api")"
      case "$url" in
        https://*) echo "$url" ;;
        *) echo "ERR: litterbox 업로드 실패 ($jpg): $url" >&2
           echo "     → --github 모드로 재시도하세요:  scripts/ig_host.sh $slug --github" >&2
           exit 1 ;;
      esac
    done
    ;;
  *)
    echo "ERR: 알 수 없는 모드 '$mode' (litterbox | --github)" >&2
    exit 1 ;;
esac
