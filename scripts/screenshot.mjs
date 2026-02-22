#!/usr/bin/env node
/**
 * 디자인 문서 스크린샷 도구
 * 사용: node scripts/screenshot.mjs <URL> [출력파일명]
 * 예시: node scripts/screenshot.mjs https://montage.wanted.co.kr/docs/... popup
 */

import { execSync } from 'child_process';
import path from 'path';

const url = process.argv[2];
const name = process.argv[3] ?? 'screenshot';

if (!url) {
  console.error('URL을 입력해주세요.');
  console.error('사용법: node scripts/screenshot.mjs <URL> [파일명]');
  process.exit(1);
}

const outPath = `/tmp/${name}.png`;

console.log(`📸 스크린샷 찍는 중...`);
console.log(`   URL: ${url}`);
console.log(`   저장 위치: ${outPath}`);

execSync(
  `npx playwright screenshot --browser chromium --full-page --wait-for-timeout 3000 "${url}" "${outPath}"`,
  { stdio: 'inherit' }
);

console.log(`\n✅ 완료! Claude에게 이 경로를 공유하세요:`);
console.log(`   ${outPath}`);
