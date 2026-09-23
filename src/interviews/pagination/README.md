# Product Pagination Interview Preparation

## Exercise

Build a React and TypeScript product listing with client-side pagination. This is a practice scenario, not a confirmed Eightfold question.

## Problem statement

Fetch products, display titles and thumbnails, and show ten products per page. Provide Previous, Next and numbered buttons for direct navigation. Identify the current page, disable boundary navigation and distinguish loading, request failure and empty results.

## Implementation structure

```text
pagination/
├── README.md
├── ProductPagination.tsx
├── ProductPagination.css
└── components/
    ├── ProductCard.tsx
    └── PaginationControls.tsx
```

ProductPagination owns products, selected page and request feedback. ProductCard receives display values through props. PaginationControls receives the current page, page count and a callback. App currently displays this exercise.

## Practice assumptions

- Use DummyJSON products with limit=0 to fetch the full practice dataset.
- Paginate locally; changing pages does not request new data.
- Page size is fixed at ten.
- Internal indexes start at zero; visible labels start at one.
- Show the first, last and nearby pages, using ellipses for longer gaps.
- No filters, URL synchronization or durable page selection are required.

Clarify these assumptions with the interviewer before coding.

## Interview touch points

| Concept | Implementation |
| --- | --- |
| State | Remember products, selected page, loading and errors |
| Effects | Fetch from an external API after commit |
| Cleanup | Ignore results belonging to an obsolete effect setup |
| Dependencies | Fixed external URL and stable setters allow an empty dependency array |
| Async JavaScript | Await response and JSON parsing; check HTTP status |
| Runtime validation | Check the product fields before trusting received JSON |
| Derived data | Calculate page count, slice boundaries and visible products during rendering |
| Props and lifted state | Values flow to children; navigation requests flow back through a callback |
| Arrays | Use slice for products, keys and spread for page indexes, and map for JSX |
| List identity | Product IDs identify cards; page indexes identify fixed page positions |
| Conditional rendering | Distinct pending, failure, empty and populated UI |
| Accessibility | Semantic lists, image alternatives, named navigation, native buttons, current-page indication and focus styles |

## Likely follow-up questions

### Why use an effect?

Rendering calculates the interface. Fetching starts external work, so it belongs outside that calculation. For this small Vite exercise an effect performs the request; frameworks and client caches provide alternatives for larger applications.

### What does cleanup do here?

Each setup owns an ignore flag. Cleanup marks its result obsolete. The asynchronous function can finish, but must not apply its products, error or loading update. This does not cancel the network request.

### Does an empty dependency array guarantee one request?

No. Development Strict Mode performs an extra setup-cleanup-setup cycle. Requests can appear twice in development, but the first setup's result is ignored. Remounting also starts a new effect.

### Why is the effect callback not async?

An async callback returns a Promise. React expects the setup callback to return a cleanup function or nothing. Define and call an async function inside it instead.

### Why check response.ok?

Fetch can resolve for HTTP errors such as 404 or 500. The response status must be checked before treating the request as successful.

### Why use finally?

The current request must finish loading after success or failure. Finally handles both paths, guarded against obsolete results.

### Why not store visibleProducts in state?

It is calculated from products and currentPage. Separate state would duplicate information and require synchronization. No effect or memoization is needed for this small calculation.

### How are page boundaries calculated?

Total pages are Math.ceil(products.length / PAGE_SIZE). Start is currentPage * PAGE_SIZE; slice excludes start + PAGE_SIZE. The last page may contain fewer than ten products.

### How are the numbered buttons generated?

Collect the first, last, current and adjacent indexes, remove duplicates with Set, discard out-of-range values and sort numerically. Fill a single missing page directly; represent longer gaps with non-interactive ellipses. Map turns indexes into buttons displaying page + 1. Clicking requests the internal index.

### Why does the parent own currentPage?

The product list and controls both depend on it. One parent-owned value keeps them synchronized.

### How would server-side pagination differ?

Request a page using limit and skip, derive page count from the server's total, and refetch when the selected page changes. Avoid downloading the full dataset for large catalogs; handle request races and caching.

## Current limitations and next steps

- All products are downloaded; this approach suits a small practice dataset.
- Numbered controls use a compact page window and wrap responsively.
- No retry button, request cache, filters or sorting are implemented.
- No automatic focus movement occurs after page selection; a live status reports the range and current page.
- Automated component tests and browser interaction verification remain to be performed.

## Manual test checklist

- Initial loading feedback appears.
- Valid data displays at most ten products per page.
- Next, Previous and numbered buttons select the correct product slice.
- First page disables Previous; last page disables Next.
- The active button has visual styling and aria-current="page".
- Large page counts show endpoints, nearby pages and ellipses without rendering every page.
- The final partial page contains the remaining products.
- A successful empty response displays an empty message and no controls.
- Network and HTTP failures display an error and finish loading.
- Invalid response data displays an error.
- Cleanup ignores obsolete request results in development Strict Mode.
- Controls are keyboard operable and show focus indicators.
- Narrow layouts wrap navigation and constrain product images.

## Interview approach

Clarify data ownership and pagination mode first. Explain state versus calculations, implement fetching with lifecycle handling, then cards and navigation. Test boundaries before discussing larger datasets or further abstractions.

## Sources

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React: synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
- [React: choosing state structure](https://react.dev/learn/choosing-the-state-structure)
- [React: sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [DummyJSON: products](https://dummyjson.com/docs/products)

## Commands

Run from the project root:

```bash
npm run dev
npm run typecheck
npm run build
npm run lint
```
