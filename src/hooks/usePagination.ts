import {useState} from "react";

const usePagination = (nItems, pageSize = 15) => {
	const [currentPage, setPage] = useState(1);

	const isLastPage = (pageNumber) => {
		const nPages = Math.ceil(nItems / pageSize);
		return pageNumber >= nPages;
	};

	return {
		currentPage,
		hasNext: !isLastPage(currentPage),
		hasPrevious: currentPage > 0,
		goToNextPage: setPage(page => page + 1),
		goToPreviousPage: setPage(page => page - 1)
	}
}

export default usePagination;