# Tabbed Form Interview Preparation

## Exercise

Build a React and TypeScript form with Profile, Interests and Settings sections. Preserve values across section changes, validate inputs, and display Submit only on Settings.

This is a practice scenario, not a confirmed Eightfold question. Follow-ups below simulate an adaptive technical interview.

## Interview touch points

| Touch point | What this exercise demonstrates |
| --- | --- |
| Requirements clarification | Confirming field rules, navigation behaviour and the meaning of persistence |
| Component design | Separating navigation and form sections without unnecessary abstraction |
| State ownership | Keeping shared form data in the parent so unmounting a section does not discard values |
| Controlled inputs | Using value for text inputs and checked for checkboxes and radio buttons |
| Parent-child communication | Passing values down and reporting changes through callback props |
| Immutable updates | Copying objects with spread and removing array items with filter rather than mutation |
| TypeScript | Typed props, union types, generic constraints and field/value relationships |
| Validation | Pure validation functions, useful errors and final submission checks |
| React rendering | Understanding that setters schedule renders and do not immediately change current state variables |
| Form behaviour | Correct button types, preventDefault and converting age in the submission payload |
| Accessibility | Associated labels, fieldsets, legends and accessible error descriptions |
| Testing and delivery | Covering edge cases and delivering a working solution within the time limit |

## Practice assumptions

- Name must contain at least three characters after trimming.
- Age must be a whole number of at least 18.
- Email uses a basic format check, not exhaustive address verification.
- At least one interest must be selected.
- Theme is light or dark; notifications are optional.
- Forward navigation validates required preceding sections, including direct jumps.
- Backward navigation remains available.
- Submission revalidates the full form and returns to the first invalid section.

Confirm these assumptions with the interviewer before implementation. A tabbed interface may allow free navigation, while a step form may require sequential completion.

## Likely follow-up questions

### Why does form data survive when Profile unmounts?

The parent remains mounted and owns the data. Profile receives that data again through props when it remounts. Local state inside an unmounted section would be discarded.

### Why use React state instead of an ordinary variable?

A state setter schedules a render. Assigning an ordinary variable does not tell React to render the updated interface.

### Why wrap the click handler in an arrow function?

It defers the update until the click occurs and captures the button index through a closure. Calling the setter directly while rendering would update state immediately.

### How does a child update parent-owned state?

The parent passes a callback prop. The child reports a new value through that callback, and the parent decides how to update its state. This is lifted state with values down and events up.

### Why use a functional state updater?

The update depends on the previous object. The updater receives the latest pending state, and spreading it preserves the other fields without mutation.

### Why use a generic field updater?

K extends keyof FormData restricts the field to a valid property name. FormData[K] connects that field to its corresponding value type. A broad union for the value would not preserve this relationship.

### Why is age stored as a string?

HTML input values are strings. An empty string represents an unfilled field without turning it into zero. Validation checks the string before conversion, and submission converts the validated value to a number.

### Why use checked for checkboxes and radios?

Checked represents selection state. Value represents an associated input value, not whether the control is selected. Radio inputs share a name to form an exclusive group.

### Why keep validation outside React components?

Pure functions separate rules from rendering and state management. They can be tested independently and reused for navigation and submission.

### Why inspect local errors after setting error state?

The state variable still belongs to the current render. The freshly calculated local object contains the current validation result.

### Why validate again on submission?

Submission is the final client-side validation boundary and should not depend on a particular navigation path. The server must also validate the payload.

### Why use a form and preventDefault?

A form provides native submission semantics. PreventDefault stops browser navigation so the application can validate and process the submission. Navigation buttons use type="button"; Submit uses type="submit".

### Why use noValidate?

The exercise displays custom validation messages instead of browser validation pop-ups. It does not remove the requirement for client and server validation.

### Why associate errors with inputs?

Aria-invalid communicates invalid state, and aria-describedby connects each input to explanatory text. Colour alone cannot explain an error accessibly.

### Does Vite perform full TypeScript checking?

Vite transforms TypeScript for the build. Run the separate typecheck script to check types.

### What does persistence mean here?

Values persist across section changes, not browser refreshes. Refresh persistence requires an explicit requirement and storage design, such as local storage or server-side drafts, with privacy considerations.

## Current limitations and next steps

- Submission logs a cleaned payload; no API request is implemented.
- Add loading, failure and visible success states when implementing API submission.
- Add server-side validation; client validation is not a security boundary.
- Finish keyboard-accessible navigation. Current pressed buttons are not a complete ARIA tabs implementation.
- Move focus appropriately after navigation and validation failure.
- Remove the temporary Validate Profile button when the final flow is complete.
- Refine scoped styling and responsive layout.
- Add automated validation and component tests.
- Clarify whether refresh persistence or draft recovery is required before adding storage.

## Manual test checklist

- Empty, whitespace-only and short names show errors.
- Empty, decimal and underage age values show errors; valid adult ages pass.
- Invalid email formats show errors.
- No interests prevents reaching Settings, including a direct jump from Profile.
- Backward navigation works without discarding values.
- Multiple interests can be selected and deselected independently.
- Only one theme is selected, and notifications remain boolean.
- Values survive section unmounting and remounting.
- Submit is visible only on Settings.
- Submission validates all required fields and logs trimmed strings with numeric age.
- Labels focus or toggle their controls, and error IDs match their descriptions.

## Interview approach

Explain why each choice satisfies a requirement rather than only naming hooks or patterns. Clarify scope first, deliver a basic working version, test edge cases, and discuss production improvements honestly.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
```
