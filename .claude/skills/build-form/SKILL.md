# Skill: Build a Form

Follow these steps to build a consistent, accessible form using `@baerae-zkap/design-system`.

## Step 1: List All Fields

Write out every field the form needs. For each field, determine:
- Field name and label
- Input type (text, email, password, number, tel, date, etc.)
- Required or optional
- Validation rules (min/max length, format, custom)
- Default value (if any)

## Step 2: Map Fields to Components

| Field Type | Component |
|------------|-----------|
| Single-line text (name, email, phone) | `TextField` |
| Password | `TextField type="password"` |
| Multi-line text (bio, description) | `TextArea` |
| Dropdown selection | `Select` |
| On/off toggle | `Switch` |
| Multiple choice (checkboxes) | `Checkbox` |
| Single choice (radio) | `Radio` |
| Segmented choice (2-4 options) | `SegmentedControl` |
| Numeric range | `Slider` |
| Search/filter | `SearchField` |

## Step 3: Structure the Form

```tsx
import { TextField, Select, Switch, Button } from '@baerae-zkap/design-system';
import { spacing } from '@baerae-zkap/design-system';

<form
  onSubmit={handleSubmit}
  style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}
>
  {/* Group related fields */}
  <TextField label="Name" value={name} onChange={setName} required />
  <TextField label="Email" type="email" value={email} onChange={setEmail} required />

  {/* Use SectionHeader to separate field groups */}
  <SectionHeader title="Preferences" style={{ marginTop: spacing.primitive[4] }} />
  <Select label="Language" value={lang} onChange={setLang} options={langOptions} />
  <Switch label="Email notifications" checked={notifs} onChange={setNotifs} />

  {/* Submit at bottom */}
  <Button
    variant="filled"
    color="primary"
    onClick={handleSubmit}
    isLoading={isSubmitting}
    disabled={!isValid}
    style={{ marginTop: spacing.primitive[4], width: '100%' }}
  >
    Save
  </Button>
</form>
```

**Layout rules:**
- Vertical stack with 16px gap (`spacing.primitive[4]`)
- Single column on mobile
- Group related fields; separate groups with `SectionHeader` or 32px gap
- Submit button at bottom, full-width or right-aligned

## Step 4: Add Validation

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

function validate() {
  const newErrors: Record<string, string> = {};
  if (!name.trim()) newErrors.name = 'Name is required';
  if (!email.includes('@')) newErrors.email = 'Enter a valid email';
  if (password.length < 8) newErrors.password = 'Minimum 8 characters';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

<TextField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={errors.email}   // Error message shown below input
/>
```

**Validation rules:**
- Validate on blur for individual fields
- Validate all fields on submit
- Don't show errors before user interaction
- Clear field error when user starts typing again

## Step 5: Handle Submit

```tsx
async function handleSubmit() {
  if (!validate()) return;
  setIsSubmitting(true);
  try {
    await api.save(formData);
    // Navigate or show success
  } catch (err) {
    setServerError('Failed to save. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}
```

- Use `isLoading` on the submit Button during submission
- Disable all form inputs during submission (optional, prevents editing)
- Show server-side errors inline if they map to a field, or as a top-level banner

## Step 6: Handle Loading State

```tsx
<Button
  variant="filled"
  color="primary"
  onClick={handleSubmit}
  isLoading={isSubmitting}
  disabled={!isValid || isSubmitting}
>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

## Step 7: Verify

- [ ] Every field uses a system Input component (no native `<input>`)
- [ ] Every field has a visible `label`
- [ ] Required fields are marked or validated
- [ ] Error messages appear inline below the field
- [ ] Submit button shows loading state during async
- [ ] Submit button is disabled when form is invalid
- [ ] No hardcoded colors
- [ ] Spacing uses token values (16px gap between fields)
- [ ] Keyboard: Tab moves between fields, Enter submits
