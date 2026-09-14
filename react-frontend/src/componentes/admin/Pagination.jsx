import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination({ pagination, handlePageChange , colSpan }) {
  return (
    <>
      {pagination && pagination.totalPages > 1 && (
        
          <td colSpan={colSpan}>
            <div className="d-flex justify-content-between align-items-center">

              {/* Total products */}
              <div>
                Showing page {pagination.currentPage} of{" "}
                {pagination.totalPages} ({pagination.totalItems} products)
              </div>

              {/* Buttons */}
              <div className="d-flex gap-2">

                {/* Previous */}
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() =>
                    handlePageChange(pagination.currentPage - 1)
                  }
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                {/* Page numbers */}
                {Array.from(
                  { length: pagination.totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${
                      pagination.currentPage === page
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() =>
                    handlePageChange(pagination.currentPage + 1)
                  }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>

              </div>
            </div>
          </td>
        
      )}
    </>
  );
}

export default Pagination;