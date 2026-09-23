type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages === 0) return null;
  // Always show the endpoints and one page on either side of the selection.
  const visiblePages = [...new Set([
    0,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages - 1,
  ])]
    .filter((page) => page >= 0 && page < totalPages)
    .sort((a, b) => a - b);

  const pages: (number | string)[] = [];
  visiblePages.forEach((page, index) => {
    const previous = visiblePages[index - 1];
    if (previous !== undefined) {
      const gap = page - previous;
      if (gap === 2) pages.push(previous + 1);
      else if (gap > 2) pages.push(`gap-${previous}-${page}`);
    }
    pages.push(page);
  });

  return (
    <nav className="pagination-controls" aria-label="Product pagination">
      <button
        type="button"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pages.map((page) => (
        typeof page === "string" ? (
          <span key={page} className="pagination-ellipsis" aria-hidden="true">…</span>
        ) : <button
          key={page}
          type="button"
          aria-label={`Page ${page + 1}`}
          aria-current={currentPage === page ? "page" : undefined}
          className={currentPage === page ? "page-active" : undefined}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
