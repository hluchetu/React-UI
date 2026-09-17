# Todo List Interview Preparation

## Exercise

Build a React and TypeScript todo list with adding, completion toggling and individual deletion.

This is a practice scenario, not a confirmed Eightfold question. The follow-ups below simulate an adaptive technical interview.

## Problem statement

Build a todo list using React and TypeScript. Users must be able to add tasks, view all tasks, toggle completion and delete individual tasks.

### Requirements

- Maintain the list in React state.
- Each task has an id, text and boolean completed value.
- Provide a text input with the placeholder "Enter todo" and a button labelled "Add".
- Add new tasks as incomplete.
- Clear the input after successfully adding a task.
- Display each task with its text, a completion checkbox and a Delete button.
- Allow toggling between complete and incomplete.
- Strike through completed task text.
- Delete only the selected task, whether complete or incomplete.

## Practice assumptions

- Reject empty and whitespace-only input.
- Trim task text before adding it.
- Allow duplicate text; identity comes from the task ID.
- Append new tasks to the list.
- Support adding with Enter as well as the Add button.
- Persistence across browser refreshes is not required unless requested.

Confirm assumptions with the interviewer before coding.

## Implementation structure

```text
todo-list/
├── TodoList.tsx
├── TodoList.css
└── README.md
```

TodoList owns the draft input and task array, handles submission, toggling and deletion, and renders the interface. TodoList.css supplies the completed-task strikethrough. App.tsx currently renders this exercise.

The implementation names its model Task, with id, task (the display text) and completed properties. The brief calls the display-text property text; the current task property serves the same purpose.

Keep one component while the feature remains small. Extract a task-item component only when there is a clear benefit.

## Implemented behaviour

- A labelled controlled text input captures the draft.
- Form submission supports the Add button and Enter without browser navigation.
- Blank input is rejected; valid text is trimmed and appended as an incomplete task.
- crypto.randomUUID() assigns an ID once before the state updater runs.
- Successful addition clears the input.
- Semantic list items use task IDs as stable React keys.
- Controlled, labelled checkboxes toggle completion in both directions.
- Completion controls the strikethrough class without separate styling state.
- Delete buttons remove only the selected ID, independent of text or completion.
- Each Delete button has an accessible name that includes its task text.
- Task count and empty-list feedback derive from the task array.

## Step-by-step plan

1. Define the Todo type and state for the input and task array.
2. Render a labelled controlled input and Add button.
3. Implement adding with validation, a stable ID and a functional state update.
4. Render tasks with semantic list elements and stable keys.
5. Implement completion toggling with an immutable map update.
6. Style completed text and keep checkboxes controlled.
7. Implement deletion with filter and a functional state update.
8. Add empty-list feedback, keyboard submission and accessible controls.
9. Test edge cases and explain complexity and production improvements.

## Interview touch points

| Touch point | What the exercise tests |
| --- | --- |
| Data modelling | Typed task objects and separate input/list state |
| Controlled inputs | State-driven value and checked properties |
| Event handling | Passing callbacks without invoking them during render |
| Immutable updates | Spread for additions, map for updates and filter for deletions |
| Functional updates | Computing the new list from the latest pending state |
| Identity and keys | Stable unique IDs, independent of text or array position |
| Conditional styling | Deriving completed appearance from task state |
| Validation | Rejecting blank tasks without accidentally discarding input |
| Accessibility | Input labels, labelled checkboxes, keyboard operation and semantic lists |
| Testing | Verifying add, toggle, delete and identity-related edge cases |
| Communication | Explaining decisions and trade-offs while implementing |

## ID generation

Generate an ID once when adding a task, for example with crypto.randomUUID() in a supported secure browser context. Do not generate IDs during rendering.

Do not use todos.length + 1. For example, IDs 1, 2 and 3 become 1 and 3 after deleting task 2. Adding another task based on the current length produces ID 3 again.

Do not use array indexes as keys for a list that supports deletion or reordering. Use the task ID instead.

## Possible Eightfold-style follow-ups

These are practice questions, not a confirmed Eightfold question bank.

### What state do you need?

A string for the current input and an array of Task objects for the tasks. Completion belongs to each task rather than a separate checkbox-state array.

### Why use React state instead of ordinary variables?

State retains values between renders, and its setter schedules a render. Updating a local variable alone does not provide those behaviours. A render calculates the interface from current state; React then commits the necessary DOM changes.

### What makes the draft input controlled?

Its value comes from input state, and onChange sends the browser's updated value to setInput. This also allows successful submission to clear the displayed draft by setting input to an empty string.

### Why generate the ID outside the functional updater?

The updater should be pure. Create the task once in the event handler, then use the updater only to calculate the new array. Never generate IDs during rendering.

### Why wrap toggle and delete handlers in arrow functions?

The wrapper passes the selected task ID when the event occurs. Calling handleDelete(task.id) directly while rendering would execute deletion immediately rather than register an event handler.

### Why separate the input from the task list?

Typing edits a draft. The list should change only when the user adds a valid task.

### Why use functional state updates?

Adding, toggling and deleting depend on the previous list. A functional updater receives the latest pending state rather than relying on the list captured by a render.

### Why use map to toggle completion?

Map produces a new array. Return a new object for the matching task with its completed value inverted, and retain the other task objects unchanged.

### Why not find a task and mutate it?

Mutating an object in existing state breaks immutable-update expectations. Find can locate the task, but the update must still create the appropriate new references.

### Why use filter to delete?

Filter creates a new array containing tasks whose IDs do not match the selected ID, without modifying the old array.

Filter retains items for which its predicate is true. Using task.id === id would keep the selected task and remove the others; deletion needs task.id !== id. TypeScript cannot detect this validly typed logic error.

### Why use a form for adding?

A form lets Enter and the submit button share one onSubmit handler. preventDefault stops browser navigation. The Add button uses type="submit", while Delete buttons use type="button".

### Why derive the count and empty state?

Both come directly from tasks.length. Storing them separately would duplicate information and create synchronization risks.

### What does aria-label do on Delete buttons?

It supplies an accessible name such as "Delete Buy milk", overriding the visible "Delete" text for assistive technology. The extra context helps distinguish repeated buttons without changing their visible text.

### Why use checked rather than value for the checkbox?

Checked controls selection state. Value is the checkbox's associated value, not whether it is selected.

### Why not use task text as the key?

Different tasks can have the same text, and text may change if editing is added. Identity should be stable and independent of display content.

### What are the time complexities?

Rendering, toggling with map and deleting with filter are O(n). Adding by copying the array is also O(n). These are appropriate for a small client-side list; larger datasets may require pagination or virtualization.

### Would you immediately add useCallback or React.memo?

No. First establish correctness and measure a real rendering problem. Memoization adds complexity and is useful only when it avoids meaningful work under the component's actual prop and rendering behaviour.

### What remains for production?

API integration, loading and failure states, server validation, durable storage, authorization where needed and automated tests. Clarify requirements before adding editing, filters, sorting or synchronization.

## Current limitations and next steps

- Tasks are kept in memory and disappear on refresh; durable storage is outside the current brief.
- No API integration, loading states or request failure handling is implemented.
- Styling currently covers completion only; refine layout and responsive presentation if required.
- Automated component tests are not yet implemented.
- Browser interaction and keyboard checks below remain to be performed; passing typecheck and build does not verify user interactions.
- Rename the Task display-text property from task to text if exact model naming is required.

## Validation completed

- npm run typecheck passes.
- npm run build passes with TodoList rendered by App.

## Manual test checklist

- Add a valid task and verify that it starts incomplete.
- Verify the input clears after successful addition.
- Reject empty and whitespace-only input.
- Verify surrounding whitespace is trimmed.
- Add duplicate text and verify both tasks have independent identities.
- Toggle one task twice without changing other tasks.
- Delete complete and incomplete tasks.
- Delete a middle task, then add another; verify IDs remain unique.
- Delete the final task and show an appropriate empty state.
- Add using Enter without reloading the page.
- Verify clicking a task label toggles its checkbox.
- Verify keyboard users can reach and operate all controls.
- Run npm run typecheck and npm run build.

## First practice prompt

> Before implementing the todo list, explain how you would model a task and which state variables you need. Clarify how blank input, duplicate task text and persistence should behave.

## Interview approach

Explain the behaviour each choice supports: draft versus saved state, stable identity, controlled controls and immutable transitions. Think aloud, deliver the required flow first, check boundary cases and distinguish current functionality from production improvements.

## Commands

Run these from the project root:

```bash
npm run dev
npm run typecheck
npm run build
```
