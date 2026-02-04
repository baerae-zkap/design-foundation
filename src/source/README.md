# Component Source Reference

이 디렉토리는 문서 사이트에서 참조하는 실제 디자인 시스템 컴포넌트 소스 코드입니다.

## 구조

```
source/
└── components/
    └── Button/
        ├── Button.tsx      # 컴포넌트 구현
        └── Button.css.ts   # 스타일 정의
```

## 용도

- 문서 페이지의 "View Source" 링크가 이 파일들을 참조합니다
- 개발자가 실제 구현 코드를 확인할 수 있습니다
- `zkap-rn-mvp` 레포의 최신 코드를 주기적으로 동기화해야 합니다

## 동기화

소스 코드 업데이트 시 `zkap-rn-mvp` 레포에서 해당 파일을 복사하세요:

```bash
# Button 컴포넌트 동기화 예시
cp /path/to/zkap-rn-mvp/design-system/components/Button/Button.tsx ./components/Button/
cp /path/to/zkap-rn-mvp/design-system/components/Button/Button.css.ts ./components/Button/
```
