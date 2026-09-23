# Accordion Interview Preparation

## Exercise

Build a React and TypeScript accordion that allows at most one section to be expanded at a time.

This is a practice scenario based on the supplied video transcript, not a confirmed Eightfold question. Follow-ups below simulate an adaptive technical interview.

## Problem statement

Accept an array of items through props. Each item has a title and content. Display the titles as interactive controls that expand or collapse their associated content.

### Requirements

- All sections start collapsed.
- Clicking a closed section opens it.
- Opening a section closes any previously open section.
- Clicking the open section closes it, leaving all sections collapsed.
- Show an indicator that reflects whether a section is expanded.
- Display "No items available" for an empty or invalid item list.
- Support keyboard operation and communicate expanded state to assistive technology.

## Practice assumptions

- Add a stable string ID to each item's title and content.
- IDs are unique; duplicate titles are allowed.
- Content is plain text for this exercise.
- Sample data is local; no API request is required.
- Selection does not persist after the accordion unmounts or the page refreshes.
- Basic keyboard support uses native buttons: Tab to focus, Enter or Space to toggle.
- Custom arrow-key navigation and animation are optional extensions.
- At the input boundary, verify an array of valid objects before rendering. TypeScript alone does not validate runtime input.

Clarify input guarantees, single versus multiple expansion, and keyboard expectations with the interviewer before coding.

## Planned structure

```text
accordion/
├── Accordion.tsx
├── Accordion.css
├── data.ts
└── README.md
```

- Accordion.tsx: item and props types, selection state, toggle handler and rendering.
- Accordion.css: scoped layout, button, content, indicator and focus styles.
- data.ts: typed sample items for the exercise.
- App.tsx: imports the sample data and passes it to Accordion when this exercise is connected.

Start with one accordion component. Extract an item component only if its responsibilities justify it.

## Implemented behaviour

- Typed sample items are passed from App through props.
- All sections start collapsed.
- One nullable item ID represents the open section.
- Clicking a closed title opens it and closes the previous section.
- Clicking the open title collapses it.
- Native buttons expose aria-expanded and support keyboard activation.
- A plus or minus indicator derives from the same open state.
- An empty array displays "No items available".
- Scoped CSS provides layout, open-state styling and visible keyboard focus.

## Step-by-step plan

1. Define AccordionItem and the items prop; render a simple component shell.
2. Create typed sample data and connect the exercise through App.
3. Render titles and content with map and stable item IDs as keys.
4. Track the selected item with one string-or-null state variable.
5. Implement toggling with a functional state updater.
6. Derive each item's expanded state and show the matching content and indicator.
7. Associate title buttons with panels and expose aria-expanded.
8. Handle empty and invalid input without conditionally calling hooks.
9. Add scoped, responsive CSS and visible keyboard focus.
10. Verify transitions, boundary cases and project checks.

## Interview touch points

| Concept | What the exercise demonstrates |
| --- | --- |
| Requirements clarification | Single-open behaviour, empty input and keyboard expectations |
| TypeScript | Typed item objects, props and nullable selection |
| Props | Parent supplies item data; the accordion reads it without mutation |
| State ownership | One component coordinates which section is open |
| Minimal state | One selected ID expresses none or one open section |
| Functional updates | Compute the next selection from the previous selection |
| Event handling | Pass an ID through a callback without calling the handler during render |
| Rendering lists | Map items into JSX with stable keys |
| Derived values | Calculate isOpen from the selected ID rather than storing another boolean |
| Conditional rendering | Display content and indicators according to selection |
| Accessibility | Native buttons, headings, expanded state, panel associations and focus styles |
| Runtime validation | Distinguish TypeScript guarantees from untrusted input |
| Testing | Verify open, close, switch, empty and keyboard interactions |

## Likely follow-up questions

### Why accept items through props?

The parent supplies the content, while the accordion manages interaction. Different parents can reuse the component with different item lists.

### What state is needed?

One openId value of type string or null. A string identifies the expanded item; null means all items are collapsed.

### Why not give every item its own boolean state?

Independent booleans allow several items to be open at once. A single selected ID directly represents the requirement that at most one section may be expanded.

### How does toggling work?

If the clicked ID matches the previous open ID, return null. Otherwise return the clicked ID. Selecting another ID automatically makes the previously selected item closed.

### Why use a functional updater?

The next selection depends on the previous selection. The updater receives the latest pending state and calculates the next value without mutation.

### Why use IDs instead of indexes?

An ID preserves item identity if the array is reordered or items are inserted. An index represents a position that may later belong to a different item.

### Why not use titles as keys?

Titles may repeat or change. Identity should be independent of display content.

### What does destructuring props do?

Writing Accordion({ items }) extracts the items property from the props object. Destructuring is JavaScript syntax; props are React's mechanism for passing values to a component.

### Why wrap the click handler in an arrow function?

The wrapper calls the handler with the item's ID when the click happens. Calling the handler directly while rendering would execute it immediately.

### Is an effect required?

No. Toggling is caused by a user interaction and belongs in an event handler. Expanded state is derived during rendering; there is no external system to synchronize with.

### Why use a button for the title?

Native buttons support focus and activation with Enter and Space. A clickable div would require recreating those behaviours. Use type="button" so an accordion inside a form does not submit it.

### What does aria-expanded communicate?

It tells assistive technology whether the associated content is expanded. Derive it from the same isOpen value used to control content visibility.

### How should title and panel be associated?

Give the panel a unique DOM ID and refer to it with the button's aria-controls. IDs must remain unique when multiple accordions appear on one page; an instance prefix from useId can help. Item IDs still provide list keys.

### Conditional rendering or hidden panels?

Conditional rendering unmounts collapsed content and discards any child-local state. Keeping a panel mounted with hidden preserves that state and keeps its DOM ID available. Choose based on content and interaction requirements.

### Does TypeScript handle invalid runtime data?

No. Types are checked during development. If callers can provide untrusted values, validate the array and required fields before mapping. Keep hooks above any conditional early return.

### Would you add memoization immediately?

No. This small component has inexpensive calculations. Measure a rendering issue before adding memoization.

## Current limitations and next steps

- TypeScript enforces the props contract during development, but runtime input validation is not implemented.
- Content is conditionally mounted, so child-local state would reset when a panel closes.
- Panel IDs and aria-controls are not yet implemented.
- No automated interaction tests are present yet.
- Optional extensions include controlled selection through props, multiple expansion, custom keyboard navigation and animations.

## Manual test checklist

- Every item is initially collapsed.
- Clicking a title opens only its content.
- Clicking that title again collapses it.
- Opening another item closes the previous one.
- Duplicate titles with unique IDs remain independently identifiable.
- A single item can open and close.
- An empty array displays "No items available".
- Invalid input follows the agreed fallback without crashing.
- Indicators match content visibility and aria-expanded.
- Tab reaches every title button; Enter and Space toggle it.
- Focus stays visible and remains on the activated button.
- Panel associations use unique DOM IDs, including with multiple instances.
- Long titles and content fit narrow screens.
- Run typecheck and build after implementation.

## First practice prompt

> Before implementing the accordion, explain what you would clarify and how you would represent the requirement that only one section can be open. What should happen when the open section is clicked again?

## Interview approach

Explain how each choice supports the required behaviour. Start with data and rendering, add the smallest state model, implement transitions, then verify accessibility and edge cases. Keep styling scoped and discuss optional improvements separately from delivered functionality.

## Commands

Run from the project root:

```bash
npm run dev
npm run typecheck
npm run build
npm run lint
```
