import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from '../shadcn_ui/pagination';

type Props = {
  maxPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PagePagination = ({ maxPages, currentPage, setCurrentPage }: Props) => {
  const getPageNumbers = () => {
    if (maxPages <= 4) {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }

    const pages = [];

    pages.push(1, 2);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    if (currentPage > 2 && currentPage < maxPages) {
      pages.push(currentPage);
    }

    if (currentPage === maxPages && maxPages > 2) {
      pages.push(maxPages - 1);
    }

    if (currentPage < maxPages - 2) {
      pages.push('ellipsis');
    }

    pages.push(maxPages);

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(currentPage - 1)}
            className={
              currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => setCurrentPage(page as number)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(currentPage + 1)}
            className={
              currentPage === maxPages ? 'opacity-50 pointer-events-none' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
