# Field Patterns Reference

Common form field patterns with exact component usage.

## Text Inputs

### Email
```tsx
<TextField
  type="email"
  label="Email"
  placeholder="example@email.com"
  value={email}
  onChange={setEmail}
  error={errors.email}
  required
/>
```

### Password
```tsx
<TextField
  type="password"
  label="Password"
  placeholder="8 characters minimum"
  value={password}
  onChange={setPassword}
  error={errors.password}
  required
/>
```

### Phone Number
```tsx
<TextField
  type="tel"
  label="Phone"
  placeholder="010-0000-0000"
  value={phone}
  onChange={setPhone}
  error={errors.phone}
/>
```

### Name
```tsx
<TextField
  label="Name"
  placeholder="Enter your name"
  value={name}
  onChange={setName}
  required
/>
```

### Multi-line (Bio, Description)
```tsx
<TextArea
  label="Bio"
  placeholder="Tell us about yourself..."
  value={bio}
  onChange={setBio}
  maxLength={200}
/>
```

## Selection Inputs

### Dropdown
```tsx
<Select
  label="Category"
  value={category}
  onChange={setCategory}
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]}
/>
```

### Segmented (2-4 options, visible at once)
```tsx
<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]}
/>
```

## Toggle Inputs

### Switch (binary on/off)
```tsx
<Switch
  label="Enable notifications"
  checked={notifs}
  onChange={setNotifs}
/>
```

### Checkbox (multiple selection)
```tsx
<Checkbox
  label="I agree to the Terms of Service"
  checked={agreed}
  onChange={setAgreed}
/>
```

### Radio (single selection from group)
```tsx
<Radio
  label="Payment method"
  value={payment}
  onChange={setPayment}
  options={[
    { label: 'Credit Card', value: 'card' },
    { label: 'Bank Transfer', value: 'bank' },
  ]}
/>
```

## Special Patterns

### Agreement Checkbox with Link
```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox checked={agreed} onChange={setAgreed} />
  <span style={{ ...typography.semantic.body.sm }}>
    I agree to the{' '}
    <TextButton color="primary" onClick={openTerms}>Terms of Service</TextButton>
  </span>
</div>
```

### Search
```tsx
<SearchField
  placeholder="Search items..."
  value={query}
  onChange={setQuery}
  onClear={() => setQuery('')}
/>
```

### Range / Slider
```tsx
<Slider
  label="Price range"
  min={0}
  max={100}
  value={price}
  onChange={setPrice}
/>
```

## Form Layout Template

```tsx
import { TextField, Select, Button, SectionHeader } from '@baerae-zkap/design-system';
import { spacing } from '@baerae-zkap/design-system';

function MyForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}>
      <TextField label="Name" value={name} onChange={setName} required />
      <TextField label="Email" type="email" value={email} onChange={setEmail} required />
      <TextField label="Phone" type="tel" value={phone} onChange={setPhone} />

      <SectionHeader title="Preferences" style={{ marginTop: spacing.primitive[4] }} />
      <Select label="Language" value={lang} onChange={setLang} options={langOptions} />

      <Button
        variant="filled"
        color="primary"
        onClick={handleSubmit}
        isLoading={isSubmitting}
        disabled={!isValid}
        style={{ marginTop: spacing.primitive[4], width: '100%' }}
      >
        Submit
      </Button>
    </form>
  );
}
```
