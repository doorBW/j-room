#!/usr/bin/env bash
# ig_prepare.sh — 렌더된 카드 PNG를 인스타그램 업로드용 JPG로 변환한다.
#
# 왜 필요한가:
#   - Instagram Graph API(=@mcpware/instagram-mcp)는 이미지로 JPEG를 요구한다(PNG 거부/변환 이슈).
#   - 권장 피드 해상도는 1080x1350(4:5). 렌더 산출물은 @2x(2160x2700)라 다운스케일한다.
#
# 사용법:
#   scripts/ig_prepare.sh <slug>
# 입력:  pipeline/output/<slug>/<slug>-NN.png  (렌더 결과, gitignore 대상)
# 출력:  pipeline/output/<slug>/ig/<slug>-NN.jpg  (1080x1350, q90)
#
# 의존성: macOS 내장 sips (외부 패키지 불필요)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
slug="${1:?usage: scripts/ig_prepare.sh <slug>}"

src="$ROOT/pipeline/output/$slug"
out="$src/ig"

if [ ! -d "$src" ]; then
  echo "ERR: '$src' 없음. 먼저 렌더하세요:  cd pipeline && node render.js data/$slug.json" >&2
  exit 1
fi

shopt -s nullglob
pngs=("$src/$slug"-*.png)
if [ ${#pngs[@]} -eq 0 ]; then
  echo "ERR: '$src' 안에 '$slug-*.png' 없음." >&2
  exit 1
fi

mkdir -p "$out"
rm -f "$out"/*.jpg 2>/dev/null || true

n=0
for png in "${pngs[@]}"; do
  base="$(basename "$png" .png)"
  jpg="$out/$base.jpg"
  # -z H W: 1350(높이) x 1080(너비)로 다운스케일, JPEG 품질 90
  sips -s format jpeg -s formatOptions 90 -z 1350 1080 "$png" --out "$jpg" >/dev/null
  n=$((n+1))
done

echo "OK: ${n}장 JPG 변환 완료 → $out"
ls -1 "$out"/*.jpg
