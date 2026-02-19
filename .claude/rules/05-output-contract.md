# AI Output Contract

When generating product UI code using `@baerae-zkap/design-system`, AI output MUST follow this contract.

## Required Output Structure

For any screen or component generation task, return:

1. **Component Selection** — Map each UI element to a specific system component:
   ```
   [UI Element] → <ComponentName variant="..." color="...">
   ```

2. **State Requirements** — List which states must be implemented:
   ```
   [Component]: default | hover (built-in) | disabled | loading | error | empty
   ```

3. **Accessibility Notes** — Flag any required aria attributes:
   ```
   [Component]: aria-label="..." | role="..." | aria-expanded
   ```

4. **Code** — Implementation using only system components and tokens.

## Output Rules

- NEVER return code with hardcoded colors (`#hex`, `rgb()`, `hsl()`).
- NEVER return native HTML controls (`<button>`, `<input>`, `<select>`) when a system equivalent exists.
- ALWAYS include `disabled` and loading states for form submission buttons.
- ALWAYS include empty state for lists and data tables.
- ALWAYS verify: one primary CTA per section maximum.

## Example Contract Response

```
Screen: User Profile Edit

Component Selection:
- Page title → SectionHeader title="Edit Profile"
- Name field → TextField label="Name" value={name} onChange={setName}
- Email field → TextField label="Email" type="email"
- Save action → Button variant="filled" color="primary" isLoading={saving}
- Cancel action → Button variant="weak" color="neutral"

State Requirements:
- Save Button: disabled={!isDirty || !isValid}, isLoading={saving}
- Name/Email fields: error={fieldErrors.name} for validation

Accessibility:
- Form wrapped in <form> element with onSubmit handler
- All fields have visible label prop

Code: [implementation follows]
```
