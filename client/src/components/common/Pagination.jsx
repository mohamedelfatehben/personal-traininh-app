/* eslint-disable react/prop-types */

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`py-1 px-3 rounded ${
          currentPage === i ? "bg-indigo-600 text-white" : "bg-gray-300"
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex space-x-2 justify-center mt-4">
      {currentPage > 1 && (
        <button
          className="py-1 px-3 rounded bg-gray-300"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pages}
      {currentPage < totalPages && (
        <button
          className="py-1 px-3 rounded bg-gray-300"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
