import {useState} from "react";

const usePagination = (nItems: number, pageSize = 15) => {
	const [currentPage, setPage] = useState<number>(1);

	const isLastPage = (pageNumber: number) => {
		const nPages = Math.ceil(nItems / pageSize);
		return pageNumber >= nPages;
	};

	return {
		currentPage,
		hasNext: !isLastPage(currentPage),
		hasPrevious: currentPage > 0,
		goToNextPage: () => setPage(page => page + 1),
		goToPreviousPage: () => setPage(page => page - 1)
	}
}

export default usePagination;
