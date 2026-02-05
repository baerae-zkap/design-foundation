# @baerae-zkap/design-system

ZKAP Design System - React & React Native Components with AI-readable documentation.

## Validation Status

| Item | Status | Notes |
|------|--------|-------|
| Package Published | ✅ | Google Artifact Registry `@baerae-zkap/design-system@0.1.0` |
| TypeScript Types | ✅ | No type conflicts in zkap-rn-mvp |
| React Native | ✅ | Tested on iOS/Android simulators |
| Gradient Fix | ✅ | ActionArea uses proper white transparency |

**Last Tested**: 2025-02-05 with zkap-rn-mvp (Expo SDK 54, React Native 0.81.5)

---

## Installation

### 1. Configure npm registry (`.npmrc`)

```bash
# Add to project root .npmrc
@baerae-zkap:registry=https://asia-northeast3-npm.pkg.dev/zkap-dev/zkap-npm-packages/
//asia-northeast3-npm.pkg.dev/zkap-dev/zkap-npm-packages/:always-auth=true
```

### 2. Authenticate with Google Artifact Registry

```bash
npx google-artifactregistry-auth
```

### 3. Install

```bash
pnpm add @baerae-zkap/design-system
# or
npm install @baerae-zkap/design-system
# or
yarn add @baerae-zkap/design-system
```

---

## Usage

### React Native

```tsx
import { Button, TextButton, ActionArea, ActionAreaButton } from '@baerae-zkap/design-system/native';

function MyScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Content */}
      <ScrollView>
        <Button
          buttonType="filled"
          color="brandDefault"
          size="medium"
          onPress={() => console.log('pressed')}
        >
          Confirm
        </Button>

        <TextButton
          color="brandDefault"
          onPress={() => console.log('pressed')}
        >
          Learn More
        </TextButton>
      </ScrollView>

      {/* Bottom Action Area */}
      <ActionArea>
        <ActionAreaButton variant="alternative" onPress={() => {}}>
          Cancel
        </ActionAreaButton>
        <ActionAreaButton onPress={() => {}}>
          Confirm
        </ActionAreaButton>
      </ActionArea>
    </View>
  );
}
```

### Web (React)

```tsx
import { Button, TextButton, ActionArea, ActionAreaButton } from '@baerae-zkap/design-system';

function App() {
  return (
    <div>
      <Button
        buttonType="filled"
        color="brandDefault"
        size="medium"
        onClick={() => console.log('clicked')}
      >
        Confirm
      </Button>

      <ActionArea>
        <ActionAreaButton variant="alternative" onClick={() => {}}>
          Cancel
        </ActionAreaButton>
        <ActionAreaButton onClick={() => {}}>
          Confirm
        </ActionAreaButton>
      </ActionArea>
    </div>
  );
}
```

---

## Components

| Component | Description | Platforms |
|-----------|-------------|-----------|
| `Button` | Primary action button with filled/outlined variants | Web, RN |
| `TextButton` | Lightweight text-based action button | Web, RN |
| `ActionArea` | Bottom action bar with gradient overlay | Web, RN |
| `ActionAreaButton` | Button styled for ActionArea (main/alternative/sub) | Web, RN |

---

## zkap-rn-mvp Integration

This package is already integrated in `zkap-rn-mvp`. Test page available at:

```
app/test-design-system/index.tsx
```

### Import Path

```tsx
// Use this import for React Native
import { Button, TextButton, ActionArea, ActionAreaButton } from '@baerae-zkap/design-system/native';
```

### Notes

- No type conflicts with existing `@/design-system` local components
- Works alongside existing design system during migration
- Peer dependencies (react, react-native) are already satisfied

---

## Adding New Components

### Workflow

1. **Create component** in `src/native/` (React Native) and `src/components/` (Web)
2. **Export** from `src/native/index.ts` and `src/index.ts`
3. **Add documentation** in `docs/components/[ComponentName].md`
4. **Build**: `pnpm build`
5. **Publish**: `npm publish`

### File Structure

```
packages/design-system/
├── src/
│   ├── components/          # Web components
│   │   ├── Button/
│   │   ├── TextButton/
│   │   └── ActionArea/
│   ├── native/              # React Native components
│   │   ├── Button.tsx
│   │   ├── TextButton.tsx
│   │   ├── ActionArea.tsx
│   │   └── index.ts
│   └── index.ts             # Web exports
├── docs/
│   ├── COMPONENTS.md        # Overview
│   └── components/          # Per-component docs
└── package.json
```

### Publishing

```bash
cd packages/design-system

# Bump version
npm version patch  # or minor, major

# Build & publish
pnpm build
npm publish
```

---

## Design Tokens

### Button Sizes

| Size | Height | Font Size | Horizontal Padding | Border Radius |
|------|--------|-----------|-------------------|---------------|
| small | 36px | 14px | 16px | 8px |
| medium | 40px | 14px | 16px | 8px |
| large | 44px | 14px | 20px | 12px |
| xLarge | 48px | 16px | 24px | 12px |

### Button Colors

| Color | Use Case |
|-------|----------|
| `brandDefault` | Primary actions |
| `brandSecondary` | Secondary brand actions |
| `baseContainer` | Neutral/tertiary actions |
| `successDefault` | Success/confirmation actions |
| `errorDefault` | Destructive/warning actions |

### ActionArea

| Property | Value |
|----------|-------|
| Gradient Height | 48px |
| Gradient | Transparent white → Solid white |
| Button Gap | 12px |
| Padding | 20px horizontal, 12px vertical |
| Safe Area | Included (iOS bottom) |

### ActionAreaButton Variants

| Variant | Style |
|---------|-------|
| `main` | Filled brand color (default) |
| `alternative` | Outlined style |
| `sub` | Text button style |

---

## AI Documentation

AI tools can read component design rules from included markdown files:

```
node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md
node_modules/@baerae-zkap/design-system/docs/components/Button.md
node_modules/@baerae-zkap/design-system/docs/components/TextButton.md
node_modules/@baerae-zkap/design-system/docs/components/ActionArea.md
```

### Platform Differences

| Feature | Web | React Native |
|---------|-----|--------------|
| Click handler | `onClick` | `onPress` |
| Gradient | CSS `linear-gradient` | `LinearGradient` component |
| Safe Area | N/A | `useSafeAreaInsets()` |

---

## Peer Dependencies

- `react` >= 18.0.0
- `react-native` >= 0.70.0 (optional, for native usage)
- `react-native-linear-gradient` (for ActionArea gradient)
- `react-native-safe-area-context` (for ActionArea safe area)

---

## Troubleshooting

### Type conflicts with pnpm link

Don't use `pnpm link` for development. It causes duplicate type declarations.

**Solution**: Publish to registry and install normally, or use `file:` protocol:
```json
"@baerae-zkap/design-system": "file:../design-foundation/packages/design-system"
```

### Gradient shows black instead of white

Fixed in v0.1.0. The gradient now uses `rgba(255,255,255,0)` instead of `transparent`.

### Google Artifact Registry auth fails

```bash
# Re-authenticate
npx google-artifactregistry-auth

# Or login with gcloud
gcloud auth login
gcloud auth application-default login
```

---

## License

MIT
