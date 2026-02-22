# Skill: Component Picker

## When to Use
When you need to select the right component for a UI element but are unsure which to use. Load this skill before making component choices.

## Workflow
1. Identify the intent: What is the user trying to DO or SEE?
2. Classify into category: Action (user does something) / Content (display info) / Input (user provides data)
3. Apply decision rules from `resources/taxonomy/` or individual component guides
4. Check tie-breakers if two components seem equally valid
5. Return: component name + required props + reasoning + fallback

## Decision Tree

### Is it an ACTION (user triggers something)?
- Has label text + primary emphasis → Button (buttonType="filled")
- Has label text + secondary emphasis → Button (buttonType="weak")
- Icon only → IconButton
- Inline text link → TextButton
- Tag/filter toggle → Chip
- Large tappable custom area → ActionArea

### Is it CONTENT (displaying information)?
- Grouped content block with click → Card
- Horizontal thumbnail + text in list → ListCard
- Settings/menu row → ListCell
- Section title → SectionHeader
- Expandable section → Accordion
- Status/category label → ContentBadge

### Is it an INPUT (user provides data)?
- Single-line text → TextField
- Multi-line text → TextArea
- Search → SearchField
- Select from many options (>5) → Select
- Select from few options (<=5, visible) → Radio
- Multiple independent toggles → Checkbox
- Immediate on/off toggle → Switch
- Continuous range → Slider
- Exclusive 2-5 mode switch → SegmentedControl

## Output Format
```
Component: [ComponentName]
Props: buttonType="filled" color="primary" size="medium"
Why: [one-line reasoning]
Fallback: [alternative if unavailable]
```

## References
- `.claude/resources/components/` -- full spec per component
- `.claude/rules/20-component-selection.md` -- IF/THEN rules
- `.claude/rules/60-state-model.md` -- tie-breakers
